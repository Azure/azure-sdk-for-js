let nock = require('nock');

module.exports.hash = "2b8641347cfffae800a67810c101e008";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/7f4f0f7f-f826-49d8-87be-f9396295ec41')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '6f1542ad-7ef7-4552-bced-f632a56f6234',
  'x-envoy-upstream-service-time',
  '283',
  'apim-request-id',
  '6f1542ad-7ef7-4552-bced-f632a56f6234',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:27 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/7f4f0f7f-f826-49d8-87be-f9396295ec41')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '883aa619-cb8f-424e-a5e6-2a677e75e10b',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '883aa619-cb8f-424e-a5e6-2a677e75e10b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:27 GMT'
]);
