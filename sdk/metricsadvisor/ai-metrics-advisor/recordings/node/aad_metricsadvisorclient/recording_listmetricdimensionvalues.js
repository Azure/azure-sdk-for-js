let nock = require('nock');

module.exports.hash = "13dba5b5733d032b6f2a014aaecedb97";

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
  '46cc9789-a7f4-408f-a602-875ed3632d00',
  'x-ms-ests-server',
  '2.1.12231.7 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AslSnQGqXbJFt7zYCnZiZO0; expires=Fri, 10-Dec-2021 02:07:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 10 Nov 2021 02:07:11 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/dimension/query', {"dimensionName":"category"})
  .reply(200, {"value":["__SUM__","Electronics (Accessories)","Electronics (Consumer)","Grocery & Gourmet Food","Handmade","Home & Garden","Office Products","Shoes Handbags & Sunglasses"]}, [
  'Content-Length',
  '174',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '77fdbd5d-176e-4d60-a937-33d4d867d46a',
  'x-envoy-upstream-service-time',
  '111',
  'apim-request-id',
  '77fdbd5d-176e-4d60-a937-33d4d867d46a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:07:11 GMT'
]);
