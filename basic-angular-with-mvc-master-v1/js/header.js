angular.module('POSApp')
.controller('AppCtrl', function ($scope, $mdSidenav, $location) {
    $scope.$location = $location;
    $scope.showMobileMainHeader = true;
    $scope.openSideNavPanel = function () {
        $mdSidenav('left').open();
    };
    $scope.closeSideNavPanel = function () {
        $mdSidenav('left').close();
    };
})
