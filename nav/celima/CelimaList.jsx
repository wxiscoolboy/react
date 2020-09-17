import React, { Component } from 'react'
import { api_celimaList } from '../../../apis/apis'
import './celima.scss'

export default class Celima extends Component {
    state = {
        cityname: '定位中',
        celimalist: []  //所有影院信息
    }


    componentDidMount() {
        // //初始化地图
        // this.map = new window.AMap.Map("mymap", {
        //     resizeEnable: true, //地图能否改变大小
        //     center: [116.397428, 39.90923],
        //     zoom: 13    //缩放层级
        // });


        this.getCityName()  //初始化获取城市信息

        api_celimaList().then(res => {
            console.log(res)

            this.setState({
                celimalist: res.data.data
            })
        })

    }

    //     address: "成华区建设北路3段6号龙湖三千集购物中心5号楼"
    // cid: 1
    // name: "UME影城(成都成华店)"
    // price: 28.9
    // type: "3D 观影小食 DMAX 可停车"

    render() {
        let { cityname, celimalist } = this.state

        return (
            <div className='c_container'>
                {/* <textarea></textarea>影院列表 */}
                <div>{cityname}▼</div>

                {/* 1. 给一个地图容器 */}
                {/* <div id='mymap' style={{ width: 300, height: 300 }}></div> */}


                {
                    celimalist.map(data => <div onClick={this.clickCelima.bind(this, data)} style={{marginBottom: 30}} key={data.name}>
                        <h2>{data.name}</h2>
                        <p>{data.address}</p>
                        <p style={{color: '#ccc'}}>{data.type}</p>
                    </div>)
                }


            </div>
        )
    }

    //点击影院，跳转到对应影院排片
    clickCelima(data){
        //把当前点击的影院数据存起来
        sessionStorage.celimadata =  JSON.stringify(data)

        console.log(sessionStorage.celimadata)
        window.location.href = '/#/celima'
    }

    //获取用户所在城市信息
    getCityName() {
        let _this = this

        //实例化城市查询类
        var citysearch = new window.AMap.CitySearch();
        //自动获取用户IP，返回当前城市
        citysearch.getLocalCity(function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
                if (result && result.city && result.bounds) {
                    var cityinfo = result.city;
                    var citybounds = result.bounds;

                    _this.setState({
                        cityname: cityinfo
                    })
                    // console.log(cityinfo)

                    // //地图显示当前城市
                    // _this.map.setBounds(citybounds);
                }
            } else {
                console.log(result.info);
            }
        });
    }
}
