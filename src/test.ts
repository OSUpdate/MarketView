import * as api from './lib/api';
import dfd from "danfojs-node";
import _ from "lodash";
import key from "./key.json";
import data from "./data.json";
import {v4 as uuid} from "uuid";
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import qs from "querystring";
import fs from 'fs';
import request from 'request';
interface Trade{
    trade: object[]
}
interface Markets{
    market:string,
    korean_name:string,
    english_name:string
}
interface Ticker{
    market: string,
    trade_date: string,
    trade_time: string,
    trade_date_kst: string,
    trade_time_kst: string,
    trade_timestamp: number,
    opening_price: number,
    high_price: number,
    low_price: number,
    trade_price: number,
    prev_closing_price: number,
    change: string,
    change_price: number,
    change_rate: number,
    signed_change_price: number,
    signed_change_rate: number,
    trade_volume: number,
    acc_trade_price: number,
    acc_trade_price_24h: number,
    acc_trade_volume: number,
    acc_trade_volume_24h: number,
    highest_52_week_price: number,
    highest_52_week_date: string,
    lowest_52_week_price: number,
    lowest_52_week_date: string,
    timestamp: number
}
//모든 코인 정보 get 함수
const handleError = (error:any) =>{
    if(error.response){
        console.log(error.response.data);
        console.log(error.response.status);
    }else if(error.request){
        console.log(error.request);
    }else{
        console.log(`Error : ${error.message}`);
    }

}
const getMarkets = async () => {
    try{
        const markets = await api.market("all")
        let market:string[] = [];
        const krw = markets.data.reduce((acc:Array<Markets>,cur:Markets) =>{
            if(cur.market.split('-')[0] == 'KRW'){
                acc.push(cur)
                market.push(cur.market) 
            }
            return acc
        },[]);
        const res = await api.ticker(market.join(','));
        return res.data
    }catch(error){
        throw new Error(error);
    }

};


//평균 계산 함수
const average = (numbers:any[]) => {
    return _.meanBy(numbers);
};

//구간 나누어주는 함수
const window = (count:any) =>{
    return (_number:any,index:any,array:any) => {

        if(index >= array.length - count + 1)
            return
        const end = Math.min(array.length,index+count);
        return _.slice(array,index,end);

    };
};

// 단순이동평균 함수
const sma = (numbers:number[]) => {
    return _.chain(numbers)
    .map(window(5))
    .filter()
    .map(average)
    .value();
};
//일봉 데이터 get 함수
const getTradePrice = async (day:number,market:string) => {
    try{
        const days = await api.days(day,market);
        
        const trade = _.chain(days.data)
        .map(item =>item.trade_price)
        .value()
        return trade;
    }catch(error){
        throw new Error(error);
    }
};

//상승장 판단 함수
const getSma = async (ticker:string) => {
    try{
        const days = await getTradePrice(10,ticker);
        // 0 오늘 이평선 1 어제 이평선
        const ma = sma(days);
        return ma;
    }catch(error){
        throw new Error(error);
    }
};

const getTargetprice = async (ticker:string) => {
    try{
        const current = await api.ticker(ticker);
        const yesterday = await api.days(2,ticker);
        const target = current.data[0].opening_price + (yesterday.data[1].high_price - yesterday.data[1].low_price)*0.5
        console.log(`목표가격: ${target.toFixed(2)}`)
        return target.toFixed(2);
    }catch(error){
        throw new Error(error);
    }
};

const chance = async (ticker:string) => {
    try{
        const body = {
            market: ticker
        }
        
        const query = qs.encode(body)

        const hash = crypto.createHash('sha512')
        const queryHash = hash.update(query, 'utf-8').digest('hex')
        
        const payload = {
            access_key: key.access,
            nonce: uuid(),
            query_hash: queryHash,
            query_hash_alg: 'SHA512',
        };
        
        const token = jwt.sign(payload, key.secret);
        
        const options = {
            headers: {Authorization: `Bearer ${token}`},
            json: body
        };
        
        const res = await api.chance(ticker,options);
        console.log(res.data);
        return res.data;
    }catch(error){
        throw new Error(error);
    }
};

const buy = async(ticker:string) =>{
    try{
        const data = await chance(ticker);
        const current = await api.ticker(ticker);
        const volume = (parseInt(data.bid_account.balance)/current.data[0].trade_price).toFixed(8)
        const body = {
            market: ticker,
            // bid: 매수, ask: 매도
            side: 'bid',
            volume: volume,
            price: current.data[0].trade_price,
            // limit: 지정가 매수,매도 , price: 시장가 매수, market: 시장가 매도
            ord_type: 'limit',
        }
        
        const query = qs.encode(body)
        
        const hash = crypto.createHash('sha512')
        const queryHash = hash.update(query, 'utf-8').digest('hex')
        
        const payload = {
            access_key: key.access,
            nonce: uuid(),
            query_hash: queryHash,
            query_hash_alg: 'SHA512',
        }
        
        const token = jwt.sign(payload, key.secret)
        /*
        const options = {
            headers: {Authorization: `Bearer ${token}`},
            json: body
        }
        */
        const options = {
            method: "POST",
            url: "https://api.upbit.com/v1/orders",
            headers: {Authorization: `Bearer ${token}`},
            json: body
        }
        /*
        request(options, (error, response, body) => {
            if (error) throw new Error(error)
            console.log(body)
        })
        */
        const res = await api.order(options);
        return res.data;
    }catch(error){
        throw new Error(error);
    }
};

const sell = async (ticker:string) =>{
    try{
        const data = await chance(ticker);
        const current = await api.ticker(ticker);
        const body = {
            market: ticker,
            // bid: 매수, ask: 매도
            side: 'ask',
            volume: data.ask_account.balance,
            price: current.data.trade_price,
            // limit: 지정가 매수,매도 , price: 시장가 매수, market: 시장가 매도
            ord_type: 'limit',
        }
        
        const query = qs.encode(body)
        
        const hash = crypto.createHash('sha512')
        const queryHash = hash.update(query, 'utf-8').digest('hex')
        
        const payload = {
            access_key: key.access,
            nonce: uuid(),
            query_hash: queryHash,
            query_hash_alg: 'SHA512',
        }
        
        const token = jwt.sign(payload, key.secret)
        /*
        const options = {
            headers: {Authorization: `Bearer ${token}`},
            json: body
        }
        */
        const options = {
            method: "POST",
            url: "https://api.upbit.com/v1/orders",
            headers: {Authorization: `Bearer ${token}`},
            json: body
        }
        /*
        request(options, (error, response, body) => {
            if (error) throw new Error(error)
            console.log(body)
        })
        */
        const res = await api.order(options);
        return res.data;
    }catch(error){
        throw new Error(error);
    }
    
};

//console.log(getTargetprice("KRW-BTC"));
const autoTrading = async (ticker:string) =>{
    try{
        let trade:Trade = data;
        let now = new Date();
        let mid = new Date(now.getFullYear(),now.getMonth(),now.getDate()+1,9);
        
        // 목표가 설정
        let ma = await getSma(ticker);
        let target = await getTargetprice(ticker);
        let bidPrice = 0;
        let askPrice = 0;
        await setInterval(async ()=>{
            now = new Date();
            //console.log(mid.getTime() < now.getTime() && now.getTime() < mid.getTime()+ 20000)
            if(mid.getTime() < now.getTime() && now.getTime() < mid.getTime()+ 20000){
                console.log('test')
                target = await getTargetprice(ticker);
                mid = new Date(now.getFullYear(),now.getMonth(),now.getDate()+1);
                ma = await getSma(ticker);
                const ask = await sell(ticker);
                console.log(ask)
                askPrice = ask.price;
                console.log(`판매 가격: ${askPrice}`)
                trade.trade.push({
                    sell:askPrice,
                    buy:bidPrice,
                    time:new Date()
                });
                fs.writeFile ("data.json", JSON.stringify(trade), (err) => {
                    if (err) throw err;
                    console.log('complete');
                    }
                );
            }
            const current = await api.ticker(ticker);
            if(current.data[0].trade_price > ma[1] && current.data[0].trade_price > target){
                //잔고 확인 후 주문
                const self = await chance(ticker);
                if(parseInt(self.bid_account.balance) > self.market.bid.min_total){
                    const bid = await buy(ticker);
                    bidPrice = bid.price;
                    console.log(`구매 가격: ${askPrice}`);
                    trade.trade.push({
                        sell:askPrice,
                        buy:bidPrice,
                        time:new Date()
                    });
                    fs.writeFile ("data.json", JSON.stringify(trade), (err) => {
                        if (err) throw err;
                        console.log('complete');
                        }
                    );
                }
                
            }

        },400);
    }
    catch(error){
        handleError(error);
    }
};
autoTrading("KRW-LINK")
//chance('KRW-BTC');
// 이평선 값
//console.log(sma([1,2,3,4,5,6,7,8,9,10,11,12]))