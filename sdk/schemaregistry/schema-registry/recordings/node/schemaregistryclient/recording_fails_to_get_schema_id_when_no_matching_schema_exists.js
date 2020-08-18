let nock = require('nock');

module.exports.hash = "97bb3ef7d11ff026e400c3bb44bc641b";

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
  'dcee8853-3abc-43e0-b35e-3f221c082100',
  'x-ms-ests-server',
  '2.1.10946.17 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AlrOX0iy3kZOhCgLQdYEq1pJ4DFtAQAAAAz4zdYOAAAA; expires=Thu, 17-Sep-2020 16:25:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 18 Aug 2020 16:25:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/$schemagroups/azsdk_js_test_group/schemas/never-registered', "{\"type\":\"record\",\"name\":\"User\",\"namespace\":\"com.azure.schemaregistry.samples\",\"fields\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"favoriteNumber\",\"type\":\"int\"}]}")
  .query(true)
  .reply(404, "<Error><Code>404</Code><Detail>Schema azsdk_js_test_group/never-registered does not exist. TrackingId:bb8152ec-0d7d-4cdc-91a9-5eb352e34587_G3, SystemTracker:endpoint:$schemagroups/azsdk_js_test_group/schemas/never-registered, Timestamp:2020-08-18T16:25:49</Detail></Error>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml; charset=utf-8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000',
  'Date',
  'Tue, 18 Aug 2020 16:25:49 GMT'
]);
