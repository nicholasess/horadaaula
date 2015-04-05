angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $state){

})

.controller('SemestreCtrl', function($scope, $state, Api, $stateParams){
  var id = $stateParams.id;
  Api.getHorario(id).then(function(data){
      $scope.semana = data.data;
  });
})

.controller('DashboardCtrl', function($scope, Api, Storage, Helpers, $rootScope) {
  $scope.semestres = [];
  $scope.semcurso = false;
  Helpers.showLoading();
  Api.getSemestre().then(function(data){
    Helpers.hideLoading();
    if(data.data.length > 0){
      $scope.semcurso = true;
    }
    $scope.semestres = data.data;
  }, function(data){
    Helpers.hideLoading();
  });
})

.controller('UserCursoCtrl', function($scope, Api,$rootScope, $ionicLoading, Helpers, $location, Storage, $state) {
    var id = 1;
    $scope.option = {};
    $scope.selectedOpt = {};
    Helpers.showLoading();

    Api.getCurso(id).then(function(data){
      Helpers.hideLoading();
      var cursos = data.data;
      $scope.cursos = cursos;
      $scope.selectedOpt = $scope.cursos;
      $scope.option = $scope.cursos[0];
    },function(data){
      $ionicLoading.hide();
    });

    $scope.update = function(item){
      $scope.option = item;
    }
  
    $scope.cadcurso = function(){
      var option = $scope.option;
      if(option.id == 0){
        Helpers.errorMessage("Selecione um Curso");
      }else{
        
        Helpers.showLoading();

        Api.postCurso(option).then(function(data){
            Helpers.hideLoading();
            //$location.path('/app/dashboard');
            $state.go('app.dashboard');
        },
        function(data){
          Helpers.hideLoading();
            Helpers.errorMessage(data.data.message);
        });
      }
    }
})

.controller('UserPerfilCtrl', function($scope, User, Helpers){
  $scope.perfil = {};
  Helpers.showLoading();
  User.perfil().then(function(data){
    Helpers.hideLoading();
    $scope.perfil = data.data;
  },function(data){
    Helpers.hideLoading();
    Helpers.errorMessage(data.data.message);
  });
})

.controller('SignupCtrl', function($scope, User,  Helpers, $location, $window, $rootScope, Storage) {
   $scope.usuario = {};

   $scope.cadastro = function(usuario){
      var data = {
        nome: usuario.nome || "",
        email: usuario.email || "",
        password: usuario.password || ""
      };

      if(data.nome == "" || data.email == "" || data.password == ""){
        Helpers.errorMessage('Algum campo está vázio');
      }
      else if(!Helpers.validateEmail(data.email)){
        Helpers.errorMessage("Formato do email está incorreto");
      }else{
        Helpers.showLoading();
        User.cadastro(data).then(function(data){
          var retorno = data.data;
          $rootScope.token = retorno.token;     
          Storage.setToken(retorno.token, function(){
            
            setTimeout(function() {
              Helpers.hideLoading();
              $location.path('/app/dashboard');
            }, 1000);          

          });    
        },function(data){
          Helpers.hideLoading();
          Helpers.errorMessage(data.data.message);
        })
      }
   }
})

.controller('SigninCtrl', function($scope,$rootScope, User,  Helpers, $location, Storage) {
   $scope.usuario = {};

   $scope.login = function(usuario){
      var data = {
        email: usuario.email || "",
        password: usuario.password || ""
      };

      if(data.email == "" || data.password == ""){
        Helpers.errorMessage('algum campo está vázio');
      }
      else if(!Helpers.validateEmail(data.email)){
        Helpers.errorMessage("formato do email está incorreto");
      }else{
        Helpers.showLoading();
        
        User.login(data).then(function(data){ 
          var retorno = data.data;
          $rootScope.token = retorno.token;     
          Storage.setToken(retorno.token, function(){
            
            setTimeout(function() {
              Helpers.hideLoading();
              $location.path('/app/dashboard');
            }, 1000);          

          });
        },function(data){
          Helpers.hideLoading();
          Helpers.errorMessage(data.data.message);
        })
      }
   }
})

.controller('AnotacaoMateriaCtrl', function($scope){

});