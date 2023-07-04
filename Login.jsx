import axios from 'axios'
import sha256 from 'crypto-js/sha256'
import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Message, Spin } from '@arco-design/web-react'

function hash (password) {
  const salt = 'G3AlV9e9ohT/0zKaFB5JzxRQUAw'
  return sha256(password + salt).toString()
}

// captcha 是腾讯人机验证码前端校验方法，调用前先引入 <script src="https://ssl.captcha.qq.com/TCaptcha.js"></script>
// 这个方法返回的 ticket, randstr 参数，一些敏感接口（登录注册等）需要一并传入
// 具体可以看接口文档 https://gist.github.com/iwestlin/af842ea44ac7fd6401ad7c8c6cb63c8a
function captcha () {
  const { TencentCaptcha } = window
  return new Promise((resolve, reject) => {
    try {
      const captcha = new TencentCaptcha('192124353', res => {
        if (res.ret === 0) {
          const { ticket, randstr } = res
          resolve({ ticket, randstr })
        } else {
          console.log('验证失败:', res)
          Message.warning({ content: '用户行为验证未通过' })
          reject(new Error('用户行为验证未通过'))
        }
      }, {})
      captcha.show()
    } catch (err) {
      Message.warning({ content: '验证码加载失败，请联系网站管理员' })
      reject(err)
    }
  })
}

export default function Login () {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    axios.post('/api/user/check').then(r => {
      if (r.data) {
        Message.info({ content: '您已登录，正在跳转到主页...' })
        setTimeout(() => {
          window.location.href = '/'
        }, 500)
      }
    }).catch(console.error)
  }, [])

  const [form] = Form.useForm()

  return (<div style={{
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
  <Spin tip='正在登录...' loading={loading}>
    <Form
      form={form}
      style={{
        width: 320,
        padding: 10,
        borderRadius: 10,
        boxShadow: '0px 0px 10px gray'
      }}
      wrapperCol={{ span: 24 }}
      autoComplete='off'
      onSubmit={({ email, password }) => {
        setLoading(true)
        captcha()
          .then(res => axios.post('/api/user/login', {
            ...res, // 即 ticket, randstr
            email,
            password: hash(password)
          }))
          .then(() => {
            Message.success('登录成功，跳转到主页...')
          }).catch(e => {
            setLoading(false)
            console.error(e)
          })
      }}
    >
      <Form.Item
        field='email'
        validateTrigger='onBlur'
        rules={[{
          required: true,
          message: '邮箱必填'
        }, {
          type: 'email',
          validateLevel: 'error'
        }]}
      >
        <Input placeholder='请输入邮箱' />
      </Form.Item>
      <Form.Item
        field='password'
        validateTrigger='onBlur'
        rules={[{ required: true, message: '密码必填' }]}
      >
        <Input.Password placeholder='请输入密码' />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' long>
          登录
        </Button>
      </Form.Item>
    </Form></Spin>
  </div>)
}
