let nock = require('nock');

module.exports.hash = "703b44e18d5f8b4333366b99daa74b58";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/82a8f4b6-5d84-4307-b1a3-bab0bd63c9c1')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '3c6d2cbc-e77e-42e3-b540-5f41f06b3c4b',
  'x-envoy-upstream-service-time',
  '269',
  'apim-request-id',
  '3c6d2cbc-e77e-42e3-b540-5f41f06b3c4b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:40 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/82a8f4b6-5d84-4307-b1a3-bab0bd63c9c1')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '65d80ab0-ccf2-4fc6-95c9-6f29b74b1dfb',
  'x-envoy-upstream-service-time',
  '74',
  'apim-request-id',
  '65d80ab0-ccf2-4fc6-95c9-6f29b74b1dfb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:40 GMT'
]);
