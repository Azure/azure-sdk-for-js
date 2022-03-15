let nock = require('nock');

module.exports.hash = "0a3b9084bc4e13eab8e43785461467d6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/route/matrix/json', {"origins":{"type":"MultiPoint","coordinates":[[4.85106,52.36006],[4.85056,52.36187]]},"destinations":{"type":"MultiPoint","coordinates":[[4.85003,52.36241],[13.42937,52.50931]]}})
  .query(true)
  .reply(202, "", [
  'Content-Type',
  'application/json',
  'Location',
  'https://atlas.microsoft.com/route/matrix/bebbd7d0-2538-4576-a53e-ee62cc685a61?api-version=1.0',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 9F3FAAAED109418490EB8A4B9CAE16A4 Ref B: TPE30EDGE0615 Ref C: 2022-03-15T05:37:16Z',
  'Date',
  'Tue, 15 Mar 2022 05:37:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/route/matrix/bebbd7d0-2538-4576-a53e-ee62cc685a61')
  .query(true)
  .reply(200, {"formatVersion":"0.0.1","matrix":[[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":495,"travelTimeInSeconds":130,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-03-15T06:37:17+01:00","arrivalTime":"2022-03-15T06:39:26+01:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":674676,"travelTimeInSeconds":22156,"trafficDelayInSeconds":121,"trafficLengthInMeters":4125,"departureTime":"2022-03-15T06:37:17+01:00","arrivalTime":"2022-03-15T12:46:32+01:00"}}}],[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":338,"travelTimeInSeconds":109,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-03-15T06:37:17+01:00","arrivalTime":"2022-03-15T06:39:05+01:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":674519,"travelTimeInSeconds":22111,"trafficDelayInSeconds":121,"trafficLengthInMeters":4125,"departureTime":"2022-03-15T06:37:17+01:00","arrivalTime":"2022-03-15T12:45:48+01:00"}}}]],"summary":{"successfulRoutes":4,"totalRoutes":4}}, [
  'Content-Length',
  '1045',
  'Content-Type',
  'application/json; charset=utf-8',
  'Vary',
  'Accept-Encoding,User-Agent',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: DE78815605FA4639B0BB4238CCBD97EA Ref B: TPE30EDGE0615 Ref C: 2022-03-15T05:37:17Z',
  'Date',
  'Tue, 15 Mar 2022 05:37:17 GMT'
]);
