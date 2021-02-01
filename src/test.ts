import * as api from './lib/api';
import dfd from "danfojs-node";
import _ from "lodash";

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
const getMarkets = async () => {
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
    const days = await api.days(day,market);

    const trade = _.chain(days.data)
    .map(item =>item.trade_price)
    .value()
    return trade;
    
};

//상승장 판단 함수
const getSma = async (ticker:string) => {
    const days = await getTradePrice(10,ticker);
    // 0 오늘 이평선 1 어제 이평선
    const ma = sma(days);
    return ma;
};

const getTargetprice = async (ticker:string) => {
    const current = await api.ticker(ticker);
    const yesterday = await api.days(2,ticker);
    const target = current.data[0].opening_price + (yesterday.data[1].high_price - yesterday.data[1].low_price)*0.5
    console.log(target)
    return target
};
//console.log(getTargetprice("KRW-BTC"));
const autoTrading = async (ticker:string) =>{
    let now = new Date();
    let mid = new Date(now.getFullYear(),now.getMonth(),now.getDate()+1);
    // 목표가 설정
    let ma = await getSma(ticker);
    let target = await getTargetprice(ticker);
    setInterval(async ()=>{
        now = new Date();
        if(mid.getTime() < now.getTime() && now.getTime() < mid.getTime()+ 20000){
            target = getTargetprice(ticker);
            mid = new Date(now.getFullYear(),now.getMonth(),now.getDate()+1);
            ma = await getSma(ticker);
            console.log("판매함수")
        }
        const current = await api.ticker(ticker);

        if(current.data[0].trade_price > ma[1] && current.data[0].trade_price > target)
            console.log("구매함수");

    },200);
};

// 이평선 값
//console.log(sma([1,2,3,4,5,6,7,8,9,10,11,12]))