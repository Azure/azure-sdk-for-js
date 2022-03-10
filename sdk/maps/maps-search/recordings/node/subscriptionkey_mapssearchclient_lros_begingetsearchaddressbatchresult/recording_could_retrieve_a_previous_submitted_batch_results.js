let nock = require('nock');

module.exports.hash = "52d83fec3e7dda652d5afdb22248ed11";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/search/address/batch/json', {"batchItems":[{"query":"?query=400 Broad St, Seattle, WA 98109&limit=3"},{"query":"?query=One, Microsoft Way, Redmond, WA 98052&limit=3"},{"query":"?query=350 5th Ave, New York, NY 10118&limit=1"}]})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '2',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://atlas.microsoft.com/search/address/batch/<batch-id>?api-version=1.0',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: E4513DDB20274DBA96D6C5C48EC3D036 Ref B: TPE30EDGE0415 Ref C: 2022-03-10T06:33:58Z',
  'Date',
  'Thu, 10 Mar 2022 06:33:58 GMT'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/address/batch/<batch-id>')
  .query(true)
  .reply(200, {"batchItems":[{"statusCode":200,"response":{"summary":{"query":"400 broad st seattle wa 98109","queryType":"NON_NEAR","queryTime":5,"numResults":2,"offset":0,"totalResults":2,"fuzzyLevel":1},"results":[{"type":"Point Address","id":"US/PAD/p1/17733634","score":11.9729099274,"address":{"streetNumber":"400","streetName":"Broad Street","municipalitySubdivision":"Queen Anne","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98109","extendedPostalCode":"98109-4607","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"400 Broad Street, Seattle, WA 98109","localName":"Seattle"},"position":{"lat":47.62039,"lon":-122.34928},"viewport":{"topLeftPoint":{"lat":47.62129,"lon":-122.35061},"btmRightPoint":{"lat":47.61949,"lon":-122.34795}},"entryPoints":[{"type":"main","position":{"lat":47.61982,"lon":-122.34886}}]},{"type":"Street","id":"US/STR/p2/1535374","score":10.22519207,"address":{"streetName":"Broad Street","municipalitySubdivision":"South Lake Union","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98109","extendedPostalCode":"98109-4942","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Broad Street, Seattle, WA 98109","localName":"Seattle"},"position":{"lat":47.61911,"lon":-122.3497},"viewport":{"topLeftPoint":{"lat":47.61965,"lon":-122.35041},"btmRightPoint":{"lat":47.61857,"lon":-122.349}}}]}},{"statusCode":200,"response":{"summary":{"query":"one microsoft way redmond wa 98052","queryType":"NON_NEAR","queryTime":5,"numResults":3,"offset":0,"totalResults":3510,"fuzzyLevel":2},"results":[{"type":"Street","id":"US/STR/p2/1440117","score":10.22519207,"address":{"streetName":"Microsoft Way","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","extendedPostalCode":"98052-6399","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Microsoft Way, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.64016,"lon":-122.1245},"viewport":{"topLeftPoint":{"lat":47.64016,"lon":-122.12466},"btmRightPoint":{"lat":47.64012,"lon":-122.12424}}},{"type":"Street","id":"US/STR/p1/1918987","score":10.0968618393,"address":{"streetName":"157th Avenue Northeast","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","extendedPostalCode":"98052-5344, 98052-5399","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"157th Avenue Northeast, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.64351,"lon":-122.13056},"viewport":{"topLeftPoint":{"lat":47.64471,"lon":-122.13058},"btmRightPoint":{"lat":47.6425,"lon":-122.13014}}},{"type":"Street","id":"US/STR/p1/1925283","score":7.9237017632,"address":{"streetName":"Redmond Way","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","extendedPostalCode":"98052-0008, 98052-0578, 98052-0908, 98052-1504, 98052-3824, 98052-3827, 98052-3829, 98052-3830, 98052-3831, 98052-3832, 98052-3833, 98052-3834, 98052-3835, 98052-3836, 98052-3862, 98052-4060, 98052-4403, 98052-4404, 98052-4405, 98052-4406, 98052-4407, 98052-4429, 98052-4433, 98052-4434, 98052-4435, 98052-4448, 98052-4449, 98052-4450, 98052-4472, 98052-4906, 98052-4907, 98052-4909, 98052-4913, 98052-5000, 98052-5006, 98052-5011, 98052-5012, 98052-5016, 98052-5079","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Redmond Way, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.66985,"lon":-122.10805},"viewport":{"topLeftPoint":{"lat":47.67519,"lon":-122.1244},"btmRightPoint":{"lat":47.6572,"lon":-122.0977}}}]}},{"statusCode":200,"response":{"summary":{"query":"350 5th ave new york ny 10118","queryType":"NON_NEAR","queryTime":4,"numResults":1,"offset":0,"totalResults":840,"fuzzyLevel":1},"results":[{"type":"Point Address","id":"US/PAD/p0/22207648","score":12.0984487534,"address":{"streetNumber":"350","streetName":"5th Avenue","municipalitySubdivision":"Midtown South","municipality":"New York","countrySecondarySubdivision":"New York","countrySubdivision":"NY","countrySubdivisionName":"New York","postalCode":"10001","extendedPostalCode":"10001-3105","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"350 5th Avenue, New York, NY 10001","localName":"New York"},"position":{"lat":40.74817,"lon":-73.985},"viewport":{"topLeftPoint":{"lat":40.74907,"lon":-73.98619},"btmRightPoint":{"lat":40.74727,"lon":-73.98381}},"entryPoints":[{"type":"main","position":{"lat":40.74808,"lon":-73.98482}}]}]}}],"summary":{"successfulRequests":3,"totalRequests":3}}, [
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
  'Ref A: 3E23A4C09E6D4DF6A227C155A1F8F8D5 Ref B: TPE30EDGE0415 Ref C: 2022-03-10T06:33:59Z',
  'Date',
  'Thu, 10 Mar 2022 06:33:58 GMT'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/address/batch/<batch-id>')
  .query(true)
  .reply(200, {"batchItems":[{"statusCode":200,"response":{"summary":{"query":"400 broad st seattle wa 98109","queryType":"NON_NEAR","queryTime":5,"numResults":2,"offset":0,"totalResults":2,"fuzzyLevel":1},"results":[{"type":"Point Address","id":"US/PAD/p1/17733634","score":11.9729099274,"address":{"streetNumber":"400","streetName":"Broad Street","municipalitySubdivision":"Queen Anne","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98109","extendedPostalCode":"98109-4607","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"400 Broad Street, Seattle, WA 98109","localName":"Seattle"},"position":{"lat":47.62039,"lon":-122.34928},"viewport":{"topLeftPoint":{"lat":47.62129,"lon":-122.35061},"btmRightPoint":{"lat":47.61949,"lon":-122.34795}},"entryPoints":[{"type":"main","position":{"lat":47.61982,"lon":-122.34886}}]},{"type":"Street","id":"US/STR/p2/1535374","score":10.22519207,"address":{"streetName":"Broad Street","municipalitySubdivision":"South Lake Union","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98109","extendedPostalCode":"98109-4942","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Broad Street, Seattle, WA 98109","localName":"Seattle"},"position":{"lat":47.61911,"lon":-122.3497},"viewport":{"topLeftPoint":{"lat":47.61965,"lon":-122.35041},"btmRightPoint":{"lat":47.61857,"lon":-122.349}}}]}},{"statusCode":200,"response":{"summary":{"query":"one microsoft way redmond wa 98052","queryType":"NON_NEAR","queryTime":5,"numResults":3,"offset":0,"totalResults":3510,"fuzzyLevel":2},"results":[{"type":"Street","id":"US/STR/p2/1440117","score":10.22519207,"address":{"streetName":"Microsoft Way","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","extendedPostalCode":"98052-6399","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Microsoft Way, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.64016,"lon":-122.1245},"viewport":{"topLeftPoint":{"lat":47.64016,"lon":-122.12466},"btmRightPoint":{"lat":47.64012,"lon":-122.12424}}},{"type":"Street","id":"US/STR/p1/1918987","score":10.0968618393,"address":{"streetName":"157th Avenue Northeast","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","extendedPostalCode":"98052-5344, 98052-5399","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"157th Avenue Northeast, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.64351,"lon":-122.13056},"viewport":{"topLeftPoint":{"lat":47.64471,"lon":-122.13058},"btmRightPoint":{"lat":47.6425,"lon":-122.13014}}},{"type":"Street","id":"US/STR/p1/1925283","score":7.9237017632,"address":{"streetName":"Redmond Way","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","extendedPostalCode":"98052-0008, 98052-0578, 98052-0908, 98052-1504, 98052-3824, 98052-3827, 98052-3829, 98052-3830, 98052-3831, 98052-3832, 98052-3833, 98052-3834, 98052-3835, 98052-3836, 98052-3862, 98052-4060, 98052-4403, 98052-4404, 98052-4405, 98052-4406, 98052-4407, 98052-4429, 98052-4433, 98052-4434, 98052-4435, 98052-4448, 98052-4449, 98052-4450, 98052-4472, 98052-4906, 98052-4907, 98052-4909, 98052-4913, 98052-5000, 98052-5006, 98052-5011, 98052-5012, 98052-5016, 98052-5079","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Redmond Way, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.66985,"lon":-122.10805},"viewport":{"topLeftPoint":{"lat":47.67519,"lon":-122.1244},"btmRightPoint":{"lat":47.6572,"lon":-122.0977}}}]}},{"statusCode":200,"response":{"summary":{"query":"350 5th ave new york ny 10118","queryType":"NON_NEAR","queryTime":4,"numResults":1,"offset":0,"totalResults":840,"fuzzyLevel":1},"results":[{"type":"Point Address","id":"US/PAD/p0/22207648","score":12.0984487534,"address":{"streetNumber":"350","streetName":"5th Avenue","municipalitySubdivision":"Midtown South","municipality":"New York","countrySecondarySubdivision":"New York","countrySubdivision":"NY","countrySubdivisionName":"New York","postalCode":"10001","extendedPostalCode":"10001-3105","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"350 5th Avenue, New York, NY 10001","localName":"New York"},"position":{"lat":40.74817,"lon":-73.985},"viewport":{"topLeftPoint":{"lat":40.74907,"lon":-73.98619},"btmRightPoint":{"lat":40.74727,"lon":-73.98381}},"entryPoints":[{"type":"main","position":{"lat":40.74808,"lon":-73.98482}}]}]}}],"summary":{"successfulRequests":3,"totalRequests":3}}, [
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
  'Ref A: 85D74E17EE484ACC9F3ABCB0FE6A9595 Ref B: TPE30EDGE0415 Ref C: 2022-03-10T06:33:59Z',
  'Date',
  'Thu, 10 Mar 2022 06:33:58 GMT'
]);
