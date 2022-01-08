let nock = require('nock');

module.exports.hash = "6736fa1edd97ca9694f3279647ec71ee";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/3ce45f43-62cb-423f-8ac6-0fa1388641f9')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '2f2882f2-6feb-47bf-9271-e40c4954e661',
  'x-envoy-upstream-service-time',
  '308',
  'apim-request-id',
  '2f2882f2-6feb-47bf-9271-e40c4954e661',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:12 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/3ce45f43-62cb-423f-8ac6-0fa1388641f9')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c17f998b-7739-4acb-9bfb-57e2c3461221',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  'c17f998b-7739-4acb-9bfb-57e2c3461221',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:12 GMT'
]);
