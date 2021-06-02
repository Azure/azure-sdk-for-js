let nock = require('nock');

module.exports.hash = "dd9d3737f1407f2c7563f2ae1728ce3b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/59a1150c-d9b3-44e3-a56c-4da50e7f4e51')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '415a082f-5a2b-42ee-aef2-6eac605bbfc9',
  'x-envoy-upstream-service-time',
  '387',
  'apim-request-id',
  '415a082f-5a2b-42ee-aef2-6eac605bbfc9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 03:03:23 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/59a1150c-d9b3-44e3-a56c-4da50e7f4e51')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'a016617b-2581-4cc0-a182-50b68cf58f79',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  'a016617b-2581-4cc0-a182-50b68cf58f79',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 03:03:23 GMT'
]);
