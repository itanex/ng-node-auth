namespace NodeAuth {
    let module: ng.IModule = angular.module('app', [
        /* Third Party Modules */
        'ui.router',

        /* Application Modules */
        'app.views'
    ]);

    module.config(NodeAuth.Configuration);

    module.controller('ApplicationController', NodeAuth.ApplicationController);

    module.service('AccountService', Services.AccountService);
    module.service('TestService', Services.TestService);
}