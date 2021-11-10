let nock = require('nock');

module.exports.hash = "366f7c412fa8555bd7a058782fcf69f0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/72698866-8641-4147-9144-24744011447/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fsanitized%2F")
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
  '57c5a3dd-23ee-48ed-803f-2c551b34b700',
  'x-ms-ests-server',
  '2.1.12197.4 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=At2J_Y2gtlREgfm4yQ59UHw; expires=Wed, 08-Dec-2021 09:38:10 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 08 Nov 2021 09:38:09 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/status/enrichment/anomalyDetection/query', {"startTime":"2021-01-01T00:00:00.000Z","endTime":"2021-11-05T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2021-08-11T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:37.533Z\",\"UpdateTime\":\"2021-09-07T23:45:37.533Z\"}"},{"timestamp":"2021-08-12T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:37.533Z\",\"UpdateTime\":\"2021-09-07T23:45:37.533Z\"}"}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/status/enrichment/anomalyDetection/query?$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '533',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '52e502c6-643b-4d7e-bffd-24cec1fc1df6',
  'x-envoy-upstream-service-time',
  '242',
  'apim-request-id',
  '52e502c6-643b-4d7e-bffd-24cec1fc1df6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:09 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/status/enrichment/anomalyDetection/query', {"startTime":"2021-01-01T00:00:00.000Z","endTime":"2021-11-05T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2021-08-13T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:37.533Z\",\"UpdateTime\":\"2021-09-07T23:45:37.533Z\"}"},{"timestamp":"2021-08-14T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:37.533Z\",\"UpdateTime\":\"2021-09-07T23:45:37.533Z\"}"}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/status/enrichment/anomalyDetection/query?$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '533',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6ff7484f-452e-4484-83c0-4144d3373d1f',
  'x-envoy-upstream-service-time',
  '157',
  'apim-request-id',
  '6ff7484f-452e-4484-83c0-4144d3373d1f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:09 GMT'
]);
