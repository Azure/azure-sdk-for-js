let nock = require('nock');

module.exports.hash = "b532a46235a6167fe37a0601d68211ca";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/60f6fdea-b0d6-41dc-9583-7f9667666a3c')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '1f15885f-9165-42f5-9de5-02fbd4978d53',
  'x-envoy-upstream-service-time',
  '353',
  'apim-request-id',
  '1f15885f-9165-42f5-9de5-02fbd4978d53',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/60f6fdea-b0d6-41dc-9583-7f9667666a3c')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '796328ae-20e0-455a-926b-d9eb854dfd02',
  'x-envoy-upstream-service-time',
  '111',
  'apim-request-id',
  '796328ae-20e0-455a-926b-d9eb854dfd02',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:30 GMT'
]);
