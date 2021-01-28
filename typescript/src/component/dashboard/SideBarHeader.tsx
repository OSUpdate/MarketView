import React, { Component } from 'react';
import * as styles from "../../App.css";

interface SideBarHeaderProps {
    title: string;
  };
const SideBarHeader = (props:SideBarHeaderProps) =>{
    return (
        <header className={styles['menu-head']}>
            <h3>{props.title}</h3>
        </header>
    );
}

export default SideBarHeader;