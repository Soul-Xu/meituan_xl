import './Header.scss'
import React from 'react';
import SearchBar from '../SearchBar/SearchBar.jsx'

/**
 * @constructor <Header />
 * @description 顶部banner
 */

class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="header">
        <SearchBar />
        <img className="banner-img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579535711919&di=bff0f9a72279c73da2da6b000075ed57&imgtype=0&src=http%3A%2F%2Fimg0.pconline.com.cn%2Fpconline%2F1708%2F08%2F9741783_201707281705397633650_thumb.jpg"/>
      </div>
    )
  }
}

export default Header;