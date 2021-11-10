let nock = require('nock');

module.exports.hash = "bd457339ef4b521838dfc776ada1765c";

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
  'd0c5d9f2-8498-4f01-af01-f396f3fa2a00',
  'x-ms-ests-server',
  '2.1.12231.7 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=At6QQNZeFI1IqJw-IEsubjA; expires=Fri, 10-Dec-2021 02:07:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 10 Nov 2021 02:07:13 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/status/enrichment/anomalyDetection/query', {"startTime":"2021-01-01T00:00:00.000Z","endTime":"2021-09-18T00:00:00.000Z"})
  .reply(200, {"value":[{"timestamp":"2021-08-11T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:37.533Z\",\"UpdateTime\":\"2021-09-07T23:45:37.533Z\"}"},{"timestamp":"2021-08-12T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:37.533Z\",\"UpdateTime\":\"2021-09-07T23:45:37.533Z\"}"},{"timestamp":"2021-08-17T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:37.533Z\",\"UpdateTime\":\"2021-09-07T23:45:37.533Z\"}"},{"timestamp":"2021-08-19T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:57.535Z\",\"UpdateTime\":\"2021-09-07T23:45:57.535Z\"}"},{"timestamp":"2021-08-13T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:37.533Z\",\"UpdateTime\":\"2021-09-07T23:45:37.533Z\"}"},{"timestamp":"2021-08-14T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:37.533Z\",\"UpdateTime\":\"2021-09-07T23:45:37.533Z\"}"},{"timestamp":"2021-08-15T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:37.533Z\",\"UpdateTime\":\"2021-09-07T23:45:37.533Z\"}"},{"timestamp":"2021-08-16T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:37.533Z\",\"UpdateTime\":\"2021-09-07T23:45:37.533Z\"}"},{"timestamp":"2021-08-18T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:57.535Z\",\"UpdateTime\":\"2021-09-07T23:45:57.535Z\"}"},{"timestamp":"2021-08-20T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:57.535Z\",\"UpdateTime\":\"2021-09-07T23:45:57.535Z\"}"},{"timestamp":"2021-08-21T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:57.535Z\",\"UpdateTime\":\"2021-09-07T23:45:57.535Z\"}"},{"timestamp":"2021-08-22T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:57.535Z\",\"UpdateTime\":\"2021-09-07T23:45:57.535Z\"}"},{"timestamp":"2021-08-23T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:57.535Z\",\"UpdateTime\":\"2021-09-07T23:45:57.535Z\"}"},{"timestamp":"2021-08-24T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:57.535Z\",\"UpdateTime\":\"2021-09-07T23:45:57.535Z\"}"},{"timestamp":"2021-08-25T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:57.535Z\",\"UpdateTime\":\"2021-09-07T23:45:57.535Z\"}"},{"timestamp":"2021-08-29T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:57.535Z\",\"UpdateTime\":\"2021-09-07T23:45:57.535Z\"}"},{"timestamp":"2021-08-26T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:57.535Z\",\"UpdateTime\":\"2021-09-07T23:45:57.535Z\"}"},{"timestamp":"2021-08-27T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:57.535Z\",\"UpdateTime\":\"2021-09-07T23:45:57.535Z\"}"},{"timestamp":"2021-08-28T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:57.535Z\",\"UpdateTime\":\"2021-09-07T23:45:57.535Z\"}"},{"timestamp":"2021-08-30T00:00:00Z","status":"Succeeded","message":"{\"UpdateTime\":\"2021-09-07T23:50:38.043Z\",\"CreateTime\":\"2021-09-07T23:50:38.043Z\"}"},{"timestamp":"2021-08-31T00:00:00Z","status":"Succeeded","message":"{\"UpdateTime\":\"2021-09-07T23:50:38.043Z\",\"CreateTime\":\"2021-09-07T23:50:38.043Z\"}"},{"timestamp":"2021-09-01T00:00:00Z","status":"Succeeded","message":"{\"UpdateTime\":\"2021-09-07T23:50:38.043Z\",\"CreateTime\":\"2021-09-07T23:50:38.043Z\"}"},{"timestamp":"2021-09-02T00:00:00Z","status":"Succeeded","message":"{\"UpdateTime\":\"2021-09-07T23:50:58.044Z\",\"CreateTime\":\"2021-09-07T23:50:58.044Z\"}"},{"timestamp":"2021-09-03T00:00:00Z","status":"Succeeded","message":"{\"UpdateTime\":\"2021-09-07T23:50:58.044Z\",\"CreateTime\":\"2021-09-07T23:50:58.044Z\"}"},{"timestamp":"2021-09-04T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:51:38.047Z\",\"UpdateTime\":\"2021-09-07T23:51:38.047Z\"}"},{"timestamp":"2021-09-05T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:51:38.047Z\",\"UpdateTime\":\"2021-09-07T23:51:38.047Z\"}"},{"timestamp":"2021-09-06T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:51:38.047Z\",\"UpdateTime\":\"2021-09-07T23:51:38.047Z\"}"},{"timestamp":"2021-09-07T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-08T00:09:21.194Z\",\"UpdateTime\":\"2021-09-08T00:09:21.194Z\"}"},{"timestamp":"2021-09-08T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-09T00:04:14.700Z\",\"UpdateTime\":\"2021-09-09T00:04:14.700Z\"}"},{"timestamp":"2021-09-09T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-10T00:03:55.244Z\",\"UpdateTime\":\"2021-09-10T00:03:55.244Z\"}"},{"timestamp":"2021-09-10T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-11T00:32:38.587Z\",\"UpdateTime\":\"2021-09-11T00:32:38.587Z\"}"},{"timestamp":"2021-09-11T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-12T00:32:36.822Z\",\"UpdateTime\":\"2021-09-12T00:32:36.822Z\"}"},{"timestamp":"2021-09-12T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-13T03:35:38.036Z\",\"UpdateTime\":\"2021-09-13T03:35:38.036Z\"}"},{"timestamp":"2021-09-14T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-15T00:04:33.596Z\",\"UpdateTime\":\"2021-09-15T00:04:33.596Z\"}"},{"timestamp":"2021-09-15T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-16T04:36:39.931Z\",\"UpdateTime\":\"2021-09-16T04:36:39.931Z\"}"},{"timestamp":"2021-09-16T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-17T00:05:03.602Z\",\"UpdateTime\":\"2021-09-17T00:05:03.602Z\"}"}],"@nextLink":null}, [
  'Content-Length',
  '5788',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ab8b5003-d196-49b7-a3f8-b4fc5a411189',
  'x-envoy-upstream-service-time',
  '187',
  'apim-request-id',
  'ab8b5003-d196-49b7-a3f8-b4fc5a411189',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:07:13 GMT'
]);
