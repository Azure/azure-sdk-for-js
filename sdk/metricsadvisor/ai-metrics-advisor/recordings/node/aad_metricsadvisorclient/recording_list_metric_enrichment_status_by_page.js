let nock = require('nock');

module.exports.hash = "eb752a5437d876fa419f00da84ae3002";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
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
  '12d58ac1-6dbb-44d8-be80-a3e58d4bc400',
  'x-ms-ests-server',
  '2.1.11722.26 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AvJP_5zXpMNFtNCcPwwYUd3GLH8mEQAAAMwkSdgOAAAA; expires=Fri, 02-Jul-2021 07:06:58 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 02 Jun 2021 07:06:58 GMT',
  'Content-Length',
  '1331'
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
  '0374aa7a-ef16-4ce9-ba1e-f3c3c61dafef',
  'x-envoy-upstream-service-time',
  '295',
  'apim-request-id',
  '0374aa7a-ef16-4ce9-ba1e-f3c3c61dafef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 07:06:58 GMT'
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
  '61e4ed04-3354-423e-9e32-733182e40ce8',
  'x-envoy-upstream-service-time',
  '284',
  'apim-request-id',
  '61e4ed04-3354-423e-9e32-733182e40ce8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 07:06:59 GMT'
]);
