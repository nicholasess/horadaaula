// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic', 
  'starter.controllers',
  'starter.service'
  ])

.run(function($ionicPlatform, Storage, $location, $rootScope, $state, Helpers) {
  $rootScope.token = null;
  $rootScope.logout = function(){
    Helpers.showLoading();
    setTimeout(function() {
      Helpers.hideLoading();
      window.localStorage.removeItem('tokenData');
      $state.go('access.signin');
    }, 1000);
  }

  $rootScope.token = null;
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(0);
  $stateProvider

  .state('access', {
    url: "/access",
    abstract: true,
    
    templateUrl: "templates/logo.html"
  })

  .state('access.signup', {
    url: "/signup",
    
    views: {
      'userContent': {
        templateUrl: "templates/signup.html",
        controller: 'SignupCtrl'
      }
    }    
  })

  .state('access.signin', {
    url: "/signin",
    
    views: {
      'userContent': {
        templateUrl: "templates/signin.html",
        controller: 'SigninCtrl'
      }
    }    
    
  })

  .state('app', {
    url: "/app",
    abstract: true,
    
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.dashboard', {
      url: "/dashboard",
      
      views: {
        'menuContent': {
          templateUrl: "templates/dashboard.html",
          controller: 'DashboardCtrl'
        }
      }
  })

  .state('app.semestre', {
      url: "/semestre/:id",
      
      views: {
        'menuContent': {
          templateUrl: "templates/semestre.html",
          controller: 'SemestreCtrl'
        }
      }
  })

  .state('anotacao', {
    url: "/anotacao",
    abstract: true,
    templateUrl: "templates/menu.html"
  })  

  .state('anotacao.materia', {
    url: "/materia",
    views: {
        'menuContent': {
          templateUrl: "templates/anotacao/materia.html",
          controller: 'AnotacaoMateriaCtrl'
        }
      }
  })  

  .state('user', {
    url: "/user",
    abstract: true,
    templateUrl: "templates/menu.html"
  })  

  .state('user.curso', {
    url: "/curso",
    views: {
        'menuContent': {
          templateUrl: "templates/user/curso.html",
          controller: 'UserCursoCtrl'
        }
      }
  })

  .state('user.perfil', {
    url: "/perfil",
    views: {
        'menuContent': {
          templateUrl: "templates/user/perfil.html",
          controller: 'UserPerfilCtrl'
        }
      }
  })
  
  $urlRouterProvider.otherwise('/access/signin');
})

.value('API', 'http://192.168.0.102:3000/api/')
