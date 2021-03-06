var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){
  $locationProvider.hashPrefix('');
  $routeProvider
  .when('/home',{
    templateUrl: './public/views/content/home.html',
    controller:'MainController'
  })
  .when('/mongodb_detail',{
    templateUrl: './public/views/content/material/mongodb_detail.html',
    controller:'MongoDetailController'
  })
  .when('/express_detail',{
    templateUrl: './public/views/content/material/express_detail.html',
    controller:'ExpressDetailController'
  })
  .when('/nodejs_detail',{
    templateUrl: './public/views/content/material/nodejs_detail.html',
    controller:'NodejsDetailController'
  })
  .when('/angular-detail',{
    templateUrl: './public/views/content/material/angular_detail.html',
    controller:'AngularDetailController'
  })
  .when('/react_detail',{
    templateUrl: './public/views/content/material/react_detail.html'
  })
  .when('/algolithm_ceasar',{
    templateUrl: './public/views/content/algolithm/algolithm_ceasar.html'
  })
  .when('/algolithm_nextnum',{
    templateUrl: './public/views/content/algolithm/algolithm_nextnum.html'
  })
  .when('/algolithm_jump',{
    templateUrl: './public/views/content/algolithm/algolithm_jump.html'
  })
  .when('/algolithm_bestSet',{
    templateUrl: './public/views/content/algolithm/algolithm_bestSet.html'
  })
  .when('/algolithm_expressions',{
    templateUrl: './public/views/content/algolithm/algolithm_expressions.html'
  })
  .when('/algolithm_findLargestSquare',{
    templateUrl: './public/views/content/algolithm/algolithm_findLargestSquare.html'
  })
  .when('/algolithm_hopscotch',{
    templateUrl: './public/views/content/algolithm/algolithm_hopscotch.html'
  })
  .when('/update_20171025',{
    templateUrl: './public/views/content/updatelist/update_20171025.html'
  })
  .when('/update_20171026',{
    templateUrl: './public/views/content/updatelist/update_20171026.html'
  })
  .when('/board_list',{
    templateUrl: './public/views/content/board/board_list.html',
    controller:'BoardController'
  })
  .when('/board_mod/:_id',{
    templateUrl: './public/views/content/board/board_mod.html',
    controller:'ModController'
  })
  .when('/board_write',{
    templateUrl: './public/views/content/board/board_write.html',
    controller:'WriteController'
  })
  .when('/page_tmon',{
    templateUrl: './public/views/content/page/page_tmon.html'
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



app.controller('BoardController', function($scope, $http, $location){
  //http.get 통신을 통하여 route.js에 있는 board_list를 호출하여 mongodb에 있는 값을 가지고 옵니다.board
  $http.get('/board_list').then(function(board){
    $scope.boards = board.data;

    //게시판 페이징 처리를 위한 선언
    //var pageindex = Math.ceil($scope.boards.length/5);
    //$scope.pageidx = page;
  });

  //리스트 페이지에서 삭제 버튼 클릭 시 호출되는 함수 입니다.
  $scope.delboard = function(selectedId){
    //http.delete를 통하여 route.js에 있는 /board/delete/:_id 를 호출하여 데이터 삭제 후 function(result)로 진입합니다.
    $http.delete('/board/delete/'+selectedId).then(function(result){
      //그 후 다시 리스트를 구해와서 boards에 게시물 삭제 후 현황을 노출시킵니다.
      $http.get('/board_list').then(function(data){
        $scope.boards = data.data;
      });
    });
  };
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
