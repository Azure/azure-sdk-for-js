let nock = require('nock');

module.exports.hash = "e94fe8b844567fad45d46761354ccf88";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/6180ba7c-dc5f-4baf-9f00-898718b6b87f')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '5ae38011-d586-4bfb-9cde-f5aef9e6d24e',
  'x-envoy-upstream-service-time',
  '368',
  'apim-request-id',
  '5ae38011-d586-4bfb-9cde-f5aef9e6d24e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:11:10 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/6180ba7c-dc5f-4baf-9f00-898718b6b87f')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '120292de-6a2b-4eec-890a-296d396811e9',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  '120292de-6a2b-4eec-890a-296d396811e9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:11:10 GMT'
]);
