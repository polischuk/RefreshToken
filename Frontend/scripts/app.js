var app = angular.module("app", ["ngRoute", 'LocalStorageModule']);

var configFunction = function ($routeProvider, $httpProvider, $locationProvider) {
    $httpProvider.interceptors.push("AuthInterceptorFactory");
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $routeProvider.
        when("/", {
            templateUrl: "/views/home.html",
            controller: HomeController
        }).when("/login", {
            templateUrl: "/views/account/login.html",
            controller: LoginController
        })
        .otherwise({
            redirectTo: "/"
        });
}
configFunction.$inject = ["$routeProvider", "$httpProvider", "$locationProvider"];
app.config(configFunction);