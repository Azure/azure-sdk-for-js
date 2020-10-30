let nock = require('nock');

module.exports.hash = "5da92d9d0a0edaf988b521bc719c71e1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/3487f956-53b3-4120-ab9d-40f2eaa8f17c')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'f726caff-7571-469b-944b-e695593ab0da',
  'x-envoy-upstream-service-time',
  '234',
  'apim-request-id',
  'f726caff-7571-469b-944b-e695593ab0da',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 20 Oct 2020 22:50:47 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/3487f956-53b3-4120-ab9d-40f2eaa8f17c')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '45d8a69e-c330-4834-a491-53af09701b03',
  'x-envoy-upstream-service-time',
  '46',
  'apim-request-id',
  '45d8a69e-c330-4834-a491-53af09701b03',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 20 Oct 2020 22:50:48 GMT',
  'Connection',
  'close'
]);
