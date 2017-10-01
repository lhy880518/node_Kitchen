var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){
  $locationProvider.hashPrefix('');
  $routeProvider
  .when('/home',{
    templateUrl: './public/views/content/home.html',
    controller:'MainController'
  })
  .when('/mongodb_detail',{
    templateUrl: './public/views/content/mongodb_detail.html',
    controller:'MongoDetailController'
  })
  .when('/board_list',{
    templateUrl: './public/views/content/board_list.html',
    controller:'BoardController'
  })
  .when('/board_mod/:_id',{
    templateUrl: './public/views/content/board_mod.html',
    controller:'ModController'
  })
  .when('/board_write',{
    templateUrl: './public/views/content/board_write.html',
    controller:'WriteController'
  })
  .otherwise({
        redirectTo: '/home'
  });
});

app.controller('MainController', function($scope, $http){
  $http.get('/').then(function(data){
    $scope.memos = data.data;
  });
});

app.controller('MongoDetailController', function($scope, $http){
  $http.get('/mongodb_detail').then(function(data){
    $scope.memos = data.data;
  });
});

app.controller('BoardController', function($scope, $http){
  $http.get('/board_list').then(function(data){
    $scope.boards = data.data;
  });
});

app.controller('WriteController', function($scope, $http, $location){
  $scope.submitBoard = function(board){
    $http.post('/board/create', board).then(function(data){
      $location.path('/board_list');
    });
  };
});

app.controller('ModController', function($scope, $routeParams, $http, $location){
  $http.get('/board_mod/'+$routeParams._id).then(function(data){
    $scope.board = data.data;
  });

  $scope.submitBoard = function(board){
    $http.put('/board', board).then(function(data){
      $location.path('/board_list');
    });
  };
});
