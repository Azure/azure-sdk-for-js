let nock = require('nock');

module.exports.hash = "a7e884bf029eb2cbf4e153650529df49";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/credentials/d404535c-1efb-4feb-b535-83e246f31c0c')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'e1419be8-e3da-4c68-8be1-1e3246810476',
  'x-envoy-upstream-service-time',
  '116',
  'apim-request-id',
  'e1419be8-e3da-4c68-8be1-1e3246810476',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:10 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/d404535c-1efb-4feb-b535-83e246f31c0c')
  .reply(404, {"code":"404 NOT_FOUND","message":"credentialId is invalid."}, [
  'Content-Length',
  '61',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '64f2547f-f50e-44b8-9354-b45266f65815',
  'x-envoy-upstream-service-time',
  '102',
  'apim-request-id',
  '64f2547f-f50e-44b8-9354-b45266f65815',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:10 GMT'
]);
