let nock = require('nock');

module.exports.hash = "707039e1c7cffcbf23d699b5e7ba9f82";

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
  '2c151804-5d5f-4bc4-980a-4969980c1000',
  'x-ms-ests-server',
  '2.1.10946.16 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AgbFhhIoNZ9DgDyQCUF6OsxJ4DFtAQAAAOEdydYOAAAA; expires=Mon, 14-Sep-2020 00:05:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 15 Aug 2020 00:05:53 GMT',
  'Content-Length',
  '1321'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/$schemagroups/azsdk_js_test_group/schemas/azsdk_js_test_000011', "{\"type\":\"record\",\"name\":\"User\",\"namespace\":\"com.azure.schemaregistry.samples\",\"fields\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"favoriteNumber\",\"type\":\"int\"}]}")
  .query(true)
  .reply(400, "<Error><Code>400</Code><Detail>Invalid schema type for POST request. 'not-valid' is not supported. TrackingId:cde3219b-ad3c-49f9-9b26-b23fa6b3320c_G3, SystemTracker:endpoint:$schemagroups/azsdk_js_test_group/schemas/azsdk_js_test_000011, Timestamp:2020-08-15T00:05:54</Detail></Error>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml; charset=utf-8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000',
  'Date',
  'Sat, 15 Aug 2020 00:05:54 GMT'
]);
