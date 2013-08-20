window.onload = function(){
	/*/
	var url = "http://gumball.wickedlysmart.com";
	var request = new XMLHttpRequest();
	request.open("GET",url);
	request.onload = function(){
		if(request.status == 200){
			eval(text);
		}
	}
	/**/
}

function updateSales(sales){
	var salesDiv = document.getElementById("sales");
	//var sales = JSON.parse(responseText);
	for(var i=0; i<sales.length; i++){
		var sale = sales[i];
		var div = document.createElement("div");
		div.setAttribute("class","saleItem");
		div.innerHTML = sale.name + "에서 검볼을 "+ sale.sales;
		salesDiv.appendChild(div);
	}
}