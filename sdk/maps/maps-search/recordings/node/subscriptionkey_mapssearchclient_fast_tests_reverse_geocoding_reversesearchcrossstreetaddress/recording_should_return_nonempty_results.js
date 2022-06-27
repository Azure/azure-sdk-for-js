let nock = require('nock');

module.exports.hash = "5ea542d746b239cedd9f17e5a1e854aa";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/address/reverse/crossStreet/json')
  .query(true)
  .reply(200, {"summary":{"numResults":1,"queryTime":54},"addresses":[{"address":{"streetName":"1st Avenue South & 1st Avenue","crossStreet":"1st Avenue","municipalitySubdivision":"Downtown Seattle","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98104","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"1st Avenue South & 1st Avenue, Seattle, WA 98104","localName":"Seattle","street":"1st Avenue South"},"position":"47.60174,-122.33426"}]}, [
  'Content-Length',
  '556',
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
  'Ref A: 2D722DC46CCB4752AB93593518AFDA1E Ref B: TPE30EDGE0715 Ref C: 2022-06-27T02:24:48Z',
  'Date',
  'Mon, 27 Jun 2022 02:24:48 GMT'
]);
