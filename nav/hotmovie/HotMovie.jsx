import React, { Component } from 'react'
import { Tabs, Button } from 'antd-mobile'
import { api_searchMovieList, SERVER_IP } from '../../../apis/apis'

const tabs = [
    { title: '正在热映' },
    { title: '即将上映' }
];

export default class HotMovie extends Component {
    state = {
        hotlist: [], //热映数据
        movielist: []//待映数据
    }


    async componentDidMount() {
        let res = await api_searchMovieList({ state: 1 })
        this.setState({
            hotlist: res.data.data
        })
        console.log(res.data.data)
    }

    render() {
        return (
                <Tabs
                    tabs={tabs}
                    initialPage={0}
                    tabBarInactiveTextColor='#B2B2B2'
                    tabBarActiveTextColor='#FF2E62'
                    tabBarUnderlineStyle={{ borderColor: '#FF2E62' }}
                    onChange={this.changeTab.bind(this)}
                >
                    <div style={{ backgroundColor: '#FFF' }}>
                        {
                            this.state.hotlist.map(obj => <div key={obj.id}>
                                <img onClick={this.clickMovie.bind(this, obj.id)} style={{width: 150}} src={SERVER_IP + obj.image} />
                                <label>{obj.name}</label>
                                <Button size='small' inline style={{backgroundColor: '#FF2E62', color: '#FFF'}}>购票</Button>
                            </div>)
                        }
                    </div>
                    <div style={{ backgroundColor: '#FFF' }}>
                        {
                            this.state.movielist.map(obj => <div key={obj.id}>
                                <img style={{width: 150}} src={SERVER_IP + obj.image} />
                                <label>{obj.name}</label>
                            </div>)
                        }
                    </div>
                </Tabs>
        )
    }

    async changeTab(tab, index) {
        if (index == 1) {
            if(this.state.movielist.length >0) return

            let res = await api_searchMovieList({ state: 2 })
            this.setState({
                movielist: res.data.data
            })
            console.log('发送请求')
        }
    }


    clickMovie(movieid){
        sessionStorage.movieid = movieid
        window.location.href = '/#/movieinfo'
    }
}
