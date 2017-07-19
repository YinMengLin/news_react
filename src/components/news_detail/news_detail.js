/*定义新闻详情组件*/
import React,{Component} from 'react';
import {Row,Col,BackTop} from 'antd';
import axios from 'axios';

import NewsImgBlock from '../news_img_block/news_img_block';
import NewsComments from '../news_comments/news_comments';


export default class NewsDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            news:{}
        }
    }

    componentDidMount(){
       this.getNewsDetail(this.props);
    }

    componentWillReceiveProps (newProps){
        this.getNewsDetail(newProps);
    }

    getNewsDetail =(props)=>{
        const {uniqueKey} = props.params
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniqueKey}`
        axios.get(url)
            .then(response => {
                const news = response.data;
                this.setState({news});
            })
    }

    render(){
        const {pagecontent} = this.state.news;
        const {uniqueKey} = this.props.params;
        return (
            <div>
                <Row>
                    <Col span={1}></Col>
                    <Col span={16} className='container'>
                        <div dangerouslySetInnerHTML={{__html:pagecontent}}></div>
                        <hr/>
                        <NewsComments uniqueKey={uniqueKey}/>
                    </Col>
                    <Col span={6}>
                        <NewsImgBlock
                            type="top" count={20}
                            cardTitle="相关新闻" cardWidth="100%"
                            imageWidth="132px"/>
                    </Col>
                    <Col span={1}></Col>
                </Row>
                <BackTop></BackTop>
            </div>
        )
    }
}
