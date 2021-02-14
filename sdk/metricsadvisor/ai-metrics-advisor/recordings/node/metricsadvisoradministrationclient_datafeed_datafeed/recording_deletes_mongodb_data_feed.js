let nock = require('nock');

module.exports.hash = "ca26442e966a10e9febe91d27f3abb2c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/369d9bf3-25e8-41b9-9442-0aa7b7a71914')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'f04e2702-48d0-482c-af26-aa5f71a4d5fb',
  'x-envoy-upstream-service-time',
  '299',
  'apim-request-id',
  'f04e2702-48d0-482c-af26-aa5f71a4d5fb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 23:11:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/369d9bf3-25e8-41b9-9442-0aa7b7a71914')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd39d14c1-507b-44fe-a8bf-8194b4b863cc',
  'x-envoy-upstream-service-time',
  '54',
  'apim-request-id',
  'd39d14c1-507b-44fe-a8bf-8194b4b863cc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 23:11:33 GMT'
]);
