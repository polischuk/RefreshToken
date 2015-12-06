var AuthInterceptorFactory = function ($q, $location, localStorageService) {
    var authInterceptorServiceFactory = {};

    var _request = function (cfg) {
        cfg.headers = cfg.headers || {};
        var authData = localStorageService.get('authorizationData');
        if (authData && authData.refreshToken) {
            var data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken;
            $.ajax({
                url: config.baseApiUrl + config.authToken,
                dataType: 'json',
                async: false,
                data: data,
                type:"POST",
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
                success: function (response) {
                    localStorageService.set('authorizationData', { token: response.access_token, userName: authData.userName, refreshToken: response.refresh_token, useRefreshTokens: true });
                    if (authData) {
                        cfg.headers.Authorization = 'Bearer ' + authData.token;
                    }
                    return config;
                }
            });
        }
        return cfg;
    }

    var _responseError = function (rejection) {
        if (rejection.status === 401) {
            $location.path('/login');
        }
        if (rejection.status === 302) {
            $location.path('/admin');
        }
        return $q.reject(rejection);
    }

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
}

AuthInterceptorFactory.$inject = ['$q', '$location', 'localStorageService'];
app.factory('AuthInterceptorFactory', AuthInterceptorFactory);
