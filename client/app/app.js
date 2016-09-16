// angular.module("pspApp", ['ui.router','ui.materialize','ngCookies','ngAnimate']);
angular.module("pspApp", ['ui.router','ngFileUpload']);

angular.module("pspApp")
.config(function($urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise('/');

	$locationProvider.html5Mode(true);
});
