let nock = require('nock');

module.exports.hash = "6736fa1edd97ca9694f3279647ec71ee";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/3f9302a6-a6d9-4b38-9d18-0cee3e73bf2b')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'fa48ee20-4e80-459a-81b5-07f9874a754c',
  'x-envoy-upstream-service-time',
  '318',
  'apim-request-id',
  'fa48ee20-4e80-459a-81b5-07f9874a754c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:01 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/3f9302a6-a6d9-4b38-9d18-0cee3e73bf2b')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '029d13a0-b616-47a5-b4f9-2494a8e7496f',
  'x-envoy-upstream-service-time',
  '81',
  'apim-request-id',
  '029d13a0-b616-47a5-b4f9-2494a8e7496f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:01 GMT'
]);
