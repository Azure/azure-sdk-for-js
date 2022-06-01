let nock = require('nock');

module.exports.hash = "b0767c76b6c02bf13930041c90015293";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/hooks/5f15ae02-3249-4f9e-ae4d-2854ba9dc0c1')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '1ad6d161-12dd-419a-ad2c-f7b96a9443e1',
  'x-envoy-upstream-service-time',
  '190',
  'apim-request-id',
  '1ad6d161-12dd-419a-ad2c-f7b96a9443e1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/5f15ae02-3249-4f9e-ae4d-2854ba9dc0c1')
  .reply(404, {"code":"404 NOT_FOUND","message":"hookId is invalid."}, [
  'Content-Length',
  '55',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd2800a53-c828-4315-8d44-802df500cc83',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  'd2800a53-c828-4315-8d44-802df500cc83',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:44 GMT'
]);
