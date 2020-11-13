let nock = require('nock');

module.exports.hash = "e6ac13f5b0a5c1a1a7f68d8669dc9474";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/0eb99491-df6b-4fb6-b868-671f11931a5f')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'da932bce-9e2b-4a61-aeaf-16aabae0f510',
  'x-envoy-upstream-service-time',
  '519',
  'apim-request-id',
  'da932bce-9e2b-4a61-aeaf-16aabae0f510',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:51 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/0eb99491-df6b-4fb6-b868-671f11931a5f')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'fd1fcc15-d91f-4d19-ac06-cdf6bc8144cc',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  'fd1fcc15-d91f-4d19-ac06-cdf6bc8144cc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:51 GMT'
]);
