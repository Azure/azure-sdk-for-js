let nock = require('nock');

module.exports.hash = "bc27ddde2014034c991e23d7421f0d15";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/search/address/batch/json', {"batchItems":[{"query":"?query=400 Broad St, Seattle, WA 98109&limit=3"}]})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '2',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://atlas.microsoft.com/search/address/batch/7061aa0b-e376-4f2b-91b1-02ef7d3db3e3?api-version=1.0',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 26D079743A88431A96187749F35953C2 Ref B: TPE30EDGE0719 Ref C: 2022-06-27T02:24:54Z',
  'Date',
  'Mon, 27 Jun 2022 02:24:54 GMT'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/address/batch/7061aa0b-e376-4f2b-91b1-02ef7d3db3e3')
  .query(true)
  .reply(200, {"batchItems":[{"statusCode":200,"response":{"summary":{"query":"400 broad st seattle wa 98109","queryType":"NON_NEAR","queryTime":4,"numResults":2,"offset":0,"totalResults":2,"fuzzyLevel":1},"results":[{"type":"Point Address","id":"US/PAD/p1/17447253","score":11.9729099274,"matchConfidence":{"score":1},"address":{"streetNumber":"400","streetName":"Broad Street","municipalitySubdivision":"Queen Anne","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98109","extendedPostalCode":"98109-4607","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"400 Broad Street, Seattle, WA 98109","localName":"Seattle"},"position":{"lat":47.62039,"lon":-122.34928},"viewport":{"topLeftPoint":{"lat":47.62129,"lon":-122.35061},"btmRightPoint":{"lat":47.61949,"lon":-122.34795}},"entryPoints":[{"type":"main","position":{"lat":47.61982,"lon":-122.34886}}]},{"type":"Street","id":"US/STR/p2/2178638","score":10.22519207,"matchConfidence":{"score":0.8897876989876883},"address":{"streetName":"Broad Street","municipalitySubdivision":"South Lake Union","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98109","extendedPostalCode":"98109-4942","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Broad Street, Seattle, WA 98109","localName":"Seattle"},"position":{"lat":47.61911,"lon":-122.3497},"viewport":{"topLeftPoint":{"lat":47.61965,"lon":-122.35041},"btmRightPoint":{"lat":47.61857,"lon":-122.349}}}]}}],"summary":{"successfulRequests":1,"totalRequests":1}}, [
  'Transfer-Encoding',
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
  'Ref A: CCFE037466774E70A841141598DF1DEC Ref B: TPE30EDGE0719 Ref C: 2022-06-27T02:24:54Z',
  'Date',
  'Mon, 27 Jun 2022 02:24:54 GMT'
]);
