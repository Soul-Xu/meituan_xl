import './ContentList.scss';
import React from 'react';
import { connect } from 'react-redux';
import ListItem from './ListItem/ListItem.jsx'
import Loading from 'component/Loading/Loading.jsx'
import { getListData } from '../../actions/contentListAction'

/**
 * @constructor <ContentList />
 * @description 附近商家列表
 */

class ContentList extends React.Component {
  constructor(props) {
    super(props)
    // 记录当前页码
    this.page = 0;

    // 请求第一页数据
    this.fetchData(this.page);
    
    // 标识页面是否可以滚动
    this.state = {
      isend: false
    };
  }

  onLoadPage() {
    let clientHeight = document.documentElement.clientHeight
    let scrollHeight = document.body.scrollHeight
    let scrollTop = document.documentElement.scrollTop
  
    // 定义阈值
    let proLoadDis = 30;

    // 视窗底部距离可视区域还有30px的时候，就进行触发

    if (scrollTop + clientHeight >= (scrollHeight - proLoadDis)) {
      // 此时页面已经滚动到了底部
      this.page++
      // 最多滚动3页，即3次 
      // 滚动超过3页，让它停止滚动
      if (this.page > 3) {
        this.setState({
          isend: true
        })
      } else {
        this.fetchData(this.page)
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

  fetchData(page) {
    this.props.dispatch(getListData(page))
  }

  renderItems() {
    let list = this.props.list
    return list.map((item, index) => {
      return <ListItem key={index} itemData={item}></ListItem>
    })
  }

  render() {
    return (
      <div className="list-content">
        <h4 className="list-title">
          <span className="title-line"></span>
          <span>附近商家</span>
          <span className="title-line"></span>
        </h4>
        {this.renderItems()}
        <Loading isend={this.state.isend} />
      </div>
    )
  }
}

export default connect(
  state => ({
    list: state.contentListReducer.list
  })
)(ContentList);