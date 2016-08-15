var x = angular.module("m1", [])
x.factory("addusermaster", function ($http) {
    var usermaster = {};
    usermaster.add = function (adduser) {

        alert(adduser.name);
        var promise = $http({
            url: 'http://localhost:59929/api/userm/',
            method: 'POST',
            data: adduser
        });

        return promise;
    }
    return usermaster;
});
x.factory("adduserdetail", function ($http) {
    var userdetail = {};

    userdetail.adduser = function (adduserdetail) {
     //   alert(adduserdetail.pinCode);
     //   alert(adduserdetail.phoneno);
        var promise = $http({
            url: 'http://localhost:59929/api/userdetail/',
            method: 'POST',
            data: adduserdetail
        });

        return promise;
    }
    return userdetail;
});
x.factory("addSP", function ($http) {
    var sp = {};
  //  alert("in sp factory");
    sp.addsp = function (addspdetail) {
        var promise = $http({
            url: 'http://localhost:59929/api/ServiceProvider/',
            method: 'POST',
            data: addspdetail
        });
        return promise;
    }
    return sp;
});

x.controller("add", function ($scope, addusermaster, adduserdetail, addSP) {
    var data = {};
    var id;
    data.uid;
    data.name;
    data.password;
    data.role;
    var sprole;
    var udata = {};
    udata.phoneno;
    udata.name;
    udata.uid;
    udata.address;
    udata.email;
    udata.panNo;
    udata.companyName;
    udata.pinCode;
    var spdata = {};
    spdata.u_id;
    spdata.name;
    spdata.location;
    spdata.companyName;
    spdata.address;
    spdata.phoneno;
    spdata.email;
    spdata.faxNo;
    spdata.panNo;
    spdata.adhaarNo;
    spdata.referredBy;
    spdata.customerPan;
    spdata.sp_image;
    spdata.serviceCategory;
    $scope.Add = function () {
        addusermaster.add($scope.user).success(s).error(e);
        $scope.userd.uid = id;
        function s(data) {

            alert("data.uid: " + data.uid);

                    alert("added");
                    $scope.userd.uid = data.uid;
                    $scope.userd.name = data.name;
                    sprole = data.role;
                    adduserdetail.adduser($scope.userd).success(s1).error(e1);
                    function s1(udata) {
                        alert("added detail");
                        alert("sprole: " + sprole);
                        $scope.$watch(data.role, function () {
                        if (data.role == "serviceprovider") {
                            alert("in if");
                                $scope.sp.u_id = udata.uid;
                                $scope.sp.name = udata.name;
                                $scope.sp.phoneno = udata.phoneno;
                                $scope.sp.address = udata.address;
                                $scope.sp.email = udata.email;
                                $scope.sp.panNo = udata.panNo;
                                $scope.sp.companyName = udata.companyName;
                                alert("companyName: " + udata.companyName);
                                addSP.addsp($scope.sp).success(s2).error(e2);
                                function s2(spdata) {
                                    alert("added sp");
                                }
                                function e2() {
                                    alert("failure sp");
                                }
                            }
                        });
                    }
                    function e1() {
                        alert("failure detail");
                    }
        }
        function e() {
            alert("failure");
        }
    }
});

//x.factory("addcategory", function ($http) {
//    var cat = {};
//    cat.add = function (res) {
//    //    alert("factory");
//        alert(res.title);
//        var promise = $http({
//            url: 'http://localhost:59929/api/category/',
//            method: 'POST',
//            data: res
//        });

//        return promise;
//    }
//    return cat;
//});

//x.controller("catctrl", function ($scope, addcategory) {
//    var data = {};
//    var id;
//    data.cid;
//    data.title;
//    data.password;
//    data.createdBy;
//    data.createdDate;
//    $scope.Add = function () {
//        addcategory.add($scope.c).success(s).error(e);
//        function s(c) {
//            alert(c.title);
//            alert("added category");
//        }
//        function e() {
//            alert("failure");
//        }
//    }   
//});

x.factory("CategoryFactory", function ($http) {
    var a = {};
    a.GetCats = function () {
        return $http.get("http://localhost:59929/api/catName");
    }
    return a;
});
x.controller("CategoryCtrl", function ($scope, CategoryFactory) {
    CategoryFactory.GetCats().success(s1).error(e1);
    function s1(res) {
        $scope.cattitle = res;
    }
    function e1(res) {
        alert("failed" + res);
    }
});

x.factory("locationFactory", function ($http) {
    alert("called");
    var a = {};
    a.GetCats = function () {
        return $http.get("http://localhost:59929/api/location");
    }
    return a;
});
x.controller("locationCtrl", function ($scope, locationFactory) {
    locationFactory.Getlocation().success(s1).error(e1);
    function s1(res) {
        alert(res);
        $scope.location = res;
        // Console.log(res);
    }
    function e1(res) {
        alert("failed" + res);
    }
});