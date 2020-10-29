let nock = require('nock');

module.exports.hash = "f8cc35d66549f37b74027ff201a5e0b8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/e88a252b-9bae-4456-ada7-d0b9257eae45')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '33634fa1-c77e-4118-9839-feb97168e001',
  'x-envoy-upstream-service-time',
  '207',
  'apim-request-id',
  '33634fa1-c77e-4118-9839-feb97168e001',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 20 Oct 2020 22:50:45 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/e88a252b-9bae-4456-ada7-d0b9257eae45')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '685769e5-56b5-40f6-8eb7-6103794dcd4f',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  '685769e5-56b5-40f6-8eb7-6103794dcd4f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 20 Oct 2020 22:50:46 GMT',
  'Connection',
  'close'
]);
