// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    paypalClientId: 'AfqNKvCkZ4ExY1NKEB0kwrnqpcX7JfZRC1eNr7787k8WizTyOYIwWYCxLrYry28OlLx6v41bDH1NCtA7',
    base_href: '/',
    configurableVariable: 'This is standalone environment',
    Liferay: {
        ThemeDisplay: {
            getCompanyId() {
                return 12345;
            },
            getScopeGroupId() {
                return 67890;
            },
            getUserName() {
                return "Mahmoud";
            },
            getUserId() {
                return 45657;
            },
            isSignedIn() {
                return false;
            }
        }
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
