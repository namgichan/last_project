let currentWeightedMean = 1.0;


       
setInterval(fetchData, 2000);
fetchData()


function fetchData() {
  const xhr = new XMLHttpRequest()
  xhr.open("get", "/test_value")
  xhr.addEventListener("load", function(){

    const data = JSON.parse(xhr.response)
    displaySensorData(data)
    currentWeightedMean = updateWeightMean(data)
    
    update_Image(currentWeightedMean)

  })
  xhr.send()
}

function displaySensorData(data){
  // data가 객체인지 확인
  if (typeof data === 'object') {
    for (const key in data) {
      const cellId = 'sensor' + key;
      const cell = document.getElementById(cellId);
      if (cell) {
        const sensorValue = parseFloat(data[key]);
        cell.textContent = data[key];

        const hue = 180 - (sensorValue * 180 / 220);
        cell.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
        cell.style.color = `hsl(${(hue + 180) % 360}, 100%, 50%)`;
      }
    }
  }  
}


function updateWeightMean(data) {

  const seatValues_Row = new Array(15);
  
  seatValues_Row[0] = data[5];
  seatValues_Row[1] = data[6];
  seatValues_Row[2] = data[7];  
  seatValues_Row[3] = data[8];
  seatValues_Row[4] = data[9];
  seatValues_Row[5] = data[11];
  seatValues_Row[6] = data[13];
  seatValues_Row[7] = data[15];
  seatValues_Row[8] = data[17];
  seatValues_Row[9] = data[19];
  seatValues_Row[10] = data[21];
  seatValues_Row[11] = data[22];
  seatValues_Row[12] = data[23];
  seatValues_Row[13] = data[24];
  seatValues_Row[14] = data[25];
  let weightedSum = 0;
  let totalWeight = 0;
  for (let i = 0; i < seatValues_Row.length; i++) {
    const weight = seatValues_Row[i];
    const xCoordinate = (i + 0.5) - (seatValues_Row.length/2); 
    weightedSum += weight * xCoordinate; 
    totalWeight += weight;
  }
  const weightedMean = (weightedSum / totalWeight) / 7;
  console.log("Weighted Mean of seatValues_Row:", weightedMean);

  if(Number.isNaN(weightedMean)){
    return NaN // 가장 최신 무게중심 점수를 지속적으로 업데이트하기 
  }else{
    updateWBarColor(weightedMean)
    return weightedMean
  }
}



// 각 좌표에 대해 무게 중심 계산
function update_Image(currentWeightedMean) {
  const seat_Image = document.getElementById('seat_Image');

  if(seat_Image == null)
    return
  
  if(currentWeightedMean>0.10){
    console.log("오른쪽으로 기울어 졌습니다");
    seat_Image.src = "/images/seat_right.jpg";
  } 
  else if(currentWeightedMean<-0.10){
    console.log("왼쪽으로 기울어 졌습니다");
    seat_Image.src = "/images/seat_left.jpg";
  }
  else{
    console.log("정상적인 자세 입니다.");
    seat_Image.src = "/images/seat_normal.jpg";
  }
}