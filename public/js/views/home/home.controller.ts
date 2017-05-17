namespace NodeAuth.Views.Home {
    export class HomeController {

        public testResult: boolean = false;

        static $inject = [
            '$rootScope',
            'TestService'
        ];

        constructor(
            private $rootScope: ng.IRootScopeService,
            private TestService: Services.TestService
        ) {

        }
        
        public testAuth() {
            this.TestService.testEndpoint()
            .then((result) => this.testResult = result);
        }
    }
}