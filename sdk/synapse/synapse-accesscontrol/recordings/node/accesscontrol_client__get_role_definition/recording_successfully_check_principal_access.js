let nock = require('nock');

module.exports.hash = "55ce85a11941ab89c7eff5a81aa230a4";

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
  'bebd40e8-ec91-435d-9f9d-2333fae80100',
  'x-ms-ests-server',
  '2.1.11251.20 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Ah9dii-imU5Lrd23_nPeWS9J0eYvAQAAANB_SdcOAAAA; expires=Sun, 20-Dec-2020 09:13:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 09:13:52 GMT',
  'Content-Length',
  '1322'
]);

nock('https://workspace_name.dev.azuresynapse.net:443', {"encodedQueryParams":true})
  .post('/checkAccessSynapseRbac', {"subject":{"principalId":"principal_id"},"actions":[{"id":"Microsoft.Synapse/workspaces/read","isDataAction":true}],"scope":"workspaces/workspace_name"})
  .query(true)
  .reply(200, {"AccessDecisions":[{"accessDecision":"Allowed","actionId":"Microsoft.Synapse/workspaces/read","roleAssignment":{"id":"b798b0bc-87d3-46a8-b467-9097905a0008","roleDefinitionId":"6e4bf58a-b8e1-4cc3-bbf9-d73143322b78","principalId":"principal_id","scope":"workspaces/workspace_name","principalType":"0"}}]}, [
  'Content-Length',
  '333',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '16a955a7-a8e0-4845-a8cd-35ff2df69a22',
  'Date',
  'Fri, 20 Nov 2020 09:13:54 GMT'
]);
