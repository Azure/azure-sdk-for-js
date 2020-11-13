let nock = require('nock');

module.exports.hash = "6253dbcb23b32d3cec4b2a33144aeea7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/860f7d1f-f474-4869-83cf-5d0ac8260e58')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'fd153c04-871e-4982-a63f-8ec4209abfb7',
  'x-envoy-upstream-service-time',
  '413',
  'apim-request-id',
  'fd153c04-871e-4982-a63f-8ec4209abfb7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:40 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/860f7d1f-f474-4869-83cf-5d0ac8260e58')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '89745ab0-bbd3-4d22-9fab-b3fc3bf7d087',
  'x-envoy-upstream-service-time',
  '58',
  'apim-request-id',
  '89745ab0-bbd3-4d22-9fab-b3fc3bf7d087',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:40 GMT'
]);
