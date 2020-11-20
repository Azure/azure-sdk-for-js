let nock = require('nock');

module.exports.hash = "4027a81006611c05dc9c2be1a4cac5f3";

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
  '2b7f6c6b-e8f3-479b-a064-dfff53180300',
  'x-ms-ests-server',
  '2.1.11251.20 - EASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AmVVE2kJl6ZEoTyCN7lpA7g; expires=Sun, 20-Dec-2020 13:44:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 13:44:19 GMT',
  'Content-Length',
  '1322'
]);

nock('https://workspace_name.dev.azuresynapse.net:443', {"encodedQueryParams":true})
  .post('/checkAccessSynapseRbac', {"subject":{"principalId":"00000000-0000-0000-0000-000000000000"},"actions":[{"id":"Microsoft.Synapse/workspaces/read","isDataAction":true}],"scope":"workspaces/workspace_name"})
  .query(true)
  .reply(200, {"AccessDecisions":[{"accessDecision":"Allowed","actionId":"Microsoft.Synapse/workspaces/read","roleAssignment":{"id":"86966c4e-b585-47f4-94d5-4b56ff76e292","roleDefinitionId":"6e4bf58a-b8e1-4cc3-bbf9-d73143322b78","principalId":"00000000-0000-0000-0000-000000000000","scope":"workspaces/workspace_name","principalType":"0"}}]}, [
  'Content-Length',
  '333',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '68f2b052-582a-48de-b45a-f3b10fead791',
  'Date',
  'Fri, 20 Nov 2020 13:44:20 GMT'
]);
