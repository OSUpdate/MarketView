import React, { Component } from 'react';
import {Link} from "react-router-dom";
import * as styles from "../../App.css";
import Input from '../Input';
import Email from '../Email';
const Register = () => {

    return (
        <section className={styles['container-full']}>
            <div className={styles.sign}>
                <Input title="아이디"/>
                <Input title="비밀번호"/>
                <Input title="비밀번호 확인"/>
                <Email title="이메일" />
                <input type="submit" value="회원가입"/>
            </div>
        </section>
        );
};

export default Register;