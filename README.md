# AlloyViewer
Imageviewer component built with react

## Demo
You can find demo in folder [example](https://github.com/Caesor/react-imageview/examples)

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
                    !!this.state.showViewer && <ImageView imagelist={imagelist} />
                }
                <button onClick={e=>this.show()}>click me to show Alert</button>
            </div>
        )
    }
    show() {
        this.setState({
            showViewer: true
        })
    }
}

// Example 2:

import { SingleImgView } from 'react-imageview'

// You can call SingleImgView.show anywhere and anytime, there will be only one View DOM node be added.

const imagelist = ['./1.png','./2.png','./3.png','./4.png']
SingleImgView.show({ imagelist });
```
## Configuration
| Param     | Type     | Description |
| :------------- | :------------- | :------------- |
| imagelist         | array      | The list of images to view |
| disablePinch      | bool       | Disable pinch function |
| disableRotate     | bool       | Disable rotate function |
| disableDoubleTap  | bool       | Disable double tap function |
| longTap           | function   | Events called after the long tap |

## License
Copyright(c) 2016-2017 AlloyTeam. Licensed under MIT license.
