let nock = require('nock');

module.exports.hash = "7c0111a7cb8e47c7f98611b4a04dcb71";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/53a7b635-d73f-4ef1-a857-19578ef03188')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '745f3d83-5583-4db7-bd7a-d69197a5a35a',
  'x-envoy-upstream-service-time',
  '323',
  'apim-request-id',
  '745f3d83-5583-4db7-bd7a-d69197a5a35a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:43 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/53a7b635-d73f-4ef1-a857-19578ef03188')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'fe8ed464-5923-4439-bd37-08b00a172d6f',
  'x-envoy-upstream-service-time',
  '58',
  'apim-request-id',
  'fe8ed464-5923-4439-bd37-08b00a172d6f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:43 GMT'
]);
