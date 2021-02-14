let nock = require('nock');

module.exports.hash = "da39bba3c06162c654185f7c8c2c23d6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/hooks/7fac001b-9aa9-43c9-9d7f-4d79a3b6f2ac')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '573281d6-0711-442d-a90c-5eef4f04a26e',
  'x-envoy-upstream-service-time',
  '522',
  'apim-request-id',
  '573281d6-0711-442d-a90c-5eef4f04a26e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:40 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/7fac001b-9aa9-43c9-9d7f-4d79a3b6f2ac')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"hookId is invalid."}, [
  'Content-Length',
  '65',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'af329868-eeb7-4af9-bd94-cdea97a46295',
  'x-envoy-upstream-service-time',
  '137',
  'apim-request-id',
  'af329868-eeb7-4af9-bd94-cdea97a46295',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:40 GMT'
]);
