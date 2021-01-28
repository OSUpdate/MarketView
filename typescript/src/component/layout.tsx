import React, { Component } from 'react';
import * as styles from "../App.css";
export interface LayoutProps {
    children :React.ReactNode
}
const Layout = (props : LayoutProps) => {
    console.log(props)
    return (
            <section className={styles.wrap}>
                {props.children}
            </section>
        );
};

export default Layout;