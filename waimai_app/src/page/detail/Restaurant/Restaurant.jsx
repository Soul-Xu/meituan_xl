import './Restaurant.scss'
import React from 'react';

import { connect } from 'react-redux';
import { getRestaurantData } from '../actions/restaurantAction'

class Restaurant extends React.Component {
  constructor(props) {
    super(props)
    this.props.dispatch(getRestaurantData())
  }

  renderPayType(types) {
    let array = types || [];
    return array.map((item, index) => {
      return (<p key={index} className="restaurant-pay-type res-section"><img className="icon" src={item.icon_url}/>{item.info}</p>)
    })
  }

  render() {
    let data = this.props.resData;
    return (
      <div className="restaurant-content">
        <div className="restaurant-basic">
          <p className="restaurant-tel res-section">{data.call_center}</p>
          <p className="restaurant-addr res-section">
            <div className="addr-wrap">
              <div className="addr-name">商家地址: </div>
              <p className="addr-text">{data.address}</p>
            </div>
          </p>
        </div>
        <div className="restaurant-basic">
          <p className="restaurant-send-time res-section">配送时间: {data.shipping_time}</p>
          <p className="restaurant-send-type res-section">配送服务: {data.delivery_type === 1 ? <span><span className="meituan-send">美团专送</span>提供高质量配送服务</span> : '商家配送'}</p>
        </div>
        <div className="restaurant-basic">
          {this.renderPayType(data.discounts2)}
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    resData: state.restaurantReducer.resData
  })
)(Restaurant);