let nock = require('nock');

module.exports.hash = "febe9d20712277d8563fe7b198a96fb2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Feventhubs.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1321',
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
  'cd25945f-dd44-45e3-b3ae-cf0dd4c10300',
  'x-ms-ests-server',
  '2.1.10963.12 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AmLTufw-9ORGsDjZYRrzevBJ4DFtAQAAAGVWztYOAAAA; expires=Thu, 17-Sep-2020 23:08:22 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 18 Aug 2020 23:08:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .put('/$schemagroups/azsdk_js_test_group/schemas/azsdk_js_test_000021', "{\"type\":\"record\",\"name\":\"User\",\"namespace\":\"com.azure.schemaregistry.samples\",\"fields\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"favoriteNumber\",\"type\":\"int\"}]}")
  .query(true)
  .reply(400, "<Error><Code>400</Code><Detail>Invalid schema type for POST request. 'not-valid' is not supported. TrackingId:30496f33-7d79-4e0f-83bc-409156c7428e_G0, SystemTracker:endpoint:$schemagroups/azsdk_js_test_group/schemas/azsdk_js_test_000021, Timestamp:2020-08-18T23:08:23</Detail></Error>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml; charset=utf-8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000',
  'Date',
  'Tue, 18 Aug 2020 23:08:23 GMT'
]);
