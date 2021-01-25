let nock = require('nock');

module.exports.hash = "50df86296e2934da61ab33a01e362ca0";

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
  '08dc2860-0b5c-42a4-9001-1ad48df85d00',
  'x-ms-ests-server',
  '2.1.11251.18 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Ap_AgVkD53RIh2KBxiD3Jz9z_bg1AQAAAOLeSNcOAAAA; expires=Sat, 19-Dec-2020 21:47:15 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 19 Nov 2020 21:47:14 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"0","text":"This was the best day of my life.","language":"en"},{"id":"1","text":"I did not like the hotel we stayed at. It was too expensive.","language":"en"},{"id":"2","text":"The restaurant was not as good as I hoped.","language":"en"}]})
  .query(true)
  .reply(500, {"error":{"code":"InternalServerError","message":"Unable to get resource information."}}, [
  'Content-Length',
  '89',
  'Content-Type',
  'application/json',
  'apim-request-id',
  'ea522eef-5213-48a5-a27a-c396bd7b18b1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 21:47:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"0","text":"This was the best day of my life.","language":"en"},{"id":"1","text":"I did not like the hotel we stayed at. It was too expensive.","language":"en"},{"id":"2","text":"The restaurant was not as good as I hoped.","language":"en"}]})
  .query(true)
  .reply(500, {"error":{"code":"InternalServerError","message":"Unable to get resource information."}}, [
  'Content-Length',
  '89',
  'Content-Type',
  'application/json',
  'apim-request-id',
  'ce1effe7-990a-44bb-9e61-f047b41ae854',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 21:47:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"1","text":"one"},{"id":"2","text":"two"},{"id":"3","text":"three"},{"id":"4","text":"four"},{"id":"5","text":"five"}]})
  .query(true)
  .reply(500, {"error":{"code":"InternalServerError","message":"Unable to get resource information."}}, [
  'Content-Length',
  '89',
  'Content-Type',
  'application/json',
  'apim-request-id',
  '01f519cb-e539-4c22-bd37-76980b4d4e06',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 21:47:16 GMT'
]);

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
  '4af38e6f-9a34-4498-9d06-98b4ce2c5e00',
  'x-ms-ests-server',
  '2.1.11251.18 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AgBSweJWyK1CkavnJvVpd5Zz_bg1AQAAAMPeSNcOAAAA; expires=Sat, 19-Dec-2020 21:47:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 19 Nov 2020 21:47:17 GMT',
  'Content-Length',
  '1331'
]);
