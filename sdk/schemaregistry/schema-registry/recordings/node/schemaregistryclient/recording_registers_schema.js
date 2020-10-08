let nock = require('nock');

module.exports.hash = "7a3ba87cdf7a98b968983064f67f0184";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Feventhubs.azure.net%2F.default")
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
  'f49473b9-aa98-4eff-b5d2-9c1afe0c2401',
  'x-ms-ests-server',
  '2.1.11086.7 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjXVec4rndNBop5Yt58N_2pJ4DFtAQAAALqHDdcOAAAA; expires=Wed, 04-Nov-2020 21:31:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 05 Oct 2020 21:31:38 GMT',
  'Content-Length',
  '1321'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .put('/$schemagroups/azsdk_js_test_group/schemas/azsdk_js_test_000022', {"type":"record","name":"User","namespace":"com.azure.schemaregistry.samples","fields":[{"name":"name","type":"string"},{"name":"favoriteNumber","type":"int"}]})
  .query(true)
  .reply(200, {"id":"ac88cdfed763412f805999ae0e04ca72"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Location',
  'https://endpoint:443/$schemagroups/azsdk_js_test_group/schemas/azsdk_js_test_000022/versions/41?api-version=2020-09-01-preview',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Schema-Id',
  'ac88cdfed763412f805999ae0e04ca72',
  'Schema-Id-Location',
  'https://endpoint:443/$schemagroups/getschemabyid/ac88cdfed763412f805999ae0e04ca72?api-version=2020-09-01-preview',
  'Serialization-Type',
  'Avro',
  'Schema-Version',
  '41',
  'Schema-Versions-Location',
  'https://endpoint:443/$schemagroups/azsdk_js_test_group/schemas/azsdk_js_test_000022/versions?api-version=2020-09-01-preview',
  'Strict-Transport-Security',
  'max-age=31536000',
  'Date',
  'Mon, 05 Oct 2020 21:31:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .put('/$schemagroups/azsdk_js_test_group/schemas/azsdk_js_test_000022', {"type":"record","name":"User","namespace":"com.azure.schemaregistry.samples","fields":[{"name":"name","type":"string"},{"name":"secondFavoriteNumber","type":"int"}]})
  .query(true)
  .reply(200, {"id":"c117273dd2e3403aa5176317936fe205"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Location',
  'https://endpoint:443/$schemagroups/azsdk_js_test_group/schemas/azsdk_js_test_000022/versions/42?api-version=2020-09-01-preview',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Schema-Id',
  'c117273dd2e3403aa5176317936fe205',
  'Schema-Id-Location',
  'https://endpoint:443/$schemagroups/getschemabyid/c117273dd2e3403aa5176317936fe205?api-version=2020-09-01-preview',
  'Serialization-Type',
  'Avro',
  'Schema-Version',
  '42',
  'Schema-Versions-Location',
  'https://endpoint:443/$schemagroups/azsdk_js_test_group/schemas/azsdk_js_test_000022/versions?api-version=2020-09-01-preview',
  'Strict-Transport-Security',
  'max-age=31536000',
  'Date',
  'Mon, 05 Oct 2020 21:31:40 GMT'
]);
