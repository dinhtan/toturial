var app = angular.module('weatherApp',['ngResource']);

app.controller('HomeController',['$scope','$q','Weather',function($scope,$q,Weather){
	$scope.welcome = 'Weather App';
	$scope.getIcon = function(iconcode){
		return Weather.GetIcon(iconcode);
	};
	var city = _.sortBy(['London','Berlin','Tokyo','Hanoi','Rome','Haiphong','Beijing','Paris','Moscow','NewYork','Singapore','Seoul']);
	$scope.cities=[];
	// angular.forEach(city,function(item){
	// 	Weather.GetByCity(item).jsonp().$promise.then(function(data){
	// 		$scope.cities.push(data);
	// 	}, function(error){
	// 		console.log(error);
	// 	});
	// });
}]);

app.factory('Weather',['$resource',function($resource){
	var REST_URL = 'http://api.openweathermap.org/data/2.5/weather';
	this.GetByCity = function(city){
		return $resource(REST_URL, {}, {
			jsonp: {
				method: 'JSONP',
				params: {callback: 'JSON_CALLBACK',q:city},
				isArray: false
			}
		});
	};
	this.GetIcon = function(iconcode){
		var iconobj = {
			'01d':'wi-day-sunny',
			'02d':'wi-day-cloudy',
			'03d':'wi-cloud',
			'04d':'wi-cloudy',
			'09d':'wi-hail',
			'10d':'wi-day-hail',
			'11d':'wi-storm-showers',
			'13d':'wi-snow',
			'50d':'wi-sandstorm',
			'01n':'wi-night-clear',
			'02n':'wi-night-alt-cloudy',
			'03n':'wi-cloud',
			'04n':'wi-cloudy',
			'09n':'wi-hail',
			'10n':'wi-night-alt-hail',
			'11n':'wi-storm-showers',
			'13n':'wi-snow',
			'50n':'wi-sandstorm'
		};
		if(iconobj.hasOwnProperty(iconcode)){
			return iconobj[iconcode];
		}
		return iconcode;
	}
	return this;
}]);