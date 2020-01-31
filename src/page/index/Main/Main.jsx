import React from 'react';

import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom'
import Loadable from 'react-loadable'
import Loading from './Loading'
import BottomBar from '../BottomBar/BottomBar'
import Home from '../Home/Home'

const Order = Loadable({
  loader: () => import(/* webpackChunkName: 'order'*/'../Order/Order'),
  loading: Loading
})

const My = Loadable({
  loader: () => import(/* webpackChunkName: 'my'*/'../My/My'),
  loading: Loading
})

class Main extends React.Component {
  constructor(props) {
    super(props)
  }

  // loadMy(location, cb) {
  //   // 懒加载处理
  //   // 注意注释的使用
  //   import(/* webpackChunkName: 'my'*/ '../My/My').then((component) => {
  //     cb(null, component.default);
  //   })
  // }

  render() {
    return (
      <div>
        <Route exact path="/home" component={Home} />
        <Route path="/order" component={Order} />
        <Route path="/my" component={My} />
        <BottomBar />
      </div>
    )
  }
}

export default withRouter(connect(
)(Main));