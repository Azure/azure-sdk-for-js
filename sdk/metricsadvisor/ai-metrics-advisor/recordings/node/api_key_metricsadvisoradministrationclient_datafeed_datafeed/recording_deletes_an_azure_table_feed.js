let nock = require('nock');

module.exports.hash = "b532a46235a6167fe37a0601d68211ca";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/9d5b3452-dde3-45f7-97e8-b34d9bc26d86')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '07534f47-2c98-41af-8eda-80b30dffa945',
  'x-envoy-upstream-service-time',
  '300',
  'apim-request-id',
  '07534f47-2c98-41af-8eda-80b30dffa945',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:21 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/9d5b3452-dde3-45f7-97e8-b34d9bc26d86')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ba726afb-a207-46ab-a1bf-dba52b6abe9b',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  'ba726afb-a207-46ab-a1bf-dba52b6abe9b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:21 GMT'
]);
