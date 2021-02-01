import { writeSync } from 'fs';
import React, { Component } from 'react';
import * as styles from "../../App.css";

const Login = () => {

    return (
            <section className={styles['container-full']}>
                <div className={styles.sign}>
                    <input type="submit" value="로그인"/>
                </div>
            </section>
        );
};

export default Login;