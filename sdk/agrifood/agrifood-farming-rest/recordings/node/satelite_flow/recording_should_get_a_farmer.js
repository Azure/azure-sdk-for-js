let nock = require('nock');

module.exports.hash = "4d6f4013a831b2fa70e25b775d10fabd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fsanitized%2F")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [ 'Cache-Control',
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
  '22accbbc-80e1-4469-a0d9-6521851a0400',
  'x-ms-ests-server',
  '2.1.11722.21 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AvdLD2y-oatMiFpwSkE7LmV4ycTJBgAAAAelQNgOAAAA; expires=Fri, 25-Jun-2021 20:22:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 26 May 2021 20:22:55 GMT',
  'Content-Length',
  '1321' ]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/farmers/test-farmer-1')
  .query(true)
  .reply(200, ["1f8b08000000000000038c8fcd0ac23010845f25e46c601b680fbd89e213f4a2b7986e7591664bb215447c77b7fe8047735886992fc9ecdd526f5b2b58c40d218f985d655716bb70521bf44444708b70d0c047351030a05f34285d24c85c945f47a12baa133306c17eaba3a31135f2e02b07b5f34de7a1f5beadeb838223f734d03f640aaf74c349b8b0d9bdcaaadf63899926214e1aef79ce26ce457834ef7dcc0f60ce98977a53e609b3106ae9bbadf45e9a15a5682e78d37c6056ef1896f7bf0927fdbe7a3c9e000000ffff","0300afd07fdd32010000"], [ 'Server',
  'nginx/1.19.1',
  'Date',
  'Wed, 26 May 2021 20:22:56 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  '0HM903JCGNAKF:00000003',
  'api-supported-versions',
  '2021-03-31-preview',
  'api-deprecated-versions',
  '2020-12-31-preview',
  'x-ms-throttle-information',
  '1',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Content-Encoding',
  'gzip' ]);
