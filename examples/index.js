import React, { Component } from 'react'
import { render } from 'react-dom'
import { SingleImgView } from './src/index.js'
// import ImageView from 'react-imageview'

// import 'react-imageview/dist/react-imageview.css'
import Mlogger from '@tencent/mlogger'

class Main extends Component {
    constructor(){
        super();
        Mlogger.init({});
    }

    render() {
        let imagelist = [
            'https://gpic.qpic.cn/gbar_pic/2aqluyraXicEfqicaK3aV4iaib5icib78qF0eFxokIEKSewIg8hQW0kiavCQg/1000',
            'https://gpic.qpic.cn/gbar_pic/3MSgRdnPzZAQnkIModguuoU1PXSKZUup1B67V82b3KicfhjAVwh19BRFia4DgWfxgg/1000',
            'https://gpic.qpic.cn/gbar_pic/2aqluyraXicEfqicaK3aV4iazVolQTREmcvaEG92Hy9oibhyDJHNzu1s3w/1000',
            'https://gpic.qpic.cn/gbar_pic/emH5YQz0vOJ2E0L6ZljlcW9nFgQzMXtpN240iaeB7PFUhZSWvvpbtLA/1000',
            'https://gpic.qpic.cn/gbar_pic/hVlQlSGMCtYlKrqpM5xwdmJrbh4iaawOgY6lFT1eNWTib7qv2Z2QuJWXmchPUqBriay/1000',
            'https://gpic.qpic.cn/gbar_pic/lDVAjxOVicMnyU4OWLShicffM3TvZYFia4ywL0B5oC3BLPDCoIkgdkJLA/0',
            'https://gpic.qpic.cn/gbar_pic/2aqluyraXicEfqicaK3aV4ia3YQE3mKcibH02jibympJ4gzCUEjk2Iz5BwQ/1000',
            'https://gpic.qpic.cn/gbar_pic/rqlh3lfegUYAvWGGNA8wyC5kly2PwLzONQsSatcxicqJOw0gz9MGmZg/1000',
            'https://gpic.qpic.cn/gbar_pic/PR0vBBjLNC7PpwKQ5YmKjo9ricr8EqAZFQVzXJG96SKCr4hVoWiaT4OQ/0',
        ];

        return (
            <div>
                <h3 className="title">Click image to open the viewer.</h3>
                <ul className="gallery">
                { imagelist.map((item, i)=>{
                    return (<li key={i}><img className="pic" src={item} onClick={this.show.bind(this, imagelist, i)}/></li>)
                })}
                </ul>  
            </div>
        )
    }

    show(imagelist, current){
        SingleImgView.show({
            imagelist,
            current,
            close: ()=>{SingleImgView.hide()},
            disablePageNum: true,
            desc: '<div id="J_desc" style="position:absolute;bottom:0;left:0;right:0;">分的书法</div>'
        })
    }
}

render(
    <Main />,
    document.getElementById('app')
)
