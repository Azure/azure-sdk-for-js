let nock = require('nock');

module.exports.hash = "f00185e6e324083e938b4c40b9551de6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/1cd3c86d-8a59-4fef-b26e-e7953dd69a30')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '9ed6f671-0c90-48d4-b9b8-a4b4b6fd9b37',
  'x-envoy-upstream-service-time',
  '271',
  'apim-request-id',
  '9ed6f671-0c90-48d4-b9b8-a4b4b6fd9b37',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 18 Sep 2020 23:29:34 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/1cd3c86d-8a59-4fef-b26e-e7953dd69a30')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '532d7646-5e52-40c5-91e7-077264a2a77f',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  '532d7646-5e52-40c5-91e7-077264a2a77f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 18 Sep 2020 23:29:34 GMT'
]);
