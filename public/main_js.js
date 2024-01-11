// 페이지 로드시 실행
document.addEventListener("DOMContentLoaded", function() {
    //윈도우 너비에 따라 함수 실행
    window.addEventListener("resize", function() {   
        //윈도우 너비
        var windowWidth = window.innerWidth;

        // .num-4 요소 선택
        var num4Element = document.querySelector(".num-4");

        // 768px 이하일 때
        if (windowWidth <= 768) {
            num4Element.style.display = "flex";
        } else {
            // 769 이상일 때
            num4Element.style.display = "none";
        }
    })
    // window.dispatchEvent(new Event("resize"));
})

// const sectionColors = ['#ff5733', '#3498db', '#2ecc71', '#e74c3c'];

$(function() {
	$('#fullPage').fullpage({
		//options here
		autoScrolling:true,
		scrollHorizontally: true,
        scrollingSpeed: 700,
        showActiveTooltip: true,
        navigation: true,
        navigationPosition: 'right',
        normalScrollElements: '.moremodal',
        responsiveWidth: 1200,

    });

    $('#btnGoTop').click(function () {
        //$.fn.fullpage.setScrollingSpeed(0); 효과를 없애고싶을때
        $.fn.fullpage.moveTo(1, 1); // 이동하고싶은 페이지
        //$.fn.fullpage.setScrollingSpeed(700); 효과를 없애고싶을때
    });

	// //methods
	$.fn.fullpage.setAllowScrolling(true);
});