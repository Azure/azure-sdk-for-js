let nock = require('nock');

module.exports.hash = "80af99833f85dc0620102e8d29425bf0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fsanitized%2F")
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
  '14ae013c-a17a-4bc7-913f-6f7a1101c300',
  'x-ms-ests-server',
  '2.1.11829.8 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AuprCnhyY41DlXA04J6n6rR4ycTJAgAAAGkJZNgOAAAA; expires=Thu, 22-Jul-2021 16:40:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Jun 2021 16:40:11 GMT',
  'Content-Length',
  '1321'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/farmers/tst103node')
  .query(true)
  .reply(200, ["1f8b08000000000004038c8fc16ac3300c865fc5f8dc80ec0c0f722b2d7b825cb69b6b2bab28b182ad0c46e9bb4f2e0c769c0fc2d2ffe99774b794ed64a58983b170467bb038c74fadc10890c3eb3280be01420ffd17207be7c3a5274a3789b237e58f49e8abf7a78a51309f35ccb4a24a1ebc5387c1fbd985e90526e73e145c39d342ff214b7cfa9cb80837366fb1ae58d521634b9536212e3ae69df76ad2de8457b33c11f3073057ac7dbdadf286550875e9bb75da577675a3646ef8adfac2acb54becfebf0a173dc33d1e3f000000ffff","03008f94ce9c2f010000"], [
  'Date',
  'Tue, 22 Jun 2021 16:40:12 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  '0HM9KPLM6VFNC:00000001',
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
