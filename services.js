//services
weatherApp.service('cityService', function(){
  this.city  = "Laguna Hills, CA";
});

weatherApp.service('weatherService', ['$resource', function($resource){
  this.GetWeather = function(city, days){
    var weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",{
      callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}});

    return weatherAPI.get({q: city, cnt : days, appid: "6b154f5e9befc6a9b36dcc7047816782"});

  };
}]);
