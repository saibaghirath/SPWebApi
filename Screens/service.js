var app = angular.module("m1", ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
    .when('/ManageServiceProvider', {
        templateUrl: '/ManagServiceProvider.html',
        controller: 'mngCtrl'
    })
     .when('/AddCategories', {
         templateUrl: '/AddCategories.html',
         controller: 'addCtrl'

     })
         .when('/request', {
             templateUrl: '/request.html',
             controller: 'addCtrl'

         })
             .otherwise({
                 redirectTo: 'notFound.html'
             });
});

//show provider details//
app.factory("showProviderDetails", function ($http) {

    var ProviderData = {};

    ProviderData.GetProvider = function () {
        alert();

        return $http.get("http://localhost:59929/api/ServiceProvider/");
    }
    return ProviderData;

});
//getting table data of userM-table
app.factory("showuserMDetails", function ($http) {
    var userData = {};
    userData.GetUser = function (uid) {
        alert(userData);
        return $http.get("http://localhost:59929/api/userm/" + uid);
    }
    return userData;

})

//controller for all the factories
app.controller("mngCtrl", function ($scope, showProviderDetails, au, showuserMDetails) {


    showProviderDetails.GetProvider().success(s2).error(e2);

    function s2(res) {
        alert("here");
        $scope.ProviderDetails = res;
    }
    function e2(r) {
        alert("Failed:" + r);
    }
    $scope.UpdateUser = function () {
        var user = {};
        showuserMDetails.GetUser(1).success(s1).error(e1);


        function s1(data) {

            user = data;//this contains the record of userM
            user.Active = 'yes';
            au.UpdateUserApi(user)

            alert("updated");
        }
        function e1(er) {
            alert("failure");
        }



    }

});
//to authorize the service provider
app.factory("au", function ($http) {
    var data = {};
    data.uid;
    data.name;
    data.password;
    data.role;
    data.Active;

    data.UpdateUserApi = function (Userrec) {
        alert(data);

        var promise = $http({
            method: 'PUT',
            url: 'http://localhost:59929/api/userm/' + Userrec.uid,
            data: Userrec
        });
        return promise;
    }
    return data;
});

//////////////add category///////////////////
app.factory("AddDealersFactory", function ($http) {
    var dealerdata = {};
    dealerdata.AddDealerApi = function (dealerrec) {

        var promise = $http({
            method: 'POST',
            url: 'http://localhost:63696/api/Category/', data: dealerrec
        });
        return promise;
    }
    return dealerdata;
});

app.controller("addCtrl", function ($scope, AddDealersFactory) {
    $scope.info = "Add new Dealer";
    var dealer = {};
    dealer.AddDealer = function () {
        AddDealersFactory.AddDealerApi($scope.DealerDetail)
        alert("Added");
        console.log($scope.DealerDetail);
    }

    $scope.DealerDetail = dealer;
});
///////////////////////update service provider//////////////


//To edit service provider tabel////////
app.factory("UpdateDealersFactory", function ($http) {
    var dealerdata = {};
    dealerdata.UpdateDealerApi = function (dealerrec) {
        alert(dealerrec.spid);
        'http://localhost:59929/api/ServiceProvider/' + dealerrec.spid;
        var promise = $http({
            method: 'PUT',
            url: 'http://localhost:59929/api/ServiceProvider/' + dealerrec.spid,
            data: dealerrec
        });
        return promise;
    }
    return dealerdata;
});
//Getting the existing data from service provider table////////
app.factory("FindDealersFactory", function ($http) {
    var DealerData = {};
    alert("in find factory");
    DealerData.FindDealer = function (dealerrec) {

        return $http.get("http://localhost:59929/api/ServiceProvider/" + dealerrec);
    }
    return DealerData;
});
app.controller("editCtrl", function ($scope, FindDealersFactory, UpdateDealersFactory) {

    var dealer = {};
    dealer.spid;
    dealer.u_id;
    dealer.name;
    dealer.location;
    dealer.companyName;
    dealer.address;
    dealer.phoneno;
    dealer.email;
    dealer.faxNo;
    dealer.panNo;
    dealer.adhaarNo;
    dealer.referredBy;
    dealer.customerPan;
    dealer.sp_image;
    dealer.serviceCategory;

    //  $scope.DealerDetail = dealer;

    $scope.Find = function () {
        var x = dealer.spid;
        alert("in find: "+x);
        FindDealersFactory.FindDealer(x).success(s1).error(e1);
        function s1(res) {
            alert(res.u_id); //working
            dealer.u_id = res.u_id;
            dealer.name = res.name;
            dealer.location = res.location;
            dealer.companyName = res.companyName;
            dealer.address = res.address;
            dealer.phoneno = res.phoneno;
            dealer.email = res.email;
            dealer.faxNo = res.faxNo;
            dealer.panNores.panNores;
            dealer.adhaarNo = res.adhaarNo;
            dealer.referredBy = res.referredBy;
            dealer.customerPan = res.customerPan;
            dealer.sp_image = res.sp_image;
            dealer.serviceCategory = res.serviceCategory;
        }
        function e1(r) {
            alert("Failed:" + r);
        }
    }
    dealer.UpdateDealer = function () {
        UpdateDealersFactory.UpdateDealerApi($scope.DealerDetail)
        alert("Updated");
        console.log($scope.DealerDetail);
    }
    $scope.DealerDetail = dealer;

});




