let nock = require('nock');

module.exports.hash = "4d6f4013a831b2fa70e25b775d10fabd";

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
  '8f277045-e24d-4f11-82c7-c964f2c80100',
  'x-ms-ests-server',
  '2.1.11722.21 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AkU1v9mgOnFBjjaZ6V7PJkx4ycTJAgAAAF-WQNgOAAAA; expires=Fri, 25-Jun-2021 19:20:01 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 26 May 2021 19:20:00 GMT',
  'Content-Length',
  '1321'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/farmers/test-farmer-id-1622056799927')
  .query(true)
  .reply(200, ["1f8b08000000000000038c8fc16a04210c865f453c575061dd3ab7d2a54f3097edcd6aa60d65cca099c2b2ecbb376e29f4580f21f9ff4ff37bd558f4a4193a9b25b5159ac1625cf0de1ec231c6e88ffa41c39cde85b2721e93cd6634c6865146176c82b8043706a13b27debbf04f99f10b44c90d12433949997105b1bcf5ced883f1617671f276b2ee55c0950a2ef81fb2a6bbfb4c95a9937ab96717bd40cf0d3746aa629f696f2aef9d69553fdf537f00f5016dc4db1a6dd01841425fb5937b751714b3fa848bf80b91686f69bcffeb5095f5ee76fb060000ffff","0300459a4d0a41010000"], [
  'Server',
  'nginx/1.19.1',
  'Date',
  'Wed, 26 May 2021 19:20:01 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  '0HM903J177QF1:00000001',
  'api-supported-versions',
  '2021-03-31-preview',
  'api-deprecated-versions',
  '2020-12-31-preview',
  'x-ms-throttle-information',
  '1',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Content-Encoding',
  'gzip'
]);
