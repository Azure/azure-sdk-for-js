let nock = require('nock');

module.exports.hash = "dd567acdde6a2ad85c32bde70a9cfb5a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/75343ada-1714-4218-86b1-c6ee26d11567')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '42e043d7-e3c3-4a46-949a-667e98e8cb5f',
  'x-envoy-upstream-service-time',
  '318',
  'apim-request-id',
  '42e043d7-e3c3-4a46-949a-667e98e8cb5f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:39:26 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/75343ada-1714-4218-86b1-c6ee26d11567')
  .reply(404, {"code":"Not Found","message":"Not found this AnomalyAlertingConfiguration. TraceId: bfac689d-6eca-4ba9-9b22-b37f848e5e6a"}, [
  'Content-Length',
  '123',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '3d9ed615-939b-409a-8c54-5ab05a1db812',
  'x-envoy-upstream-service-time',
  '134',
  'apim-request-id',
  '3d9ed615-939b-409a-8c54-5ab05a1db812',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:39:26 GMT'
]);
