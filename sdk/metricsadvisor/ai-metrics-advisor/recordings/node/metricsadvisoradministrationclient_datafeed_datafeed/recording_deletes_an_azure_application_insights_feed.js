let nock = require('nock');

module.exports.hash = "029380c24e3327f7b4b4c25a1429439e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/db409864-b6df-4e10-8f0d-015674aed125')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '8d6d9a8c-266f-454c-bf1c-fa57e9002c07',
  'x-envoy-upstream-service-time',
  '380',
  'apim-request-id',
  '8d6d9a8c-266f-454c-bf1c-fa57e9002c07',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/db409864-b6df-4e10-8f0d-015674aed125')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '254b1412-21a3-40a8-a94f-a32f7e897828',
  'x-envoy-upstream-service-time',
  '57',
  'apim-request-id',
  '254b1412-21a3-40a8-a94f-a32f7e897828',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:42 GMT'
]);
