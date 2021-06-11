let nock = require('nock');

module.exports.hash = "92461016236353b27959e8d6297a3efe";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/5130d48a-0b41-4838-b589-d72178f20554')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'f2b6f8e7-b9a3-4b89-a9f4-1360dcf4dcaa',
  'x-envoy-upstream-service-time',
  '145',
  'apim-request-id',
  'f2b6f8e7-b9a3-4b89-a9f4-1360dcf4dcaa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 17:31:53 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/5130d48a-0b41-4838-b589-d72178f20554')
  .reply(404, {"code":"Not Found","message":"Not found this AnomalyAlertingConfiguration. TraceId: 7c4e8a2d-c040-4855-901a-b0a03b45bc80"}, [
  'Content-Length',
  '123',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '062b2bd1-90f9-43da-b13d-f319c6dab320',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  '062b2bd1-90f9-43da-b13d-f319c6dab320',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 17:31:53 GMT'
]);
