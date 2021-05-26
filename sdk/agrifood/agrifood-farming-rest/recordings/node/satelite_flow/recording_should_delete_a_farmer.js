let nock = require('nock');

module.exports.hash = "453e4f3bc2fff87cea1624fc53f45945";

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
  'fe47a199-5612-4ba6-98d8-acb6eb710500',
  'x-ms-ests-server',
  '2.1.11722.21 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AvdLD2y-oatMiFpwSkE7LmV4ycTJBwAAAAelQNgOAAAA; expires=Fri, 25-Jun-2021 20:22:58 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 26 May 2021 20:22:57 GMT',
  'Content-Length',
  '1321' ]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/farmers/test-farmer-1')
  .query(true)
  .reply(204, "", [ 'Server',
  'nginx/1.19.1',
  'Date',
  'Wed, 26 May 2021 20:22:59 GMT',
  'Content-Length',
  '0',
  'Connection',
  'keep-alive',
  'x-ms-request-id',
  '0HM903J1GUND6:00000002',
  'api-supported-versions',
  '2021-03-31-preview',
  'api-deprecated-versions',
  '2020-12-31-preview',
  'x-ms-throttle-information',
  '1',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains' ]);
