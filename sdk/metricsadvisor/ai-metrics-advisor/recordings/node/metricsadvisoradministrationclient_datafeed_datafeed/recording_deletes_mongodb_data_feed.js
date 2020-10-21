let nock = require('nock');

module.exports.hash = "172ad7f7fb2d9266b98502be067276eb";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/45c51238-b2bf-46a3-ae52-148ba9d45330')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '4feb30f3-f80c-416b-9b16-da53ea018842',
  'x-envoy-upstream-service-time',
  '257',
  'apim-request-id',
  '4feb30f3-f80c-416b-9b16-da53ea018842',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 22:02:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/45c51238-b2bf-46a3-ae52-148ba9d45330')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '077dc0cc-f34b-49fb-9adc-76f335e973cc',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  '077dc0cc-f34b-49fb-9adc-76f335e973cc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 22:02:59 GMT'
]);
