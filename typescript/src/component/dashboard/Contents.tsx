import React, { Component } from 'react';
import * as styles from "../../App.css";
import { Route, Switch } from 'react-router-dom';
import Market from './Market';

interface ContentsProps {
};
const Contents = (props:ContentsProps) =>{
    return (
        <section className={styles.contents}>
          <div className={styles.container}>
            <Switch>
              <Route exact component={Market}/>
              <Route />
            </Switch>
          </div>
        </section>
    );
}

export default Contents;