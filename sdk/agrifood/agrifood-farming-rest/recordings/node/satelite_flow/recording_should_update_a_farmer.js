let nock = require('nock');

module.exports.hash = "15e5491c8896e906fe06bd4fa3bb29a6";

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
  'd1539e85-86ec-478b-b2a2-b066a1a80400',
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
  .patch('/farmers/test-farmer-1', {"name":"Updated","description":"Your custom farmer description here","status":"Active","properties":{"1":"numeric key","foo":"bar","numeric one":1}})
  .query(true)
  .reply(200, ["1f8b0800000000000003848fc10ec2200c865f85709604483693dd4c7c8479d01b42a78dd9584a676216dfdda21ebcc98194efffa065d59874a7190a9b21d008649cde68e8c345b0951507b0a616c6b6f65bb5364000efea41ecc2819722fe2e32de414824080c692f5b8f2348e4ad77c636c6b7bdb79df75dd39c441c73c201ff98db6a4ee19d1ee6545f1690a044c299314fc28f79211597c279549f8fa81f415d81ea5c33e519881164da553bb9372da262543778483ee42cec1ca836fc267992beeef97c010000ffff","0300ffa196042b010000"], [ 'Server',
  'nginx/1.19.1',
  'Date',
  'Wed, 26 May 2021 20:22:57 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  '0HM903J177QF5:00000002',
  'api-supported-versions',
  '2021-03-31-preview',
  'api-deprecated-versions',
  '2020-12-31-preview',
  'x-ms-throttle-information',
  '5',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Content-Encoding',
  'gzip' ]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/farmers/test-farmer-1')
  .query(true)
  .reply(200, ["1f8b0800000000000003848fc10ec2200c865f85709604483693dd4c7c8479d01b42a78dd9584a676216dfdda21ebcc98194efffa065d59874a7190a9b21d008649cde68e8c345b0951507b0a616c6b6f65bb5364000efea41ecc2819722fe2e32de414824080c692f5b8f2348e4ad77c636c6b7bdb79df75dd39c441c73c201ff98db6a4ee19d1ee6545f1690a044c299314fc28f79211597c279549f8fa81f415d81ea5c33e519881164da553bb9372da262543778483ee42cec1ca836fc267992beeef97c010000ffff","0300ffa196042b010000"], [ 'Server',
  'nginx/1.19.1',
  'Date',
  'Wed, 26 May 2021 20:22:58 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  '0HM903JA9C7E9:00000004',
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
