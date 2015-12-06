var AuthFactory = function ($http, $q, localStorageService) {

    var factory = {};

    factory.Authentication = {
        isAuth: false,
        userName: "",
        useRefreshTokens: false
    };
    factory.Login = function (loginData) {

        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;
        var deferred = $q.defer();

        $http.post(config.baseApiUrl + config.authToken, data, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
            if (response.refresh_token) {
                localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, refreshToken: response.refresh_token, useRefreshTokens: true });
            }
            else {
                localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, refreshToken: "", useRefreshTokens: false });
            }
            factory.Authentication.isAuth = true;
            factory.Authentication.userName = loginData.userName;
            factory.Authentication.useRefreshTokens = loginData.useRefreshTokens;

            deferred.resolve(response);

        }).error(function (err, status) {
            err.status = status;
            deferred.reject(err);
        });

        return deferred.promise;

    };

    factory.GetUserInfo = function () {

        var deferredObject = $q.defer();

        $http.get(config.baseApiUrl + config.getUserInfo).
        success(function (data) {
            deferredObject.resolve(data);
        }).
        error(function () {
            deferredObject.resolve(null);
        });
        return deferredObject.promise;
    }

    factory.Logout = function () {

        var deferredObject = $q.defer();

        $http.post(config.baseApiUrl + "/api/account/Logout").
        success(function (data) {
            localStorageService.remove('authorizationData');
            localStorageService.remove('authorizeAccountInfo');
            deferredObject.resolve(data);
        }).
        error(function () {
            deferredObject.resolve(null);
        });
        return deferredObject.promise;
    }
    return factory;
}

AuthFactory.$inject = ["$http", "$q", "localStorageService"];
app.factory('AuthFactory', AuthFactory);

