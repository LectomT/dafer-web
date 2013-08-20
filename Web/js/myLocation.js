
function getMyLocation(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(displayLocation);
	}else{
		alert("이런, 지오로케이션이 제공되지 않네요");
	}
}

function diplayLocation(position){
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;

	alert("당신은 위도: "+latitude+",경도: ",+longitude+ "에 있습니다.");
}