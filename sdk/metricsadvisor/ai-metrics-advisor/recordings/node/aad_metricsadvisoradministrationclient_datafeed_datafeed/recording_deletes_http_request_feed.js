let nock = require('nock');

module.exports.hash = "e7133185b4e1f69d21ad278acf8d91b9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/72698866-8641-4147-9144-24744011447/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  '829443e0-c7e0-44b5-85a5-588b94754300',
  'x-ms-ests-server',
  '2.1.11397.13 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AsoDeAShyiJLlORVED-UD3HGLH8mEgAAAGdLk9cOAAAA; expires=Sun, 14-Feb-2021 08:42:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 15 Jan 2021 08:42:06 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/4773d8a4-84b7-47e0-8ed0-d8a85f9c93df')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'dd920ff2-6cd9-40d4-bd3c-f70b63e2a150',
  'x-envoy-upstream-service-time',
  '334',
  'apim-request-id',
  'dd920ff2-6cd9-40d4-bd3c-f70b63e2a150',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:07 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/4773d8a4-84b7-47e0-8ed0-d8a85f9c93df')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e097be5a-86f8-45ae-aeac-e6b34e8c9430',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  'e097be5a-86f8-45ae-aeac-e6b34e8c9430',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:07 GMT'
]);
