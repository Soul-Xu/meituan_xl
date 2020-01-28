import './ListItem.scss';
import React from 'react';

/**
 * @constructor <ListItem />
 * @description 附近商家列表
 */

class ListItem extends React.Component {
  constructor(props) {
    super(props)
  }
  /**
   * 渲染是否是新到和品牌标签
   * @param {*} data/
  */
  renderBrand(data) {
    if (data.brand_type) {
      return <div className="brand brand-pin">品牌</div>
    } else {
      return <div className="brand brand-xin">品牌</div>
    }
  }

  /**
   * 渲染5颗星得分方法
   * @param {*} data
  */
  renderScore(data) {
    let wm_poi_score = data.wm_poi_score || ''

    let score = wm_poi_score.toString();

    let scoreArr = score.split('.');

    // 满星个数
    let fullstar = parseInt(scoreArr[0]);
    
    // 半星个数
    let halfstar = parseInt(scoreArr[1]) >= 5 ? 1 : 0;

    // 0星个数
    let nullstar = 5 - fullstar - halfstar
  
    // let starjsx = [<div key="xx">{score}</div>]
    let starjsx = []

    // 渲染出满星的jsx
    for (let i = 0; i < fullstar; i++) {
      starjsx.push(<div key={i + 'full'} className="star fullstar"></div>)
    }

    // 渲染出半星的jsx
    if (halfstar) {
      for (let j = 0; j < halfstar; j++) {
        starjsx.push(<div key={j + 'half'} className="star halfstar"></div>)
      }
    }

    // 渲染出0星的jsx
    if (nullstar) {
      for (let k = 0; k < nullstar; k++) {
        starjsx.push(<div key={k + 'null'} className="star nullstar"></div>)
      }
    }

    return starjsx;
  }

  /**
   * 渲染月售数量
   * @param {*} data
  */
  renderMounthNum(data) {
    let num = data.month_sale_num
    
    // 月售超过999, 采用999+
    if (num > 999) {
      return '999+'
    }
    return num
  }

  /**
   * 是否需要渲染美团专送tag
   * @param {*} data
  */
  renderMeituanFlag(data) {
    if (data.delivery_type) {
      return <div className="item-meituan-flag">美团专送</div>
    }

    return null
  }

  /**
   * 渲染商家活动
    * @param {*} data 
   */
  renderOthers(data) {
    let array = data.discounts2
    return array.map((item, index) => {
      return (
        <div key={index} className="other-info">
          <img src={item.icon_url} className="other-tag" />
          <div className="other-content">{item.info}</div>
        </div>
      )
    })
  }

  render() {
    let data = this.props.itemData
    return (
      <div className="r-item-content scale-1px">
        <img className="item-img" src={data.pic_url} />
        {this.renderBrand(data)}
        <div className="item-info-content">
          <p className="item-title">{data.name}</p>
          <div className="item-desc clearfix">
            <div className="item-score">{this.renderScore(data)}</div>
            <div className="item-count">月售{this.renderMounthNum(data)}</div>
            <div className="item-distance">&nbsp;{data.distance}</div>
            <div className="item-time">{data.mt_delivery_time}&nbsp;|</div>
          </div>
          <div className="item-price">
            <div className="item-pre-price">{data.min_price_tip}</div>
            {this.renderMeituanFlag(data)}
          </div>
          <div className="item-others">
            {this.renderOthers(data)}
          </div>
        </div>
      </div>
    )
  }
}

export default ListItem;