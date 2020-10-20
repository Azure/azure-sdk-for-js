let nock = require('nock');

module.exports.hash = "2c8e62bb03a1552d4da0f7a0247661b3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fdev.azuresynapse.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1322',
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
  '13245ec3-940d-4b26-907a-a85c0c790600',
  'x-ms-ests-server',
  '2.1.11239.6 - EASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AsHnhOD2oxNBgWhPE8YpVzVJ0eYvAQAAAHwgQNcOAAAA; expires=Sun, 13-Dec-2020 06:36:45 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 13 Nov 2020 06:36:45 GMT'
]);

nock('https://workspace_name.dev.azuresynapse.net:443', {"encodedQueryParams":true})
  .get('/rbac/roles')
  .query(true)
  .reply(200, {"value":[{"id":"6e4bf58a-b8e1-4cc3-bbf9-d73143322b78","name":"Workspace Admin","isBuiltIn":true},{"id":"c3a6d2f1-a26f-4810-9b0f-591308d5cbf1","name":"Apache Spark Admin","isBuiltIn":true},{"id":"roll_id","name":"Sql Admin","isBuiltIn":true},{"id":"24fa9e0a-d130-4536-9f92-8b976b16986b","name":"Scope Admin","isBuiltIn":true}]}, [
  'Content-Length',
  '356',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Microsoft-HTTPAPI/2.0 Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0dba058c-4dc4-4d58-9988-3f9a3085a110',
  'x-ms-request-id',
  '0dba058c-4dc4-4d58-9988-3f9a3085a110',
  'Date',
  'Fri, 13 Nov 2020 06:36:46 GMT'
]);
