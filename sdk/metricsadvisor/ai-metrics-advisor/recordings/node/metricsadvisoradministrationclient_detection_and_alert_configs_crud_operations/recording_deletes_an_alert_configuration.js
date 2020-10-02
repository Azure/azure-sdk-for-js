let nock = require('nock');

module.exports.hash = "5af2398dcc29acfe93063a9c84b4ad45";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/28e85c5b-cbb5-480b-be46-05b7a6cfcc8e')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'c974a1fa-4c55-43bd-a00b-e99418ca86c4',
  'x-envoy-upstream-service-time',
  '109',
  'apim-request-id',
  'c974a1fa-4c55-43bd-a00b-e99418ca86c4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Sep 2020 19:35:21 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/28e85c5b-cbb5-480b-be46-05b7a6cfcc8e')
  .reply(404, {"code":"Not Found","message":"Not found this AnomalyAlertingConfiguration. TraceId: 5fa9f8a9-690b-480b-888b-92dc3187975f"}, [
  'Content-Length',
  '123',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b68a1001-d124-4b34-9037-0fef6ade4e02',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  'b68a1001-d124-4b34-9037-0fef6ade4e02',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Sep 2020 19:35:21 GMT',
  'Connection',
  'close'
]);
