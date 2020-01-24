/////////////////////////////////////////////////////////
/////		Base definitions. DO NOT EDIT!!!		/////
/////////////////////////////////////////////////////////

// API URL to get the latest exchange rates
// Note: the returned rates are based on the EUR
var endpointURL = 'https://api.exchangeratesapi.io/latest';

// use this object to create logic to populate the table
var testExchangeRates = {
	base: "EUR",
	date: "2019-05-31",
	rates: {
		AUD: 1.6136,
		BGN: 1.9558,
		BRL: 4.4462,
		CAD: 1.5115,
		CHF: 1.1214,
		CNY: 7.7045,
		CZK: 25.816,
		DKK: 7.468,
		GBP: 0.88693,
		HKD: 8.7457,
		HRK: 7.4185,
		HUF: 324.34,
		IDR: 15982.17,
		ILS: 4.0505,
		INR: 77.741,
		ISK: 138.3,
		JPY: 121.27,
		KRW: 1328.31,
		MXN: 21.8922,
		MYR: 4.6747,
		NOK: 9.7915,
		NZD: 1.7134,
		PHP: 58.225,
		PLN: 4.2843,
		RON: 4.743,
		RUB: 72.9053,
		SEK: 10.639,
		SGD: 1.5378,
		THB: 35.282,
		TRY: 6.527,
		USD: 1.1151,
		ZAR: 16.3834
	}
};

/////////////////////////////////////////////////////////
/////					SOLUTIONS					/////
/////////////////////////////////////////////////////////
$(document).ready(function (){
	// add solution here
	var baseCurr;
	$(".exchange-rates-form").submit(function (event){
		endpointURL = 'https://api.exchangeratesapi.io/latest';
		$(".error-message").empty();
		if ($("select option:selected").val().length === 0){
		$(".error-message").show();
		$("<p>Please select a base currency before submitting the form</p>").appendTo(".error-message");
		event.preventDefault();
		} else{
			event.preventDefault();
			$("tbody").empty();
			$(".exchange-rates-container").show();
			switch ($(".form-control :selected").val()){
						case "USD":{ baseCurr = "USD"; break;}
						case "AUD":{ baseCurr = "AUD"; break;}
						case "BGN":{ baseCurr = "BGN"; break;}
						case "GBP":{ baseCurr = "GBP"; break;}
						case "CAD":{ baseCurr = "CAD"; break;}
						case "JPY":{ baseCurr = "JPY"; break;}
						default:{ baseCurr = "EUR"; break;}
			}
			endpointURL+= "?base=" + baseCurr;
			checked = $(".form-check-input:checked");
			length = checked.length;

			if (length > 0){
				endpointURL += "&symbols=";	
			}
			if (length === 1){
				endpointURL += checked[0].value;
			}else if (length > 1){
				endpointURL += checked[0].value;
				for (i = 1; i < length; i++){
					endpointURL += "," + checked[i].value;
				}
			}
			$.ajax({
				url: endpointURL,
				type: "GET",
				dataType: "json"
			}).done(function (json){
				rates = json.rates;
				if (checked.length === 0){
					unchecked = $(".form-check-input");
					unchecked.each(function (index,currency){
						$("<tr><td>" + currency.value + "</td><td>" + rates[currency.value] + "</td><tr>").appendTo("tbody");	
					});
				} else{ 
					checked.each(function (index, currency){
						$("<tr><td>" + currency.value + "</td><td>" + rates[currency.value] + "</td><tr>").appendTo("tbody");
					});
				}
				$(".exchange-rates-container").show();
			}).fail(function (xhr, status, errorThrown){
				$(".error-message").show();
				$("<p>The request failed. " + errorThrown + "</p>").appendTo(".error-message");
				console.log("Error:" +  errorThrown);
				console.log("Status:" + status);
				console.dir(xhr);
			})
		}					
	})
})
