(function () {

  'use strict';

  angular
    .module('app')
    .constant("dataUrl","https://api.github.com")
    .controller('HomeController', homeController);


  homeController.$inject = ['authService', '$scope','$http',"dataUrl",'$stateParams','$location'];

  function homeController(authService,$scope,$http,dataUrl,$stateParams,$location) {

    var vm = this;
    vm.auth = authService;
    



        $scope.product = {};
        $http.get(dataUrl + "/gists/public").then(function(data) {
        $scope.product.data = data.data;
        console.log(data);
      }, function(error) {
        $scope.data.error = error;
      });
    
        $scope.user = {};
        $scope.submitForm = function(){
        $http({
          method  : 'POST',
          url     : dataUrl + '/gists',
          data    : $scope.user
        })
          .then(function(data){
            $scope.message = 'Gist Created';
               console.log(data);
           

    });

}
    
        var id = $stateParams.id;
        $scope.gists = {};
        $http({
        method : 'GET',
        url :  dataUrl + '/gists/' + id,
        data : $scope.gists
       }).then(function(result){
         $scope.gists = result.data;
        console.log(result.data);
    });
   
       $http({
        method : 'GET',
        url :  dataUrl + '/users/pasDamola/gists'

      }).then(function(result){
         $scope.gist = result.data;
               console.log(result.data);
           

    });
        $scope.edit = {};
        $scope.editForm = function(){
        $http({ 
        url: dataUrl + '/gists/' + id,
        method: 'PATCH',
        data: $scope.edit
}).then(function(response) {
    $scope.message = "Updated";
    console.log(response);
});
    
   
 }


  $scope.deleteForm = function(){
      $http({ 
      url: dataUrl + '/gists/' + id,
     method: 'DELETE'
}).then(function(response) {
    $scope.deleted = "Gist deleted";
    console.log(response);
});
    

 }

  $scope.starGist = function(){
        $http({ 
        url: dataUrl + '/gists/' + id + '/star',
        method: 'PUT'
}).then(function(response) {
    $scope.message = "Gist Starred";
    console.log(response);
});
    
   
 }

 $scope.unstarGist = function(){
        $http({ 
        url: dataUrl + '/gists/' + id + '/star',
        method: 'DELETE'
}).then(function(response) {
    $scope.message = "Gist Unstarred";
    console.log(response);
});
    
   
 }

    
    };   
  

})();