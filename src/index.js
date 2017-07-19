/*入口*/
import React from 'react';
import {render} from 'react-dom';
import {Router , Route , hashHistory , IndexRoute} from 'react-router';
import MediaQuery from 'react-responsive';

//PC端组件
import App from './components/app/app';
import NewsContainer from './components/news_container/news_container';
import NewsDetail from './components/news_detail/news_detail';
import UserCenter from './components/user_center/user_center';

//移动端组件
import MediaApp from './components/app/MobileApp';
import MobileNewsDetail from './components/news_detail/MobileNewsDetail';
import MobileNewsContainer from './components/news_container/MobileNewsContainer';
import MobileUserCenter from './components/user_center/MobileUserCenter';

render((
    <div>
        <MediaQuery query='(min-device-width: 1224px)'>
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={NewsContainer}/>
                    <Route path="/detail/:uniqueKey" component={NewsDetail}></Route>
                    <Route path="/usercenter" component={UserCenter}></Route>
                </Route>
            </Router>
        </MediaQuery>

        <MediaQuery query='(max-device-width: 1224px)'>
            <Router history={hashHistory}>
                <Route path="/" component={MediaApp}>
                    <IndexRoute component={MobileNewsContainer}/>
                    <Route path='/detail/:uniquekey' component={MobileNewsDetail}></Route>
                    <Route path='/usercenter' component={MobileUserCenter}></Route>
                </Route>
            </Router>
        </MediaQuery>
    </div>

), document.getElementById('root'));



