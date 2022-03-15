let nock = require('nock');

module.exports.hash = "5cffbe6e6329042ad57c107cbb739fa6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/route/matrix/sync/json', {"origins":{"type":"MultiPoint","coordinates":[[4.85106,52.36006],[4.85056,52.36187]]},"destinations":{"type":"MultiPoint","coordinates":[[4.85003,52.36241],[13.42937,52.50931]]}})
  .query(true)
  .reply(200, {"formatVersion":"0.0.1","matrix":[[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":495,"travelTimeInSeconds":130,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-03-15T06:37:11+01:00","arrivalTime":"2022-03-15T06:39:20+01:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":674676,"travelTimeInSeconds":22155,"trafficDelayInSeconds":121,"trafficLengthInMeters":4125,"departureTime":"2022-03-15T06:37:11+01:00","arrivalTime":"2022-03-15T12:46:26+01:00"}}}],[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":338,"travelTimeInSeconds":109,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-03-15T06:37:11+01:00","arrivalTime":"2022-03-15T06:38:59+01:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":674519,"travelTimeInSeconds":22111,"trafficDelayInSeconds":121,"trafficLengthInMeters":4125,"departureTime":"2022-03-15T06:37:11+01:00","arrivalTime":"2022-03-15T12:45:41+01:00"}}}]],"summary":{"successfulRoutes":4,"totalRoutes":4}}, [
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
  'Ref A: 48153C75A50847B0B552FEEF64575635 Ref B: TPE30EDGE0421 Ref C: 2022-03-15T05:37:10Z',
  'Date',
  'Tue, 15 Mar 2022 05:37:11 GMT'
]);
