let nock = require('nock');

module.exports.hash = "9d4921867e8baf873527a25b4802a046";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/address/reverse/crossStreet/json')
  .query(true)
  .reply(200, {"summary":{"numResults":1,"queryTime":130},"addresses":[{"address":{"streetName":"新港路12巷 & 新港路, 114","crossStreet":"新港路, 114","municipalitySubdivision":"新屋區","municipality":"桃園市","countrySubdivision":"桃園市","postalCode":"327","countryCode":"TW","country":"台灣","countryCodeISO3":"TWN","freeformAddress":"新港路12巷 & 新港路, 新屋區, 桃園市 327","localName":"新屋區","street":"新港路12巷"},"position":"24.98891,121.0177"}]}, [ 'Content-Length',
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
  'Ref A: 74DA2777D82A4D2FAE11B7F0EBE68C75 Ref B: TYO01EDGE3011 Ref C: 2022-06-22T06:18:12Z',
  'Date',
  'Wed, 22 Jun 2022 06:18:11 GMT' ]);
