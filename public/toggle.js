gsap.utils.toArray('.page1-content').forEach(title=>{
    gsap.fromTo(title, {
        letterSpacing: '10px',
        opacity:0,
        x: -300,
        // skewX: -65
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

gsap.to('.page1-content', {
    scrollTrigger: {
      trigger: '.page2-content',
      start: 'top center',
      onEnter: () => {
        gsap.utils.toArray('.page1-content').forEach(title => {
          gsap.fromTo(
            title,
            {
              letterSpacing: '10px',
              opacity: 0,
              x: -300,
              // skewX: -65
            },
            {
              letterSpacing: '0',
              opacity: 1,
              x: 0,
              skewX: 0,
              duration: 1,
              delay: 0.5
            }
          );
        });
      }
    }
  });

gsap.utils.toArray('.make').forEach(title=>{
  gsap.fromTo(title, {
      letterSpacing: '10px',
      opacity:0,
      x: -300,
      // skewX: -65
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

gsap.to('.make', {
  scrollTrigger: {
    trigger: '.team',
    start: 'top center',
    onEnter: () => {
      gsap.utils.toArray('.make').forEach(title => {
        gsap.fromTo(
          title,
          {
            letterSpacing: '10px',
            opacity: 0,
            x: -300,
            // skewX: -65
          },
          {
            letterSpacing: '0',
            opacity: 1,
            x: 0,
            skewX: 0,
            duration: 1,
            delay: 0.5
          }
        );
      });
    }
  }
});

gsap.utils.toArray('.page3-content').forEach(title=>{
  gsap.fromTo(title, {
      letterSpacing: '10px',
      opacity:0,
      x: 300,
      // skewX: -65
  },{
      letterSpacing:'0',
      opacity:1,
      x:0,
      skewX:0,
      duration:1,
      delay: 0.5,
      ease: 'power4.out',
      scrollTrigger: title
  })
});

gsap.to('.page3-content', {
  scrollTrigger: {
    trigger: '.team',
    start: 'top center',
    onEnter: () => {
      gsap.utils.toArray('.page3-content').forEach(title => {
        gsap.fromTo(
          title,
          {
            letterSpacing: '10px',
            opacity: 0,
            x: 300,
            // skewX: -65
          },
          {
            letterSpacing: '0',
            opacity: 1,
            x: 0,
            skewX: 0,
            duration: 1,
            delay: 0.5,
            ease: 'power4.out',
            scrollTrigger: title
          }
        );
      });
    }
  }
});