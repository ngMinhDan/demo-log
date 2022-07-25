import React, { useState, useEffect } from 'react';
import './index.css';
import { Breadcrumb, Layout, Table, Tag } from 'antd';
import axios from 'axios';
// import io from 'socket.io-client'

// const addressSocket = io.connect('http://139.180.147.199:8082')
// const accountSocket = io.connect('http://139.180.147.199:8080')
// const coinPriceSocket = io.connect('http://139.180.147.199:8081')
// const mailSocket = io.connect('http://139.180.147.199:8083')

const { Header, Content, Footer } = Layout;
const columns = [
  {
    title: 'Service Name',
    dataIndex: 'service',
    sorter: (a, b) => a.service.localeCompare(b.service)
  },
  {
    title: 'Health Check',
    dataIndex: 'health',
    sorter: (a, b) => a?.health - b?.health,
    render: (health) => (
      <span>
        <Tag color={health !== 200 ? 'error' : 'green'}>
          {health}
        </Tag>
      </span>
    ),
  }
];

export const HealthCheck = () => {
  const [data, setData] = useState([])
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  }

  const checkHealth = async () => {
    const coinPriceService = await axios.get('coinPriceService/health').then(res => res).catch(error => error)
    const accountService = await axios.get('accountService/health').then(res => res).catch(error => error)
    const addressService = await axios.get('addressService/health').then(res => res).catch(error => error)
    const mailService = await axios.get('mailService/health').then(res => res).catch(error => error)
    const logService = await axios.get('log/health').then(res => res).catch(error => error)

    if (addressService && coinPriceService && accountService && mailService && logService) {
      setData([
        ...data,
        {
          service: 'Service Address',
          health: addressService.status || 500
        },
        {
          service: 'Service Account',
          health: accountService.status || 500
        },
        {
          service: 'Service Coin Price',
          health: coinPriceService.status || 500
        },
        {
          service: 'Mail Service',
          health: mailService.status || 500
        },
        {
          service: 'Log Service',
          health: logService.status || 500
        }
      ])
    }
  }

  console.log(data)

  useEffect(() => {
    checkHealth()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      checkHealth()
    }, 300000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Layout className="site-layout">
      <Header
        className="site-layout-background"
        style={{ padding: 0 }}
      />
      <Content
        style={{ margin: '0 16px' }}
      >
        <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          <Table columns={columns} dataSource={data} onChange={onChange} />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}
