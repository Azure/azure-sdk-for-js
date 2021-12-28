let nock = require('nock');

module.exports.hash = "bd302ce0f4c49f36cc5e3e1ffd1ee427";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/64c76237-0519-432c-919f-c29aee412467')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'e756b507-8f34-47f5-9190-83432c8b758b',
  'x-envoy-upstream-service-time',
  '319',
  'apim-request-id',
  'e756b507-8f34-47f5-9190-83432c8b758b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:32 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/64c76237-0519-432c-919f-c29aee412467')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '464f1355-8caa-4c29-b5a6-400c9bdfbc1f',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  '464f1355-8caa-4c29-b5a6-400c9bdfbc1f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:32 GMT'
]);
