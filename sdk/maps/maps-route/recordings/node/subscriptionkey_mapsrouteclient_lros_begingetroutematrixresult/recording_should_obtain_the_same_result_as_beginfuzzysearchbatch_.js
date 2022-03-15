let nock = require('nock');

module.exports.hash = "3319f2501f19dccde134190b5e1a067d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/route/matrix/json', {"origins":{"type":"MultiPoint","coordinates":[[4.85106,52.36006],[4.85056,52.36187]]},"destinations":{"type":"MultiPoint","coordinates":[[4.85003,52.36241],[13.42937,52.50931]]}})
  .query(true)
  .reply(202, "", [
  'Content-Type',
  'application/json',
  'Location',
  'https://atlas.microsoft.com/route/matrix/7a4917f4-0371-44fe-b9e3-b9dfb5f0643d?api-version=1.0',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 20523EBF309243E4B9C1B57AD676C7ED Ref B: TPE30EDGE0411 Ref C: 2022-03-15T05:37:19Z',
  'Date',
  'Tue, 15 Mar 2022 05:37:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/route/matrix/7a4917f4-0371-44fe-b9e3-b9dfb5f0643d')
  .query(true)
  .reply(200, {"formatVersion":"0.0.1","matrix":[[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":495,"travelTimeInSeconds":130,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-03-15T06:37:20+01:00","arrivalTime":"2022-03-15T06:39:29+01:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":674676,"travelTimeInSeconds":22156,"trafficDelayInSeconds":121,"trafficLengthInMeters":4125,"departureTime":"2022-03-15T06:37:20+01:00","arrivalTime":"2022-03-15T12:46:36+01:00"}}}],[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":338,"travelTimeInSeconds":109,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-03-15T06:37:20+01:00","arrivalTime":"2022-03-15T06:39:08+01:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":674519,"travelTimeInSeconds":22111,"trafficDelayInSeconds":121,"trafficLengthInMeters":4125,"departureTime":"2022-03-15T06:37:20+01:00","arrivalTime":"2022-03-15T12:45:51+01:00"}}}]],"summary":{"successfulRoutes":4,"totalRoutes":4}}, [
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
  'Ref A: 1BCA945260124171A21B5487FA24E6E2 Ref B: TPE30EDGE0411 Ref C: 2022-03-15T05:37:19Z',
  'Date',
  'Tue, 15 Mar 2022 05:37:20 GMT'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/route/matrix/7a4917f4-0371-44fe-b9e3-b9dfb5f0643d')
  .query(true)
  .reply(200, {"formatVersion":"0.0.1","matrix":[[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":495,"travelTimeInSeconds":130,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-03-15T06:37:20+01:00","arrivalTime":"2022-03-15T06:39:29+01:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":674676,"travelTimeInSeconds":22156,"trafficDelayInSeconds":121,"trafficLengthInMeters":4125,"departureTime":"2022-03-15T06:37:20+01:00","arrivalTime":"2022-03-15T12:46:36+01:00"}}}],[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":338,"travelTimeInSeconds":109,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-03-15T06:37:20+01:00","arrivalTime":"2022-03-15T06:39:08+01:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":674519,"travelTimeInSeconds":22111,"trafficDelayInSeconds":121,"trafficLengthInMeters":4125,"departureTime":"2022-03-15T06:37:20+01:00","arrivalTime":"2022-03-15T12:45:51+01:00"}}}]],"summary":{"successfulRoutes":4,"totalRoutes":4}}, [
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
  'Ref A: A05BE302F14A47CC9AE1501C2BE4B891 Ref B: TPE30EDGE0411 Ref C: 2022-03-15T05:37:20Z',
  'Date',
  'Tue, 15 Mar 2022 05:37:20 GMT'
]);
