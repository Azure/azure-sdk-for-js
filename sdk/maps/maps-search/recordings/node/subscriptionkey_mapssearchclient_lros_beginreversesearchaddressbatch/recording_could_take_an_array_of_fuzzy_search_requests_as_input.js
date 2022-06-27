let nock = require('nock');

module.exports.hash = "5fd08cbae16252fef249bb2bd36005e5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/search/address/reverse/batch/json', {"batchItems":[{"query":"?query=48.858561,2.294911"},{"query":"?query=47.639765,-122.127896&radius=5000"},{"query":"?query=47.621028,-122.34817"}]})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '2',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://atlas.microsoft.com/search/address/reverse/batch/258524bf-1593-477d-ad4c-5f358a416af8?api-version=1.0',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 917E30D6BC3A44D6BBA0B3117467CF45 Ref B: TPE30EDGE0517 Ref C: 2022-06-27T02:24:56Z',
  'Date',
  'Mon, 27 Jun 2022 02:24:56 GMT'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/address/reverse/batch/258524bf-1593-477d-ad4c-5f358a416af8')
  .query(true)
  .reply(200, {"batchItems":[{"statusCode":200,"response":{"summary":{"queryTime":5,"numResults":1},"addresses":[{"address":{"buildingNumber":"5","streetNumber":"5","routeNumbers":[],"street":"Esplanade des Ouvriers de la Tour Eiffel","streetName":"Esplanade des Ouvriers de la Tour Eiffel","streetNameAndNumber":"5 Esplanade des Ouvriers de la Tour Eiffel","countryCode":"FR","countrySubdivision":"Île-de-France","countrySecondarySubdivision":"Paris","municipality":"Paris","postalCode":"75007","municipalitySubdivision":"7ème Arrondissement","country":"France","countryCodeISO3":"FRA","freeformAddress":"5 Esplanade des Ouvriers de la Tour Eiffel, 75007 Paris","boundingBox":{"northEast":"48.858576,2.295027","southWest":"48.858321,2.294559","entity":"position"},"localName":"Paris"},"position":"48.858582,2.294525"}]}},{"statusCode":200,"response":{"summary":{"queryTime":3,"numResults":1},"addresses":[{"address":{"routeNumbers":[],"street":"Northeast 31st Street","streetName":"Northeast 31st Street","countryCode":"US","countrySubdivision":"WA","countrySecondarySubdivision":"King","municipality":"Redmond","postalCode":"98052","country":"United States","countryCodeISO3":"USA","freeformAddress":"Northeast 31st Street, Redmond, WA 98052","boundingBox":{"northEast":"47.638988,-122.126617","southWest":"47.638122,-122.127537","entity":"position"},"extendedPostalCode":"98052-7070","countrySubdivisionName":"Washington","localName":"Redmond"},"position":"47.638988,-122.127541"}]}},{"statusCode":200,"response":{"summary":{"queryTime":2,"numResults":1},"addresses":[{"address":{"buildingNumber":"410","streetNumber":"410","routeNumbers":[],"street":"Thomas Street","streetName":"Thomas Street","streetNameAndNumber":"410 Thomas Street","countryCode":"US","countrySubdivision":"WA","countrySecondarySubdivision":"King","municipality":"Seattle","postalCode":"98109","municipalitySubdivision":"Queen Anne","country":"United States","countryCodeISO3":"USA","freeformAddress":"410 Thomas Street, Seattle, WA 98109","boundingBox":{"northEast":"47.620954,-122.347601","southWest":"47.620944,-122.348498","entity":"position"},"countrySubdivisionName":"Washington","localName":"Seattle"},"position":"47.620945,-122.348175"}]}}],"summary":{"successfulRequests":3,"totalRequests":3}}, [
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
  'Ref A: 2EAD077F3AE64DE0A320B92993D031FE Ref B: TPE30EDGE0517 Ref C: 2022-06-27T02:24:56Z',
  'Date',
  'Mon, 27 Jun 2022 02:24:56 GMT'
]);
