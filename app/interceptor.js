angular.module('app')
.factory('httpRequestInterceptor', function () {
  return {
    request: function (config) {

      config.headers['Authorization'] = 'Basic cGFzRGFtb2xhOnBocGFuZGpzMQ==';
      config.headers['Accept'] = 'application/json;odata=verbose';

      return config;
    }
  };
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('httpRequestInterceptor');
});