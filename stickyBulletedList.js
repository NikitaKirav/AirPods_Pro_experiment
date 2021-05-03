let stickyBlockElements = undefined;
let isStickyBlock = false;

const observerBlock = new IntersectionObserver( 
    ([e]) => { 
        isStickyBlock = e.intersectionRatio >= 1 ? true : false;
        stickyBlockElements = e.target.children;
    },
    {threshold: [1]}
  );
observerBlock.observe(document.querySelector('.stickyBlock'));

let opacity = 0;
let stickyBlockActiveNumber = 0;

const showStickyBlock = (minFrame, maxFrame, frameIndex) => {
    if(isStickyBlock && frameIndex > minFrame && frameIndex < maxFrame) {        
        const distanceBF = (maxFrame - minFrame) / stickyBlockElements.length; // distance between frames

        for(let i = 0; i < stickyBlockElements.length; i++) {
            if ((frameIndex < distanceBF*(i+1)+minFrame)&&(frameIndex > minFrame + distanceBF*i)) {
                if (stickyBlockActiveNumber !== i) { opacity = 0; }
                const opacityIndex = (frameIndex - minFrame - distanceBF*i)*2/distanceBF;
                opacity = Math.abs(opacityIndex < 1 ? opacityIndex : 2 - opacityIndex);

                stickyBlockActiveNumber = i;
                stickyBlockElements[i].classList.toggle('active', true);
                stickyBlockElements[i].style.opacity=opacity;
                stickyBlockElements[i].style.transform = `matrix(1, 0, 0, 1, 0, ${0.5*(-opacityIndex*100 + 50)})`;
            } else {
                stickyBlockElements[i].classList.toggle('active', false); 
            }
        }
    } else if(stickyBlockElements) {
        stickyBlockElements[stickyBlockActiveNumber].classList.toggle('active', false);
        opacity = 0;
    }
}