let nock = require('nock');

module.exports.hash = "95c25f09cf194bdeaa62de3da2b4d804";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/6217b08b-4a93-40d8-bcb9-a22f2fc7775f')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'fddff142-5e80-4a47-8ca2-1490812e1b97',
  'x-envoy-upstream-service-time',
  '304',
  'apim-request-id',
  'fddff142-5e80-4a47-8ca2-1490812e1b97',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:22 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/6217b08b-4a93-40d8-bcb9-a22f2fc7775f')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '1ad71a79-c4a6-458e-96f1-0f6d48804ac3',
  'x-envoy-upstream-service-time',
  '78',
  'apim-request-id',
  '1ad71a79-c4a6-458e-96f1-0f6d48804ac3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:22 GMT'
]);
