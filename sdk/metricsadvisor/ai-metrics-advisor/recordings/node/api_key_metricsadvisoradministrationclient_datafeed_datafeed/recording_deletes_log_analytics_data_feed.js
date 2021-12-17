let nock = require('nock');

module.exports.hash = "2b8641347cfffae800a67810c101e008";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('//metricsadvisor/v1.0/dataFeeds/9df90411-0766-4e19-9948-b1fce4b284d4')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'd0782e04-b815-4f07-bc09-dc093fb0c5fe',
  'x-envoy-upstream-service-time',
  '304',
  'apim-request-id',
  'd0782e04-b815-4f07-bc09-dc093fb0c5fe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:27 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('//metricsadvisor/v1.0/dataFeeds/9df90411-0766-4e19-9948-b1fce4b284d4')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f2728d7b-9f0a-4cf6-8d91-ff548a12c426',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  'f2728d7b-9f0a-4cf6-8d91-ff548a12c426',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:27 GMT'
]);
