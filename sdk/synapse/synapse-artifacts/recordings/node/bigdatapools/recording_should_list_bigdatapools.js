let nock = require('nock');

module.exports.hash = "55452eb4bf13a77d3b08cff7e23bd65e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fdev.azuresynapse.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [ 'Cache-Control',
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
  '83970648-3778-4a17-ab9b-6110b90a5900',
  'x-ms-ests-server',
  '2.1.11562.10 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AvzULwO9SbVOqJjwdF4-3lHKOuyWAQAAAKt3_dcOAAAA; expires=Wed, 05-May-2021 21:27:08 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 05 Apr 2021 21:27:07 GMT' ]);

nock('https://testaccount.dev.azuresynapse.net', {"encodedQueryParams":true})
  .get('/bigDataPools')
  .query(true)
  .reply(200, {"value":[{"properties":{"creationDate":"2020-11-19T21:41:05.3233333Z","sparkVersion":"2.4","nodeCount":4,"nodeSize":"Small","nodeSizeFamily":"MemoryOptimized","autoScale":{"enabled":false,"minNodeCount":3,"maxNodeCount":10},"autoPause":{"enabled":true,"delayInMinutes":15},"isComputeIsolationEnabled":false,"sessionLevelPackagesEnabled":false,"cacheSize":0,"dynamicExecutorAllocation":{"enabled":false},"lastSucceededTimestamp":"2020-11-19T21:41:13.2833333Z","provisioningState":"Succeeded"},"id":"/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/xiangyan/providers/Microsoft.ProjectArcadia/workspaces/xysynapsetest/sparkComputes/HamonsSpark","name":"HamonsSpark","type":"Microsoft.ProjectArcadia/workspaces/sparkComputes","location":"westus2","tags":{}},{"properties":{"creationDate":"2021-01-11T06:04:11.4733333Z","sparkVersion":"2.4","nodeCount":0,"nodeSize":"Small","nodeSizeFamily":"MemoryOptimized","autoScale":{"enabled":true,"minNodeCount":3,"maxNodeCount":10},"autoPause":{"enabled":true,"delayInMinutes":15},"isComputeIsolationEnabled":false,"sessionLevelPackagesEnabled":false,"cacheSize":0,"dynamicExecutorAllocation":{"enabled":false},"lastSucceededTimestamp":"2021-01-11T06:04:18.1666667Z","provisioningState":"Succeeded"},"id":"/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/xiangyan/providers/Microsoft.ProjectArcadia/workspaces/xysynapsetest/sparkComputes/jianghaospool","name":"jianghaospool","type":"Microsoft.ProjectArcadia/workspaces/sparkComputes","location":"westus2","tags":{}},{"properties":{"creationDate":"2020-11-18T19:10:21.6Z","sparkVersion":"2.4","nodeCount":10,"nodeSize":"Small","nodeSizeFamily":"MemoryOptimized","autoScale":{"enabled":true,"minNodeCount":3,"maxNodeCount":10},"autoPause":{"enabled":true,"delayInMinutes":15},"isComputeIsolationEnabled":false,"sessionLevelPackagesEnabled":false,"cacheSize":0,"dynamicExecutorAllocation":{"enabled":false},"lastSucceededTimestamp":"2020-11-18T19:10:25.52Z","provisioningState":"Succeeded"},"id":"/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/xiangyan/providers/Microsoft.ProjectArcadia/workspaces/xysynapsetest/sparkComputes/testsparkpool","name":"testsparkpool","type":"Microsoft.ProjectArcadia/workspaces/sparkComputes","location":"westus2","tags":{}}]}, [ 'Content-Length',
  '2299',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'eb4c3b10-fa24-4d38-99d4-c5becff0588b',
  'Date',
  'Mon, 05 Apr 2021 21:27:08 GMT',
  'Connection',
  'close' ]);
