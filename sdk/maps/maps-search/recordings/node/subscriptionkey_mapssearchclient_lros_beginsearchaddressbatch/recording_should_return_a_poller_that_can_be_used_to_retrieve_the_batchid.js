let nock = require('nock');

module.exports.hash = "bc27ddde2014034c991e23d7421f0d15";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/search/address/batch/json', {"batchItems":[{"query":"?query=400 Broad St, Seattle, WA 98109&limit=3"}]})
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '2',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://atlas.microsoft.com/search/address/batch/baed5579-52a1-4231-97fe-3d6a4e6e7b4d?api-version=1.0',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: A8D8788BB4D34C53A821AB44282E1AF9 Ref B: TYO01EDGE2921 Ref C: 2022-06-22T06:18:18Z',
  'Date',
  'Wed, 22 Jun 2022 06:18:18 GMT' ]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/address/batch/baed5579-52a1-4231-97fe-3d6a4e6e7b4d')
  .query(true)
  .reply(200, {"batchItems":[{"statusCode":200,"response":{"summary":{"query":"400 broad st seattle wa 98109","queryType":"NON_NEAR","queryTime":5,"numResults":2,"offset":0,"totalResults":2,"fuzzyLevel":1},"results":[{"type":"Point Address","id":"US/PAD/p1/49061382","score":11.9729099274,"matchConfidence":{"score":1},"address":{"streetNumber":"400","streetName":"Broad Street","municipalitySubdivision":"Queen Anne","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98109","extendedPostalCode":"98109-4607","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"400 Broad Street, Seattle, WA 98109","localName":"Seattle"},"position":{"lat":47.62039,"lon":-122.34928},"viewport":{"topLeftPoint":{"lat":47.62129,"lon":-122.35061},"btmRightPoint":{"lat":47.61949,"lon":-122.34795}},"entryPoints":[{"type":"main","position":{"lat":47.61982,"lon":-122.34886}}]},{"type":"Street","id":"US/STR/p0/5815408","score":10.22519207,"matchConfidence":{"score":0.8912703912563223},"address":{"streetName":"Broad Street","municipalitySubdivision":"South Lake Union","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98109","extendedPostalCode":"98109-4942","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Broad Street, Seattle, WA 98109","localName":"Seattle"},"position":{"lat":47.61911,"lon":-122.3497},"viewport":{"topLeftPoint":{"lat":47.61965,"lon":-122.35041},"btmRightPoint":{"lat":47.61857,"lon":-122.349}}}]}}],"summary":{"successfulRequests":1,"totalRequests":1}}, [ 'Transfer-Encoding',
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
  'Ref A: 1617D8DD7E6A47BE9EAAC159A03F17B2 Ref B: TYO01EDGE3011 Ref C: 2022-06-22T06:18:18Z',
  'Date',
  'Wed, 22 Jun 2022 06:18:18 GMT' ]);
