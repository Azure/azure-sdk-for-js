let nock = require('nock');

module.exports.hash = "6d8f684ec45972be5fb4a203544523d8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/search/address/reverse/batch/json', {"batchItems":[{"query":"?query=47.621028,-122.34817"}]})
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '2',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://atlas.microsoft.com/search/address/reverse/batch/d5490322-3790-4744-8c58-7e25951771f8?api-version=1.0',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 0B76E0EDF0D046F5B895DA0016E0A98C Ref B: TYO01EDGE3011 Ref C: 2022-06-22T06:18:20Z',
  'Date',
  'Wed, 22 Jun 2022 06:18:20 GMT' ]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/address/reverse/batch/d5490322-3790-4744-8c58-7e25951771f8')
  .query(true)
  .reply(200, {"batchItems":[{"statusCode":200,"response":{"summary":{"queryTime":3,"numResults":1},"addresses":[{"address":{"buildingNumber":"410","streetNumber":"410","routeNumbers":[],"street":"Thomas Street","streetName":"Thomas Street","streetNameAndNumber":"410 Thomas Street","countryCode":"US","countrySubdivision":"WA","countrySecondarySubdivision":"King","municipality":"Seattle","postalCode":"98109","municipalitySubdivision":"Queen Anne","country":"United States","countryCodeISO3":"USA","freeformAddress":"410 Thomas Street, Seattle, WA 98109","boundingBox":{"northEast":"47.620954,-122.347601","southWest":"47.620944,-122.348498","entity":"position"},"countrySubdivisionName":"Washington","localName":"Seattle"},"position":"47.620945,-122.348175"}]}}],"summary":{"successfulRequests":1,"totalRequests":1}}, [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: A31352F972954E3DA31A4D9455436249 Ref B: TYAEDGE0916 Ref C: 2022-06-22T06:18:21Z',
  'Date',
  'Wed, 22 Jun 2022 06:18:21 GMT' ]);
