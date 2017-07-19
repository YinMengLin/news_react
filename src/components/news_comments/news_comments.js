import React,{Component} from 'react';
import {Form, Card, Input, Button, notification} from 'antd';
import axios from 'axios';

const FormItem = Form.Item

class NewsComments extends Component{
    constructor(props){
        super(props);
        this.state = {
            comments:[]
        }
    }

    componentDidMount(){
        this.getComments()
    }

    getComments = ()=>{
        const {uniqueKey} = this.props;
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${uniqueKey}`
        axios.get(url)
            .then(response => {
                const comments = response.data;
                this.setState({comments});
            })
    }

    submitComment = () => {
        const userid = localStorage.getItem('userid');
        if(!userid){
            alert("请先登录!");
            return;
        }
        const {uniqueKey} = this.props;
        const {content} = this.props.form.getFieldsValue();
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userid}&uniquekey=${uniqueKey}&commnet=${content}`
        axios.get(url)
            .then(response => {
                notification.success({
                    message: '提交成功!',
                    description: ''
                })
                //更新评论列表
                this.getComments();
            })
    }

    collectArticle = () => {
        const userid = localStorage.getItem('userid');
        if(!userid){
            alert("请先登录!");
            return;
        }
        const {uniqueKey} = this.props;
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userid}&uniquekey=${uniqueKey}`;
        axios.get(url)
            .then(response => {
                const resule = response.data;
                notification.success({
                    message: 'NewsReact提醒',
                    description: '收藏成功'
                })
            })


    }

    render(){
        const {comments} = this.state;
        const commengList = comments.length
            ?comments.map((comment,index) => {
                const username = comment.UserName;
                const dateTime = comment.datetime;
                const content = comment.Comments;
                return (
                    <Card key={index} title={username} extra={`发布于${dateTime}`}>
                        <p>{content}</p>
                    </Card>
                )

            })
            :'暂时没有任何评论'

        const {getFieldDecorator} = this.props.form;
        return (
            <div style={{padding: '10px'}}>
                {commengList}
                <Form onSubmit={this.submitComment}>
                    <FormItem label="您的评论">
                        {
                            getFieldDecorator('content')(
                                <Input type="textarea" placeholder="随便写点什么"/>
                            )
                        }
                    </FormItem>
                    <Button type="primary" htmlType="submit">提交评论</Button>&nbsp;&nbsp;&nbsp;
                    <Button type="primary" onClick={this.collectArticle}>收藏该文章</Button>
                </Form>
            </div>
        )
    }
}

export default Form.create()(NewsComments);