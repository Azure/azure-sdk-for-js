let nock = require('nock');

module.exports.hash = "06d82541bc2a1f09fbcb350954736645";

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
  'f2e9c6b9-52b4-49b3-8ddc-3f5090920300',
  'x-ms-ests-server',
  '2.1.11251.20 - EASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AnGZ7QbD8_pBsAkFH3Z_yz9J0eYvAQAAAC2_SdcOAAAA; expires=Sun, 20-Dec-2020 13:44:14 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 13:44:13 GMT',
  'Content-Length',
  '1322'
]);

nock('https://workspace_name.dev.azuresynapse.net:443', {"encodedQueryParams":true})
  .put('/roleAssignments/00000000-1111-0000-0000-000000000000', {"roleId":"00000000-0000-0000-0000-000000000000","principalId":"00000000-0000-0000-0000-000000000000","scope":"workspaces/workspace_name"})
  .query(true)
  .reply(200, {"id":"00000000-1111-0000-0000-000000000000","roleDefinitionId":"00000000-0000-0000-0000-000000000000","principalId":"00000000-0000-0000-0000-000000000000","scope":"workspaces/workspace_name"}, [
  'Content-Length',
  '198',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6ce28ff4-db26-4982-833e-83e015076b1d',
  'Date',
  'Fri, 20 Nov 2020 13:44:15 GMT'
]);
