let nock = require('nock');

module.exports.hash = "f8cc35d66549f37b74027ff201a5e0b8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/fbf18de8-a209-4b43-8ced-5a9e4b8cc25b')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '858c9e5b-da13-44a4-b071-fbc2ea8d75a7',
  'x-envoy-upstream-service-time',
  '357',
  'apim-request-id',
  '858c9e5b-da13-44a4-b071-fbc2ea8d75a7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 23:11:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/fbf18de8-a209-4b43-8ced-5a9e4b8cc25b')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '9fde1ab2-97bd-4f26-ae93-080ef940b34f',
  'x-envoy-upstream-service-time',
  '60',
  'apim-request-id',
  '9fde1ab2-97bd-4f26-ae93-080ef940b34f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 23:11:31 GMT'
]);
