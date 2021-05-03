// Here, you can add new links
const getCurrentFrame = () => {
    const currentFrame = [];    // URL picture
    currentFrame[0] = index => (
        `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index.toString().padStart(4, '0')}.jpg`
    );

    currentFrame[1] = index => (
        `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/02-head-bob-turn/${index.toString().padStart(4, '0')}.jpg`
    );
    return currentFrame;
}

// List of frames
const getRules = () => {
    return [
        {
            minFrame: 0,    // Start frame number
            maxFrame: 119,  // End frame number
            speed: 4,       // Frame switching speed 
            activeCanvas: 0,// Number of an active canvas element
            indexFrame: (frameIndex) => (frameIndex + 1)    // Frame number relative to the 'scrollSteps' variable
        },
        {
            minFrame: 120,
            maxFrame: 139,
            speed: 1,
            activeCanvas: 0,
            indexFrame: (frameIndex) => (frameIndex + 1)
        },
        // 83 frames show a frame 139
        {
            minFrame: 140,
            maxFrame: 223,
            speed: 1,
            activeCanvas: 0,
            indexFrame: (frameIndex) => (139)
        },
        {
            minFrame: 224,
            maxFrame: 230,
            speed: 1,
            activeCanvas: 0,
            indexFrame: (frameIndex) => (frameIndex + 1 - 83)
        },
        {
            minFrame: 231,
            maxFrame: 360,
            speed: 2.8,
            activeCanvas: 1,
            indexFrame: (frameIndex) => (frameIndex + 1 - 230)
        },
    ];
}

// List of Canvas elements names
const getCanvasElementName = () => {
    return ['.airpods-scrolling','.man-scrolling'];
}

// How many frames are there on each canvas
const getFrameCounts = () => {
    return [147, 131]; // Count frames in every context
}

// total number of scroll steps per page
const getScrollSteps = () => {
    return 188; //360
} 


const getCanvasContext = () => {
    const canvas = [];
    const context = [];

    for (let i = 0; i < getCurrentFrame().length; i++) {
        canvas[i] = document.querySelector(getCanvasElementName()[i]);
        context[i] = canvas[i].getContext('2d');
    }

    // Canvas size
    canvas[0].height = 770; 
    canvas[0].width = 1158; 

    canvas[1].height = 820; 
    canvas[1].width = 1458; 

    return { canvas, context };
}
