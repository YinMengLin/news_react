import React,{Component} from 'react';


import MobileNewsHeader from '../news_header/MobileNewsHeader';
import NewsFooter from '../news_footer/NewsFooter';


//移动端样式
import '../../compontentCss/Mobile.css';


export default class MobileApp extends Component{
    render(){
        return (
            <div>
                <MobileNewsHeader />
                {this.props.children}
                <NewsFooter />
            </div>
        )
    }
}
