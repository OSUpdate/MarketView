import React, { Component } from 'react';
import * as styles from "../../App.css";
import cx from "classnames";
interface MarketProps {
  };
const Market = (props:MarketProps) =>{
    return (
        <React.Fragment>
            <div className={styles['container-fluid']}>
                <div className={styles.row}>
                    <div className={cx(styles['col-lg-9'], styles['col-md-12'], styles['col-sm-12'], styles['col-xs-12'])}>
                        <div className={styles['content-title']}>
                            <h2>거래소</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.area}>
                <div className={styles.row}>
                    <div className={cx(styles['col-lg-9'], styles['col-md-12'], styles['col-sm-12'], styles['col-xs-12'])}>
                        <div className={styles['board-card']}>
                            <h1>test</h1>
                        </div>
                    </div>
                </div>

            </div>
            <div className={styles.area}>
                <div className={styles.row}>
                    <div className={cx(styles['col-lg-9'], styles['col-md-12'], styles['col-sm-12'], styles['col-xs-12'])}>
                        <div className={styles['board-card']}>
                            <div className={styles.panel}>
                                <ul className={styles.list}>
                                    <li className={styles['list-item']}><a>test</a></li>
                                    <li className={styles['list-item']}><a>test</a></li>
                                    <li className={styles['list-item']}><a>test</a></li>
                                    <li className={styles['list-item']}><a>test</a></li>
                                    <li className={styles['list-item']}><a>test</a></li>
                                    <li className={styles['list-item']}><a>test</a></li>
                                </ul>
                                <ul className={styles.list}>
                                    <li className={styles['list-item']}><a>test</a></li>
                                    <li className={styles['list-item']}><a>test</a></li>
                                    <li className={styles['list-item']}><a>test</a></li>
                                    <li className={styles['list-item']}><a>test</a></li>
                                    <li className={styles['list-item']}><a>test</a></li>
                                    <li className={styles['list-item']}><a>test</a></li>
                                </ul>
                                <ul className={styles.list}>
                                    <li className={styles['list-item']}><a>test</a></li>
                                    <li className={styles['list-item']}><a>test</a></li>
                                    <li className={styles['list-item']}><a>test</a></li>
                                    <li className={styles['list-item']}><a>test</a></li>
                                    <li className={styles['list-item']}><a>test</a></li>
                                    <li className={styles['list-item']}><a>test</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </React.Fragment>

    );
}

export default Market;