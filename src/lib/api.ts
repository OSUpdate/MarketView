import axios from 'axios';

export const days = (days:number,market:string) => axios.get(`https://api.upbit.com/v1/candles/days?count=${days}&market=${market}`)
export const ticker = (markets:string) => axios.get(`https://api.upbit.com/v1/ticker?markets=${markets}`);
export const market = (market:string) => axios.get(`https://api.upbit.com/v1/market/${market}`);