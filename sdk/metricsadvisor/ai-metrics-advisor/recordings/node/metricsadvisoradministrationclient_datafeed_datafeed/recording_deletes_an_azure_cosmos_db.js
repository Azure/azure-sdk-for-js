let nock = require('nock');

module.exports.hash = "e6ac13f5b0a5c1a1a7f68d8669dc9474";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/7c4f3a7a-80f2-438f-9469-9425e1a247f8')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'ced01943-60f6-4c2b-b266-2c1fe7f27d9b',
  'x-envoy-upstream-service-time',
  '423',
  'apim-request-id',
  'ced01943-60f6-4c2b-b266-2c1fe7f27d9b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:38 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/7c4f3a7a-80f2-438f-9469-9425e1a247f8')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '264686e2-d79a-472b-aaac-312b0b12efb5',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  '264686e2-d79a-472b-aaac-312b0b12efb5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:38 GMT'
]);
