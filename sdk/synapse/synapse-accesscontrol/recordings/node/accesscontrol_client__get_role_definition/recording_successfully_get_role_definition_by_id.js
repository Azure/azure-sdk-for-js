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
  '5bc73e51-fb67-440f-b2e3-cc68cae00200',
  'x-ms-ests-server',
  '2.1.11251.20 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AlHviSe1JSJHn8uweXVU3XFJ0eYvAQAAACq_SdcOAAAA; expires=Sun, 20-Dec-2020 13:44:10 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 13:44:10 GMT',
  'Content-Length',
  '1322'
]);

nock('https://workspace_name.dev.azuresynapse.net:443', {"encodedQueryParams":true})
  .get('/roleDefinitions/00000000-0000-0000-0000-000000000000')
  .query(true)
  .reply(200, {"name":"Sql Admin","description":"Can read info about SQL pools and SQL endpoints. Can do CRUD operations on SQL scripts.","id":"00000000-0000-0000-0000-000000000000","isBuiltIn":true,"permissions":[{"actions":[],"notActions":[],"dataActions":["Microsoft.Synapse/workspaces/read","Microsoft.Synapse/workspaces/artifacts/read","Microsoft.Synapse/workspaces/sqlScripts/write","Microsoft.Synapse/workspaces/linkedServices/write","Microsoft.Synapse/workspaces/credentials/write","Microsoft.Synapse/workspaces/sqlScripts/delete","Microsoft.Synapse/workspaces/linkedServices/delete","Microsoft.Synapse/workspaces/credentials/delete","Microsoft.Synapse/workspaces/libraries/delete","Microsoft.Synapse/workspaces/libraries/write"],"notDataActions":[]}],"scopes":["workspaces/{workspaceName}"],"availabilityStatus":"Available"}, [
  'Content-Length',
  '819',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Microsoft-HTTPAPI/2.0 Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7dd0ba59-cf32-42e4-993f-67c590aae10f',
  'x-ms-request-id',
  '7dd0ba59-cf32-42e4-993f-67c590aae10f',
  'Date',
  'Fri, 20 Nov 2020 13:44:11 GMT'
]);
