let nock = require('nock');

module.exports.hash = "44a5fcea9bd5ac23896f5b38bbf86c7e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/credentials/59b66b44-7558-46c1-8dc4-df31839467e6')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '3c7fdfe7-224c-4229-a6da-463f71e52fcf',
  'x-envoy-upstream-service-time',
  '118',
  'apim-request-id',
  '3c7fdfe7-224c-4229-a6da-463f71e52fcf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:21 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/59b66b44-7558-46c1-8dc4-df31839467e6')
  .reply(404, {"code":"404 NOT_FOUND","message":"credentialId is invalid."}, [
  'Content-Length',
  '61',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '0169de0e-341d-4d58-8630-d32300ccd5c1',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '0169de0e-341d-4d58-8630-d32300ccd5c1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:21 GMT'
]);
