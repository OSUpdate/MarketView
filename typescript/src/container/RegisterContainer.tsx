import React, { Component } from 'react';
import SideBar from '../component/dashboard/SideBar';
import Contents from '../component/dashboard/Contents';
import Layout from '../component/Layout';
import Register from '../component/user/Register';

class RegisterContainer extends Component {
    render() {
        return (
            <Layout >
                <Register/>
            </Layout>
        );
    }
}

export default RegisterContainer;