let nock = require('nock');

module.exports.hash = "5cffbe6e6329042ad57c107cbb739fa6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/route/matrix/sync/json', {"origins":{"type":"MultiPoint","coordinates":[[4.85106,52.36006],[4.85056,52.36187]]},"destinations":{"type":"MultiPoint","coordinates":[[4.85003,52.36241],[13.42937,52.50931]]}})
  .query(true)
  .reply(200, {"formatVersion":"0.0.1","matrix":[[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":495,"travelTimeInSeconds":130,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-03-14T04:12:27+01:00","arrivalTime":"2022-03-14T04:14:36+01:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":669364,"travelTimeInSeconds":21008,"trafficDelayInSeconds":51,"trafficLengthInMeters":3098,"departureTime":"2022-03-14T04:12:27+01:00","arrivalTime":"2022-03-14T10:02:34+01:00"}}}],[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":338,"travelTimeInSeconds":108,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-03-14T04:12:27+01:00","arrivalTime":"2022-03-14T04:14:14+01:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":669207,"travelTimeInSeconds":20965,"trafficDelayInSeconds":51,"trafficLengthInMeters":3098,"departureTime":"2022-03-14T04:12:27+01:00","arrivalTime":"2022-03-14T10:01:52+01:00"}}}]],"summary":{"successfulRoutes":4,"totalRoutes":4}}, [
  'Content-Length',
  '1043',
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
  'Ref A: ACCAC6055995461AB558347F96EF5588 Ref B: TPE30EDGE0406 Ref C: 2022-03-14T03:12:27Z',
  'Date',
  'Mon, 14 Mar 2022 03:12:27 GMT'
]);
