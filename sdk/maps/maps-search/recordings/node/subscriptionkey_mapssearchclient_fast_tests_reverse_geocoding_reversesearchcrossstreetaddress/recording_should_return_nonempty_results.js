let nock = require('nock');

module.exports.hash = "9fa315f974c196583b8a1c11ec3a8d5e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/address/reverse/crossStreet/json')
  .query(true)
  .reply(200, {"summary":{"numResults":1,"queryTime":126},"addresses":[{"address":{"streetName":"新港路12巷 & 新港路, 114","crossStreet":"新港路, 114","municipalitySubdivision":"新屋區","municipality":"桃園市","countrySubdivision":"桃園市","postalCode":"327","countryCode":"TW","country":"台灣","countryCodeISO3":"TWN","freeformAddress":"新港路12巷 & 新港路, 新屋區, 桃園市 327","localName":"新屋區","street":"新港路12巷"},"position":"24.98891,121.0177"}]}, [
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
  'Ref A: BAD44A2EB3EE4A31A79976A19DD9E6EE Ref B: TPE30EDGE0415 Ref C: 2022-03-10T06:33:51Z',
  'Date',
  'Thu, 10 Mar 2022 06:33:50 GMT'
]);
