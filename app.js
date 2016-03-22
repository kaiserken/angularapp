var weatherApp  = angular.module("weatherApp", ['ngRoute', 'ngResource']);
const API_KEY = '';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast/daily?appid=${API_KEY}`;
//routes
weatherApp.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'pages/home.html',
    controller: 'homeController'
  })
  .when('/forecast', {
    templateUrl: 'pages/forecast.html',
    controller: 'forecastController'
  });

});
//services
weatherApp.service('cityService', function(){
  this.city  = "New York, NY";
});
// controllers
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService ){
  $scope.city  = cityService.city;

  $scope.$watch('city', function(){
    cityService.city  = $scope.city;
  });
}]);

weatherApp.controller('forecastController', ['$scope','$resource','cityService', function($scope, $resource, cityService){
  $scope.city  = cityService.city;
  //http://api.openweathermap.org/data/2.5/forecast/daily?q=dallas&cnt=2&appid=6b154f5e9befc6a9b36dcc7047816782
  $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",{
    callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}});
  $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt : 4, appid: "6b154f5e9befc6a9b36dcc7047816782"});

  $scope.convertToFahrenheit = function(degK){
    return Math.round((1.8* (degK-273))+32);
  };

  $scope.convertToDate = function(dt){
    return new Date(dt*1000);
  };
  console.log($scope.weatherResult);

}]);
