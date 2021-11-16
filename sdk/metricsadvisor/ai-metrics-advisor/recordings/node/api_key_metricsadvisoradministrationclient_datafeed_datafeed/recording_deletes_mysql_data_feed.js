let nock = require('nock');

module.exports.hash = "6736fa1edd97ca9694f3279647ec71ee";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/52d1a05d-994b-4b91-b8fa-5a1b66082a00')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'c1bca6fc-7749-4c09-97c4-865fcd870124',
  'x-envoy-upstream-service-time',
  '297',
  'apim-request-id',
  'c1bca6fc-7749-4c09-97c4-865fcd870124',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/52d1a05d-994b-4b91-b8fa-5a1b66082a00')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e16fdc6e-09cc-40d2-a9be-d1817698c0cf',
  'x-envoy-upstream-service-time',
  '79',
  'apim-request-id',
  'e16fdc6e-09cc-40d2-a9be-d1817698c0cf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:31 GMT'
]);
