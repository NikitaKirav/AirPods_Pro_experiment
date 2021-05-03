// Transform canvas 1
let rtime;
let timeout = false;
const delta = 200;
window.addEventListener(`resize`, () => {
    rtime = new Date();
    if (timeout === false) {
        timeout = true;
        setTimeout(resizeend, delta);
    }
}, false);

const resizeend = () => {
    if (new Date() - rtime < delta) {
        setTimeout(resizeend, delta);
    } else {
        timeout = false;
        resizeCanvas1();
        resizeCanvas2();
    }               
}

let canvasTransform = 1;
let innerWidth = window.outerWidth-70;
let innerHeight = window.outerHeight-70;

const resizeCanvas1 = () => {   
    switch(true) {
        case innerWidth !== window.innerWidth:
            canvasTransform = canvasTransform - (innerWidth / innerHeight - window.innerWidth / window.innerHeight)/8;
            break;
        case innerHeight !== window.innerHeight: 
            canvasTransform = canvasTransform - (window.innerWidth / window.innerHeight - innerWidth / innerHeight)/8;
            break;
        default:
            break;
    }
    canvasTransform = canvasTransform > 1 ? 1 : canvasTransform;
    canvasTransform = canvasTransform < 0 ? 0 : canvasTransform;
    canvas[0].style.transform = `matrix(${canvasTransform}, 0, 0, ${canvasTransform}, 0, 0)`;
    innerWidth = window.innerWidth;
    innerHeight = window.innerHeight;
}
resizeCanvas1();
const canvas1ScrollTransform = (frameIndex, scrollTop) => {
    if (activeCanvas === 0) {
        const frameSize = Math.abs(frameIndex - saveIndex)/1000;
        if (scrollPosition > scrollTop) {
            canvasTransform = canvasTransform + frameSize;
        } else {
            canvasTransform = canvasTransform - frameSize;
        }
        canvasTransform = canvasTransform > 1 ? 1 : canvasTransform;
        canvasTransform = canvasTransform < 0 ? 0 : canvasTransform;
        canvas[0].style.transform = `matrix(${canvasTransform}, 0, 0, ${canvasTransform}, 0, 0)`;
    }
} 
// End (Transform canvas 1)

// Transform canvas 2

const resizeCanvas2 = () => { 
    let canvasTransform = 1;
    if (window.innerHeight > canvas[1].height) {
        canvasTransform = window.innerHeight/canvas[1].height;
        canvas[1].style.transform = `matrix(${window.innerHeight/canvas[1].height}, 0, 0, ${window.innerHeight/canvas[1].height}, 0, 0)`;
    }
    if (window.innerWidth > canvas[1].width * canvasTransform) {
        canvas[1].style.transform = `matrix(${window.innerWidth/canvas[1].width}, 0, 0, ${window.innerWidth/canvas[1].width}, 0, 0)`;
    }
}
resizeCanvas2();
// End (Transform canvas 2)