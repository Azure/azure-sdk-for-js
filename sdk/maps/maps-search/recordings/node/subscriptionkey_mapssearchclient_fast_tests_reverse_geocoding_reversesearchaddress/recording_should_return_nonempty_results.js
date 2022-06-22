let nock = require('nock');

module.exports.hash = "1de2cb094328b26ef6f7d65a4ca82dc3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/address/reverse/json')
  .query(true)
  .reply(200, {"summary":{"queryTime":6,"numResults":1},"addresses":[{"address":{"buildingNumber":"36","streetNumber":"36","routeNumbers":[],"street":"新港路","streetName":"新港路","streetNameAndNumber":"新港路, 36","countryCode":"TW","countrySubdivision":"桃園市","municipality":"桃園市","postalCode":"327","municipalitySubdivision":"新屋區","country":"台灣","countryCodeISO3":"TWN","freeformAddress":"32744, 桃園市 新屋區, 新港路, 36","boundingBox":{"northEast":"24.989644,121.014926","southWest":"24.989405,121.012705","entity":"position"},"extendedPostalCode":"32744","localName":"新屋區"},"position":"24.988867,121.017029"}]}, [ 'Content-Length',
  '648',
  'Content-Type',
  'application/json',
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
  'Ref A: DA8878CABA984772AC42F9A43C4EC8F6 Ref B: TYO01EDGE3011 Ref C: 2022-06-22T06:18:11Z',
  'Date',
  'Wed, 22 Jun 2022 06:18:11 GMT' ]);
