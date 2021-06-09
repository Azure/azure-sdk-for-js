let nock = require('nock');

module.exports.hash = "4a211b5919e522df59e90008fad84b72";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/f380c2da-2279-43f6-b2a7-b696aa56b700')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'f9b3a718-4fec-41de-ac8c-97ac92b7ced2',
  'x-envoy-upstream-service-time',
  '387',
  'apim-request-id',
  'f9b3a718-4fec-41de-ac8c-97ac92b7ced2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 05 Jun 2021 02:11:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/f380c2da-2279-43f6-b2a7-b696aa56b700')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '16a37096-4b07-4bd5-bfca-e77724ff3e07',
  'x-envoy-upstream-service-time',
  '98',
  'apim-request-id',
  '16a37096-4b07-4bd5-bfca-e77724ff3e07',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 05 Jun 2021 02:11:37 GMT'
]);
