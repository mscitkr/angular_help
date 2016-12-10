angular.module('POSApp').controller('CategoryCtrl', function ($scope, $http, $utility) {

    $scope.data = {
        code: '',
        name: ''
    }

    $scope.Selecteditem = null;
    function fndata() {
        $http.get('/category/all').then(function (data) {
            $scope.item = data.data;
        });
    }
    fndata();

    $scope.Add = function ($ev) {
        $http.post('/category/add', $scope.data).then(function (data) {
            $scope.data = {
                code: '',
                name: ''
            }
            fndata();
        });
    }

    $scope.Edit = function (index) {
        if ($scope.Selecteditem != null && $scope.Selecteditem == index) {
            $utility.confirm('Are you sure you wish to update selected input?', '', function (resp) {
                if (resp) {
                    $http.post('/category/edit', $scope.item[index]).then(function (data) {
                        fndata();
                        $scope.Selecteditem = null;
                    });
                    $scope.Selecteditem = null;
                }
            });
        } else {
            $scope.Selecteditem = index;
        }

    }

    $scope.Remove = function (index) {
        if ($scope.Selecteditem != null && $scope.Selecteditem == index) {
            $scope.Selecteditem = null;
        } else {
            $utility.confirm('Are you sure you wish to delete selected input?', '', function (resp) {
                if (resp) {
                    $http.post('/category/remove', $scope.item[index]).then(function (data) {
                        fndata();
                        $scope.Selecteditem = null;
                    });
                }
            });
        }
    }
});