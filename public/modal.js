
var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("closeBtn")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if(event.target == modal) {
        modal.style.display = "none";
    }
}


// var btn = document.querySelectorAll("button.modal-custom-button");
// var modals = document.querySelectorAll('.modal-custom');
// var spans = document.getElementsByClassName("closeBtn");

// for (var i = 0; i < btn.length; i++) {
//     btn[i].onclick = function (e) {
//         e.preventDefault();
//         modal = document.querySelector(e.target.getAttribute("href"));
//         modal.style.display = "block";
//     }
    
//     spans[i].onclick = function () {
//         for (var index in modals) {
//             if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";
//         }
//     }
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//     if (event.target.classList.contains('modal-custom')) {
//         for (var index in modals) {
//             if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";
//         }
//     }
// }