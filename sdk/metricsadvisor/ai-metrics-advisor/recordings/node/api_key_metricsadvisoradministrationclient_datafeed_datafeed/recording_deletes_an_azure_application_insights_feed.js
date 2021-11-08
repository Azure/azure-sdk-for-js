let nock = require('nock');

module.exports.hash = "81ce971f29723c92439a2f7abf28283b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/8239771c-6570-4399-9d17-95de64012cc5')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'f123a70d-3b26-4611-ba4d-5ff3f64f01a6',
  'x-envoy-upstream-service-time',
  '449',
  'apim-request-id',
  'f123a70d-3b26-4611-ba4d-5ff3f64f01a6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/8239771c-6570-4399-9d17-95de64012cc5')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b4334784-63a7-483a-b3bc-92dc2bf712bb',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  'b4334784-63a7-483a-b3bc-92dc2bf712bb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:25 GMT'
]);
