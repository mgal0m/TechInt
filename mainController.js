var app = angular.module('myApp', ["ngRoute"]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/main.html',
            controller: 'myCtrl'
        })
        .when('/clients', {
            templateUrl: 'pages/clients.html',
            controller: 'myCtrl'
        })
        .when('/upload', {
            templateUrl: 'pages/upload.html',
            controller: 'myCtrl'
        })
        .when('/groups', {
            templateUrl: 'pages/groups.html',
            controller: 'myCtrl'
    });
    }]);

var clientsArr;
var clientsJson;
var groupName;
var globalClients = [];

app.controller('myCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) { 
    
    $scope.goToClients = function(){
        $location.path('clients')
    }
    $scope.goToMain = function(){
        $location.path('/')
    }
    $scope.goToUpload = function(){
        $location.path('upload')
    }
    $scope.goToGroup = function(){
        $location.path('groups')
    }
    
    $scope.getFiles = function(){
        $http({
            method: "GET",
            dataType: 'JSONP', 
            url: "http://localhost:5000/fileList"
        }).then(function(data){
            $scope.dane = data.data
            $scope.arrFiles = [];
            for(i=0;i<$scope.dane.length;i++){
                $scope.arrFiles.push($scope.dane[i]['file']);
                console.log($scope.dane[i]['file']);
            }
            //clientsArr = $scope.arr;
            console.log($scope.arrFiles);
        }, function(error){
            console.log(error);
        });
    }

    
    
    //check connection
    $scope.init = function(){
        $http({
            method: "GET",
            dataType: 'JSONP', 
            url: "http://localhost:5000/"
        }).then(function(data){
            console.log("ALL DAY LONG KURWA");
        }, function(error){
            console.log("Missing connection. Please refresh or restart flask server.");
        });
    }
    
    $scope.readClients = function(){
        groupName = ""
        globalClients = []
        $scope.clients = clientsArr;
        $scope.newObject = {};
        $scope.myVar = "Przykładowa nazaw"
        
        clientsJson = $scope.newObject;
    }
    $scope.createGroup = function(){
        groupName = $scope.myVar
        globalClients.push(groupName)
        globalClients.push(clientsJson)
        
        console.log(globalClients)
        
        $http({
        method: "POST",
        data: JSON.stringify(globalClients),
        url: "http://localhost:5000/test"
        }).then(function successCallback(response) {
        console.log("ok")
        }, function errorCallback(response) {
        console.log("not")
        });
    }
    
    //get clients
    $scope.getData = function(){
        $http({
            method: "GET",
            dataType: 'JSONP', 
            url: "http://localhost:5000/getClients"
        }).then(function(data){
            $scope.dane = data.data
            clientsJson = data.data
            console.log($scope.dane);
            $scope.arr = [];
            for(i=0;i<$scope.dane.length;i++){
                $scope.arr.push($scope.dane[i]['name']);
                console.log($scope.dane[i]['name']);
            }
            clientsArr = $scope.arr;
            console.log($scope.arr);
        }, function(error){
            console.log(error);
        });
    }

}]);


