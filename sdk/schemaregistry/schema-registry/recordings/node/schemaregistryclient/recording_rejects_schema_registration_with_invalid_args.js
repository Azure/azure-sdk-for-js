let nock = require('nock');

module.exports.hash = "ac40b383b445f28c364f65a46fa4079c";

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
  'e10b13d8-b73a-4ab1-9656-34296c3f3c02',
  'x-ms-ests-server',
  '2.1.11328.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Al7u1hLnH_REspbi36Twu1VvWe_NAQAAAFBRfNcOAAAA; expires=Wed, 27-Jan-2021 22:21:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 28 Dec 2020 22:21:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .put('/$schemagroups/group/schemas/azsdk_js_test', {"type":"record","name":"User","namespace":"com.azure.schemaregistry.samples","fields":[{"name":"name","type":"string"},{"name":"favoriteNumber","type":"int"}]})
  .query(true)
  .reply(400, {"Code":400,"Detail":"Invalid schema type for PUT request. 'not-valid' is not supported. TrackingId:f01fd470-2537-461e-ad34-4f6c20f9f4a4_G11, SystemTracker:endpoint:$schemagroups/group/schemas/azsdk_js_test, Timestamp:2020-12-28T22:21:07"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000',
  'Date',
  'Mon, 28 Dec 2020 22:21:06 GMT'
]);
