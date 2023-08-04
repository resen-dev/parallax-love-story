const h1Element = document.getElementById("f1");
const luaElement = document.getElementById("lua");

const img1Element = document.getElementById("img1");
const img2Element = document.getElementById("img2");
const img3Element = document.getElementById("img3");

let fontSize = 0;
let opacity = 1;
let maxOpacity = 1;
let lastTouchY;

let changeOpacity
let changeSize

let changeLuaOpacity
let changeLuaSize 

let changeImg1Opacity
let changeImg1Size 

let luaOpacity = 0
let img1Opacity = 0
let img2Opacity = 0
let img3Opacity = 0

let lua = false
let img1 = false
let img2 = false
let img3 = false

let lock = false

function increaseFontSizeOnWheel(event) {

    let delta = 0

    if(luaOpacity < 0){
        luaOpacity = 0
    }
    
    if(img1Opacity < 0){
        img1Opacity = 0
    }
    
    if(img2Opacity < 0){
        img2Opacity = 0
    }
    
    if(img3Opacity < 0){
        img3Opacity = 0
    }

    if(event.type === "touchmove"){
        const touchY = event.touches[0].clientY;

        changeOpacity = 0.08
        changeSize = 15

        changeLuaOpacity = 0.02

        changeImg1Opacity = 0.09

        changeImg2Opacity = 0.09
        
        changeImg3Opacity = 0.08
        
        if (touchY > lastTouchY) {
            delta = -1
        } else if (touchY < lastTouchY) {
            delta = 1
        }
        lastTouchY = touchY;
    }else{

        changeOpacity = 0.2
        changeSize = 4
        
        changeLuaOpacity = 0.2
        changeLuaSize = 4

        changeImg1Opacity = 0.2
        changeImg1Size = 4

        changeImg2Opacity = 0.2
        changeImg2Size = 4

        changeImg3Opacity = 0.2
        changeImg3Size = 4
        
        delta = Math.sign(event.deltaY);
    }
    console.log("2")

    if(lock == true && delta == -1){
        lock = false
    }

    if(lock == false){

        if (opacity == maxOpacity) {
            if (delta > 0) {
                fontSize += changeSize;
            } else if (delta < 0) {
                fontSize -= changeSize;
                if (fontSize < 0) {
                    fontSize = 0;
                }
            }
        }

        const maxFontSizeVW = 6;
        const viewportWidth = window.innerWidth;
        const maxFontSizePixels = (maxFontSizeVW * viewportWidth) / 100;
        fontSize = Math.min(fontSize, maxFontSizePixels);

        if (fontSize >= maxFontSizePixels) {
            if (delta > 0) {
                opacity -= changeOpacity;
                h1Element.style.opacity = opacity;

            } else if (delta < 0) {
                opacity += changeOpacity;
                h1Element.style.opacity = opacity;
            }
            if(opacity > 1){
                opacity = 1
            }
            if(opacity < -0.1){
                lua = true
            }
        }

        if(lua == true){
            
            if(luaElement.style.opacity <= 0){
                lua = false
                luaElement.style.opacity = 0
            }

            if (delta > 0) {
                luaOpacity += changeLuaOpacity;
                luaElement.style.opacity = luaOpacity;
            } else if (delta < 0) {
                luaOpacity -= changeLuaOpacity;
                luaElement.style.opacity = luaOpacity;
            }

            if(luaElement.style.opacity >= 0.2){
                img3 = true
            }

        }

        if(img1 == true){

            if(img1Element.style.opacity <= 0){
                img1 = false
                img1Element.style.opacity = 0
            }

            if (delta > 0) {
                img1Opacity += changeImg1Opacity;
                img1Element.style.opacity = img1Opacity;
            } else if (delta < 0) {
                img1Opacity -= changeImg1Opacity;
                img1Element.style.opacity = img1Opacity;
            }

            if(luaElement.style.opacity >= 1.2){
                lock = true
            }

        }

        if(img2 == true){

            if(img2Element.style.opacity <= 0){
                img2 = false
                img2Element.style.opacity = 0
            }

            if (delta > 0) {
                img2Opacity += changeImg2Opacity;
                img2Element.style.opacity = img2Opacity;
            } else if (delta < 0) {
                img2Opacity -= changeImg2Opacity;
                img2Element.style.opacity = img2Opacity;
            }

            if(img2Element.style.opacity >= 0.2){
                img1 = true
            }

        }

        if(img3 == true){

            if(img3Element.style.opacity <= 0){
                img3 = false
                img3Element.style.opacity = 0
            }

            if (delta > 0) {
                img3Opacity += changeImg3Opacity;
                img3Element.style.opacity = img3Opacity;
            } else if (delta < 0) {
                img3Opacity -= changeImg3Opacity;
                img3Element.style.opacity = img3Opacity;
            }

            if(img3Element.style.opacity >= 0.2){
                img2 = true
            }

        }

        h1Element.style.fontSize = fontSize + "px";

    }

}

document.addEventListener("wheel", increaseFontSizeOnWheel);
document.addEventListener("touchmove", increaseFontSizeOnWheel);
