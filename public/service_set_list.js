function scrolldown(to, duration) {
    var to=document.getElementById(to);
    var to_position=to.getBoundingClientRect().top;
    var start_position=window.pageYOffset;
    var distance=to_position - start_position;
    var start = null;


    function step(timestap){
        var progress;
        if (start === null) start = timestap;
        progress = timestap - start;
        window.scrollTo(0, smooth(progress, start_position, distance, duration))
        
        if (progress < duration) {
            requestAnimationFrame(step);
        }
    }

    function smooth(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 *(t*(t-2) - 1) + b;
    };

  requestAnimationFrame(step);
}

document.getElementById("section1").addEventListener("click",() => {
    scrolldown('section2', 150);
});

document.getElementById("section2").addEventListener("click", ()=> {
    scrolldown('section1', 150);
});