var HomeController = function ($scope, AuthFactory) {

    AuthFactory.GetUserInfo().then(function (result) {
        console.log(result);
    });

    $scope.Logout = function () {
        AuthFactory.Logout().then(function (result) {
            console.log(result);
        });
    }
}
HomeController.$inject = ["$scope", "AuthFactory"];
app.controller("HomeController", HomeController);
