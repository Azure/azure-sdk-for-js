let nock = require('nock');

module.exports.hash = "da39bba3c06162c654185f7c8c2c23d6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/hooks/a24db07b-522a-499f-8239-97c5e7743212')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '902dba92-c8d5-4ca2-a867-e0219e443e31',
  'x-envoy-upstream-service-time',
  '210',
  'apim-request-id',
  '902dba92-c8d5-4ca2-a867-e0219e443e31',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:54 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/a24db07b-522a-499f-8239-97c5e7743212')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"hookId is invalid."}, [
  'Content-Length',
  '65',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '29eef3fc-756f-43f6-b2a3-616c9fd87f64',
  'x-envoy-upstream-service-time',
  '52',
  'apim-request-id',
  '29eef3fc-756f-43f6-b2a3-616c9fd87f64',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:54 GMT'
]);
