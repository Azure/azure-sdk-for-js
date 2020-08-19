let nock = require('nock');

module.exports.hash = "01692f8260b5641cb639d46ce3104b9c";

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
  '54063e45-5c15-4af5-ab3e-25833b042100',
  'x-ms-ests-server',
  '2.1.10963.12 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=As4byXOGWFhFjvunwhCwK0ZJ4DFtAQAAAO40z9YOAAAA; expires=Fri, 18-Sep-2020 14:57:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 19 Aug 2020 14:57:51 GMT',
  'Content-Length',
  '1321'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/$schemagroups/azsdk_js_test_group/schemas/azsdk_js_test_000022', "{\"type\":\"record\",\"name\":\"User\",\"namespace\":\"com.azure.schemaregistry.samples\",\"fields\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"favoriteNumber\",\"type\":\"int\"}]}")
  .query(true)
  .reply(400, "<Error><Code>400</Code><Detail>Invalid schema type for POST request. 'not-valid' is not supported. TrackingId:d46025d8-79f5-460c-a4c5-93b967b4fdd5_G0, SystemTracker:endpoint:$schemagroups/azsdk_js_test_group/schemas/azsdk_js_test_000022, Timestamp:2020-08-19T14:57:52</Detail></Error>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml; charset=utf-8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000',
  'Date',
  'Wed, 19 Aug 2020 14:57:52 GMT'
]);
