let nock = require('nock');

module.exports.hash = "9eb5ae69a3017b1057ab7a7ab3cb4404";

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
  '54777b7c-38ce-4e91-bef8-d402d77f5700',
  'x-ms-ests-server',
  '2.1.11562.10 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AvzULwO9SbVOqJjwdF4-3lHKOuyWCQAAAKt3_dcOAAAA; expires=Wed, 05-May-2021 21:27:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 05 Apr 2021 21:27:49 GMT' ]);

nock('https://testaccount.dev.azuresynapse.net', {"encodedQueryParams":true})
  .get('/libraries')
  .query(true)
  .reply(200, {"value":[{"id":"/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/xiangyan/providers/Microsoft.Synapse/workspaces/xysynapsetest/libraries/testLibraryName.jar","name":"testLibraryName.jar","type":"Microsoft.Synapse/workspaces/libraries","etag":"ab06012b-0000-0800-0000-606b80d10000","properties":{"name":"testLibraryName.jar","path":"xysynapsetest/libraries/testLibraryName.jar","containerName":"prep","uploadedTimestamp":"2021-04-05T21:27:43.855845+00:00","type":"jar","provisioningStatus":"Incomplete","creatorId":"30511c9d-ba1a-4c7b-b422-5b543da11b3f"}}]}, [ 'Content-Length',
  '575',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ae02e55d-d9d6-4173-9691-810ed7d8a7bd',
  'Date',
  'Mon, 05 Apr 2021 21:27:50 GMT',
  'Connection',
  'close' ]);
