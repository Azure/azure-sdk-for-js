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
  'https://atlas.microsoft.com/route/matrix/e2ecf728-234b-4347-9305-62854695dcf9?api-version=1.0',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: C788B6BCFA9E4CC5BE851CA99771B92A Ref B: TPE30EDGE0518 Ref C: 2022-03-14T03:12:41Z',
  'Date',
  'Mon, 14 Mar 2022 03:12:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/route/matrix/e2ecf728-234b-4347-9305-62854695dcf9')
  .query(true)
  .reply(200, {"formatVersion":"0.0.1","matrix":[[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":495,"travelTimeInSeconds":130,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-03-14T04:12:42+01:00","arrivalTime":"2022-03-14T04:14:51+01:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":669364,"travelTimeInSeconds":21007,"trafficDelayInSeconds":51,"trafficLengthInMeters":3098,"departureTime":"2022-03-14T04:12:42+01:00","arrivalTime":"2022-03-14T10:02:49+01:00"}}}],[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":338,"travelTimeInSeconds":108,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-03-14T04:12:42+01:00","arrivalTime":"2022-03-14T04:14:29+01:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":669207,"travelTimeInSeconds":20966,"trafficDelayInSeconds":51,"trafficLengthInMeters":3098,"departureTime":"2022-03-14T04:12:42+01:00","arrivalTime":"2022-03-14T10:02:07+01:00"}}}]],"summary":{"successfulRoutes":4,"totalRoutes":4}}, [
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
  'Ref A: 713A7ABB994E41759C7D3E70676E4E0B Ref B: TPE30EDGE0518 Ref C: 2022-03-14T03:12:41Z',
  'Date',
  'Mon, 14 Mar 2022 03:12:41 GMT'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/route/matrix/e2ecf728-234b-4347-9305-62854695dcf9')
  .query(true)
  .reply(200, {"formatVersion":"0.0.1","matrix":[[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":495,"travelTimeInSeconds":130,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-03-14T04:12:42+01:00","arrivalTime":"2022-03-14T04:14:51+01:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":669364,"travelTimeInSeconds":21007,"trafficDelayInSeconds":51,"trafficLengthInMeters":3098,"departureTime":"2022-03-14T04:12:42+01:00","arrivalTime":"2022-03-14T10:02:49+01:00"}}}],[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":338,"travelTimeInSeconds":108,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-03-14T04:12:42+01:00","arrivalTime":"2022-03-14T04:14:29+01:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":669207,"travelTimeInSeconds":20966,"trafficDelayInSeconds":51,"trafficLengthInMeters":3098,"departureTime":"2022-03-14T04:12:42+01:00","arrivalTime":"2022-03-14T10:02:07+01:00"}}}]],"summary":{"successfulRoutes":4,"totalRoutes":4}}, [
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
  'Ref A: E154FE359BB44FB9B116F80C146778AA Ref B: TPE30EDGE0518 Ref C: 2022-03-14T03:12:42Z',
  'Date',
  'Mon, 14 Mar 2022 03:12:41 GMT'
]);
