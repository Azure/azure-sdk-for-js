let nock = require('nock');

module.exports.hash = "eb752a5437d876fa419f00da84ae3002";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1331',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  'a64bd16b-9227-4b1e-ab2d-878e10a6e400',
  'x-ms-ests-server',
  '2.1.11722.21 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AinGrRGBzI5Mg73OLQslIGHGLH8mEAAAAAZAMdgOAAAA; expires=Mon, 14-Jun-2021 04:10:08 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 15 May 2021 04:10:08 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/status/enrichment/anomalyDetection/query', {"startTime":"2020-01-01T00:00:00.000Z","endTime":"2020-11-05T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2020-01-01T00:00:00Z","status":"Succeeded","message":"{\"UpdateTime\":\"2021-04-07T22:33:32.366Z\",\"CreateTime\":\"2021-04-07T22:33:32.366Z\"}"},{"timestamp":"2020-01-02T00:00:00Z","status":"Succeeded","message":"{\"UpdateTime\":\"2021-04-07T22:33:32.372Z\",\"CreateTime\":\"2021-04-07T22:33:32.372Z\"}"}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/status/enrichment/anomalyDetection/query?$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '533',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '78555482-3fa9-419d-8693-0a63ae61f2eb',
  'x-envoy-upstream-service-time',
  '142',
  'apim-request-id',
  '78555482-3fa9-419d-8693-0a63ae61f2eb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:09 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/status/enrichment/anomalyDetection/query', {"startTime":"2020-01-01T00:00:00.000Z","endTime":"2020-11-05T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2020-01-03T00:00:00Z","status":"Succeeded","message":"{\"UpdateTime\":\"2021-04-07T22:33:32.372Z\",\"CreateTime\":\"2021-04-07T22:33:32.372Z\"}"},{"timestamp":"2020-01-04T00:00:00Z","status":"Succeeded","message":"{\"UpdateTime\":\"2021-04-07T22:33:32.372Z\",\"CreateTime\":\"2021-04-07T22:33:32.372Z\"}"}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/status/enrichment/anomalyDetection/query?$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '533',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '26373515-6212-4f8e-9b61-a258ee6ae4e6',
  'x-envoy-upstream-service-time',
  '107',
  'apim-request-id',
  '26373515-6212-4f8e-9b61-a258ee6ae4e6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:09 GMT'
]);
