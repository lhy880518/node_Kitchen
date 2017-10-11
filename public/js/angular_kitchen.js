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
  .when('/express_detail',{
    templateUrl: './public/views/content/express_detail.html',
    controller:'ExpressDetailController'
  })
  .when('/nodejs_detail',{
    templateUrl: './public/views/content/nodejs_detail.html',
    controller:'NodejsDetailController'
  })
  .when('/angular-detail',{
    templateUrl: './public/views/content/angular_detail.html',
    controller:'AngularDetailController'
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

  });
});

app.controller('MongoDetailController', function($scope, $http){
  $http.get('/mongodb_detail').then(function(data){

  });
});

app.controller('NodejsDetailController', function($scope, $http){
  $http.get('/nodejs_detail').then(function(data){
  });
});

app.controller('ExpressDetailController', function($scope, $http){
  $http.get('/express_detail').then(function(data){
  });
});

app.controller('AngularDetailController', function($scope, $http){
  $http.get('/angular_detail').then(function(data){
  });
});

app.controller('BoardController', function($scope, $http){
  $http.get('/board_list').then(function(data){
    $scope.boards = data.data;
    var pageindex = Math.ceil($scope.boards.length/5);
    $scope.pageidx = page;
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
    data.data.password = '';
    $scope.board = data.data;
  });

  $scope.submitBoardMod = function(board){
    $http.get('/board_get/'+$routeParams._id).then(function(data){
      if((data.data.title !== $scope.board.title || data.data.content !== $scope.board.content) && data.data.password !== $scope.board.password){
         alert('올바른 비밀번호를 입력 바랍니다.');
      }else if((data.data.title !== $scope.board.title || data.data.content !== $scope.board.content) && data.data.password === $scope.board.password){
        if(confirm("제목 및 내용을 수정 하시겠습니까?")){
          $http.put('/board', board).then(function(data){
            $location.path('/board_list');
          });
        }
      }else{
        $location.path('/board_list');
      }
    });
  };
});
