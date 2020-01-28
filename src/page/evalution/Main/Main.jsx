import './Main.scss'
import React from 'react';

import NavHeader from 'component/NavHeader/NavHeader'

class Main extends React.Component {
  constructor(props) {
    super(props)

    // 最大输入字数为140
    this.maxCount = 140;

    this.state = {
      // 还剩多少字符可以输入
      count: this.maxCount,
      // 用户当前点击的号码
      startIndex: 0
    }
  }

  componentDidMount() {
    this.commentInput.addEventListener('compositionstart', ()=>{
      this.chineseInputing = true;
    });
    this.commentInput.addEventListener('compositionend', (e)=>{
      this.chineseInputing = false;
      this.onIuput(e.target.value);
    });
  }

  /**
   * 用户输入回调
   */
  onInput(value) {
    let num = value.length;
    if (!this.chineseInputing) {
      this.setState({
        count: this.maxCount - num
        });
      }
  }
  /**
   * 点击评价
   */
  doEva(i) {
    this.setState({
      startIndex: i + 1
    })
  }

  /**
   * 渲染评分用的星
   */
  renderStar() {
    let array = [];
    for (let i = 0; i < 5; i++) {
      let cls = i >= this.state.startIndex ? "star-item" : "star-item light";
      array.push(<div onClick={()=>this.doEva(i)} key={i} className={cls}></div>)
    }
    return array;
  }

  render() {
    return (
      <div className="content">
        <NavHeader title="评价"/>
        <div className="eva-content">
          <div className="star-area">
            {this.renderStar()}
          </div>
          <div className="comment">
            <textarea ref="commentInput" onChange={(e) => this.onInput(e.target.value)} maxLength="140" placeholder="亲，菜品的口味如何，商家的服务是否周到？" className="comment-input"></textarea>
            <span className="count">{this.state.count}</span>
          </div>
          <p className="one-line product-name">xxxxxxxxx</p>
        </div>
        <div className="submit">提交评价</div>
      </div>
    )
  }
}

export default Main;