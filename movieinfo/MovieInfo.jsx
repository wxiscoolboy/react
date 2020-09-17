import React, { Component } from 'react'
import { api_getmovieinfo } from '../../apis/apis'

export default class MovieInfo extends Component {
    state = {
        data: {}
    }

    componentDidMount() {
        // console.log(sessionStorage.movieid)

        api_getmovieinfo({ movieid: sessionStorage.movieid }).then(res => {
            this.setState({
                data: res.data.data
            })
            
            this.refs.myvideo.play()
        })
    }

    render() {
        let {data} = this.state
        return (
            <div>
                <video ref='myvideo' style={{width: '100%'} } controls src={data.video}></video>
            </div>
        )
    }
}
