namespace NodeAuth.Services {
    export class TestService {
        public result: boolean = false;

        static $inject = [
            '$http'
        ];

        constructor(
            private $http: ng.IHttpService
        ) {

        }

        public testEndpoint(): ng.IPromise<boolean> {
            return this.$http.get('/api/users/login')
                .then(() => {
                    return true;
                })
                .catch(() => {
                    return false;
                });
        }
    }
}