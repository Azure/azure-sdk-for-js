let nock = require('nock');

module.exports.hash = "2b8641347cfffae800a67810c101e008";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/acd75642-825d-4fb8-8317-8a9297446983')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '61d0526b-221a-4cbe-b409-164b5c69c2b6',
  'x-envoy-upstream-service-time',
  '386',
  'apim-request-id',
  '61d0526b-221a-4cbe-b409-164b5c69c2b6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:38 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/acd75642-825d-4fb8-8317-8a9297446983')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '0ee0107a-7b04-4015-a0f3-08b0e7a67467',
  'x-envoy-upstream-service-time',
  '173',
  'apim-request-id',
  '0ee0107a-7b04-4015-a0f3-08b0e7a67467',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:38 GMT'
]);
