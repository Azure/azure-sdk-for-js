let nock = require('nock');

module.exports.hash = "791f4e42cb62fa1923842fe52c20c725";

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
  '95c9acd1-9bd6-4477-8b3c-ff15e14b7600',
  'x-ms-ests-server',
  '2.1.11086.7 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AivV5P9RxTFKuL-mUNh-Bf9J4DFtAQAAAMCHDdcOAAAA; expires=Wed, 04-Nov-2020 21:31:45 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 05 Oct 2020 21:31:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .put('/$schemagroups/azsdk_js_test_group/schemas/azsdk_js_test_000022', {"type":"record","name":"User","namespace":"com.azure.schemaregistry.samples","fields":[{"name":"name","type":"string"},{"name":"favoriteNumber","type":"int"}]})
  .query(true)
  .reply(200, {"id":"228b2b0ea7f74b55a80f6651d6641b59"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Location',
  'https://endpoint:443/$schemagroups/azsdk_js_test_group/schemas/azsdk_js_test_000022/versions/43?api-version=2020-09-01-preview',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Schema-Id',
  '228b2b0ea7f74b55a80f6651d6641b59',
  'Schema-Id-Location',
  'https://endpoint:443/$schemagroups/getschemabyid/228b2b0ea7f74b55a80f6651d6641b59?api-version=2020-09-01-preview',
  'Serialization-Type',
  'Avro',
  'Schema-Version',
  '43',
  'Schema-Versions-Location',
  'https://endpoint:443/$schemagroups/azsdk_js_test_group/schemas/azsdk_js_test_000022/versions?api-version=2020-09-01-preview',
  'Strict-Transport-Security',
  'max-age=31536000',
  'Date',
  'Mon, 05 Oct 2020 21:31:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/$schemagroups/getSchemaById/228b2b0ea7f74b55a80f6651d6641b59')
  .query(true)
  .reply(200, {"type":"record","name":"User","namespace":"com.azure.schemaregistry.samples","fields":[{"name":"name","type":"string"},{"name":"favoriteNumber","type":"int"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Location',
  'https://endpoint:443/$schemagroups/azsdk_js_test_group/schemas/azsdk_js_test_000022/versions/43?api-version=2020-09-01-preview',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Schema-Id',
  '228b2b0ea7f74b55a80f6651d6641b59',
  'Schema-Id-Location',
  'https://endpoint:443/$schemagroups/getschemabyid/228b2b0ea7f74b55a80f6651d6641b59?api-version=2020-09-01-preview',
  'Serialization-Type',
  'Avro',
  'Schema-Version',
  '43',
  'Schema-Versions-Location',
  'https://endpoint:443/$schemagroups/azsdk_js_test_group/schemas/azsdk_js_test_000022/versions?api-version=2020-09-01-preview',
  'Strict-Transport-Security',
  'max-age=31536000',
  'Date',
  'Mon, 05 Oct 2020 21:31:45 GMT'
]);
