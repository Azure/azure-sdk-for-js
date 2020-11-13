let nock = require('nock');

module.exports.hash = "e6ac13f5b0a5c1a1a7f68d8669dc9474";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/c99a90f6-e3ca-44b1-9c93-4966699fd4ff')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'c3a01c3e-0953-4561-81d0-04b9e7f4bce5',
  'x-envoy-upstream-service-time',
  '421',
  'apim-request-id',
  'c3a01c3e-0953-4561-81d0-04b9e7f4bce5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:12 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/c99a90f6-e3ca-44b1-9c93-4966699fd4ff')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c3cb105e-864c-4e2f-99c2-277e58f3f548',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  'c3cb105e-864c-4e2f-99c2-277e58f3f548',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:12 GMT'
]);
