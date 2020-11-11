let nock = require('nock');

module.exports.hash = "6b244bf4b935a9d18bb2fc0c6c8de7da";

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
  '62ef029d-b4b5-404c-a403-599c06113b00',
  'x-ms-ests-server',
  '2.1.11198.13 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Ap3RiXoFjr9Eu8r_VGBkmqFJ0eYvAQAAAF64PdcOAAAA; expires=Fri, 11-Dec-2020 10:47:58 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 11 Nov 2020 10:47:58 GMT',
  'Content-Length',
  '1322'
]);

nock('https://workspace_name.dev.azuresynapse.net:443', {"encodedQueryParams":true})
  .get('/bigDataPools/sparkpool_name')
  .query(true)
  .reply(200, {"properties":{"creationDate":"2020-07-14T06:55:18.6333333Z","sparkVersion":"2.4","nodeCount":0,"nodeSize":"Medium","nodeSizeFamily":"MemoryOptimized","autoScale":{"enabled":true,"minNodeCount":3,"maxNodeCount":40},"autoPause":{"enabled":true,"delayInMinutes":15},"isComputeIsolationEnabled":false,"sessionLevelPackagesEnabled":false,"provisioningState":"Succeeded"},"id":"/subscriptions/051ddeca-1ed6-4d8b-ba6f-1ff561e5f3b3/resourceGroups/shangwei-synapse/providers/Microsoft.ProjectArcadia/workspaces/workspace_name/sparkComputes/sparkpool_name","name":"sparkpool_name","type":"Microsoft.ProjectArcadia/workspaces/sparkComputes","location":"eastus","tags":{}}, [
  'Content-Length',
  '663',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e7c4be17-2889-4ba5-acad-b5042aadbabd',
  'Date',
  'Wed, 11 Nov 2020 10:47:59 GMT'
]);
