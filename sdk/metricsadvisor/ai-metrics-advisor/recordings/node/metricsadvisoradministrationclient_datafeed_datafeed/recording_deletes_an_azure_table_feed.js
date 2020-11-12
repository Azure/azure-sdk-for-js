let nock = require('nock');

module.exports.hash = "6f17e0ff61a8e02aae212d55e78d3469";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/761b2c29-131b-4b1a-8c39-6c9f3c80fbc2')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '273cf5e7-180f-4c7e-81c5-2bff673ebc72',
  'x-envoy-upstream-service-time',
  '1158',
  'apim-request-id',
  '273cf5e7-180f-4c7e-81c5-2bff673ebc72',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:07 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/761b2c29-131b-4b1a-8c39-6c9f3c80fbc2')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '8fedd79a-afc0-44d1-b15b-343c242f1299',
  'x-envoy-upstream-service-time',
  '56',
  'apim-request-id',
  '8fedd79a-afc0-44d1-b15b-343c242f1299',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:07 GMT'
]);
