let nock = require('nock');

module.exports.hash = "ddfaa707ddba801f3539dcea6e21d746";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/route/matrix/json', {"origins":{"type":"MultiPoint","coordinates":[[4.85106,52.36006],[4.85056,52.36187]]},"destinations":{"type":"MultiPoint","coordinates":[[4.85003,52.36241],[13.42937,52.50931]]}})
  .query(true)
  .reply(202, "", [ 'Content-Type',
  'application/json',
  'Location',
  'https://atlas.microsoft.com/route/matrix/f5100d34-fd75-428e-add1-30b8783d9fb6?api-version=1.0',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 93FBCBC5DCE0445D9C51425ED36D33C3 Ref B: TYO01EDGE3115 Ref C: 2022-06-29T08:18:20Z',
  'Date',
  'Wed, 29 Jun 2022 08:18:19 GMT',
  'Content-Length',
  '0' ]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/route/matrix/f5100d34-fd75-428e-add1-30b8783d9fb6')
  .query(true)
  .reply(200, {"formatVersion":"0.0.1","matrix":[[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":495,"travelTimeInSeconds":123,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-06-29T10:18:20+02:00","arrivalTime":"2022-06-29T10:20:23+02:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":666794,"travelTimeInSeconds":22528,"trafficDelayInSeconds":234,"trafficLengthInMeters":9179,"departureTime":"2022-06-29T10:18:20+02:00","arrivalTime":"2022-06-29T16:33:48+02:00"}}}],[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":338,"travelTimeInSeconds":104,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-06-29T10:18:20+02:00","arrivalTime":"2022-06-29T10:20:03+02:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":666637,"travelTimeInSeconds":22487,"trafficDelayInSeconds":234,"trafficLengthInMeters":9179,"departureTime":"2022-06-29T10:18:20+02:00","arrivalTime":"2022-06-29T16:33:07+02:00"}}}]],"summary":{"successfulRoutes":4,"totalRoutes":4}}, [ 'Content-Length',
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
  'Ref A: 23A5A28315D346BAA650BA52EB707338 Ref B: TYBEDGE0812 Ref C: 2022-06-29T08:18:20Z',
  'Date',
  'Wed, 29 Jun 2022 08:18:20 GMT' ]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/route/matrix/f5100d34-fd75-428e-add1-30b8783d9fb6')
  .query(true)
  .reply(200, {"formatVersion":"0.0.1","matrix":[[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":495,"travelTimeInSeconds":123,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-06-29T10:18:20+02:00","arrivalTime":"2022-06-29T10:20:23+02:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":666794,"travelTimeInSeconds":22528,"trafficDelayInSeconds":234,"trafficLengthInMeters":9179,"departureTime":"2022-06-29T10:18:20+02:00","arrivalTime":"2022-06-29T16:33:48+02:00"}}}],[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":338,"travelTimeInSeconds":104,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-06-29T10:18:20+02:00","arrivalTime":"2022-06-29T10:20:03+02:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":666637,"travelTimeInSeconds":22487,"trafficDelayInSeconds":234,"trafficLengthInMeters":9179,"departureTime":"2022-06-29T10:18:20+02:00","arrivalTime":"2022-06-29T16:33:07+02:00"}}}]],"summary":{"successfulRoutes":4,"totalRoutes":4}}, [ 'Content-Length',
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
  'Ref A: 44E209CBF779457E8B88A0F1CC452A10 Ref B: TYAEDGE0418 Ref C: 2022-06-29T08:18:20Z',
  'Date',
  'Wed, 29 Jun 2022 08:18:20 GMT' ]);
