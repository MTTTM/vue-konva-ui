const designWidth=667;
const designHeight=375;
export const sizeW = (s) => {
    var W = document.documentElement.clientWidth;
    var H = document.documentElement.clientHeight;
    return (designWidth/W)*s;
}
export const sizeH = (s) => {
    var H = document.documentElement.clientHeight;
    return (designHeight/H)*s;
}