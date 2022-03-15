let nock = require('nock');

module.exports.hash = "4a317b6fd31794338cfe5d48581e95eb";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/route/matrix/json', {"origins":{"type":"MultiPoint","coordinates":[[4.85106,52.36006],[4.85056,52.36187]]},"destinations":{"type":"MultiPoint","coordinates":[[4.85003,52.36241],[13.42937,52.50931]]}})
  .query(true)
  .reply(202, "", [
  'Content-Type',
  'application/json',
  'Location',
  'https://atlas.microsoft.com/route/matrix/90b8e95f-0b17-4ed9-8dea-c207e4bc2675?api-version=1.0',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 2F9EB398D9D44603A63503A0567AA563 Ref B: TPE30EDGE0411 Ref C: 2022-03-15T05:37:18Z',
  'Date',
  'Tue, 15 Mar 2022 05:37:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/route/matrix/90b8e95f-0b17-4ed9-8dea-c207e4bc2675')
  .query(true)
  .reply(200, {"formatVersion":"0.0.1","matrix":[[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":495,"travelTimeInSeconds":130,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-03-15T06:37:19+01:00","arrivalTime":"2022-03-15T06:39:28+01:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":674676,"travelTimeInSeconds":22156,"trafficDelayInSeconds":121,"trafficLengthInMeters":4125,"departureTime":"2022-03-15T06:37:19+01:00","arrivalTime":"2022-03-15T12:46:34+01:00"}}}],[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":338,"travelTimeInSeconds":109,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-03-15T06:37:19+01:00","arrivalTime":"2022-03-15T06:39:07+01:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":674519,"travelTimeInSeconds":22111,"trafficDelayInSeconds":121,"trafficLengthInMeters":4125,"departureTime":"2022-03-15T06:37:19+01:00","arrivalTime":"2022-03-15T12:45:50+01:00"}}}]],"summary":{"successfulRoutes":4,"totalRoutes":4}}, [
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
  'Ref A: DF0525924B23490183E4A4108DB9E384 Ref B: TPE30EDGE0411 Ref C: 2022-03-15T05:37:18Z',
  'Date',
  'Tue, 15 Mar 2022 05:37:18 GMT'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/route/matrix/90b8e95f-0b17-4ed9-8dea-c207e4bc2675')
  .query(true)
  .reply(200, {"formatVersion":"0.0.1","matrix":[[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":495,"travelTimeInSeconds":130,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-03-15T06:37:19+01:00","arrivalTime":"2022-03-15T06:39:28+01:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":674676,"travelTimeInSeconds":22156,"trafficDelayInSeconds":121,"trafficLengthInMeters":4125,"departureTime":"2022-03-15T06:37:19+01:00","arrivalTime":"2022-03-15T12:46:34+01:00"}}}],[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":338,"travelTimeInSeconds":109,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-03-15T06:37:19+01:00","arrivalTime":"2022-03-15T06:39:07+01:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":674519,"travelTimeInSeconds":22111,"trafficDelayInSeconds":121,"trafficLengthInMeters":4125,"departureTime":"2022-03-15T06:37:19+01:00","arrivalTime":"2022-03-15T12:45:50+01:00"}}}]],"summary":{"successfulRoutes":4,"totalRoutes":4}}, [
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
  'Ref A: AACF1F048F234CB793594AF2D7FA6BD9 Ref B: TPE30EDGE0411 Ref C: 2022-03-15T05:37:19Z',
  'Date',
  'Tue, 15 Mar 2022 05:37:19 GMT'
]);
