import './Scrollview.scss'
import React from 'react'
import Loading from '../Loading/Loading'

/**
 * <ScrollView />
 * @description 滚动加载组件
 */

class ScrollView extends React.Component {
  onLoadPage() {
    let clientHeight = document.documentElement.clientHeight
    let scrollHeight = document.body.scrollHeight
    let scrollTop = document.documentElement.scrollTop
  
    // 定义阈值
    let proLoadDis = 30;

    // 视窗底部距离可视区域还有30px的时候，就进行触发

    if (scrollTop + clientHeight >= (scrollHeight - proLoadDis)) {
      if (!this.props.isend) {
        this.props.loadCallback && this.props.loadCallback()
      }
    }
  }

  // componentWillMount会报错
  // 可以使用UNSAFE_componentWillMount()代替
  // 也可以尝试使用getDeriveStateFromProps

  UNSAFE_componentWillMount() {
    console.log('UNSAFE_componentWillMount')
    window.addEventListener('scroll', this.onLoadPage.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onLoadPage.bind(this))
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

export default ScrollView