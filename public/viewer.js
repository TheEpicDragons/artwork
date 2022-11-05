v=document.querySelector(".view")
i=document.querySelector(".view img")
Object.keys(document.getElementsByClassName('img')).forEach(e => {
    document.getElementsByClassName('img')[e].addEventListener('click', function (event) {
        v.style.display="flex"
        setTimeout(() => { 
            v.style.opacity="1"
            v.style.transition="all 0.2s ease"
        }, 100);
        document.querySelector(".view img").outerHTML=document.querySelectorAll('.img img')[e].outerHTML;
    });
});
function hide() {
    v.style.opacity="0"
    v.style.transition="all 0.2s ease"
    setTimeout(() => { 
        v.style.display="none"
        document.querySelector(".view img").outerHTML="<img>"
    }, 100);
}
v.addEventListener('click', function (event) {
    document.addEventListener('click', function(e) {
        e = e || window.event;
        var target = `${e.target}`
        if (target!=="[object HTMLImageElement]" ) {
            hide()
        }
    }, false);    
});
document.querySelector(".close").addEventListener('click', function(e) {
    hide()
})
