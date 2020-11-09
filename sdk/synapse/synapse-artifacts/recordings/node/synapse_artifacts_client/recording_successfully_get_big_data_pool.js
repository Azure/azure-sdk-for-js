let nock = require('nock');

module.exports.hash = "103f5850004653f0c94e052746ff7c72";

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
  'cc89fa1b-6b65-4c2b-abb4-efb0cfae2600',
  'x-ms-ests-server',
  '2.1.11198.13 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Ap3sVZPIFmpDmq0-ks76GhZJ0eYvAQAAAM9EN9cOAAAA; expires=Sun, 06-Dec-2020 13:21:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 06 Nov 2020 13:21:18 GMT',
  'Content-Length',
  '1322'
]);

nock('https://workspace_name.dev.azuresynapse.net:443', {"encodedQueryParams":true})
  .get('/bigDataPools/sparkpoolcli')
  .query(true)
  .reply(200, {"properties":{"creationDate":"2020-07-14T06:55:18.6333333Z","sparkVersion":"2.4","nodeCount":0,"nodeSize":"Medium","nodeSizeFamily":"MemoryOptimized","autoScale":{"enabled":true,"minNodeCount":3,"maxNodeCount":40},"autoPause":{"enabled":true,"delayInMinutes":15},"isComputeIsolationEnabled":false,"provisioningState":"Succeeded"},"id":"/subscriptions/051ddeca-1ed6-4d8b-ba6f-1ff561e5f3b3/resourceGroups/shangwei-synapse/providers/Microsoft.ProjectArcadia/workspaces/workspace_name/sparkComputes/sparkpoolcli","name":"sparkpoolcli","type":"Microsoft.ProjectArcadia/workspaces/sparkComputes","location":"eastus","tags":{}}, [
  'Content-Length',
  '627',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ab31f3b9-ad7b-44de-9eb9-828c771dbfe3',
  'Date',
  'Fri, 06 Nov 2020 13:21:20 GMT'
]);
