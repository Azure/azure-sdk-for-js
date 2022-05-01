let nock = require('nock');

module.exports.hash = "865f5890bf9c9fb0c2bdf43d8eb74d5a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/route/matrix/json', {"origins":{"type":"MultiPoint","coordinates":[[4.85106,52.36006],[4.85056,52.36187]]},"destinations":{"type":"MultiPoint","coordinates":[[4.85003,52.36241],[13.42937,52.50931]]}})
  .query(true)
  .reply(202, "", [
  'Content-Type',
  'application/json',
  'Location',
  'https://atlas.microsoft.com/route/matrix/408c151c-7025-4d31-9282-6f2a49e3323b?api-version=1.0',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 91A9F8162FDE4157854ABB8EEFCB2E0C Ref B: TPE30EDGE0519 Ref C: 2022-05-01T07:31:03Z',
  'Date',
  'Sun, 01 May 2022 07:31:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/route/matrix/408c151c-7025-4d31-9282-6f2a49e3323b')
  .query(true)
  .reply(200, {"formatVersion":"0.0.1","matrix":[[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":495,"travelTimeInSeconds":133,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-05-01T09:31:04+02:00","arrivalTime":"2022-05-01T09:33:17+02:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":666389,"travelTimeInSeconds":21023,"trafficDelayInSeconds":162,"trafficLengthInMeters":13202,"departureTime":"2022-05-01T09:31:04+02:00","arrivalTime":"2022-05-01T15:21:26+02:00"}}}],[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":338,"travelTimeInSeconds":109,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-05-01T09:31:04+02:00","arrivalTime":"2022-05-01T09:32:53+02:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":666232,"travelTimeInSeconds":20976,"trafficDelayInSeconds":161,"trafficLengthInMeters":13202,"departureTime":"2022-05-01T09:31:04+02:00","arrivalTime":"2022-05-01T15:20:39+02:00"}}}]],"summary":{"successfulRoutes":4,"totalRoutes":4}}, [
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
  'Ref A: F375AF68FFCE402483F0606269785C03 Ref B: TPE30EDGE0519 Ref C: 2022-05-01T07:31:03Z',
  'Date',
  'Sun, 01 May 2022 07:31:03 GMT'
]);
