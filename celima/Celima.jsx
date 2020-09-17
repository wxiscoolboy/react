import React, { Component } from 'react'
import { api_celimainfo, api_celimamovieinfo, SERVER_IP } from '../../apis/apis'
import { NoticeBar } from 'antd-mobile'

export default class Celima extends Component {
    state = {
        celimadata: {}, //当前影院的数据
        movielist: [],   //当前影院的排片
        moviedata: {},   //当前点击的电影信息

        movietimelist: []   //当前电影排片信息
    }

    componentDidMount() {
        let celimadata = JSON.parse(sessionStorage.celimadata)

        api_celimainfo({ cid: celimadata.cid }).then(res => {
            this.setState({
                movielist: res.data.data,
                celimadata,
                moviedata: res.data.data[0]
            })
        })
    }

    render() {
        let { celimadata, movielist, moviedata } = this.state
        return (
            <div style={{ backgroundColor: '#fff' }}>
                <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                    {celimadata.name + celimadata.address + celimadata.type}
                </NoticeBar>
                {/* 影院详情 */}
                <div style={{ marginBottom: 30 }}>
                    <h2>{celimadata.name}</h2>
                    <p>{celimadata.address}</p>
                    <p style={{ color: '#ccc' }}>{celimadata.type}</p>
                </div>




                {/* 横向排片 */}
                <div style={{ height: 200, backgroundColor: '#4D3F2C', display: 'flex', flexWrap: 'nowrap', overflow: 'scroll', alignItems: 'flex-end' }}>
                    {
                        movielist.map(data => <img
                            onClick={this.clickMovie.bind(this, data)}
                            style={{ height: moviedata.name == data.name ? 180 : 160, width: moviedata.name == data.name ? 120 : 100, marginRight: 20 }}
                            src={SERVER_IP + data.image} />)
                    }
                </div>

                <p>{moviedata.name + " 评分：" + moviedata.point}</p>
                <p>{moviedata.time + '分钟 ' + moviedata.type + ' ' + moviedata.actors}</p>
                {/* 选择时间 */}
            </div >
        )
    }
    /* actors: "辛鹏,黄觉"
director: "罗晋"
id: 2
image: "/movies/hjcs.png"
name: "灰烬重生"
point: "6.5"
time: 114
type: "剧情/犯罪" */
    //点击电影信息
    clickMovie(moviedata) {
        //发送请求
        api_celimamovieinfo({
            cid: this.state.celimadata.cid,
            mid: moviedata.id
        }).then(res => {
            
            this.setState({
                movietimelist: res.data.data
            })

            console.log(res.data.data)
        })


        this.setState({
            moviedata
        })
    }
}
