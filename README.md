## 中文 | [English](#user-content-english--中文)

## React图片查看器
使用React打造的H5图片查看器

## 特性
* 各类手势快速响应
* 急速滑动翻页
* 支持双指缩放、旋转、双击放大
* 支持放大后局部拖拽、翻页
* 支持超长(纵向)拼接图查看
* 支持下载
* 图片懒加载、预加载

## 示例
您可以下载代码在examples文件夹中找到例子或者[在线示例](https://alloyteam.github.io/AlloyViewer/examples/)

## 使用方法

### 1、安装NPM依赖
`npm install react-imageview --save`

### 2、随意使用
```
// 例 1:

import React, { Component } from 'react'
import ImageView from 'react-imageview'

import 'react-imageview/dist/react-imageview.min.css'

class Main extends Component {
    state = {
        showViewer: false
    }
    render() {
        const imagelist = ['./1.png','./2.png','./3.png','./4.png']
        return (
            <div>
                {
                    !!this.state.showViewer && <ImageView imagelist={imagelist} close={this.close.bind(this)} />
                }
                <button onClick={e=>this.show()}>click me to show Alert</button>
            </div>
        )
    }
    show() {
        this.setState({ showViewer: true })
    }
    close() {
        this.setState({ showViewer: false})
    }
}

// 例 2（推荐使用）:

import { SingleImgView } from 'react-imageview'
import 'react-imageview/dist/react-imageview.min.css'

const imagelist = ['./1.png','./2.png','./3.png','./4.png']

// 仅创建一个ImageView实例
SingleImgView.show({ 
    imagelist, 
    close: () => { SingleImgView.hide() } 
});
```

## 配置说明
| 参数     | 类型     | 描述 | 必需 | 默认值 |
| :------------- | :------------- | :------------- | :------------- | :------------- |
| imagelist         | array      | 要预览的图片列表 | 是 | 无 |
| current         | number      | 当前展示的图片序号（从0开始） | 否 | 0 |
| close         | function      | 图片查看器关闭方法 | 是 | |
| gap         | number      | 轮播图间距 | 否 | 30 |
| maxScale         | number      | 最大缩放倍数 | 否 | 2 |
| disablePinch      | bool       | 禁用缩小放大 | 否 | false |
| enableRotate     | bool       | 启用旋转 | 否(默认关闭) | false |
| disableDoubleTap  | bool       | 禁用双击放大 | 否 | false |
| initCallback           | function   | 初始化后回调 | 否 | |
| longTap           | function   | 长按回调 | 否 | |
| changeIndex           | function   | 轮播后回调 | 否 | |



## English | [中文](#user-content-中文--english)

## react-imageview
Imageview component built with react

## Demo
You can download the code and find demo in folder which is named as examples or [demo online](https://alloyteam.github.io/AlloyViewer/examples/)

## Usage with React

### 1、Install the package
`npm install react-imageview --save`

### 2、Using as your need
```
// Example 1:

import React, { Component } from 'react'
import ImageView from 'react-imageview'

import 'react-imageview/dist/react-imageview.min.css'

class Main extends Component {
    state = {
        showViewer: false
    }
    render() {
        const imagelist = ['./1.png','./2.png','./3.png','./4.png']
        return (
            <div>
                {
                    !!this.state.showViewer && <ImageView imagelist={imagelist} close={this.close.bind(this)} />
                }
                <button onClick={e=>this.show()}>click me to show Alert</button>
            </div>
        )
    }
    show() {
        this.setState({ showViewer: true })
    }
    close() {
        this.setState({ showViewer: false})
    }
}

// Example 2（Recommended）:

import { SingleImgView } from 'react-imageview'
import 'react-imageview/dist/react-imageview.min.css'

// You can call SingleImgView.show anywhere and anytime, there will be only one View DOM node be added.

const imagelist = ['./1.png','./2.png','./3.png','./4.png']
SingleImgView.show({
    imagelist, 
    close: () => { SingleImgView.hide() } 
});
```

## Configuration
| Param     | Type     | Description | Required |
| :------------- | :------------- | :------------- | :------------- |
| imagelist         | array      | The list of images to view | Yes |
| current         | number      | The current image to first view | No |
| close         | function      | The method to close the viewer | Yes |
| disablePinch      | bool       | Disable pinch function | No |
| disableRotate     | bool       | Disable rotate function | No |
| disableDoubleTap  | bool       | Disable double tap function | No |
| longTap           | function   | Events called after the long tap | No |

## License
Copyright(c) 2016-2017 AlloyTeam. Licensed under MIT license.
