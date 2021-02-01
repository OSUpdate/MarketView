import React, { Component } from 'react';
import SideBar from '../component/dashboard/SideBar';
import Contents from '../component/dashboard/Contents';
import Layout from '../component/Layout';
import Login from '../component/user/Login';

class LoginContainer extends Component {
    render() {
        return (
            <Layout >
                <Login/>
            </Layout>
        );
    }
}

export default LoginContainer;