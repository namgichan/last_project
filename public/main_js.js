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

    window.dispatchEvent(new Event("resize"));
})


$(function() {
	$('#fullPage').fullpage({
		//options here
		autoScrolling:true,
		scrollHorizontally: true,
        navigation: true,
        navigationPosition: 'right'
    });

	// //methods
	// $.fn.fullpage.setAllowScrolling(false);
});