let nock = require('nock');

module.exports.hash = "9c3e47f089764e45a080ffe93980eab5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/6b02a5d4-b86d-4222-a219-ff02d38bd01c')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '6664bb6f-9b83-4482-bb64-958c813697d1',
  'x-envoy-upstream-service-time',
  '259',
  'apim-request-id',
  '6664bb6f-9b83-4482-bb64-958c813697d1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 22:02:39 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/6b02a5d4-b86d-4222-a219-ff02d38bd01c')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b136ffb4-5136-4c1d-bc58-f57b137069fb',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  'b136ffb4-5136-4c1d-bc58-f57b137069fb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 22:02:39 GMT'
]);
