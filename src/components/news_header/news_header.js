import React,{Component} from 'react';
import {Link} from 'react-router';
import {
    Row,
    Col,
    Menu,
    Icon,
    Button,
    Modal,
    Tabs,
    Form,
    Input,
    Checkbox,
    message
} from 'antd';
import axios from 'axios';


import logo from '../../img/logo.png'

const MenuItem = Menu.Item;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item

class NewsHeader extends Component{
    constructor(props){
        super(props);
        this.state = {
            username:null,
            selectKey:'top',
            modalShow:false
        }
    }
    //读取浏览器本地缓存
    componentDidMount(){
        const username = localStorage.getItem('username');
        if(username){
            this.setState({username});
        }
    }
    //点击导航选中
    MenuHandleClick = (ev)=>{
        this.setState({
            selectKey:ev.key
        })
        if(ev.key==='regist'){
            this.setState({
                modalShow:true
            })
        }
    }
    //点击对话框关闭
    ModalHandleClick = ()=>{
        this.setState({
            modalShow:false
        })
    }
    //提交登录注册
    handleSubmit = (isRegist)=>{
        //alert(isRegist)
        let url = "http://newsapi.gugujiankong.com/Handler.ashx?";
        const action = isRegist?"register":"login";
        url += `action=${action}`;

        const formData = this.props.form.getFieldsValue()
        if(isRegist){
            //注册
            //action=register&r_userName=abc&r_password=123123&r_confirmPassword=123123
            const {r_userName,r_password,r_confirm_password} = formData;
            url += `&r_userName=${r_userName}&r_password=${r_password}&r_confirmPassword=${r_confirm_password}`;
        }else {
            //登录
            //&username=zxfjd3g&password=123123
            const {userName , password} = formData;
            url += `&username=${userName}&password=${password}`
        }

        //发送ajax请求
        axios.get(url)
            .then(response=>{
                const result = response.data;
                if(isRegist){
                    //注册
                    if(result){
                        //成功
                        message.success('注册成功');
                    }else {
                        //失败
                        message.error('注册失败');
                    }
                }else {
                    //登陆
                    if(result){
                        message.success('登录成功');
                        const username = result.NickUserName;
                        const UserId = result.UserId;
                        this.setState({username});
                        localStorage.setItem('username',username);
                        localStorage.setItem('userid',UserId);
                    }else {
                        message.error('登录失败，请重新登录！');
                    }
                }
            })

        //清空输入框
        this.props.form.resetFields();
        //更新关闭对话框
        this.setState({
            modalShow:false
        });
    }
    //登出操作
    logout = ()=>{
        localStorage.removeItem('username');
        localStorage.removeItem('userid');
        this.setState({username: null});
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        let {selectKey,username,modalShow} = this.state;
        let userInfo = username
                    ?(
                        <MenuItem key="logout" className="regist">
                            <Button type="primary">{username}</Button>&nbsp;&nbsp;
                            <a href="#/usercenter" style={{display:'inline-block'}}><Button type="dashed">个人中心</Button></a>&nbsp;&nbsp;
                            <Button onClick={this.logout}>退出</Button>
                        </MenuItem>
                    )
                    :(
                        <MenuItem key="regist" className="regist">
                            <Icon type="appstore-o"/>登陆/注册
                        </MenuItem>
                    )
        return (
            <div>
                <header>
                    <Row>
                        <Col span={1}></Col>
                        <Col span={3}>
                            <Link to="/" className="logo">
                                <img src={logo} alt="logo"/>
                                <span>NewsReact</span>
                            </Link>
                        </Col>
                        <Col span={19}>
                            <Menu onClick={this.MenuHandleClick} mode="horizontal" selectedKeys={[selectKey]}>
                                <MenuItem key="top">
                                    <Icon type="appstore-o"/>头条
                                </MenuItem>
                                <MenuItem key="shehui">
                                    <Icon type="appstore-o"/>社会
                                </MenuItem>
                                <MenuItem key="guonei">
                                    <Icon type="appstore-o"/>国内
                                </MenuItem>
                                <MenuItem key="guoji">
                                    <Icon type="appstore-o"/>国际
                                </MenuItem>
                                <MenuItem key="yule">
                                    <Icon type="appstore-o"/>娱乐
                                </MenuItem>
                                <MenuItem key="tiyu">
                                    <Icon type="appstore-o"/>体育
                                </MenuItem>
                                <MenuItem key="keji">
                                    <Icon type="appstore-o"/>科技
                                </MenuItem>
                                <MenuItem key="shishang">
                                    <Icon type="appstore-o"/>时尚
                                </MenuItem>
                                {userInfo}
                            </Menu>
                            <Modal visible={modalShow} footer={null} onCancel={this.ModalHandleClick}>
                                <Tabs type="card">
                                    <TabPane tab="登录" key="1">
                                        <Form onSubmit={this.handleSubmit.bind(this,false)}>
                                            <FormItem label="用户名">
                                                {getFieldDecorator('userName')(
                                                    <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名" />
                                                )}
                                            </FormItem>
                                            <FormItem label="密码">
                                                {getFieldDecorator('password')(
                                                    <Input type="password" prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="请输入密码" />
                                                )}
                                            </FormItem>
                                            <FormItem>
                                                <Button type="primary" htmlType="submit" className="login-form-button">
                                                    登录
                                                </Button>
                                            </FormItem>
                                        </Form>
                                    </TabPane>
                                    <TabPane tab="注册" key="2">
                                        <Form onSubmit={this.handleSubmit.bind(this,true)}>
                                            <FormItem label="用户名">
                                                {getFieldDecorator('r_userName')(
                                                    <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名" />
                                                )}
                                            </FormItem>
                                            <FormItem label="密码">
                                                {getFieldDecorator('r_password')(
                                                    <Input type="password" prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="请输入密码" />
                                                )}
                                            </FormItem>
                                            <FormItem label="确认密码">
                                                {getFieldDecorator('r_confirm_password')(
                                                    <Input type="password" prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="请再次输入您的密码" />
                                                )}
                                            </FormItem>
                                            <FormItem>
                                                <Button type="primary" htmlType="submit">
                                                    注册
                                                </Button>
                                            </FormItem>
                                        </Form>
                                    </TabPane>
                                </Tabs>
                            </Modal>
                        </Col>
                        <Col span={1}></Col>

                    </Row>
                </header>
            </div>
        )
    }
}

export default Form.create()(NewsHeader);
