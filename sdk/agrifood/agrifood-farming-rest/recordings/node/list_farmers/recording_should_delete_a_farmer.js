let nock = require('nock');

module.exports.hash = "b86ac59e56454e10a5729f71cd61fbc7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Ffarmbeats.azure.net%2F.default")
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
  '295046d6-b60c-4d3b-b2df-bfb39ef00200',
  'x-ms-ests-server',
  '2.1.11722.21 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AkU1v9mgOnFBjjaZ6V7PJkx4ycTJBwAAAF-WQNgOAAAA; expires=Fri, 25-Jun-2021 19:20:22 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 26 May 2021 19:20:22 GMT',
  'Content-Length',
  '1321'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/farmers/test-farmer')
  .query(true)
  .reply(204, "", [
  'Server',
  'nginx/1.19.1',
  'Date',
  'Wed, 26 May 2021 19:20:23 GMT',
  'Content-Length',
  '0',
  'Connection',
  'keep-alive',
  'x-ms-request-id',
  '0HM903JCGNAKD:00000005',
  'api-supported-versions',
  '2021-03-31-preview',
  'api-deprecated-versions',
  '2020-12-31-preview',
  'x-ms-throttle-information',
  '1',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
