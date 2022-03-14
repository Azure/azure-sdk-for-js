let nock = require('nock');

module.exports.hash = "0a3b9084bc4e13eab8e43785461467d6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/route/matrix/json', {"origins":{"type":"MultiPoint","coordinates":[[4.85106,52.36006],[4.85056,52.36187]]},"destinations":{"type":"MultiPoint","coordinates":[[4.85003,52.36241],[13.42937,52.50931]]}})
  .query(true)
  .reply(202, "", [
  'Content-Type',
  'application/json',
  'Location',
  'https://atlas.microsoft.com/route/matrix/4529f514-76fe-4f50-99fc-fc97ab50cc05?api-version=1.0',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: B7A32F6355B449629D91F6FC125CB591 Ref B: TPE30EDGE0617 Ref C: 2022-03-14T03:12:38Z',
  'Date',
  'Mon, 14 Mar 2022 03:12:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/route/matrix/4529f514-76fe-4f50-99fc-fc97ab50cc05')
  .query(true)
  .reply(200, {"formatVersion":"0.0.1","matrix":[[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":495,"travelTimeInSeconds":130,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-03-14T04:12:39+01:00","arrivalTime":"2022-03-14T04:14:48+01:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":669364,"travelTimeInSeconds":21007,"trafficDelayInSeconds":51,"trafficLengthInMeters":3098,"departureTime":"2022-03-14T04:12:39+01:00","arrivalTime":"2022-03-14T10:02:46+01:00"}}}],[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":338,"travelTimeInSeconds":108,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-03-14T04:12:39+01:00","arrivalTime":"2022-03-14T04:14:26+01:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":669207,"travelTimeInSeconds":20965,"trafficDelayInSeconds":51,"trafficLengthInMeters":3098,"departureTime":"2022-03-14T04:12:39+01:00","arrivalTime":"2022-03-14T10:02:04+01:00"}}}]],"summary":{"successfulRoutes":4,"totalRoutes":4}}, [
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
  'Ref A: E3B059EF6CA34797B470F4BC83EEE313 Ref B: TPE30EDGE0617 Ref C: 2022-03-14T03:12:39Z',
  'Date',
  'Mon, 14 Mar 2022 03:12:39 GMT'
]);
