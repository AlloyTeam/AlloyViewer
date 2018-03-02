/**********************************************************************************************
 *  This component is designed for Tribe Project in QQ mobile as a Imageviewer
 *  You can use it as a independent component in your App
 *
 *  @ examples  you can find examples in folder examples or README.md
 *
 *  @ param(array)       imagelist: The list of images to view
 *  @ param(bool)        disablePinch: Disable pinch function
 *  @ param(bool)        disableRotate: Disable rotate function
 *  @ param(bool)        disableDoubleTap: Disable double tap function
 *  @ param(function)    longTap: Events called after the long tap
 *  @ param(function)    close: the function to close the viewer
 *
 *  Copyright by nemoliao( liaozksysu@gmail.com), nemo is a member of AlloyTeam in Tencent.
 *
 **********************************************************************************************/
// const AlloyFinger = require('./libs/alloyfinger.js');
// const Transform = require('./libs/transform.js');

const MARGIN = 30

class ImageView {
    
    constructor(opt) {
        this.opt = opt || {};
        this.imagelist = opt.imagelist;
        this.arrLength = opt.imagelist.length;
        this.gap = opt.gap || MARGIN;
        this.current = opt.current || 0;
        this.disablePageNum = false;
        this.desc = '';
        this.maxScale = 2 || opt.maxScale;
        this.onOrientationChange = this.onOrientationChange.bind(this);
        this.close = opt.close;
        this.initScale = 1;
        this.screenWidth = window.innerWidth || window.screen.availWidth;
        this.screenHeight = window.innerHeight || window.screen.availHeight;

        this.container = null;
        this.list = null;
        this.ob = null;
        this.focused = null;

        this.initDOM();
    }

    initDOM() {
        this.dom = document.createDocumentFragment();
        this.list = document.createElement('ul');
        this.list.className = 'imagelist';

        new AlloyFinger(this.list, {
            singleTap: this.onSingleTap.bind(this),
            pressMove: this.onPressMove.bind(this),
            swipe: this.onSwipe.bind(this)
        });
        this.imagelist.forEach((ele, i) => {
            let li = document.createElement('li');
            li.className = 'imagelist-item';
            li.style.marginRight = this.gap + 'px';

            let centerImg = document.createElement('img');
            centerImg.id = `view${i}`;
            centerImg.className = 'imagelist-item-img';
            centerImg.src = ele;
            centerImg.onload = this.onImgLoad.bind(this);

            new AlloyFinger(centerImg, {
                pressMove: this.onPicPressMove.bind(this),
                multipointStart: this.onMultipointStart.bind(this),
                longTap: this.onLongTap.bind(this),
                pinch: this.onPinch.bind(this),
                rotate: this.onRotate.bind(this),
                multipointEnd: this.onMultipointEnd.bind(this),
                doubleTap: this.onDoubleTap.bind(this)
            });

            li.appendChild(centerImg);

            this.list.appendChild(li);
        });
        this.dom.appendChild(this.list);

        // page number
        if(!this.opt.disablePageNum) {
            let pageNum = document.createElement('div');
            pageNum.className = 'page';
            pageNum.id = 'pageNum';
            pageNum.innerHTML = `${this.current + 1} / ${this.arrLength}`;
            this.dom.appendChild(pageNum);
        }
    }
    
    onOrientationChange(){
        // 方向改变后新的innerHeight生效需要delay
        setTimeout(()=>{
            this.screenWidth = window.innerWidth || window.screen.availWidth;
            this.screenHeight = window.innerHeight ||  window.screen.availHeight;
            this.changeIndex(this.current)
        }, 100)
    }

    show() {
        if(this.isRendered){
            this.container.classList.remove('hide');
            this.container.style.display = 'block';
        }else {
            this.container = document.createElement('div');
            this.container.id = 'imageview';
            this.container.className = 'imageview';

            this.container.appendChild(this.dom);
            document.body.appendChild(this.container);

            Transform(this.list);
            this.current && this.changeIndex(this.current, false);
            this.bindStyle(this.current);
            this.opt.initCallback && initCallback();

            this.isRendered = true;
        }
    }

    hide() {
        this.container.classList.add('hide');
        setTimeout(() => {
            this.container.style.display = 'none';
        }, 500);
    }

    onSingleTap(){
        this.opt.close && this.opt.close();
    }

    onPressMove(evt){
        const { current } = this;

        this.endAnimation();

        if( !this.focused ){
            if((current === 0 && evt.deltaX > 0) || (current === this.arrLength - 1 && evt.deltaX < 0)){
                this.list.translateX += evt.deltaX / 3;
            }else{
                this.list.translateX += evt.deltaX;
            }
        }

        evt.preventDefault();
    }

    onSwipe(evt){
        const { direction } = evt;

        let c = this.current;
        if( this.focused ){
            return false;
        }
        switch(direction) {
            case 'Left':
                c < this.arrLength-1 && ++c && this.bindStyle(c);
                break;
            case 'Right':
                c > 0 && c-- && this.bindStyle(c);
                break;
        }
        this.changeIndex(c)
    }

    onPicPressMove(evt) {
        const { deltaX, deltaY } = evt,
            isLongPic = this.ob.getAttribute('long'),
            { scaleX, width } = this.ob;

        if(this.ob.scaleX <= 1 || evt.touches.length > 1){
            return;
        }

        if(this.ob && this.checkBoundary(deltaX, deltaY)){
            !isLongPic && (this.ob.translateX += deltaX);
            this.ob.translateY += deltaY;
            
            if(isLongPic && scaleX * width === this.screenWidth){
                this.focused = false;
            }else{
                this.focused = true;    
            }
        }else {
            this.focused = false;
        }
        // console.log('translate ',this.ob.translateX, this.ob.translateY);
    }

    onMultipointStart(){
        this.initScale = this.ob.scaleX;
    }

    onPinch(evt){
        if( this.opt.disablePinch || this.ob.getAttribute('long')){
            return false;
        }
        this.ob.style.webkitTransition = 'cubic-bezier(.25,.01,.25,1)'

        const { originX, originY } = this.ob, 
            originX2 = evt.center.x - this.screenWidth/2 - document.body.scrollLeft,
            originY2 = evt.center.y - this.screenHeight/2 - document.body.scrollTop;

        this.ob.originX = originX2;
        this.ob.originY = originY2;
        this.ob.translateX = this.ob.translateX + (originX2 - originX) * this.ob.scaleX;
        this.ob.translateY = this.ob.translateY + (originY2 - originY) * this.ob.scaleY;

        this.ob.scaleX = this.ob.scaleY = this.initScale * evt.scale;
    }

    onRotate(evt){
        if( !this.opt.enableRotate || this.ob.getAttribute('rate') >= 3.5){
            return false;
        }
        
        this.ob.style.webkitTransition = 'cubic-bezier(.25,.01,.25,1)'

        this.ob.rotateZ += evt.angle;
    }

    onLongTap(){
        this.opt.longTap && this.opt.longTap();
    }

    onMultipointEnd(evt){
        // translate to normal
        this.changeIndex(this.current);

        if(!this.ob){
            return;
        }

        this.ob.style.webkitTransition = '300ms ease';

        const { maxScale } = this,
            isLongPic = this.ob.getAttribute('long');
        // scale to normal
        if (this.ob.scaleX < 1) {
            this.restore(false);
        }
        if (this.ob.scaleX > maxScale && !isLongPic){
            this.setScale(maxScale);
        }

        // rotate to normal
        let rotation = this.ob.rotateZ % 360,
            rate = this.ob.getAttribute('rate');

        if(rotation < 0){
            rotation = 360 + rotation;
        }
        this.ob.rotateZ = rotation;

        if (rotation > 0 && rotation < 45) {
            this.ob.rotateZ = 0;
        } else if (rotation >= 315) {
            this.ob.rotateZ = 360;
        } else if (rotation >= 45 && rotation < 135) {
            this.ob.rotateZ = 90;
            this.setScale(rate);
        } else if (rotation >= 135 && rotation < 225) {
            this.ob.rotateZ = 180;
        } else if (rotation >= 225 && rotation < 315) {
            this.ob.rotateZ = 270;
            this.setScale(rate);
        }
    }

    onDoubleTap(evt){
        if( this.opt.disableDoubleTap ){
            return false;
        }

        const { origin } = evt,
            originX = origin[0] - this.screenWidth/2 - document.body.scrollLeft,
            originY = origin[1] - this.screenHeight/2 - document.body.scrollTop,
            isLongPic = this.ob.getAttribute('long');

        if(this.ob.scaleX === 1){
            !isLongPic && (this.ob.translateX = this.ob.originX = originX);
            !isLongPic && (this.ob.translateY = this.ob.originY = originY);
            this.setScale(isLongPic ? this.screenWidth / this.ob.width : this.maxScale);
        }else{
            this.ob.translateX = this.ob.originX;
            this.ob.translateY = this.ob.originY;
            this.setScale(1);
        }   
    
        // console.log('origin',this.ob.originX, this.ob.originY);
    }

    bindStyle(current) {
        this.current = current;
        this.ob && this.restore();
        this.ob = document.getElementById(`view${current}`);
        if(this.ob && !this.ob.scaleX){ 
            Transform(this.ob)
        }
        // ease hide page number
        const page = document.getElementById('pageNum');
        if(page){
            page.classList.remove('hide');
            setTimeout(()=>{
                page.classList.add('hide');
            }, 2000);
        }
    }

    changeIndex(current, ease=true) {
        ease && (this.list.style.webkitTransition = '300ms ease');
        this.list.translateX = -current*(this.screenWidth + this.gap);

        this.opt.changeIndex && this.opt.changeIndex(current);

        // change page number
        document.getElementById('pageNum').innerHTML = `${this.current + 1} / ${this.arrLength}`;
    }

    setScale(size) {
        this.ob.style.webkitTransition = '300ms ease-in-out';
        this.ob.scaleX = this.ob.scaleY = size;
    }

    restore(rotate=true) {
        this.ob.translateX = this.ob.translateY = 0;
        !!rotate && (this.ob.rotateZ = 0);
        this.ob.scaleX = this.ob.scaleY = 1;
        this.ob.originX = this.ob.originY = 0;
    }

    endAnimation() {
        this.list.style.webkitTransition = '0';
        this.ob && this.ob.style && (this.ob.style.webkitTransition = '0');
    }

    checkBoundary(deltaX = 0, deltaY = 0) {
        // console.log(this.ob.width, this.ob.height);
        const { scaleX, translateX, translateY, originX, originY, width, height } = this.ob,
            rate = this.ob.getAttribute('rate');

        if(scaleX !== 1 || scaleX !== rate){
            // include long picture
            const rangeLeft = (scaleX - 1) * (width / 2 + originX) + originX,
                rangeRight = -(scaleX - 1) * (width / 2 - originX) + originX,
                rangeUp = (scaleX - 1) * (height / 2 + originY) + originY,
                rangeDown = -(scaleX - 1) * (height / 2 - originY) + originY;

            // console.log(rangeLeft, rangeRight, rangeUp, rangeDown);

            if(translateX + deltaX <= rangeLeft
                && translateX + deltaX >= rangeRight
                && translateY + deltaY <= rangeUp
                && translateY + deltaY >= rangeDown ) {
                return true;
            }
        }
        return false;
    }

    onImgLoad(e) {
        const target = e.target,
            h = target.naturalHeight,
            w = target.naturalWidth,
            r = h / w,
            height = window.innerHeight || window.screen.availHeight,
            width = window.innerWidth || window.screen.availWidth,
            rate = height / width;

        let imgStyle = {};

        if(r >= 3.5){
            target.setAttribute('long', true);
        }

        if(r > rate){
            imgStyle.height = height + "px";
            imgStyle.width = w * height / h + "px";
            imgStyle.left = width / 2 - (w * height / h) / 2 + "px";
        }else if( r < rate){
            imgStyle.width = width + "px";
            imgStyle.height = h * width / w + "px";
            imgStyle.top = height / 2 - (h * width / w) / 2 + "px"
        } else {
            imgStyle.width = width;
            imgStyle.height = height;
        }

        target.setAttribute('style', `width:${imgStyle.width}; height:${imgStyle.height}; left:${imgStyle.left}; top:${imgStyle.top};`);
        target.setAttribute('rate', 1/r);
    }
}