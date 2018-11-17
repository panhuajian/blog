import React, { Component } from 'react'
import { Popover, Tag, Input } from 'antd'
import './search.scss'
import axios from '@/axios'
import { getLocalData, setLocalData } from '@/utils'
import _ from 'lodash'

const Search = Input.Search

export default class SearchBox extends Component {
    constructor() {
        super()
        this.state = {
            isFocus: false,
            visible: false,
            searchTag: [],
            searchHistory: []
        }
    }
    focusHandler() {
        let type = this.state.searchTag.length > 0 || this.state.searchHistory.length > 0
        this.setState({
            isFocus: true,
            visible: type
        })
    }
    blurHandler() {
        let { isFocus, visible } = this.state
        if (!isFocus && !visible) return
        this.setState({
            isFocus: false,
            visible: false
        })
    }
    // 查询时候设置本地存储
    searchHandle(value) {
        if (_.isEmpty(value)) return
        let data = this.state.searchHistory
        data.push(value)
        setLocalData("search-history", data).__value()
        this.setState({
            searchHistory: data
        })
    }
    async getSearchTag() {

    }
    componentDidMount() {
        let localData = getLocalData("search-history").__value();
        console.log(localData)
        this.setState({
            searchHistory: _.isEmpty(localData) ? [] : localData.split(",")
        })
    }
    render() {
        const { isFocus, searchTag, searchHistory, visible } = this.state
        const content = (
            <div className="search-tip-box" style={{ width: 250 }}>
                {searchTag.length > 0 &&
                    <div className="search-trending">
                        <div className="search-trending-header clearfix">
                            <span>热门搜索</span>
                            <a><i className="iconfont icon-shuaxin" style={{ transform: "rotate(0deg)" }}></i>换一批</a>
                        </div>
                        {searchTag.map((item, i) => { return (<Tag key={i}>{item}</Tag>) })}
                    </div>
                }
                <div className="search-recent">
                    {searchHistory && <ul>
                        {searchHistory.map((item, key) => {
                            return (
                                <li key={key}>{item}</li>
                            )
                        })}
                    </ul>}
                </div>
            </div>
        )
        return (
            <Popover content={content} placement="bottomLeft" trigger="click" visible={visible} >
                <Search className={!isFocus ? 'input_search' : 'input_search input_search_focused'} onSearch={this.searchHandle.bind(this)} onFocus={this.focusHandler.bind(this)} onBlur={this.blurHandler.bind(this)} placeholder="搜索" />
            </Popover>
        )
    }
}