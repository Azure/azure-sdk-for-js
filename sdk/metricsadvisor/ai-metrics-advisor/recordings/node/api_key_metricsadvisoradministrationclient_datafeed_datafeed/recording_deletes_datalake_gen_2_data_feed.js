let nock = require('nock');

module.exports.hash = "bd302ce0f4c49f36cc5e3e1ffd1ee427";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/cc0e2262-09b0-4a79-bc27-27525b482ca7')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '22021cca-424d-474b-bade-5724d2c4b2e2',
  'x-envoy-upstream-service-time',
  '290',
  'apim-request-id',
  '22021cca-424d-474b-bade-5724d2c4b2e2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:26 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/cc0e2262-09b0-4a79-bc27-27525b482ca7')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '27827c4d-72cb-4c7f-8e94-9685fa6bc5cb',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  '27827c4d-72cb-4c7f-8e94-9685fa6bc5cb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:26 GMT'
]);
