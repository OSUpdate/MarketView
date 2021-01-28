import React, { Component } from 'react';
import SideBar from '../component/dashboard/SideBar';
import Layout from '../component/Layout';

class HomeContainer extends Component {
    render() {
        return (
            <Layout >
                <SideBar title="DashBoard"/>
            </Layout>
        );
    }
}

export default HomeContainer;