let nock = require('nock');

module.exports.hash = "b72721796c1e654f24a2e4ce108a1510";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/route/matrix/json', {"origins":{"type":"MultiPoint","coordinates":[[4.85106,52.36006],[4.85056,52.36187]]},"destinations":{"type":"MultiPoint","coordinates":[[4.85003,52.36241],[13.42937,52.50931]]}})
  .query(true)
  .reply(202, "", [
  'Content-Type',
  'application/json',
  'Location',
  'https://atlas.microsoft.com/route/matrix/1749bea5-adb8-48b4-93cb-4e5a7c8bb0d3?api-version=1.0',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 68835067CAF7448589E76FE4758CA61D Ref B: TPE30EDGE0519 Ref C: 2022-05-01T07:31:04Z',
  'Date',
  'Sun, 01 May 2022 07:31:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/route/matrix/1749bea5-adb8-48b4-93cb-4e5a7c8bb0d3')
  .query(true)
  .reply(200, {"formatVersion":"0.0.1","matrix":[[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":495,"travelTimeInSeconds":133,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-05-01T09:31:05+02:00","arrivalTime":"2022-05-01T09:33:18+02:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":666389,"travelTimeInSeconds":21021,"trafficDelayInSeconds":161,"trafficLengthInMeters":13202,"departureTime":"2022-05-01T09:31:05+02:00","arrivalTime":"2022-05-01T15:21:26+02:00"}}}],[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":338,"travelTimeInSeconds":109,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-05-01T09:31:05+02:00","arrivalTime":"2022-05-01T09:32:54+02:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":666232,"travelTimeInSeconds":20977,"trafficDelayInSeconds":162,"trafficLengthInMeters":13202,"departureTime":"2022-05-01T09:31:05+02:00","arrivalTime":"2022-05-01T15:20:42+02:00"}}}]],"summary":{"successfulRoutes":4,"totalRoutes":4}}, [
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
  'Ref A: 9EC2F69F2ADC4346B3EEDAE521B97494 Ref B: TPE30EDGE0519 Ref C: 2022-05-01T07:31:04Z',
  'Date',
  'Sun, 01 May 2022 07:31:04 GMT'
]);
