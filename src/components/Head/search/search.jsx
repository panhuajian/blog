import './search.scss'
import _ from 'lodash'
import axios from '@/axios'
import presets from '@/utils/presets'
import React, { Component } from 'react'
import { Popover, Tag, Input, Icon } from 'antd'
import { Motion, TransitionMotion, spring } from 'react-motion'
import { Link } from 'react-router-dom'
import utils, { compose, map, localData, slice } from '@/utils'

const Search = Input.Search

export default class SearchBox extends Component {
    constructor() {
        super()
        this.state = {
            isFocus: false,
            visible: false,
            type: false,
            searchTag: [],
            tagSetp: 11,//每个tag栏显示数量
            rotateDeg: 0,//圈圈
            searchIndx: 0,//当前搜索索引
            searchHistory: []
        }
    }
    focusHandler() {
        this.setState({
            isFocus: true
        })
    }
    blurHandler() {
        let { isFocus } = this.state
        if (!isFocus) return
        this.setState({
            isFocus: false
        })
    }
    // 查询时候设置本地存储
    searchHandle(value) {
        if (_.isEmpty(value) || this.state.searchHistory.includes(value)) return
        let data = this.state.searchHistory.concat([value])
        localData.setLocalData("search-history", data)
        this.setState({
            searchHistory: data
        })
    }
    handleClickeChange = (value) => {
        const mounted = this.refs.searchInput.input.input.getAttribute("data-mounted")
        if (Number(mounted) !== 1) {
            this.refs.searchInput.input.input.setAttribute("data-mounted", 1)
            axios.axiosPost(utils.requestAddr.trendingSearch, '', res => {
                this.setState({
                    searchTag: res.data.data,
                    visible: true
                })
            })
        }
        value = (this.state.searchHistory.length > 0 || this.state.searchTag.length > 0) && value
        this.setState({
            visible: value
        })

    }
    handleClickeRemove(e, item) {
        e.preventDefault()
        let nArr = this.state.searchHistory.filter(x => x !== item)
        localData.setLocalData("search-history", nArr)//改变内存
        this.setState({
            searchHistory: nArr
        })
    }
    handleRefresTag() {
        let { searchIndx, searchTag, rotateDeg, tagSetp } = this.state;
        searchIndx = (searchIndx + tagSetp) > searchTag.length ? 0 : (searchIndx + tagSetp);
        this.setState({
            rotateDeg: (rotateDeg + 360),
            searchIndx: searchIndx
        })
    }
    componentDidMount() {
        let data = localData.getLocalData("search-history");
        !_.isEmpty(data) && this.setState({ searchHistory: data.split(",") })
    }
    willLeave() {
        return {
            height: spring(0),
            opacity: spring(0)
        };
    }
    getDefaultStyles() {
        // debugger;
        return this.state.searchHistory.map((item) => (
            {
                key: item,
                style: {
                    height: 0,
                    opacity: 1,
                }
            }
        ))
    }
    getstyles() {
        return this.state.searchHistory.map((item) => (
            {
                key: item,
                style: {
                    height: spring(40, presets.gentle),
                    opacity: spring(1, presets.gentle),
                }
            }
        ))
    }
    render() {
        const { isFocus, searchTag, searchHistory, visible, searchIndx, tagSetp, rotateDeg } = this.state
        const tagItem = (item, i) => <Tag key={i}>{item}</Tag>
        const liItem = ({ style, key }) => <li key={key} style={style}><Link to={{ pathname: `search`, search: `q=${encodeURI(key)}` }}><Icon type="clock-circle" /><span>{key}</span><Icon onClick={(e) => this.handleClickeRemove(e, key)} type="close" className="closed" /></Link></li>
        const content = (
            <div className="search-tip-box" style={{ width: 240 }}>
                {searchTag.length > 0 &&
                    <section className="search-trending">
                        <header className="search-trending-header clearfix">
                            <h2>热门搜索</h2>
                            <a onClick={this.handleRefresTag.bind(this)}>
                                <Motion style={{ x: spring(rotateDeg) }}>
                                    {interpolatingStyle => {
                                        return (
                                            <i style={{ transform: `rotate(${interpolatingStyle.x}deg)` }} className="iconfont icon-shuaxin" ></i>
                                        )
                                    }}
                                </Motion>
                                换一批
                            </a>
                        </header>
                        <ol className="search-trending-tag-wrap">
                            {compose(map(tagItem), slice([searchIndx, searchIndx + tagSetp]))(searchTag)}
                        </ol>
                    </section>
                }
                {searchHistory.length > 0 && <div className="search-recent">

                    <TransitionMotion
                        willLeave={this.willLeave}
                        defaultStyles={this.getDefaultStyles()}
                        styles={this.getstyles()}>
                        {interpolatedStyles =>
                            <ul className="search-recent-item-wrap">
                                {interpolatedStyles.map(liItem)}
                            </ul>}
                    </TransitionMotion>

                </div>}
            </div>
        )
        return (
            <Popover content={content} placement="bottomLeft" trigger="click" onVisibleChange={this.handleClickeChange} visible={visible}>
                <Search ref="searchInput" className={!isFocus ? 'input_search' : 'input_search input_search_focused'} onSearch={this.searchHandle.bind(this)} onFocus={this.focusHandler.bind(this)} onBlur={this.blurHandler.bind(this)} placeholder="搜索" />
            </Popover>
        )
    }
}