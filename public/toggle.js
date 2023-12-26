var menuToggle = document.getElementById("menuToggle");
var menuBar = gsap.timeline();
 
menuBar.to('.bar-1', 0.5,{
    attr:{d: "M8,2 L2,8"},
    x: 1,
    ease : Power2.easeInOut 
}, 'start');
 
menuBar.to('.bar-2', 0.5, {
    autoAlpha : 0
}, 'start');

menuBar.to('.bar-3', 0.5, {
   attr: {d: "M8,8 L2,2"},
   x:1,
   ease: Power2.easeInOut
}, 'start');

menuBar.reverse();

var tl = gsap.timeline({ paused: true});

tl.to('.fullpage-menu', {
    duration: 0,
    display : "block",
    ease: "Expo.easeInOut"
});

tl.from('.menu-bg span', {
    duration: 1,
    x: "100%",
    stagger: 0.1,
    ease:  "Expo.easeInOut"
});

tl.from('.main-menu li a', {
    duration: 1.5,
    y: "100%",
    stagger: 0.1,
    ease:  "Expo.easeInOut"
}, "-=0.5");

tl.from('.main-menu li', {
    duration: 1.5,
    y: "100%",
    stagger: 0.1,
    ease:  "Expo.easeInOut"
}, "-=0.5");

menuToggle.addEventListener('click', function(){
    menuBar.reversed(!menuBar.reversed());
    tl.reversed(!tl.reversed());
});

// menuBar.reversed(true);


gsap.utils.toArray('.moveti').forEach(title=>{
    gsap.fromTo(title, {
        letterSpacing: '10px',
        opacity:0,
        x:300,
        skewX: 65
    },{
        letterSpacing:'0',
        opacity:1,
        x:0,
        skewX:0,
        duration:1,
        delay:.5,
        scrollTrigger: title
    })
});
