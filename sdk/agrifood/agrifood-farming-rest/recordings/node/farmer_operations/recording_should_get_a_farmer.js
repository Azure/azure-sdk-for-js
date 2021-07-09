let nock = require('nock');

module.exports.hash = "4d6f4013a831b2fa70e25b775d10fabd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fsanitized%2F")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [ 'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1321',
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
  '03e60ab3-2289-44ad-8027-0f50636c0500',
  'x-ms-ests-server',
  '2.1.11722.21 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AvdLD2y-oatMiFpwSkE7LmV4ycTJAgAAAAelQNgOAAAA; expires=Fri, 25-Jun-2021 20:22:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 26 May 2021 20:22:33 GMT' ]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/farmers/test-farmer-id-1622056799928')
  .query(true)
  .reply(200, ["1f8b08000000000000038c8f414ec4300c45af12654d2437d504da1d1ac409ba815d485cb050e32a71471a8de6eeb803482cc9c272fe7f8e7f2e96b21dad601337c7ba6075945d17bc8743b81f86c13fd83b8b537c570af4a41ec1ed8d83003f5d80881161d82f4a3789b235e51f93d009554915a3607ed232d1826a79f09d8383f361f2307a3ff6fdab820b679ae93f648937f7c845b8b179be65573d634b9556212e6abff0564dda9af062bebf67fe00e603eb1e6fadbc6215420d7db19dce954d514ae613cfeacfccaabdc5fdfd5f878baeefaed72f000000ffff","030020e6633441010000"], [ 'Server',
  'nginx/1.19.1',
  'Date',
  'Wed, 26 May 2021 20:22:34 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  '0HM903JCGNAKF:00000001',
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
