let nock = require('nock');

module.exports.hash = "95c25f09cf194bdeaa62de3da2b4d804";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/eb3b501d-a8f6-4005-82e2-d548267f223d')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '93894564-b678-4db0-ad79-52e9c2622bb0',
  'x-envoy-upstream-service-time',
  '298',
  'apim-request-id',
  '93894564-b678-4db0-ad79-52e9c2622bb0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:28 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/eb3b501d-a8f6-4005-82e2-d548267f223d')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '170c092b-9822-4612-9cd2-b4fedeeece7c',
  'x-envoy-upstream-service-time',
  '61',
  'apim-request-id',
  '170c092b-9822-4612-9cd2-b4fedeeece7c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:28 GMT'
]);
