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
  'b391363f-9941-40ef-8cc4-558e83811f01',
  'x-ms-ests-server',
  '2.1.11086.7 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Asnx_FjEpm5ClYIyr1GdvTFJ4DFtAQAAALiHDdcOAAAA; expires=Wed, 04-Nov-2020 21:31:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 05 Oct 2020 21:31:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .put('/$schemagroups/azsdk_js_test_group/schemas/azsdk_js_test_000022', {"type":"record","name":"User","namespace":"com.azure.schemaregistry.samples","fields":[{"name":"name","type":"string"},{"name":"favoriteNumber","type":"int"}]})
  .query(true)
  .reply(400, {"Code":400,"Detail":"Invalid schema type for PUT request. 'not-valid' is not supported. TrackingId:0b46c6c6-1703-496b-a401-d04fe16404d5_G4, SystemTracker:endpoint:$schemagroups/azsdk_js_test_group/schemas/azsdk_js_test_000022, Timestamp:2020-10-05T21:31:39"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000',
  'Date',
  'Mon, 05 Oct 2020 21:31:39 GMT'
]);
