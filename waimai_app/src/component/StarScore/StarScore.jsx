import './StarScore.scss';
import React from 'react';

/**
 * StarScore组件
 * @description <StarScore score={num} />
 */

class StarScore extends React.Component {
  constructor(props) {
    super(props)
  }

  /**
   * 渲染5颗星得分方法
   * @param {*} data
  */
  renderScore() {
    let wm_poi_score = this.props.score || ''

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

  render() {
    return (
      <div className="star-score">
        {this.renderScore()}
      </div> 
    )
  }
}

export default StarScore;