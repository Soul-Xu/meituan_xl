import './Main.scss'
import React from 'react';

import { connect } from 'react-redux';
import { Route, withRouter, NavLink } from 'react-router-dom'

import NavHeader from 'component/NavHeader/NavHeader';
import Menu from '../Menu/Menu'
import Comment from '../Comment/Comment'
import Restaurant from '../Restaurant/Restaurant'

class Main extends React.Component {
  constructor(props) {
    super(props)
  }

  changeTab(item) {
    console.log(item)
  }

  renderTabs() {
    let tabs = this.props.tabs;
    return tabs.map((item) => {
      return (
        <NavLink 
          replace={true} 
          to={'/' + item.key} 
          key={item.name} 
          className="tab-item"
          activeClassName="active"
          onClick={() => this.changeTab(item)}>
          {item.name}
        </NavLink>
      )
    })
  }

  render() {
    return (
      <div className="detail">
          <NavHeader title="详情" />
          <div className="tab-bar">
            {this.renderTabs()}
          </div>
          <Route exact path="/menu" component={Menu} />
          <Route path="/comment" component={Comment} />
          <Route path="/restaurant" component={Restaurant} />
          {this.props.showChooseContent ? <div className="mask"></div> : null}
      </div>
    )
  }
}

export default withRouter(connect(
  state => ({
    tabs: state.tabReducer.tabs,
    showChooseContent: state.menuReducer.showChooseContent
  })
)(Main));