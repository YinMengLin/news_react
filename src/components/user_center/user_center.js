/*定义用户个人中心组件*/
import React,{Component} from 'react';
import {Tabs,Row,Col,Card,Upload,Icon,Modal} from 'antd';
import axios from 'axios';

const TabPane = Tabs.TabPane;

export default class UserCenter extends Component{
    constructor(props){
        super(props);
        this.state = {
            collections:[],
            comments:[],
            previewVisible: false,
            previewImage: '',
            fileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }],
        }
    }

    componentDidMount(){
        //用户收藏列表
        const userid = localStorage.getItem('userid');
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userid}`
        axios.get(url)
            .then(response => {
                const collections = response.data;
                this.setState({collections});
            })

        //用户评论列表
        url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userid}`
        axios.get(url)
            .then(response => {
                const comments = response.data;
                this.setState({comments});
            })

    }

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => this.setState({ fileList })


    render(){
        const {collections,comments,previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        )
        const collectionList = collections.length
            ?collections.map((collection , index) => {
                const {uniquekey, Title} = collection;
                return(
                    <Card key={index} title={uniquekey} extra={<a href={`#/detail/${uniquekey}`}>查看</a>}>
                        <p>{Title}</p>
                    </Card>
                )
            })
            :"用户没有收藏";

        const commentList = comments.length
            ?comments.map((comment , index) => {
                const {uniquekey, Comments, datetime} = comment;
                return(
                    <Card key={index} title={`于 ${datetime} 评论了文章 ${uniquekey}`} extra={<a href={`#/detail/${uniquekey}`}>查看</a>}>
                        <p>{Comments}</p>
                    </Card>
                )
            })
            :"用户没有收藏";

        return (
            <div>
                <Row>
                    <Col span={1}></Col>
                    <Col span={22}>
                        <Tabs>
                            <TabPane key="1" tab="我的收藏列表">
                                {collectionList}
                            </TabPane>
                            <TabPane key="2" tab="我的评论列表">
                                {commentList}
                            </TabPane>
                            <TabPane key="3" tab="我的头像">
                                <Upload
                                    action="http://jsonplaceholder.typicode.com/posts/"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange}
                                >
                                    {uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
        )
    }
}