/// <reference path="service.js" />
/// <reference path="validate.js" />
/// <reference path="UserLogin.html" />
/// <reference path="USER_SP_Registration.html" />
/// <reference path="USER_SP_Registration.html" />
/// <reference path="USER_SP_Registration.html" />
/// <reference path="USER_SP_Registration.html" />
var app = angular.module('m2', []);
app.factory("GetDetailApi", function ($http) {
    var Details = {};
    Details.GetDetail = function (user) {
        return $http.get("http://localhost:59929/api/userNamePass?name=" + user.name + "&password=" + user.password);
    };
    return Details;
});

app.controller("GetDCtrl", function ($scope, GetDetailApi) {
    var data = {};
    data.name;
    data.password;
    data.s;
    //debugger;
    $scope.Add = function () {
        alert("iN controller");
        GetDetailApi.GetDetail($scope.Details).success(s1).error(e1);
        function s1(res) {
            alert("res name: " + res.name);
            data.s = res.name;
            alert("first function success ");
            window.location = "http://localhost:60058/#";
            $scope.Details = res;
        }
        function e1(resp) {
            alert('Wrong User ID or Password' + resp);
        }
    }
    //$scope.redirect = function () {
    //    // $location.path('/USER_SP_Registration.html'); 
    //    window.location = "http://localhost:60058/USER_SP_Registration.html";
    //}
});