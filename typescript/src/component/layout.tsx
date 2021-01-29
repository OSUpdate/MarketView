import React, { Component } from 'react';
import * as styles from "../App.css";
export interface LayoutProps {
    children :React.ReactNode
}
const Layout = (props : LayoutProps) => {
    console.log(props)
    return (
            <div className={styles.App}>
                {props.children}
            </div>
        );
};

export default Layout;