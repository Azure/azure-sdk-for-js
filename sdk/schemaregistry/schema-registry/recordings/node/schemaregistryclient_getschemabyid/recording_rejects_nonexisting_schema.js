let nock = require('nock');

module.exports.hash = "a28f02e0f112e29825ddda22955a8176";

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
  '5c2bcd78-52a0-4632-b90e-8c7d5f010f00',
  'x-ms-ests-server',
  '2.1.10946.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AnRgOHbeji5DkuSs6eGSYOJJ4DFtAQAAAOQdydYOAAAA; expires=Mon, 14-Sep-2020 00:05:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 15 Aug 2020 00:05:56 GMT',
  'Content-Length',
  '1321'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/$schemagroups/getSchemaById/ffffffffffffffffffffffffffffffff')
  .query(true)
  .reply(404, "<Error><Code>404</Code><Detail>Schema id ffffffffffffffffffffffffffffffff does not exist. TrackingId:44dfff1d-37e5-4908-bdda-b1813a0fc393_G3, SystemTracker:endpoint:$schemagroups/getSchemaById/ffffffffffffffffffffffffffffffff, Timestamp:2020-08-15T00:05:57</Detail></Error>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml; charset=utf-8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000',
  'Date',
  'Sat, 15 Aug 2020 00:05:57 GMT'
]);
