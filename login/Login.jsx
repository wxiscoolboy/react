import React, { Component } from 'react'
import { Flex, InputItem, WingBlank, WhiteSpace, Button, Toast } from 'antd-mobile'
import { Link } from 'react-router-dom'
import { api_login } from '../../apis/apis'
import './login.scss'

export default class Login extends Component {
    state = {
        acc: '',
        pwd: '',
        errortext: 'none'
    }

    render() {
        let { acc, pwd, errortext } = this.state

        return (
            <div className='login-container'>
                <WhiteSpace size="xl" />
                <Flex justify="center">
                    <img className='logo' src={require('../../assets/imgs/logo.jpg')} />
                </Flex>

                <WhiteSpace size="xl" />
                <WingBlank size='lg'>
                    <InputItem
                        placeholder="请输入用户名"
                        clear
                        value={acc}
                        onChange={(val) => {
                            this.setState({ acc: val })
                        }}
                    >
                        <div style={{ backgroundImage: `url(${require('../../assets/imgs/icon_user.png')})`, backgroundSize: 'cover', height: '22px', width: '22px' }} />
                    </InputItem>
                    <InputItem
                        placeholder="请输入密码"
                        clear
                        value={pwd}
                        type="password"
                        onChange={(val) => {
                            this.setState({ pwd: val })
                        }}
                    >
                        <div style={{ backgroundImage: `url(${require('../../assets/imgs/icon_pwd.png')})`, backgroundSize: 'cover', height: '22px', width: '22px' }} />
                    </InputItem>


                    <WhiteSpace size="md" />
                    <p style={{ display: errortext }}>×用户名或密码错误</p>
                    <Button onClick={this.clickLogin} style={{ backgroundColor: '#FF2F66', color: '#FFF' }}>登录</Button>


                    <WhiteSpace size="md" />
                    <Flex justify="between">
                        <Link to='/reg'>前往注册</Link>
                        <Link to='/reg'>忘记密码</Link>
                    </Flex>
                </WingBlank>
            </div>
        )
    }

    clickLogin = async () => {
        let { acc, pwd } = this.state

        let res = await api_login({ acc, pwd })
        if (res.data.code == 1) {

            //显示登陆提示
            Toast.success('登陆成功,即将跳转到首页', 1);

            setTimeout(() => {
                window.location.href = '/#/'
            }, 2000)
        } else {
            this.setState({
                errortext: ''
            })
        }
    }
}
