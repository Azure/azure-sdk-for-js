let nock = require('nock');

module.exports.hash = "362298b01cb80b7551bbfeea3bf3bc36";

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
  '8af271e0-2194-435d-933e-401d618f1100',
  'x-ms-ests-server',
  '2.1.10946.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Ag0HCcD5W5VMsVo8A0hhU7xJ4DFtAQAAAOUdydYOAAAA; expires=Mon, 14-Sep-2020 00:05:58 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 15 Aug 2020 00:05:58 GMT',
  'Content-Length',
  '1321'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .put('/$schemagroups/azsdk_js_test_group/schemas/azsdk_js_test_000011', "{\"type\":\"record\",\"name\":\"User\",\"namespace\":\"com.azure.schemaregistry.samples\",\"fields\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"favoriteNumber\",\"type\":\"int\"}]}")
  .query(true)
  .reply(200, {"id":"2ac50fa8e88b4479bb73b0a7cfdb95a3"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Location',
  'https://endpoint:443/$schemagroups/azsdk_js_test_group/schemas/azsdk_js_test_000011/versions/7?api-version=2017-04',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'X-Schema-Id',
  '2ac50fa8e88b4479bb73b0a7cfdb95a3',
  'X-Schema-Id-Location',
  'https://endpoint:443/$schemagroups/getschemabyid/2ac50fa8e88b4479bb73b0a7cfdb95a3?api-version=2017-04',
  'X-Schema-Type',
  'Avro',
  'X-Schema-Version',
  '7',
  'X-Schema-Versions-Location',
  'https://endpoint:443/$schemagroups/azsdk_js_test_group/schemas/azsdk_js_test_000011/versions?api-version=2017-04',
  'Strict-Transport-Security',
  'max-age=31536000',
  'Date',
  'Sat, 15 Aug 2020 00:05:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/$schemagroups/getSchemaById/2ac50fa8e88b4479bb73b0a7cfdb95a3')
  .query(true)
  .reply(200, "{\"type\":\"record\",\"name\":\"User\",\"namespace\":\"com.azure.schemaregistry.samples\",\"fields\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"favoriteNumber\",\"type\":\"int\"}]}", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Location',
  'https://endpoint:443/$schemagroups/azsdk_js_test_group/schemas/azsdk_js_test_000011/versions/7?api-version=2017-04',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'X-Schema-Id',
  '2ac50fa8e88b4479bb73b0a7cfdb95a3',
  'X-Schema-Id-Location',
  'https://endpoint:443/$schemagroups/getschemabyid/2ac50fa8e88b4479bb73b0a7cfdb95a3?api-version=2017-04',
  'X-Schema-Type',
  'Avro',
  'X-Schema-Version',
  '7',
  'X-Schema-Versions-Location',
  'https://endpoint:443/$schemagroups/azsdk_js_test_group/schemas/azsdk_js_test_000011/versions?api-version=2017-04',
  'Strict-Transport-Security',
  'max-age=31536000',
  'Date',
  'Sat, 15 Aug 2020 00:05:58 GMT'
]);
