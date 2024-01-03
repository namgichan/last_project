
window.addEventListener("load", function(){

  // // 최초에 한 번 fetchData 함수를 호출
  // fetchData();

  // // 주기적으로 fetchData 함수를 호출하는 코드
  // setInterval(fetchData, 2000); // 2초마다 데이터 요청

})

document.getElementById("capture").addEventListener("click", function() {

  if(Number.isNaN(currentWeightedMean)) {
    alert("NaN이라 촬영이 불가합니다. 중심을 잘 잡아주세요!")
    return
  } 

  if(currentWeightedMean < -0.1 || currentWeightedMean > 0.1 ) {
    alert("촬영이 불가합니다. 중심을 잘 잡아주세요!")
    return
  }

  const xhr = new XMLHttpRequest()
  xhr.open("get", "http://localhost:8000/service_cap")
  xhr.addEventListener("load", function() {
    if(xhr.response == "true") {
      alert("캡처 완료")
    }else {
      
      alert("캡처 실패")
    }
  })
  xhr.send()
})

document.getElementById("start").addEventListener("click", function() {
  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load", function() {
    if (xhr.response === "true") {
      location.href = 'service'
    }else {
      alert("촬영을 먼저 진행하세요")
    }
  })
  xhr.open("get", "http://localhost:8000/service_start")
  xhr.send()
})




