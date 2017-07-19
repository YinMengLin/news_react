import React,{Component,PropTypes} from 'react';
import {
    Card
} from 'antd';
import axios from 'axios';
import {Link} from 'react-router';


export default class NewsImgBlock extends Component{
    static propTypes = {
        type: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        cardTitle: PropTypes.string.isRequired,
        cardWidth: PropTypes.string.isRequired,
        imageWidth: PropTypes.string.isRequired
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
        const {cardTitle,cardWidth,imageWidth} = this.props;
        // 定义图片的样式
        const imgStyles = {
            width: imageWidth,
            height: '90px',
            display: 'block'
        };
        // 定义标题的新式
        const titleStyles = {
            width: imageWidth,
            whiteSpace: "nowrap", // 不进行换行
            overflow: "hidden", // 超出部分自动隐藏
            textOverflow: "ellipsis" // 显示省略号
        };

        const newsList = newsArr.length
            ?newsArr.map((item,index) => {
                const {uniquekey, thumbnail_pic_s, title, author_name} = item
                return(
                    <div key={index} className="imageblock">
                        <Link to={`/detail/${uniquekey}`}>
                            <div>
                                <img src={thumbnail_pic_s} style={imgStyles}/>
                            </div>
                            <div className="custom-card">
                                <h3 style={titleStyles}>{title}</h3>
                                <p>{author_name}</p>
                            </div>
                        </Link>
                    </div>
                )
            })
            :"暂时没有任何新闻"


        return(
            <Card title={cardTitle} style={{width: cardWidth}} className="topNewsList">
                {newsList}
            </Card>
        )
    }
} 
