let nock = require('nock');

module.exports.hash = "c9f0f5c1f5b8196dbf947d1679664091";

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
  '8c5bf2d4-2333-4edc-b278-5971483a0600',
  'x-ms-ests-server',
  '2.1.11239.6 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AvSgIGmrHpFDnVo_OIoYz8RJ0eYvAQAAAHsgQNcOAAAA; expires=Sun, 13-Dec-2020 06:36:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 13 Nov 2020 06:36:43 GMT'
]);

nock('https://workspace_name.dev.azuresynapse.net:443', {"encodedQueryParams":true})
  .get('/rbac/roles/roll_id')
  .query(true)
  .reply(200, {"id":"roll_id","name":"Sql Admin","isBuiltIn":true}, [
  'Content-Length',
  '81',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Microsoft-HTTPAPI/2.0 Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ae324c45-37ca-48dd-863f-cd02c6250236',
  'x-ms-request-id',
  'ae324c45-37ca-48dd-863f-cd02c6250236',
  'Date',
  'Fri, 13 Nov 2020 06:36:44 GMT'
]);
