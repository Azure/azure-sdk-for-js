let nock = require('nock');

module.exports.hash = "d9c318776ee205ffe269de16d9c70f34";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/c9673522-01d6-4068-b7f9-845ea1c46f4b')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '92c55baf-3adb-4328-afeb-f45c557a9b6e',
  'x-envoy-upstream-service-time',
  '297',
  'apim-request-id',
  '92c55baf-3adb-4328-afeb-f45c557a9b6e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:53 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/c9673522-01d6-4068-b7f9-845ea1c46f4b')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '91d39747-d3da-42c2-a1dc-ee0168488481',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  '91d39747-d3da-42c2-a1dc-ee0168488481',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:53 GMT'
]);
