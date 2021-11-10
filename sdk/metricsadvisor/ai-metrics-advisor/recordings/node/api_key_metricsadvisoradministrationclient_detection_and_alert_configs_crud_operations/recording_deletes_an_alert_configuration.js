let nock = require('nock');

module.exports.hash = "536383fbbe259a2e561915c459a152c3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/647939f7-78d7-4818-8c26-a67bb2d7e260')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '7a17a8fb-2fcd-44d8-b07e-6e5f1d1bb827',
  'x-envoy-upstream-service-time',
  '135',
  'apim-request-id',
  '7a17a8fb-2fcd-44d8-b07e-6e5f1d1bb827',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 01:51:35 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/647939f7-78d7-4818-8c26-a67bb2d7e260')
  .reply(404, {"code":"Not Found","message":"Not found this AnomalyAlertingConfiguration. TraceId: c733b099-e39d-49f9-83cf-8a2b24e54468"}, [
  'Content-Length',
  '123',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c733b099-e39d-49f9-83cf-8a2b24e54468',
  'x-envoy-upstream-service-time',
  '131',
  'apim-request-id',
  'c733b099-e39d-49f9-83cf-8a2b24e54468',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 01:51:35 GMT'
]);
