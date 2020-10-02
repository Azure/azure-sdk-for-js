let nock = require('nock');

module.exports.hash = "7f31d91adc362b289ba928e79856036e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/d32b4a7c-b8f4-4868-9a07-5e885d5840d5')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '85d96e6b-fc6f-40ad-bbff-4f6d2af3b226',
  'x-envoy-upstream-service-time',
  '254',
  'apim-request-id',
  '85d96e6b-fc6f-40ad-bbff-4f6d2af3b226',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 22:02:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/d32b4a7c-b8f4-4868-9a07-5e885d5840d5')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5560bfa5-7483-4d1c-b59c-58a1712339cd',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  '5560bfa5-7483-4d1c-b59c-58a1712339cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 22:02:44 GMT'
]);
