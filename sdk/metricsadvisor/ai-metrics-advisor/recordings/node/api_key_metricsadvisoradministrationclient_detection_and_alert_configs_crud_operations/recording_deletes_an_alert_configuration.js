let nock = require('nock');

module.exports.hash = "536383fbbe259a2e561915c459a152c3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/b13d420d-c738-4c44-845e-8922cb2e2476')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'cadfb3b5-aa9d-43f3-b46b-7979b4c1a6f0',
  'x-envoy-upstream-service-time',
  '154',
  'apim-request-id',
  'cadfb3b5-aa9d-43f3-b46b-7979b4c1a6f0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/b13d420d-c738-4c44-845e-8922cb2e2476')
  .reply(404, {"code":"Not Found","message":"Not found this AnomalyAlertingConfiguration. TraceId: f2b455fd-7950-4b31-9380-bd652d6faad9"}, [
  'Content-Length',
  '123',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f2b455fd-7950-4b31-9380-bd652d6faad9',
  'x-envoy-upstream-service-time',
  '95',
  'apim-request-id',
  'f2b455fd-7950-4b31-9380-bd652d6faad9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:20 GMT'
]);
