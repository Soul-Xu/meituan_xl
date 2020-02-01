import './Scrollview.scss'
import React from 'react'
import Loading from '../Loading/Loading'
import { connect } from 'react-redux';

/**
 * <ScrollView />
 * @description 滚动加载组件
 */

class ScrollView extends React.Component {
  constructor(props) {
    super(props);
    this._onLoadPage =  this.onLoadPage.bind(this)
  }
  onLoadPage() {
    let clientHeight = document.documentElement.clientHeight
    let scrollHeight = document.body.scrollHeight
    let scrollTop = document.documentElement.scrollTop
  
    // 定义阈值
    let proLoadDis = 30;

    // 视窗底部距离可视区域还有30px的时候，就进行触发

    if (scrollTop + clientHeight >= (scrollHeight - proLoadDis)) {
      if (!this.props.isend) {
        // 在触发第二次请求前去判断第一次请求是否结束
        if (!this.props.readyToLoad) {
           return;
        }
        this.props.loadCallback && this.props.loadCallback()
      }
    }
  }

  // componentWillMount会报错
  // 可以使用UNSAFE_componentWillMount()代替
  // 也可以尝试使用getDeriveStateFromProps

  UNSAFE_componentWillMount() {
    console.log('UNSAFE_componentWillMount')
    window.addEventListener('scroll', this._onLoadPage)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._onLoadPage)
  }

  render() {
    return (
      <div className="scrollview">
        {this.props.children}
        <Loading isend={this.props.isend} />
      </div>   
    )
  }

}

export default connect(
  state => ({
    readyToLoad: state.scrollViewReducer.readyToLoad
  })
)(ScrollView);