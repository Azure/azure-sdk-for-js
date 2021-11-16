let nock = require('nock');

module.exports.hash = "b0767c76b6c02bf13930041c90015293";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/hooks/e86dd6fb-ec6a-4b29-98f5-172a91f3db69')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '83e0c642-b48f-407e-a1cb-39fb0f5ca21d',
  'x-envoy-upstream-service-time',
  '180',
  'apim-request-id',
  '83e0c642-b48f-407e-a1cb-39fb0f5ca21d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:53 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/e86dd6fb-ec6a-4b29-98f5-172a91f3db69')
  .reply(404, {"code":"404 NOT_FOUND","message":"hookId is invalid."}, [
  'Content-Length',
  '55',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd0dc2a12-72e5-46c3-b1d2-1d2cc35d8952',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  'd0dc2a12-72e5-46c3-b1d2-1d2cc35d8952',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:53 GMT'
]);
