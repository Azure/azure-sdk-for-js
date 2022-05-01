let nock = require('nock');

module.exports.hash = "1fd6b6a87665e467f297cf147628171e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/route/matrix/sync/json', {"origins":{"type":"MultiPoint","coordinates":[[4.85106,52.36006],[4.85056,52.36187]]},"destinations":{"type":"MultiPoint","coordinates":[[4.85003,52.36241],[13.42937,52.50931]]}})
  .query(true)
  .reply(200, {"formatVersion":"0.0.1","matrix":[[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":495,"travelTimeInSeconds":133,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-05-01T09:30:58+02:00","arrivalTime":"2022-05-01T09:33:11+02:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":666389,"travelTimeInSeconds":21021,"trafficDelayInSeconds":161,"trafficLengthInMeters":13202,"departureTime":"2022-05-01T09:30:58+02:00","arrivalTime":"2022-05-01T15:21:19+02:00"}}}],[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":338,"travelTimeInSeconds":109,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-05-01T09:30:58+02:00","arrivalTime":"2022-05-01T09:32:47+02:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":666232,"travelTimeInSeconds":20976,"trafficDelayInSeconds":161,"trafficLengthInMeters":13202,"departureTime":"2022-05-01T09:30:58+02:00","arrivalTime":"2022-05-01T15:20:33+02:00"}}}]],"summary":{"successfulRoutes":4,"totalRoutes":4}}, [
  'Content-Length',
  '1047',
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
  'Ref A: 19BC92B887DC4CCEA58702336F8EF463 Ref B: TPE30EDGE0508 Ref C: 2022-05-01T07:30:57Z',
  'Date',
  'Sun, 01 May 2022 07:30:58 GMT'
]);
