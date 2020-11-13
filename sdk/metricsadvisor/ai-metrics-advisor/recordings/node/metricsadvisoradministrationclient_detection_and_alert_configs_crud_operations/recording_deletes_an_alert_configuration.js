let nock = require('nock');

module.exports.hash = "7dfa40ad7c8743266d5b9f72b2cbdbdf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/988c6443-ef9c-4c77-b494-75e0a8a6aeb7')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'a66df618-7e91-4d38-a59f-839d323f3254',
  'x-envoy-upstream-service-time',
  '139',
  'apim-request-id',
  'a66df618-7e91-4d38-a59f-839d323f3254',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:12 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/988c6443-ef9c-4c77-b494-75e0a8a6aeb7')
  .reply(404, {"code":"Not Found","message":"Not found this AnomalyAlertingConfiguration. TraceId: b16b562a-bbe6-4d41-991a-f241753fab50"}, [
  'Content-Length',
  '123',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '24cba4e2-14cc-408b-a435-69a626679da5',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '24cba4e2-14cc-408b-a435-69a626679da5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:12 GMT'
]);
