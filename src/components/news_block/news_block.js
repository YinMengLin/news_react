import React,{Component,PropTypes} from 'react';
import axios from 'axios';
import {Link} from 'react-router'
import {
    Card,
} from 'antd';

export default class NewsBlock extends Component{
    static propTypes = {
        type:PropTypes.string.isRequired,
        count:PropTypes.number.isRequired
    }
    constructor(props){
        super(props);
        this.state = {
            newsArr:[]
        }
    }
    componentDidMount(){
        //请求新闻列表
        const {type,count} = this.props;
        //http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=guoji&count=6
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
        //发送请求
        axios.get(url)
            .then(response=>{
                const result = response.data;
                this.setState({
                    newsArr:result
                })
            })
    }


    render(){
        const {newsArr} = this.state;
        const newsList = newsArr.length
            ?(
                <ul>
                    {
                        newsArr.map((item,index)=>{
                            return(
                                <li key={index}>
                                    <Link to={`/detail/${item.uniquekey}`}>{item.title}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            )
            :(
                '暂时没有任何新闻'
            )

        return(
            <Card className="topNewsList">
                {newsList}
            </Card>
        )
    }
} 
