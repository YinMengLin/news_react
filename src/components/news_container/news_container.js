/*定义主体默认组件*/
import React,{Component} from 'react';
import {Link} from 'react-router';
import {
    Row,
    Col,
    Carousel,
    Tabs,

} from 'antd';

import NewsBlock from '../news_block/news_block'
import NewsProducts from '../news_products/news_products'
import NewsImgBlock from '../news_img_block/news_img_block'

import carousel_1 from '../../img/carousel_1.jpg';
import carousel_2 from '../../img/carousel_2.jpg';
import carousel_3 from '../../img/carousel_3.jpg';
import carousel_4 from '../../img/carousel_4.jpg';

const TabPane = Tabs.TabPane;

export default class NewsContainer extends Component{
    render(){
        return (
            <div className="container">
                <Row>
                    <Col span={1}></Col>
                    <Col span={22}>
                        <div className="leftContainer" style={{width: "35%"}}>
                            <Carousel autoplay>
                                <div>
                                    <img src={carousel_1}/>
                                </div>
                                <div>
                                    <img src={carousel_2}/>
                                </div>
                                <div>
                                    <img src={carousel_3}/>
                                </div>
                                <div>
                                    <img src={carousel_4}/>
                                </div>
                            </Carousel>
                            <NewsImgBlock  type="guoji" count={6} cardTitle="国际新闻"
                                           cardWidth="400px" imageWidth="112px" />
                        </div>
                        <Tabs className='tabs_news' style={{width: "35%"}}>
                            <TabPane tab="头条新闻" key="1">
                                <NewsBlock type="top" count={20}></NewsBlock>
                            </TabPane>
                            <TabPane tab="国内新闻" key="2">
                                <NewsBlock type="guonei" count={20}></NewsBlock>
                            </TabPane>
                        </Tabs>
                        <Tabs>
                            <TabPane tab="NewsReact产品" key="1">
                                <NewsProducts />
                            </TabPane>
                        </Tabs>

                        <NewsImgBlock  type="keji" count={8} cardTitle="科技新闻"
                                       cardWidth="100%" imageWidth="132px" />
                        <NewsImgBlock  type="yule" count={16} cardTitle="娱乐新闻"
                                       cardWidth="100%" imageWidth="132px" />
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
        )
    }
}