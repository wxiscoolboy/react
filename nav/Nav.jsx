import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
import './nav.scss'

//引入二级页面
import HotMovie from './hotmovie/HotMovie.jsx'
import CelimaList from './celima/CelimaList.jsx'
import My from './my/My.jsx'

export default class Nav extends Component {

    state = {
        selectedTab: 0,
        list: [{ id: 0, icon: 'icon_main.png', sicon: 'icon_main_s.png', title: '热映', page: <HotMovie /> },
        { id: 1, icon: 'icon_celima.png', sicon: 'icon_celima_s.png', title: '影院', page: <CelimaList /> },
        { id: 2, icon: 'icon_my.png', sicon: 'icon_my_s.png', title: '我的', page: <My /> }]
    }

    render() {
        return (
            <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#FF2E62"
                    barTintColor="white"
                >
                    {

                        this.state.list.map(obj => <TabBar.Item
                            icon={{ uri: require('../../assets/imgs/' + obj.icon) }}
                            selectedIcon={{ uri: require('../../assets/imgs/' + obj.sicon) }}
                            title={obj.title}
                            key={obj.id}
                            selected={this.state.selectedTab === obj.id}
                            onPress={() => {
                                this.setState({
                                    selectedTab: obj.id,
                                });
                            }}
                        >
                            {obj.page}
                        </TabBar.Item>)
                    }

                </TabBar>
            </div>
        );
    }
    
}


// 1. 定义一个状态, 用来记录当前选中选项卡的索引或者名字
// 2. 点击某个选项卡时,把状态变为当前点击的索引或名字
// 3. 在每个选项卡中, 根据当前选中的索引来判断自己是否选中