let nock = require('nock');

module.exports.hash = "36784ad4c241d8896eeb00f29f33bee8";

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
  '2615a492-d8e6-47fc-93cc-22cabd222b00',
  'x-ms-ests-server',
  '2.1.11251.20 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=ArzBSPK6GzlPr2ogDoh1zkQ; expires=Sun, 20-Dec-2020 21:49:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 21:49:55 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.2/layout/analyze', {"source":"https://storageaccount/testingdata/Invoice_1.pdf?sastoken"})
  .query(true)
  .reply(400, {"error":{"code":"NotSupportedLanguage","message":"The requested operation is not supported in the language specified."}}, [
  'Content-Length',
  '121',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '3',
  'apim-request-id',
  'cdf969d4-9212-4f08-a044-fa8d9a9e8e7e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 21:49:55 GMT'
]);
