var app = angular.module('App', ['ngMaterial', 'ngRoute', "oc.lazyLoad", "md.data.table"]);
app.config(function ($routeProvider) {
    $routeProvider
       .when('/', {
           templateUrl: 'app/home/index.html',
           controller: 'HomeCtrl',
           resolve: {
               lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                   return $ocLazyLoad.load({
                       name: 'HomeCtrl', // CHANGE THIS
                       files: ['app/home/home.js']
                   });
               }]
           }
       })
       .when('/item', {
           templateUrl: 'app/item/index.html',
           controller: 'ItemCtrl',
           resolve: {
               lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                   return $ocLazyLoad.load({
                       name: 'ItemCtrl', // CHANGE THIS
                       files: ['app/item/item.js']
                   });
               }]
           }
       })
        .when('/Category', {
            templateUrl: 'app/item/Category.html',
            controller: 'CategoryCtrl',
            resolve: {
                lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'CategoryCtrl', // CHANGE THIS
                        files: ['app/item/Category.js']
                    });
                }]
            }
        })
       .otherwise({
           redirectTo: '/'
       });
}).factory('$utility', function ($mdDialog) {
    return {
        alert: function (message, ev) {
            $mdDialog.show(
     $mdDialog.alert()
       .parent(angular.element(document.querySelector('#popupContainer')))
       .clickOutsideToClose(true)
       .title('POS System')
       .textContent(message)
       .ariaLabel('Alert Dialog Demo')
       .ok('OK')
       .targetEvent(ev)
   );
        },
        confirm: function (message, ev, callback) {

            var confirm = $mdDialog.confirm()
          .title('POS System')
          .textContent(message)
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('OK')
          .cancel('CANCEL');

            $mdDialog.show(confirm).then(function () {
                callback(true);
            }, function () {
                callback(false);
            });
        }
    };
});

//app.controller('ItemCtrl', function ($ocLazyLoad) {
//    $ocLazyLoad.load('app/item/item.js');
//});
