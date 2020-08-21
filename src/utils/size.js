const designWidth=667;
const designHeight=375;
export const sizeW = (s) => {
    let cliWidth=document.documentElement.clientWidth;
    var W = cliWidth<designWidth?cliWidth:designWidth;
    var H = document.documentElement.clientHeight;
    return (W/designWidth)*s;
}
export const sizeH = (s) => {
    var H = document.documentElement.clientHeight;
    return (designHeight/H)*s;
}