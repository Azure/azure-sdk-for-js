let nock = require('nock');

module.exports.hash = "9fa315f974c196583b8a1c11ec3a8d5e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/address/reverse/crossStreet/json')
  .query(true)
  .reply(200, {"summary":{"numResults":1,"queryTime":117},"addresses":[{"address":{"streetName":"新港路12巷 & 新港路, 114","crossStreet":"新港路, 114","municipalitySubdivision":"新屋區","municipality":"桃園市","countrySubdivision":"桃園市","postalCode":"327","countryCode":"TW","country":"台灣","countryCodeISO3":"TWN","freeformAddress":"新港路12巷 & 新港路, 新屋區, 桃園市 327","localName":"新屋區","street":"新港路12巷"},"position":"24.98891,121.0177"}]}, [
  'Content-Length',
  '483',
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
  'Ref A: A44889E67BF14AEC8C8F3D82773084A4 Ref B: TYO01EDGE1812 Ref C: 2022-06-22T02:35:37Z',
  'Date',
  'Wed, 22 Jun 2022 02:35:36 GMT'
]);
