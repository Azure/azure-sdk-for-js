let nock = require('nock');

module.exports.hash = "163c21100806b58dfabebcdee854f7fb";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/route/matrix/json', {"origins":{"type":"MultiPoint","coordinates":[[4.85106,52.36006],[4.85056,52.36187]]},"destinations":{"type":"MultiPoint","coordinates":[[4.85003,52.36241],[13.42937,52.50931]]}})
  .query(true)
  .reply(202, "", [
  'Content-Type',
  'application/json',
  'Location',
  'https://atlas.microsoft.com/route/matrix/3f04849b-03f0-49f2-9440-f3b821888467?api-version=1.0',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 2E4847EA05E74C02A22ACECD968853DF Ref B: TPE30EDGE0618 Ref C: 2022-05-01T07:31:05Z',
  'Date',
  'Sun, 01 May 2022 07:31:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/route/matrix/3f04849b-03f0-49f2-9440-f3b821888467')
  .query(true)
  .reply(200, {"formatVersion":"0.0.1","matrix":[[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":495,"travelTimeInSeconds":133,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-05-01T09:31:06+02:00","arrivalTime":"2022-05-01T09:33:19+02:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":666389,"travelTimeInSeconds":21023,"trafficDelayInSeconds":162,"trafficLengthInMeters":13202,"departureTime":"2022-05-01T09:31:06+02:00","arrivalTime":"2022-05-01T15:21:29+02:00"}}}],[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":338,"travelTimeInSeconds":109,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-05-01T09:31:06+02:00","arrivalTime":"2022-05-01T09:32:55+02:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":666232,"travelTimeInSeconds":20977,"trafficDelayInSeconds":162,"trafficLengthInMeters":13202,"departureTime":"2022-05-01T09:31:06+02:00","arrivalTime":"2022-05-01T15:20:43+02:00"}}}]],"summary":{"successfulRoutes":4,"totalRoutes":4}}, [
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
  'Ref A: D8B66049050741AFBE5FA28972CCE40B Ref B: TPE30EDGE0618 Ref C: 2022-05-01T07:31:05Z',
  'Date',
  'Sun, 01 May 2022 07:31:05 GMT'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/route/matrix/3f04849b-03f0-49f2-9440-f3b821888467')
  .query(true)
  .reply(200, {"formatVersion":"0.0.1","matrix":[[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":495,"travelTimeInSeconds":133,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-05-01T09:31:06+02:00","arrivalTime":"2022-05-01T09:33:19+02:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":666389,"travelTimeInSeconds":21023,"trafficDelayInSeconds":162,"trafficLengthInMeters":13202,"departureTime":"2022-05-01T09:31:06+02:00","arrivalTime":"2022-05-01T15:21:29+02:00"}}}],[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":338,"travelTimeInSeconds":109,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-05-01T09:31:06+02:00","arrivalTime":"2022-05-01T09:32:55+02:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":666232,"travelTimeInSeconds":20977,"trafficDelayInSeconds":162,"trafficLengthInMeters":13202,"departureTime":"2022-05-01T09:31:06+02:00","arrivalTime":"2022-05-01T15:20:43+02:00"}}}]],"summary":{"successfulRoutes":4,"totalRoutes":4}}, [
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
  'Ref A: D38819F84C394654BA26EE2EBCDC76B1 Ref B: TPE30EDGE0618 Ref C: 2022-05-01T07:31:06Z',
  'Date',
  'Sun, 01 May 2022 07:31:05 GMT'
]);
