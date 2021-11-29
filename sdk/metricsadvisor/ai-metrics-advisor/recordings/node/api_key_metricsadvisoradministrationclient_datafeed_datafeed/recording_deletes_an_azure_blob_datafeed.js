let nock = require('nock');

module.exports.hash = "d9c318776ee205ffe269de16d9c70f34";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/8f8dcdc1-1c2a-478d-ad8e-bde4d4317721')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '19b5ce47-0ee8-4838-aac2-da61fe736e3a',
  'x-envoy-upstream-service-time',
  '308',
  'apim-request-id',
  '19b5ce47-0ee8-4838-aac2-da61fe736e3a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:23 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/8f8dcdc1-1c2a-478d-ad8e-bde4d4317721')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f29a7824-d5e2-4419-9471-17c5a70abe2c',
  'x-envoy-upstream-service-time',
  '82',
  'apim-request-id',
  'f29a7824-d5e2-4419-9471-17c5a70abe2c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:23 GMT'
]);
