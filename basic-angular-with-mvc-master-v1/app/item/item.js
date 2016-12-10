angular.module('POSApp').service('dataService', function () {
    // private variable
    var _dataObj = { data: null };

    this.dataObj = _dataObj;
}).controller('ItemCtrl', function ($scope, $http, $mdDialog, dataService) {
    $scope.selected = [];
    $scope.customFullscreen = false;
    $scope.query = {
        order: 'name',
        limit: 5,
        page: 1
    };

    $scope.addItem = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'item.html',
            //scope:$scope,
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false,
            fullscreen: $scope.customFullscreen
        })
        .then(function (answer) {
            $http.get('/item/all').then(function (data) {
                $scope.item = data.data;
            });
        }, function () {
            $scope.status = 'You cancelled the dialog.';
        });
    }

    $scope.editItem = function ($index, ev) {
        dataService.dataObj.data =$scope.item[$index];
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'item.html',
            //scope:$scope,
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false,
            fullscreen: $scope.customFullscreen
        })
        .then(function (answer) {
            $http.get('/item/all').then(function (data) {
                $scope.item = data.data;
            });
        }, function () {
            $scope.status = 'You cancelled the dialog.';
        });

    }


    $http.get('/item/all').then(function (data) {
        $scope.item = data.data;
    });

    function DialogController($scope, $mdDialog, dataService) {
        //console.log(dataService.dataObj.data)
        $scope.pItem = {
            BasicInfo: {
                Sku: '',
                ItemName: '',
                ItemSortName: '',
                MinStock: '',
                Unit: '',
                Catagory: '',
                Description: '',
                SellingPrice: '',
                PurchasePrice: '',
                Capacity: ''
            }
        }
        if (dataService.dataObj.data != null) {
            console.log('going to set');

            var tempd= dataService.dataObj.data;
            $scope.pItem.BasicInfo.Sku = tempd.SKU;
            $scope.pItem.BasicInfo.ItemName = tempd.ItemName;
            $scope.pItem.BasicInfo.ItemSortName = tempd.ItemSortName;
            $scope.pItem.BasicInfo.MinStock = tempd.MinStock;
            $scope.pItem.BasicInfo.Unit = tempd.UnitId;
            $scope.pItem.BasicInfo.Catagory = tempd.CategoryId;
            $scope.pItem.BasicInfo.Description = tempd.Description;
            $scope.pItem.BasicInfo.SellingPrice = tempd.SellingPrice;
            $scope.pItem.BasicInfo.PurchasePrice = tempd.PurchasePrice;
            $scope.pItem.BasicInfo.Capacity = tempd.Capacity;
        }
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.Save = function () {
            console.log($scope.pItem);
            $scope.pItem.BasicInfo.CategoryId = $scope.Category[$scope.pItem.BasicInfo.Catagory]._id;
            $scope.pItem.BasicInfo.CategoryName = $scope.Category[$scope.pItem.BasicInfo.Catagory].name;
            $scope.pItem.BasicInfo.UnitId = $scope.Units[$scope.pItem.BasicInfo.Unit]._id;
            $scope.pItem.BasicInfo.UnitName = $scope.Units[$scope.pItem.BasicInfo.Unit].Unit;
            $http.post('item/add', $scope.pItem).then(function (done) {
                console.log(done);
                $mdDialog.hide(true);
            },
                function (error) {
                    console.log(error);
                });

        };

        $http.get('/units/all').then(function (data) {
            $scope.Units = data.data;
        });

        $http.get('/category/all').then(function (data) {
            $scope.Category = data.data;
        });
    }
});