let nock = require('nock');

module.exports.hash = "83e43a3de68df87ff079f4d993eea2f6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/credentials/dc61651c-d7df-4e46-922d-57bd3bbc116b')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'e322ba13-5fb9-4a62-93db-6f74ecabcc21',
  'x-envoy-upstream-service-time',
  '224',
  'apim-request-id',
  'e322ba13-5fb9-4a62-93db-6f74ecabcc21',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 18:52:19 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/dc61651c-d7df-4e46-922d-57bd3bbc116b')
  .reply(404, {"code":"404 NOT_FOUND","message":"credentialId is invalid."}, [
  'Content-Length',
  '61',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '02c3d77f-4249-4589-9044-ae139e26afe7',
  'x-envoy-upstream-service-time',
  '81',
  'apim-request-id',
  '02c3d77f-4249-4589-9044-ae139e26afe7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 18:52:19 GMT',
  'Connection',
  'close'
]);
