import React, { useEffect, useState } from 'react'
import './index.css';
import { Table, Tag, Form, Select } from 'antd';
import axios from 'axios';
import { timeSince } from '../utils/FormatTime';

const { Option } = Select

const columns = [
  {
    title: 'Service',
    dataIndex: 'service',
    sorter: (a, b) => a.service.localeCompare(b.service)
  },
  {
    title: 'Message',
    dataIndex: 'msg',
    sorter: (a, b) => a.msg.localeCompare(b.msg)
  },
  {
    title: 'Level',
    dataIndex: 'level',
    sorter: (a, b) => a.level.localeCompare(b.level),
    render: (level) => (
      <span>
        <Tag color={level === 'info' ? 'geekblue' : level === 'error' ? 'volcano' : level === 'warning' ? 'yellow' : level === 'fatal' ? 'red' : 'green'}>
          {level.toUpperCase()}
        </Tag>
      </span>
    ),
  },
  {
    title: 'Label',
    dataIndex: 'label',
  },
  {
    title: 'Since',
    dataIndex: 'time',
    render: (time) => (
      <div> {timeSince(time)} </div>
    )
  }
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
}

const TableLog = () => {
  const [data, setData] = useState([])
  const [filter, setFilter] = useState(false)
  const [filterData, setFilterData] = useState([...data])
  const [form] = Form.useForm();

  const getData = async () => {
    await axios.get('log/logs')
      .then(res => {
        let data = res?.data?.data
        setData(data)
      }
      )
      .catch(err => err)
  }

  useEffect(() => {
    getData()
  }, [])

  // console.log(data)
  // const onFinish = (values) => {
  //   if (values['service'] !== undefined || values['level'] !== undefined) {
  //     setFilter(true)
  //     const filterData = data?.filter((item) => {
  //       return item?.service.toLowerCase().includes(values['service'].toLowerCase())
  //     })
  //     setFilterData(filterData)
  //   }
  // }

  const onServiceClick = (value) => {
    const filterServiceData = data?.filter((item) => {
      setFilter(true)
      return item?.service === value
    })
    setFilterData(filterServiceData)
  }

  const onLevelClick = (value) => {
    const filterLevelData = filterData?.filter((item) => {
      setFilter(true)
      return item?.level === value
    })
    setFilterData(filterLevelData)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      getData()
    }, 300000)
    return () => clearTimeout(timer)
  }, [])

  // Load and remove all duplicate value
  const serviceValue = [...new Set(
    data?.map((item) => {
      return item?.service
    })
  )]

  const levelValue = [...new Set(
    filterData?.map((item) => {
      return item?.level
    })
  )]

  return (
    <>
      <Form form={form} name="control-hooks">
        <Form.Item label="Service" name='service'>
          <Select
            placeholder='Choose service'
            onChange={onServiceClick}
          >
            {
              serviceValue?.map((item, id) => (
                <Option key={id} value={item}>{item}</Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item label="Level" name='level'>
          <Select
            placeholder='Choose level'
            onChange={onLevelClick}
          >
            {
              levelValue?.map((item, id) => (
                <Option key={id} value={item}>{item}</Option>
              ))
            }
          </Select>
        </Form.Item>
      </Form>
      <Table columns={columns}
        dataSource={filter ? filterData : data}
        onChange={onChange} />
    </>
  )
}

export default TableLog 
