let nock = require('nock');

module.exports.hash = "df3f91c76ecc1e578504b234a98a3f8b";

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
  'd729a157-e25e-4b17-971b-e0830b006d00',
  'x-ms-ests-server',
  '2.1.11562.10 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AvzULwO9SbVOqJjwdF4-3lHKOuyWBAAAAKt3_dcOAAAA; expires=Wed, 05-May-2021 21:27:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 05 Apr 2021 21:27:19 GMT' ]);

nock('https://testaccount.dev.azuresynapse.net', {"encodedQueryParams":true})
  .get('/dataflows')
  .query(true)
  .reply(200, {"value":[{"id":"/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/xiangyan/providers/Microsoft.Synapse/workspaces/xysynapsetest/dataflows/testdataflow","name":"testdataflow","type":"Microsoft.Synapse/workspaces/dataflows","etag":"aa0690f6-0000-0800-0000-606b80b20000","properties":{"type":"MappingDataFlow"}}]}, [ 'Content-Length',
  '328',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9ab5fe4e-c7f3-454e-96b7-cacc5082fdac',
  'Date',
  'Mon, 05 Apr 2021 21:27:19 GMT',
  'Connection',
  'close' ]);
