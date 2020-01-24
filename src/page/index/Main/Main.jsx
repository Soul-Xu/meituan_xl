import React from 'react';

import { connect } from 'react-redux';

import BottomBar from '../BottomBar/BottomBar.jsx'
// import Home from '../Home/Home.jsx'
import Order from '../Order/Order.jsx'

class Main extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    // <Home />
    return (
      <div>
        <Order />
        <BottomBar />
      </div>
    )
  }
}

export default connect(
)(Main);