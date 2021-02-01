import React, { Component } from 'react';
import * as styles from "../../App.css";
import {Link} from "react-router-dom";
interface SideBarMenuProps {
    logined : boolean
  };
const SideBarMenu = (props:SideBarMenuProps) =>{
    return (
        <ul className={styles['menu-list']}>
            <li>
                <Link to="/login" className={styles['menu-item']}>
                    <span className={styles['menu-title']}>{props.logined? "로그아웃":"로그인"}</span>
                </Link>
            </li>
            <li>
                <a className={styles['menu-item']}>
                    <span className={styles['menu-title']}>거래소</span>
                </a>
            </li>
            <li>
                <a className={styles['menu-item']}>
                    <span className={styles['menu-title']}>투자내역</span>
                </a>
            </li>
        </ul>
    );
}

export default SideBarMenu;