namespace NodeAuth.Services {
    export class AccountService {
        private _isAuthenticated: boolean = false;
        public get isAuthenticated(): boolean {
            return this._isAuthenticated;
        }

        private _user: Models.User = new Models.User();
        public get user(): Models.User {
            return this._user;
        }

        private _token: string = '';
        public get AuthenticationToken(): string {
            return this._token;
        }

        static $inject = [
            '$http'
        ];

        constructor(
            private $http: ng.IHttpService
        ) {

        }

        public logout(): void {
            this._isAuthenticated = false;
            this._token = '';
            this._user = new Models.User();

            this.$http.post('/api/users/logout', null);
        }

        public loginUser(user: Models.LoginUser): ng.IPromise<boolean> {
            return this.$http.post<any>('/api/users/login', user)
                .then((result) => {
                    if (result.status === 200) {

                        this._user.username = 'Benny'//result.data.username;
                        this._user.email = 'Jones'//result.data.email;
                        this._token = result.data;
                        this._isAuthenticated = true;

                        return true;

                    }
                    return false;
                })
                .catch(() => {
                    return false;
                });
        }

        public registerUser(user: Models.RegisterUser): ng.IPromise<boolean> {
            return this.$http.post('/api/users/register', user)
                .then((result) => {
                    return true;
                })
                .catch(() => {
                    return false;
                });
        }
    }
}