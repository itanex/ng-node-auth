namespace NodeAuth.Views.Home {
    let module: ng.IModule = angular.module('home.view', []);

    module.config(Home.Configuration);
    
    module.controller('HomeController', Home.HomeController);
}

