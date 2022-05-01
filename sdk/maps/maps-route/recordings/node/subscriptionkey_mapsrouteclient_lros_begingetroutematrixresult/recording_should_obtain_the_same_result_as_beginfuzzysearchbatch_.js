let nock = require('nock');

module.exports.hash = "ddfaa707ddba801f3539dcea6e21d746";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/route/matrix/json', {"origins":{"type":"MultiPoint","coordinates":[[4.85106,52.36006],[4.85056,52.36187]]},"destinations":{"type":"MultiPoint","coordinates":[[4.85003,52.36241],[13.42937,52.50931]]}})
  .query(true)
  .reply(202, "", [
  'Content-Type',
  'application/json',
  'Location',
  'https://atlas.microsoft.com/route/matrix/cc2620cd-ce8c-4a4e-a790-26d8ccea4c0c?api-version=1.0',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 2A8417818B8048B88F2A51F06EBC1D90 Ref B: TPE30EDGE0618 Ref C: 2022-05-01T07:31:06Z',
  'Date',
  'Sun, 01 May 2022 07:31:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/route/matrix/cc2620cd-ce8c-4a4e-a790-26d8ccea4c0c')
  .query(true)
  .reply(200, {"formatVersion":"0.0.1","matrix":[[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":495,"travelTimeInSeconds":133,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-05-01T09:31:07+02:00","arrivalTime":"2022-05-01T09:33:20+02:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":666389,"travelTimeInSeconds":21022,"trafficDelayInSeconds":161,"trafficLengthInMeters":13202,"departureTime":"2022-05-01T09:31:07+02:00","arrivalTime":"2022-05-01T15:21:28+02:00"}}}],[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":338,"travelTimeInSeconds":109,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-05-01T09:31:07+02:00","arrivalTime":"2022-05-01T09:32:56+02:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":666232,"travelTimeInSeconds":20976,"trafficDelayInSeconds":161,"trafficLengthInMeters":13202,"departureTime":"2022-05-01T09:31:07+02:00","arrivalTime":"2022-05-01T15:20:42+02:00"}}}]],"summary":{"successfulRoutes":4,"totalRoutes":4}}, [
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
  'Ref A: 139E61BF33824C8AA58D063BED6D4EB2 Ref B: TPE30EDGE0618 Ref C: 2022-05-01T07:31:07Z',
  'Date',
  'Sun, 01 May 2022 07:31:06 GMT'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/route/matrix/cc2620cd-ce8c-4a4e-a790-26d8ccea4c0c')
  .query(true)
  .reply(200, {"formatVersion":"0.0.1","matrix":[[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":495,"travelTimeInSeconds":133,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-05-01T09:31:07+02:00","arrivalTime":"2022-05-01T09:33:20+02:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":666389,"travelTimeInSeconds":21022,"trafficDelayInSeconds":161,"trafficLengthInMeters":13202,"departureTime":"2022-05-01T09:31:07+02:00","arrivalTime":"2022-05-01T15:21:28+02:00"}}}],[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":338,"travelTimeInSeconds":109,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-05-01T09:31:07+02:00","arrivalTime":"2022-05-01T09:32:56+02:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":666232,"travelTimeInSeconds":20976,"trafficDelayInSeconds":161,"trafficLengthInMeters":13202,"departureTime":"2022-05-01T09:31:07+02:00","arrivalTime":"2022-05-01T15:20:42+02:00"}}}]],"summary":{"successfulRoutes":4,"totalRoutes":4}}, [
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
  'Ref A: 1F092B9EB4AD4334ABDC451DC89E7988 Ref B: TPE30EDGE0618 Ref C: 2022-05-01T07:31:07Z',
  'Date',
  'Sun, 01 May 2022 07:31:06 GMT'
]);
