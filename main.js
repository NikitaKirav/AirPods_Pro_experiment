// Background animation
const html = document.documentElement;
let canvas = [];
let context = [];
let scrollPosition = 0;
let saveIndex = 0;
let activeCanvas = 0;
let speed = 4;
let scrollStep = 0;
let frameIndex = 0;

const img = new Image();

const updateImage = (indexCanvas, indexFrame) => {
    const frameCount = getFrameCounts();
    const currentFrame = getCurrentFrame(); 
    img.src = currentFrame[indexCanvas](Math.min(frameCount[indexCanvas]-1, indexFrame));
    context[indexCanvas].drawImage(img, 0, 0);
    for (let i = 0; i < currentFrame.length; i++) {
        if (indexCanvas === i) {
            canvas[i].style.opacity = 1;
        } else {
            canvas[i].style.opacity = 0;
        }
    }
}

const getFrameIndex = () => {
    const rules = getRules();
    let onloadFrameIndex = 0;
    let tempFrameIndex = 0;
    let maxFrame = 0;
    for (let i = 0; i < rules.length; i++) {
        const j = i > 0 ? 1 : 0;
        maxFrame = maxFrame + Math.floor((rules[i].maxFrame + j - rules[i].minFrame) / rules[i].speed);
        if (scrollStep > maxFrame) {
            const frames = Math.floor((rules[i].maxFrame + j - rules[i].minFrame) / rules[i].speed);
            onloadFrameIndex = onloadFrameIndex + rules[i].maxFrame - rules[i].minFrame;     
            tempFrameIndex = tempFrameIndex + frames;  
        } else {
            const currentFrame = getCurrentFrame(); 
            onloadFrameIndex = onloadFrameIndex + Math.floor((scrollStep - tempFrameIndex)*rules[i].speed);
            activeCanvas = rules[i].activeCanvas;
            frameIndex = onloadFrameIndex;
            img.src = currentFrame[activeCanvas](rules[i].indexFrame(frameIndex));
            break;
        }
    }
}

window.addEventListener('scroll', () => {
    const scrollSteps = getScrollSteps();
    const rules = getRules();
    const scrollTop = html.scrollTop;
    const maxScrollTop = html.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop; // Last number is speed factor 
    scrollStep = Math.min(scrollSteps - 1, Math.floor(scrollFraction * scrollSteps));

    getFrameIndex();

    canvas1ScrollTransform(scrollStep, scrollTop);

    for (let i = 0; i < rules.length; i++) {
        if (frameIndex >= rules[i].minFrame && frameIndex <= rules[i].maxFrame) {
            requestAnimationFrame(() => updateImage(rules[i].activeCanvas, rules[i].indexFrame(frameIndex)));
            break;
        }
    }

    showStickyBlock(50, 140, scrollStep);

    saveIndex = scrollStep;
    scrollPosition = scrollTop;
});

const preloadImages = () => {
    const frameCount = getFrameCounts();
    const currentFrame = getCurrentFrame(); 
    for (let j = 0; j < frameCount.length; j++) {
        for (let i = 1; i < frameCount[j]; i++) {
            const img = new Image();
            img.src = currentFrame[j](i);
        }
    }
};
// End (Background animation)


// Sticky navigation menu
const observer = new IntersectionObserver( 
  ([e]) => e.target.classList.toggle('isSticky', e.intersectionRatio < 1),
  {threshold: [1]}
);
// End (Sticky navigation menu)


(function loadAllSettings() {
    const canvas_context = getCanvasContext();
    canvas = canvas_context.canvas;
    context = canvas_context.context;
    const scrollSteps = getScrollSteps();
    const scrollFraction = html.scrollTop / (html.scrollHeight - window.innerHeight); 
    scrollStep = Math.min(scrollSteps - 1, Math.floor(scrollFraction * scrollSteps));
    
    getFrameIndex();
    img.onload = function() {
        context[activeCanvas].drawImage(img, 0, 0);
    }
    preloadImages();
    observer.observe(document.querySelector('.sticky'));
})();
