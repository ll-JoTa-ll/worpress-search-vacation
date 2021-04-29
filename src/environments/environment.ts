// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  baseUrl: 'https://domiruth-uat.azure-api.net/vacation/', // uat
  subsKey: 'eb85131bc9d94c02840aa6961e7f77e9', // uat
  urlFlight: 'https://domiruth-uat.azure-api.net/flight/',
  //urlVacaFacade: 'http://localhost:4200/#/facade/',
  urlVacaFacade: 'https://vacation.domiruth.com/#/facade/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
