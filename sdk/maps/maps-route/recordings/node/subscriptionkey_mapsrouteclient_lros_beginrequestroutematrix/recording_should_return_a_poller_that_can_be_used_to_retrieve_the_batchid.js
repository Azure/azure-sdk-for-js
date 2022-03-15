let nock = require('nock');

module.exports.hash = "3f757566811b7dfa14bcc9cbf3202d65";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/route/matrix/json', {"origins":{"type":"MultiPoint","coordinates":[[4.85106,52.36006],[4.85056,52.36187]]},"destinations":{"type":"MultiPoint","coordinates":[[4.85003,52.36241],[13.42937,52.50931]]}})
  .query(true)
  .reply(202, "", [
  'Content-Type',
  'application/json',
  'Location',
  'https://atlas.microsoft.com/route/matrix/8c4af132-a77d-4d21-ba73-9ddcb17bd4fd?api-version=1.0',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: CFCFCD435158424789AF98A35185C6D6 Ref B: TPE30EDGE0615 Ref C: 2022-03-15T05:37:17Z',
  'Date',
  'Tue, 15 Mar 2022 05:37:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/route/matrix/8c4af132-a77d-4d21-ba73-9ddcb17bd4fd')
  .query(true)
  .reply(200, {"formatVersion":"0.0.1","matrix":[[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":495,"travelTimeInSeconds":130,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-03-15T06:37:18+01:00","arrivalTime":"2022-03-15T06:39:27+01:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":674676,"travelTimeInSeconds":22156,"trafficDelayInSeconds":121,"trafficLengthInMeters":4125,"departureTime":"2022-03-15T06:37:18+01:00","arrivalTime":"2022-03-15T12:46:33+01:00"}}}],[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":338,"travelTimeInSeconds":109,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-03-15T06:37:18+01:00","arrivalTime":"2022-03-15T06:39:06+01:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":674519,"travelTimeInSeconds":22111,"trafficDelayInSeconds":121,"trafficLengthInMeters":4125,"departureTime":"2022-03-15T06:37:18+01:00","arrivalTime":"2022-03-15T12:45:49+01:00"}}}]],"summary":{"successfulRoutes":4,"totalRoutes":4}}, [
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
  'Ref A: B32E438BD7FD4E84B504C1C9BB8B1621 Ref B: TPE30EDGE0615 Ref C: 2022-03-15T05:37:17Z',
  'Date',
  'Tue, 15 Mar 2022 05:37:17 GMT'
]);
