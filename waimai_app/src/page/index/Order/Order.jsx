import './Order.scss'
import React from 'react';
import { connect } from 'react-redux'
import { getOrderData } from '../actions/orderAction.js'
import ListItem from './ListItem/ListItem'
import ScrollView from 'component/ScrollView/ScrollView.jsx'


/**
 * @constructor <Order />
 * @description 订单tab代码
 */

class Order extends React.Component {
  constructor(props) {
    super(props)

    // 标识分页
    this.page = 0

    // 是否还可以滚动加载
    this.state = {
      isend: false
    }

    this.fetchData(this.page)
  }

  // 为什么不在componentDidMount中请求fetchData
  // 1.fetchData是异步请求
  // 假如fetchData是同步请求，那么就存在一个问题
  // 当fetchData请求完之后，有可能去setState
  // setState的时候，我们的render流程可能还没有执行到, 就会报错
  // 但是现在已经知道fetchData是异步请求，一定程度上保证了setState的时候render肯定是执行过了的
  // 所以说在construct中执行fetchData
  // 2.尽量让fetchData提前，尽量让数据请求更早的触发，能更早的得到数据
  // 如果把fetchData放在componentDidMount中，componentDidMount肯定是在render之后的，
  // fetchData不管是同步还是异步都会保证不会出错，但是发动的时机就会慢些，需要等到render方法执行完之后才会触发
  // 假如在construct当中执行的方法有setState相关的操作
  // 如果它是同步的操作，一定不能放在construct中，如果它是异步的操作，可以放在construct中
  // 并且执行时机要优先于componentDidMount的时机
  // componentDidMount() {
  //   this.fetchData()
  // }

  loadPage() {
    this.page++
    if(this.page > 3) {
      this.setState({
        isend: true
      })
    } else {
      this.fetchData(this.page)
    }
  }

  fetchData(page) {
    this.props.dispatch(getOrderData(page))
  }

  renderList() {
    let list = this.props.list
    return list.map((item, index) => {
      return (
        <ListItem itemData={item} key={index}></ListItem>
      )
    })
  }

  render() {
    return (
      <div className="order">
        <div className="header">订单</div>
        <ScrollView loadCallback={this.loadPage.bind(this)} isend={this.state.isend}>
          <div className="order-list">{this.renderList()}</div>
        </ScrollView>
      </div>
    )
  }
}

export default connect(
  state => ({
    list: state.orderReducer.list
  })
)(Order);