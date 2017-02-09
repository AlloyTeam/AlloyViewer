## 中文 | [English](#user-content-english--中文)

## React图片查看器
使用React打造的图片查看器

## 示例
您可以在[这里](https://github.com/Caesor/react-imageview/examples)找到例子或者[在线示例](https://caesor.github.io/react-imageview/examples/)

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
| 参数     | 类型     | 描述 | 必需 |
| :------------- | :------------- | :------------- | :------------- |
| imagelist         | array      | 要预览的图片列表 | 是 |
| current         | number      | 当前展示的图片序号（从0开始） | 否(默认0) |
| close         | function      | 图片查看器关闭方法 | 是 |
| disablePinch      | bool       | 禁用缩小放大 | 否 |
| disableRotate     | bool       | 禁用旋转 | 否 |
| disableDoubleTap  | bool       | 禁用双击放大 | 否 |
| longTap           | function   | 长按回调 | 否 |


## English | [中文](#user-content-中文--english)

## react-imageview
Imageview component built with react

## Demo
You can find demo in [folder](https://github.com/Caesor/react-imageview/examples) or [demo online](https://caesor.github.io/react-imageview/examples/)

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
