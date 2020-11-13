let nock = require('nock');

module.exports.hash = "f8cc35d66549f37b74027ff201a5e0b8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/23c4e292-50b1-4c80-a507-c056b791311b')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '388aafa8-8355-4ca8-80b4-5f4b2d43b3f8',
  'x-envoy-upstream-service-time',
  '312',
  'apim-request-id',
  '388aafa8-8355-4ca8-80b4-5f4b2d43b3f8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:43 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/23c4e292-50b1-4c80-a507-c056b791311b')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6c26d34a-3660-4cc0-9585-1ef23cf7893d',
  'x-envoy-upstream-service-time',
  '57',
  'apim-request-id',
  '6c26d34a-3660-4cc0-9585-1ef23cf7893d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:43 GMT'
]);
