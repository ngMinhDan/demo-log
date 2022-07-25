import React, { useState } from 'react'
import { Layout, Menu, Typography } from 'antd'
import { TeamOutlined, HomeOutlined, DashboardOutlined } from '@ant-design/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { removeCookie, STORAGEKEY } from '../utils/storage';
import { useDispatch } from 'react-redux';
import { resetUserInfo } from '../redux/userSlice';

const { Sider } = Layout;

export const SideBar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logout = async () => {
        await removeCookie(STORAGEKEY.ACCESS_TOKEN)
        await removeCookie(STORAGEKEY.USER_INFO)
        dispatch(resetUserInfo())
        navigate('/')
        window.location.reload()
    }

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className="logo" />
            <Menu theme="dark"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['1']}
                mode="inline"
            >
                <Menu.Item key="1">
                    <HomeOutlined />
                    <span>Log History</span>
                    <NavLink to="/history-log"></NavLink>
                </Menu.Item>

                <Menu.Item key="2">
                    <TeamOutlined />
                    <span>Health Check</span>
                    <NavLink to="health"></NavLink>
                </Menu.Item>

                <Menu.Item key="3">
                    <DashboardOutlined />
                    <span>Counter</span>
                    <NavLink to="More"></NavLink>
                </Menu.Item>
            </Menu>
            <Typography
                variant='subtitle1'
                onClick={logout}
                className=' header__link'
                style={{ color: '#fff', cursor: 'pointer' }}
            >
                Logout
            </Typography>
        </Sider>
    )
}
