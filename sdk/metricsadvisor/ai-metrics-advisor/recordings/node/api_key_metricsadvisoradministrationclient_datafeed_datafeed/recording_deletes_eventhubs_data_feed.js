let nock = require('nock');

module.exports.hash = "8db789c5a43bf8d7e9c8ff57f96724c2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/f6e5a8cb-398a-4d5a-89e7-56d1307d72c5')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'bdbfaac7-2008-4713-866a-abbb8a6787c2',
  'x-envoy-upstream-service-time',
  '431',
  'apim-request-id',
  'bdbfaac7-2008-4713-866a-abbb8a6787c2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 05 Jun 2021 03:56:48 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/f6e5a8cb-398a-4d5a-89e7-56d1307d72c5')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'fce9dd4e-f02f-47b4-a626-c5afd5251b74',
  'x-envoy-upstream-service-time',
  '139',
  'apim-request-id',
  'fce9dd4e-f02f-47b4-a626-c5afd5251b74',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 05 Jun 2021 03:56:49 GMT'
]);
