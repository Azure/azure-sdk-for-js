let nock = require('nock');

module.exports.hash = "15cbe511d5365d38ec3c472667bb9d17";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/route/matrix/json', {"origins":{"type":"MultiPoint","coordinates":[[4.85106,52.36006],[4.85056,52.36187]]},"destinations":{"type":"MultiPoint","coordinates":[[4.85003,52.36241],[13.42937,52.50931]]}})
  .query(true)
  .reply(202, "", [ 'Content-Type',
  'application/json',
  'Location',
  'https://atlas.microsoft.com/route/matrix/e016bc36-e2ce-4c71-a8d9-4381952db03b?api-version=1.0',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 31496A8ACDE54460A7356C1A3FA92665 Ref B: TYO01EDGE3115 Ref C: 2022-06-29T08:18:19Z',
  'Date',
  'Wed, 29 Jun 2022 08:18:18 GMT',
  'Content-Length',
  '0' ]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/route/matrix/e016bc36-e2ce-4c71-a8d9-4381952db03b')
  .query(true)
  .reply(200, {"formatVersion":"0.0.1","matrix":[[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":495,"travelTimeInSeconds":123,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-06-29T10:18:19+02:00","arrivalTime":"2022-06-29T10:20:22+02:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":666794,"travelTimeInSeconds":22528,"trafficDelayInSeconds":234,"trafficLengthInMeters":9179,"departureTime":"2022-06-29T10:18:19+02:00","arrivalTime":"2022-06-29T16:33:47+02:00"}}}],[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":338,"travelTimeInSeconds":104,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-06-29T10:18:19+02:00","arrivalTime":"2022-06-29T10:20:02+02:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":666637,"travelTimeInSeconds":22487,"trafficDelayInSeconds":234,"trafficLengthInMeters":9179,"departureTime":"2022-06-29T10:18:19+02:00","arrivalTime":"2022-06-29T16:33:06+02:00"}}}]],"summary":{"successfulRoutes":4,"totalRoutes":4}}, [ 'Content-Length',
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
  'Ref A: A4C8369FF6F54642B7AA83B7690BF7C0 Ref B: TYBEDGE0812 Ref C: 2022-06-29T08:18:19Z',
  'Date',
  'Wed, 29 Jun 2022 08:18:19 GMT' ]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/route/matrix/e016bc36-e2ce-4c71-a8d9-4381952db03b')
  .query(true)
  .reply(200, {"formatVersion":"0.0.1","matrix":[[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":495,"travelTimeInSeconds":123,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-06-29T10:18:19+02:00","arrivalTime":"2022-06-29T10:20:22+02:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":666794,"travelTimeInSeconds":22528,"trafficDelayInSeconds":234,"trafficLengthInMeters":9179,"departureTime":"2022-06-29T10:18:19+02:00","arrivalTime":"2022-06-29T16:33:47+02:00"}}}],[{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":338,"travelTimeInSeconds":104,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-06-29T10:18:19+02:00","arrivalTime":"2022-06-29T10:20:02+02:00"}}},{"statusCode":200,"response":{"routeSummary":{"lengthInMeters":666637,"travelTimeInSeconds":22487,"trafficDelayInSeconds":234,"trafficLengthInMeters":9179,"departureTime":"2022-06-29T10:18:19+02:00","arrivalTime":"2022-06-29T16:33:06+02:00"}}}]],"summary":{"successfulRoutes":4,"totalRoutes":4}}, [ 'Content-Length',
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
  'Ref A: AE53A155E0FB421686FBB421F9A22E07 Ref B: TYAEDGE0418 Ref C: 2022-06-29T08:18:19Z',
  'Date',
  'Wed, 29 Jun 2022 08:18:19 GMT' ]);
