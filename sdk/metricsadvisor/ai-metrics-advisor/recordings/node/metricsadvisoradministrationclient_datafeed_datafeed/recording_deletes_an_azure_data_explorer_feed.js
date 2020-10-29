let nock = require('nock');

module.exports.hash = "6253dbcb23b32d3cec4b2a33144aeea7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/0a41beaa-e836-4228-bd5f-95450fd8fdba')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '20692860-6c44-4601-86c4-c49ac1ea0702',
  'x-envoy-upstream-service-time',
  '269',
  'apim-request-id',
  '20692860-6c44-4601-86c4-c49ac1ea0702',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 20 Oct 2020 22:50:43 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/0a41beaa-e836-4228-bd5f-95450fd8fdba')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6a40f993-1e00-414d-8f2b-e37d792b8280',
  'x-envoy-upstream-service-time',
  '46',
  'apim-request-id',
  '6a40f993-1e00-414d-8f2b-e37d792b8280',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 20 Oct 2020 22:50:43 GMT',
  'Connection',
  'close'
]);
