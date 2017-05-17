namespace NodeAuth {
    export class ApplicationController {
        public get isAuthenticated(): boolean {
            return this.AccountService.isAuthenticated;
        }
        
        public get user(): Models.User {
            return this.AccountService.user;
        }

        static $inject = [
            'AccountService'
        ];

        constructor(
            private AccountService: Services.AccountService
        ) {

        }

        public logout() {
            this.AccountService.logout();
        }
    }
}