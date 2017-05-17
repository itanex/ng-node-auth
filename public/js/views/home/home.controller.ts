namespace NodeAuth.Views.Home {
    export class HomeController {

        public get testResult(): boolean {
            return this.TestService.result;
        }

        static $inject = [
            'TestService'
        ];

        constructor(
            private TestService: Services.TestService
        ) {

        }
        
        public testAuth() {
            this.TestService.testEndpoint();
        }
    }
}