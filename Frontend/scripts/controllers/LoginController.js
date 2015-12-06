var LoginController = function ($scope, AuthFactory, $location) {
    $scope.loginForm = {
        userName: "",
        password: "",
        useRefreshTokens:false
    }
    $scope.login = function () {
        var res = AuthFactory.Login($scope.loginForm);
        res.then(function (data) {
            $location.path('/');
        }, function (error) {

        });
    }
}
LoginController.$inject = ["$scope", "AuthFactory", "$location"];
app.controller("LoginController", LoginController);
