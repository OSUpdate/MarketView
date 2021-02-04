import React, { Component,useState } from 'react';
import * as styles from "../App.css";
interface EmailProps{
    title:string
}

const Email = (props:EmailProps) => {
    const [email,setEmail] = useState({
        others:false,
        addr:'',
        id:''
    });
    const onChangeId = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEmail({
            ...email,
            id:e.target.value
        })
    };
    const onChangeAddr = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEmail({
            ...email,
            addr:e.target.value
        })
    };
    const onChangeSelect = (e:React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
        if(e.target.value == 'others'){
            console.log(e.target.value);
            setEmail({
                ...email,
                others:true
            })
        }
        else{
            setEmail({
                ...email,
                others:false,
                addr:e.target.value
            })
        }
    };
    return (
        <div className={styles.item}>
            <input type="email" value={email.id} onChange={onChangeId} placeholder={props.title}/>
            <h3>@</h3>
            {email.others?
            <input type="email" value={email.addr} onChange={onChangeAddr}  placeholder="직접입력"/>
            :
            <select onChange={onChangeSelect} value={email.addr}>
                <option value="naver.com">naver.com</option>
                <option value="gmail.com">gmail.com</option>
                <option value="nate.com">nate.com</option>
                <option value="daum.com">daum.com</option>
                <option value="others">직접입력</option>
            </select>
            }
        </div>
        );
};

export default Email;