namespace NodeAuth.Views.Home {
    Configuration.$inject = [
        '$stateProvider'
    ];

    export function Configuration(
        $stateProvider: ng.ui.IStateProvider
    ) {
        $stateProvider
            .state('Home', <ng.ui.IState>{
                url: '/',
                templateUrl: 'js/views/home/home.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            });
    }
}