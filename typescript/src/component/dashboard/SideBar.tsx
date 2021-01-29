import React, { Component } from 'react';
import * as styles from "../../App.css";
import SideBarHeader from './SideBarHeader';
import SideBarMenu from './SideBarMenu';
export interface SideBarProps {
    title:string
};
const SideBar = (props:SideBarProps) => {
    return (
        <section className={styles.wrap}>
            <div className={styles['side-bar']}>
                <div className={styles['side-bar-inner']}>
                    <nav className={styles.menu}>
                        <SideBarHeader title={props.title}/>
                        <SideBarMenu logined={false}/>
                    </nav>
                </div>
            </div>
        </section>
    );

}

export default SideBar;