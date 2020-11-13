let nock = require('nock');

module.exports.hash = "6f17e0ff61a8e02aae212d55e78d3469";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/b2ce61bd-bcff-4187-9c17-c2940ff7456b')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '806a1442-8dd4-4c00-8e33-2ecd91c868b5',
  'x-envoy-upstream-service-time',
  '328',
  'apim-request-id',
  '806a1442-8dd4-4c00-8e33-2ecd91c868b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/b2ce61bd-bcff-4187-9c17-c2940ff7456b')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2fa14002-a1b3-42a8-8efb-46f2745b3c19',
  'x-envoy-upstream-service-time',
  '54',
  'apim-request-id',
  '2fa14002-a1b3-42a8-8efb-46f2745b3c19',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:42 GMT'
]);
