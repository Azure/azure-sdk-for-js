let nock = require('nock');

module.exports.hash = "0755bcc327b2bd84e4d7fe604e27e115";

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
  '1e41d4e7-e4df-49b4-bf2d-31027fe15b00',
  'x-ms-ests-server',
  '2.1.11562.10 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AvzULwO9SbVOqJjwdF4-3lHKOuyWCAAAAKt3_dcOAAAA; expires=Wed, 05-May-2021 21:27:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 05 Apr 2021 21:27:42 GMT' ]);

nock('https://testaccount.dev.azuresynapse.net', {"encodedQueryParams":true})
  .put('/libraries/testLibraryName.jar')
  .query(true)
  .reply(202, {"id":"/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/xiangyan/providers/Microsoft.Synapse/workspaces/xysynapsetest/libraries/testLibraryName.jar","recordId":1439010,"state":"Creating","created":"2021-04-05T21:27:43.8633333Z","changed":"2021-04-05T21:27:43.8633333Z","type":"LibraryArtifact","name":"testLibraryName.jar","operationId":"8dd1d988-5503-484a-823c-d7b10cf04630","artifactId":"D369760A-876F-48AC-9F0D-8DA91909491A"}, [ 'Content-Length',
  '446',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://testaccount.dev.azuresynapse.net/libraryOperationResults/8dd1d988-5503-484a-823c-d7b10cf04630?api-version=2019-06-01-preview',
  'Retry-After',
  '10',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Access-Control-Allow-Headers',
  'Location',
  'Access-Control-Allow-Headers',
  'Retry-After',
  'Access-Control-Expose-Headers',
  'Location',
  'Access-Control-Expose-Headers',
  'Retry-After',
  'x-ms-request-id',
  'c5f73729-2d67-4495-ac08-8143e3585e23',
  'Date',
  'Mon, 05 Apr 2021 21:27:43 GMT',
  'Connection',
  'close' ]);

nock('https://testaccount.dev.azuresynapse.net', {"encodedQueryParams":true})
  .get('/libraryOperationResults/8dd1d988-5503-484a-823c-d7b10cf04630')
  .query(true)
  .reply(202, {"status":"InProgress"}, [ 'Content-Length',
  '23',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://testaccount.dev.azuresynapse.net/libraryOperationResults/8dd1d988-5503-484a-823c-d7b10cf04630?api-version=2019-06-01-preview',
  'Retry-After',
  '10',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Access-Control-Allow-Headers',
  'Location',
  'Access-Control-Allow-Headers',
  'Retry-After',
  'Access-Control-Expose-Headers',
  'Location',
  'Access-Control-Expose-Headers',
  'Retry-After',
  'x-ms-request-id',
  '456e7cc6-bba8-4aa0-b74a-9a5654b65fb6',
  'Date',
  'Mon, 05 Apr 2021 21:27:43 GMT',
  'Connection',
  'close' ]);

nock('https://testaccount.dev.azuresynapse.net', {"encodedQueryParams":true})
  .get('/libraryOperationResults/8dd1d988-5503-484a-823c-d7b10cf04630')
  .query(true)
  .reply(200, {"id":"/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/xiangyan/providers/Microsoft.Synapse/workspaces/xysynapsetest/libraries/testLibraryName.jar","name":"testLibraryName.jar","type":"Microsoft.Synapse/workspaces/libraries","properties":{"name":"testLibraryName.jar","path":"xysynapsetest/libraries/testLibraryName.jar","containerName":"prep","uploadedTimestamp":"2021-04-05T21:27:43.855845+00:00","type":"jar","provisioningStatus":"Incomplete","creatorId":"30511c9d-ba1a-4c7b-b422-5b543da11b3f"},"etag":"ab06012b-0000-0800-0000-606b80d10000"}, [ 'Content-Length',
  '563',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b4becad3-5690-4fce-aade-cece3b2ce633',
  'Date',
  'Mon, 05 Apr 2021 21:27:46 GMT',
  'Connection',
  'close' ]);
