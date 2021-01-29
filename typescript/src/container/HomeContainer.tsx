import React, { Component } from 'react';
import SideBar from '../component/dashboard/SideBar';
import Contents from '../component/dashboard/Contents';
import Layout from '../component/Layout';

class HomeContainer extends Component {
    render() {
        return (
            <Layout >
                <SideBar title="DashBoard"/>
                <Contents></Contents>
            </Layout>
        );
    }
}

export default HomeContainer;