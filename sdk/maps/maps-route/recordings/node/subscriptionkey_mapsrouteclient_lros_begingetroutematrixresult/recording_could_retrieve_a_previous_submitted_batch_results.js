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
  'https://atlas.microsoft.com/route/matrix/71171c23-441b-4168-be4b-ed533f30cca8?api-version=1.0',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 12BF50DAD5BF46D2A465007355A1F64E Ref B: TPE30EDGE0518 Ref C: 2022-03-14T03:12:40Z',
  'Date',
  'Mon, 14 Mar 2022 03:12:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/route/matrix/71171c23-441b-4168-be4b-ed533f30cca8')
  .query(true)
  .reply(200, {"formatVersion":"0.0.1","matrix":[[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":495,"travelTimeInSeconds":130,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-03-14T04:12:40+01:00","arrivalTime":"2022-03-14T04:14:49+01:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":669364,"travelTimeInSeconds":21007,"trafficDelayInSeconds":51,"trafficLengthInMeters":3098,"departureTime":"2022-03-14T04:12:40+01:00","arrivalTime":"2022-03-14T10:02:47+01:00"}}}],[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":338,"travelTimeInSeconds":108,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-03-14T04:12:40+01:00","arrivalTime":"2022-03-14T04:14:27+01:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":669207,"travelTimeInSeconds":20966,"trafficDelayInSeconds":51,"trafficLengthInMeters":3098,"departureTime":"2022-03-14T04:12:40+01:00","arrivalTime":"2022-03-14T10:02:05+01:00"}}}]],"summary":{"successfulRoutes":4,"totalRoutes":4}}, [
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
  'Ref A: F9B79FC2DFD14369A492AC5AB1EC14CB Ref B: TPE30EDGE0518 Ref C: 2022-03-14T03:12:40Z',
  'Date',
  'Mon, 14 Mar 2022 03:12:40 GMT'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/route/matrix/71171c23-441b-4168-be4b-ed533f30cca8')
  .query(true)
  .reply(200, {"formatVersion":"0.0.1","matrix":[[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":495,"travelTimeInSeconds":130,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-03-14T04:12:40+01:00","arrivalTime":"2022-03-14T04:14:49+01:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":669364,"travelTimeInSeconds":21007,"trafficDelayInSeconds":51,"trafficLengthInMeters":3098,"departureTime":"2022-03-14T04:12:40+01:00","arrivalTime":"2022-03-14T10:02:47+01:00"}}}],[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":338,"travelTimeInSeconds":108,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-03-14T04:12:40+01:00","arrivalTime":"2022-03-14T04:14:27+01:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":669207,"travelTimeInSeconds":20966,"trafficDelayInSeconds":51,"trafficLengthInMeters":3098,"departureTime":"2022-03-14T04:12:40+01:00","arrivalTime":"2022-03-14T10:02:05+01:00"}}}]],"summary":{"successfulRoutes":4,"totalRoutes":4}}, [
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
  'Ref A: 20D6238471364531BEBB85B29C7F166D Ref B: TPE30EDGE0518 Ref C: 2022-03-14T03:12:40Z',
  'Date',
  'Mon, 14 Mar 2022 03:12:40 GMT'
]);
