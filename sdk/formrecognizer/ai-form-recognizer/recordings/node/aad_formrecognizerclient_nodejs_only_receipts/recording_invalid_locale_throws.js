let nock = require('nock');

module.exports.hash = "3c34169007caa355dcefc44778135319";

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
  '3601b31d-444e-4c50-b76b-09b3b9ee2300',
  'x-ms-ests-server',
  '2.1.11251.20 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjhGOFWld7xOvsfC874ED5_GLH8mAQAAAD0xStcOAAAA; expires=Sun, 20-Dec-2020 21:50:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 21:50:53 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.2/prebuilt/receipt/analyze', {"source":"https://storageaccount/testingdata/contoso-allinone.jpg?sastoken"})
  .query(true)
  .reply(400, {"error":{"code":"UnsupportedLocale","innerError":{"requestId":"132062f2-129f-4022-86b0-1a15aa44ce46"},"message":"Locale unsupported. Supported locales include en-AU, en-CA, en-GB, en-IN and en-US."}}, [
  'Content-Length',
  '200',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '831',
  'apim-request-id',
  '132062f2-129f-4022-86b0-1a15aa44ce46',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 21:50:54 GMT'
]);
