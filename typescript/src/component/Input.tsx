import React, { Component } from 'react';
import * as styles from "../App.css";
interface InputProps{
    title:string
}
const Input = (props:InputProps) => {
    return (
        <div className={styles.item}>
            <input type="text"  placeholder={props.title}/>
        </div>
        );
};

export default Input;