var swiper = new Swiper(".swiper", {
    effect: "cube",
    grabCursor: true,
    loop: true,
    autoHeight: true,
    speed: 1000,
    cubeEffect: {
      shadow: false,
      slideShadows: false,
      shadowOffset: 10,
      shadowScale: 0.94,
    },
    autoplay: {
      delay: 1500,
      pauseOnMouseEnter: true,
    },
  });