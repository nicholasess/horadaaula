var App = angular.module('starter.service', []);
App.factory('Api', function($http, $filter, API, Storage){
	var token = Storage.getToken();
	var tokenUser = {
   		headers: {'x-access-token': token}
	};
	return {
		get: function(){
			return $http.get(API+'faculdade', tokenUser);    
		},
		getCurso: function(id){
			return $http.get(API+'curso/'+id, tokenUser); 
		},
		getHorario: function(id){
			return $http.get(API+'semestre/'+id, tokenUser); 
		},
		postCurso: function(curso){
			return $http.post(API+'curso', curso, tokenUser); 
		},
		getSemestre: function(){
			return $http.get(API+'semestre', tokenUser);    	
		}
	}

	
});

App.factory('User', function($http, API, Storage){
	var token = Storage.getToken();
	var tokenUser = {
   		headers: {'x-access-token': token}
	};
	return {
		login: function(user){
			return $http.post(API+'signin', user);
		},
		cadastro: function(user){
			return $http.post(API+'signup', user);
		},
		perfil: function(){
			return $http.get(API+'aluno/perfil', tokenUser);    	
		}
	}
});


App.factory('Helpers', function($ionicLoading){
	return {
		validateEmail: function(email) { 
		    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		    return re.test(email);
		},
		errorMessage: function(message){
			 $ionicLoading.show({
	          template: message,
	          delay: 100,
	          duration: 500
	        });    
		},
		showLoading: function(){
			$ionicLoading.show({
		      content: 'Loading',
		      animation: 'fade-in',
		      showBackdrop: true,
		      maxWidth: 50,
		      showDelay: 0
		    });
		},
		hideLoading: function(){
			 $ionicLoading.hide();
		} 
	}
});

App.factory('Storage', function($location, $rootScope, $window){
	var token = window.localStorage.getItem('tokenData') || $rootScope.token;
	return {
		getToken: function(){
			var tokenatual = window.localStorage.getItem('tokenData') || $rootScope.token;
			return tokenatual;
		},
		setToken: function(token, cb){
			window.localStorage.setItem('tokenData', token);
			$rootScope.token = token;
			var tokenatual = window.localStorage.getItem('tokenData');
			console.log(tokenatual);
			cb();
		} 
	}
});

