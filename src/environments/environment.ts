// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  baseUrl: 'https://domiruth-uat.azure-api.net/vacation/', // uat
  baseHotelUrl: 'https://domiruth-uat.azure-api.net/hotel/',
  urlSecurity: 'https://domiruth-uat.azure-api.net/security/',
  baseCharter: 'https://domiruth-uat.azure-api.net/charter/',
  // urlIcons: 'https://vacationadminuatsa.blob.core.windows.net/icons/',
  urlIcons: 'https://vacationadminprdsa.blob.core.windows.net/icons/',
  urlIp: 'https://api.ipify.org/?format=json',
  subsKey: 'eb85131bc9d94c02840aa6961e7f77e9', // uat
  // urlVisa: 'https://domiribbon.azurewebsites.net/visa/',
  urlVisa: 'https://domiruthvisauat.azurewebsites.net/visa/',
  urlVisaSource:
    'https://static-content-qas.vnforapps.com/v2/js/checkout.js?qa=true',
  // urlVisaSource: 'https://static-content.vnforapps.com/v2/js/checkout.js'
  urlFlight: 'https://domiruth-uat.azure-api.net/flight/',
  urlCustom: 'https://domiruth-uat.azure-api.net/customer/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
