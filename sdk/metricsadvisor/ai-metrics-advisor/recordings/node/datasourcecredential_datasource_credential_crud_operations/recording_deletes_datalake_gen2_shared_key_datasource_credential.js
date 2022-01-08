let nock = require('nock');

module.exports.hash = "a7e884bf029eb2cbf4e153650529df49";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/credentials/7da36fdb-0164-4165-8d7b-bec00021dc12')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '054b3053-3328-46d2-8151-eaa572e97d68',
  'x-envoy-upstream-service-time',
  '124',
  'apim-request-id',
  '054b3053-3328-46d2-8151-eaa572e97d68',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/7da36fdb-0164-4165-8d7b-bec00021dc12')
  .reply(404, {"code":"404 NOT_FOUND","message":"credentialId is invalid."}, [
  'Content-Length',
  '61',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e976b384-951a-45d0-a0e4-fb05aa8c9229',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  'e976b384-951a-45d0-a0e4-fb05aa8c9229',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:20 GMT'
]);
