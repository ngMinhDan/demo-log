import React, { useState } from 'react'
import { Button, Form, Input, Typography } from 'antd'
import { STORAGEKEY, setCookie } from '../utils/storage'
import { useForm } from 'react-hook-form'
import { validateEmail } from '../utils/regex'
import axios from 'axios'
import { getUserInfo } from '../redux/userSlice'
import { useDispatch } from 'react-redux'

const { Text } = Typography
export const Login = () => {
    const [error, setError] = useState()
    const dispatch = useDispatch()
    const {
        reset
    } = useForm({
        mode: 'onChange'
    })

    const onFinish = async (values) => {

        const config = {
            Headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const data = await axios.post('accountService/accounts/signin', values, config)
            console.log(data)
            const token = data?.data?.data?.token
            if (token) {
                await setCookie(STORAGEKEY.ACCESS_TOKEN, token)
                await dispatch(getUserInfo())
                window.location.reload()
            }
            reset()
        }
        catch (err) {
            err?.response?.data && setError('Incorrect email or password')
        }
    }

    return (
        <div className='login-form'>
            <Form
                name='basic'
                labelCol={{ span: 8 }}
                initialss={{ remember: true }}
                layout='vertical'
                onFinish={onFinish}
            >

                <Form.Item
                    label='email'
                    name='email'
                    rules={[
                        {
                            required: true,
                            type: 'email',
                            message: 'Enter a valid email address!',
                            pattern: new RegExp(validateEmail)
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label='Password'
                    name='password'
                    rules={[
                        {
                            required: true,
                            message: 'Please! Password at least 8 characters. number(s) and letter (S)!',
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Text type='danger'>{error && error}</Text>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
