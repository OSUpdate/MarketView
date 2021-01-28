import React, { Component } from 'react';
import * as styles from "../../App.css";
import SideBarHeader from './SideBarHeader';
export interface SideBarProps {
    title:string
};
const SideBar = (props:SideBarProps) => {
    return (
        <div className={styles['side-bar']}>
            <div className={styles['side-bar-inner']}>
                <nav className={styles.menu}>
                    <SideBarHeader title={props.title}/>
                </nav>
            </div>
        </div>
    );

}

export default SideBar;