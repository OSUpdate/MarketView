import axios from 'axios';

export const days = (days,market) => axios.get(`https://api.upbit.com/v1/candles/days?count=${days}&market=${market}`)
export const ticker = (markets) => axios.get(`https://api.upbit.com/v1/ticker?markets=${markets}`);
export const market = (market) => axios.get(`https://api.upbit.com/v1/market/${market}`);

const getDays = async (day,market) => {
    const days = await api.days(day,market);
    console.log(days)
};
await getDays()