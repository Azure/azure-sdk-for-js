let nock = require('nock');

module.exports.hash = "7c8ab425909836efdde9e23d95c19444";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fdev.azuresynapse.net%2F.default")
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
  '9f0e984f-dd07-4f5a-a98c-98ba42370300',
  'x-ms-ests-server',
  '2.1.11251.20 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=ArxnG-tSejFMviarBfucazo; expires=Sun, 20-Dec-2020 13:44:18 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 13:44:17 GMT',
  'Content-Length',
  '1322'
]);

nock('https://workspace_name.dev.azuresynapse.net:443', {"encodedQueryParams":true})
  .get('/roleAssignments')
  .query(true)
  .reply(200, {"count":2,"value":[{"id":"00000000-0000-0000-0000-000000000000-23a9b13a-a58b-4d8e-a58a-ff4c351fae61","roleDefinitionId":"00000000-0000-0000-0000-000000000000","principalId":"23a9b13a-a58b-4d8e-a58a-ff4c351fae61","scope":"workspaces/workspace_name"},{"id":"00000000-1111-0000-0000-000000000000","roleDefinitionId":"00000000-0000-0000-0000-000000000000","principalId":"00000000-0000-0000-0000-000000000000","scope":"workspaces/workspace_name"}]}, [
  'Content-Length',
  '456',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-continuation',
  '',
  'x-ms-request-id',
  '494aaca8-0d60-4758-b688-d2a67a758d57',
  'Date',
  'Fri, 20 Nov 2020 13:44:18 GMT'
]);
