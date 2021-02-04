import { writeSync } from 'fs';
import React, { Component } from 'react';
import {Link} from "react-router-dom";
import * as styles from "../../App.css";
import Input from '../Input';
const Login = () => {

    return (
            <section className={styles['container-full']}>
                <div className={styles.sign}>
                    <Input title="아이디"/>
                    <Input title="비밀번호"/>
                    <input type="submit" value="로그인"/>
                    <Link to="/register">회원가입</Link>
                </div>
            </section>
        );
};

export default Login;