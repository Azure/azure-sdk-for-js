let nock = require('nock');

module.exports.hash = "9b967f880087e954b76975494fad5c8c";

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
  'a66fbdfb-acd4-4c85-8c20-e911d8a75a00',
  'x-ms-ests-server',
  '2.1.11251.18 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AnMhVUwOqJRBjJjQd06JryFz_bg1AQAAACjfSNcOAAAA; expires=Sat, 19-Dec-2020 21:48:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 19 Nov 2020 21:48:25 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"1","text":"hello world"},{"id":"1","text":"I did not like the hotel we stayed at."}]})
  .query(true)
  .reply(500, {"error":{"code":"InternalServerError","message":"Unable to get resource information."}}, [
  'Content-Length',
  '89',
  'Content-Type',
  'application/json',
  'apim-request-id',
  '613e050f-d715-4456-848f-9425ee28498f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 21:48:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"1","text":"hello world"},{"id":"1","text":"I did not like the hotel we stayed at."}]})
  .query(true)
  .reply(500, {"error":{"code":"InternalServerError","message":"Unable to get resource information."}}, [
  'Content-Length',
  '89',
  'Content-Type',
  'application/json',
  'apim-request-id',
  'e8977527-e1ca-410f-a7dd-ed5d48824dab',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 21:48:24 GMT'
]);
