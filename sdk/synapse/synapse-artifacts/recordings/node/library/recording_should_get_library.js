let nock = require('nock');

module.exports.hash = "d3a9c1b2e09a20beb97164081ea683a9";

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
  'a4433f94-db9a-4a15-9895-e4715e946700',
  'x-ms-ests-server',
  '2.1.11562.10 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AvzULwO9SbVOqJjwdF4-3lHKOuyWCQAAAKt3_dcOAAAA; expires=Wed, 05-May-2021 21:27:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 05 Apr 2021 21:27:49 GMT' ]);

nock('https://testaccount.dev.azuresynapse.net', {"encodedQueryParams":true})
  .get('/libraries/testLibraryName.jar')
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
  '3bd4139f-cf23-46f1-aa61-7efcbc539370',
  'Date',
  'Mon, 05 Apr 2021 21:27:49 GMT',
  'Connection',
  'close' ]);
