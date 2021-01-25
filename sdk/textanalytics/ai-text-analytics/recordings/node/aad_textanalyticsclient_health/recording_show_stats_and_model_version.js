let nock = require('nock');

module.exports.hash = "cffa65676522d9a15f5effdfbb404278";

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
  '4e3ead89-b442-4198-9374-deb2e31a6000',
  'x-ms-ests-server',
  '2.1.11251.18 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AickfXfjfIlEjLxRQMfezoc; expires=Sat, 19-Dec-2020 21:47:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 19 Nov 2020 21:47:04 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"56","text":":)"},{"id":"0","text":":("},{"id":"22","text":""},{"id":"19","text":":P"},{"id":"1","text":":D"}]})
  .query(true)
  .reply(500, {"error":{"code":"InternalServerError","message":"Unable to get resource information."}}, [
  'Content-Length',
  '89',
  'Content-Type',
  'application/json',
  'apim-request-id',
  'aa47451c-1659-42ea-8fbc-0434b1f970ce',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 21:47:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"56","text":":)"},{"id":"0","text":":("},{"id":"22","text":""},{"id":"19","text":":P"},{"id":"1","text":":D"}]})
  .query(true)
  .reply(500, {"error":{"code":"InternalServerError","message":"Unable to get resource information."}}, [
  'Content-Length',
  '89',
  'Content-Type',
  'application/json',
  'apim-request-id',
  '9509503d-c101-4295-9376-671b4c8c0d29',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 21:47:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"1","text":"This won't actually create a warning :'("}]})
  .query(true)
  .reply(500, {"error":{"code":"InternalServerError","message":"Unable to get resource information."}}, [
  'Content-Length',
  '89',
  'Content-Type',
  'application/json',
  'apim-request-id',
  '968612ee-89f0-417e-96e4-8b03f19644a4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 21:47:08 GMT'
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
  'ea309ef8-ceee-43cc-914f-3cafaba70c00',
  'x-ms-ests-server',
  '2.1.11251.18 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AlfyzuRhKD1Nroq-zBbJLiRz_bg1AgAAALreSNcOAAAA; expires=Sat, 19-Dec-2020 21:47:08 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 19 Nov 2020 21:47:08 GMT',
  'Content-Length',
  '1331'
]);
