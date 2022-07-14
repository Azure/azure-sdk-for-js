let nock = require('nock');

module.exports.hash = "d4a52859205aa3238bdbffd01d0f7b90";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/address/reverse/crossStreet/json')
  .query(true)
  .reply(200, {"summary":{"numResults":1,"queryTime":168},"addresses":[{"address":{"streetName":"1st Avenue South & 1st Avenue","crossStreet":"1st Avenue","municipalitySubdivision":"Downtown Seattle","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98104","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"1st Avenue South & 1st Avenue, Seattle, WA 98104","localName":"Seattle","street":"1st Avenue South"},"position":"47.60174,-122.33426"}]}, [
  'Content-Length',
  '557',
  'Content-Type',
  'application/json; charset=utf-8',
  'Vary',
  'Accept-Encoding',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 54C97E841CC34C4C9C61BEEA45D2D488 Ref B: TYAEDGE0709 Ref C: 2022-07-14T02:58:28Z',
  'Date',
  'Thu, 14 Jul 2022 02:58:28 GMT'
]);
