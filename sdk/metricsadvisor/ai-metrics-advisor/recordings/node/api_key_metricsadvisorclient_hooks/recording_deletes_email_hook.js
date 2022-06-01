let nock = require('nock');

module.exports.hash = "7057a8ca17e949a053f56d53572dabc8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/hooks/afe109eb-27f8-42d3-be1f-cad1a1f0da54')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'f87e0b8a-3483-4f86-a225-11e3adae6c28',
  'x-envoy-upstream-service-time',
  '183',
  'apim-request-id',
  'f87e0b8a-3483-4f86-a225-11e3adae6c28',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:43 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/afe109eb-27f8-42d3-be1f-cad1a1f0da54')
  .reply(404, {"code":"404 NOT_FOUND","message":"hookId is invalid."}, [
  'Content-Length',
  '55',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '58816dc4-1ae1-412d-866d-8b8e832b05f4',
  'x-envoy-upstream-service-time',
  '62',
  'apim-request-id',
  '58816dc4-1ae1-412d-866d-8b8e832b05f4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:43 GMT'
]);
