let nock = require('nock');

module.exports.hash = "fe01b813ca39d1b9985737172a7ccebf";

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
  'a45ee63d-6829-4e20-a8cb-931064352200',
  'x-ms-ests-server',
  '2.1.10946.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AkICOsYmgE1Fhgb4nE5YxE5J4DFtAQAAAOIdydYOAAAA; expires=Mon, 14-Sep-2020 00:05:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 15 Aug 2020 00:05:54 GMT',
  'Content-Length',
  '1321'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/$schemagroups/azsdk_js_test_group/schemas/never-registered', "{\"type\":\"record\",\"name\":\"User\",\"namespace\":\"com.azure.schemaregistry.samples\",\"fields\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"favoriteNumber\",\"type\":\"int\"}]}")
  .query(true)
  .reply(404, "<Error><Code>404</Code><Detail>Schema azsdk_js_test_group/never-registered does not exist. TrackingId:5ad2b739-82a2-494a-a26f-9438576800e2_G5, SystemTracker:endpoint:$schemagroups/azsdk_js_test_group/schemas/never-registered, Timestamp:2020-08-15T00:05:55</Detail></Error>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml; charset=utf-8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000',
  'Date',
  'Sat, 15 Aug 2020 00:05:55 GMT'
]);
