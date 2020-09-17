import React, { Component } from 'react'
import myjson from '../../json/citys.json'
import BScroll from 'better-scroll'
import './selectcity.scss'
console.log(myjson)

export default class SelectCity extends Component {

    componentDidMount() {
        this.leftbox = new BScroll('#selectcity_left_box')
    }

    render() {
        return (
            <div className='selectcity-container'>
                <div id='selectcity_left_box' className='selectcity-box'>
                    <div>
                        {/* 渲染热门城市 */}
                        <div className='title'>热门城市</div>
                        <ul>
                            {
                                myjson.hotcity.map(name => <li key={name} className='child'>{name}</li>)
                            }
                        </ul>

                        {/* 渲染所有城市列表 */}
                        {
                            this.getcitys()
                        }
                    </div>
                </div>

                {/* 右侧的ABC选择条 */}
                <div className='selectcity-right-box'>
                    {
                        this.getcitysname()
                    }
                </div>
            </div>
        )
    }

    getcitys() {
        let arr = []

        for (let key in myjson.allcity) {
            // console.log(myjson.allcity[key])
            arr.push(
                <div id={key} key={key}>
                    {/* //标题 */}
                    <div className='title'>{key}</div>
                    {/* //对应的儿子城市 */}
                    <ul>
                        {
                            myjson.allcity[key].map((childname, i) => <li key={childname + i} className='child'>{childname}</li>)
                        }
                    </ul>
                </div>
            )
        }

        return arr
    }


    //获取所有城市ABC拼音
    getcitysname() {
        let arr = []
        for (let key in myjson.allcity) {
            arr.push(<p onClick={this.clickCityName.bind(this, key)} key={'right_' + key}>{key}</p>)
        }
        return arr
    }

    //点击城市ABC名字
    clickCityName(key){
        this.leftbox.scrollToElement('#' + key, 600)
    }

}
