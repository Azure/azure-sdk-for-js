let nock = require('nock');

module.exports.hash = "6f17e0ff61a8e02aae212d55e78d3469";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/058ee06c-6b45-4f10-93a1-a4ac4ebd9b1d')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '2a4ff6d5-c03d-4cf9-9bb8-ca6ff7c89358',
  'x-envoy-upstream-service-time',
  '327',
  'apim-request-id',
  '2a4ff6d5-c03d-4cf9-9bb8-ca6ff7c89358',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:47 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/058ee06c-6b45-4f10-93a1-a4ac4ebd9b1d')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ab494005-e273-4fc8-91b7-3b8f37f9b164',
  'x-envoy-upstream-service-time',
  '61',
  'apim-request-id',
  'ab494005-e273-4fc8-91b7-3b8f37f9b164',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:48 GMT'
]);
