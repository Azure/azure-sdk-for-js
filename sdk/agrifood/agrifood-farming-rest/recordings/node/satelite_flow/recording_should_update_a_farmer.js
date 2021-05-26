let nock = require('nock');

module.exports.hash = "15e5491c8896e906fe06bd4fa3bb29a6";

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
  '295046d6-b60c-4d3b-b2df-bfb36df00200',
  'x-ms-ests-server',
  '2.1.11722.21 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AkU1v9mgOnFBjjaZ6V7PJkx4ycTJBQAAAF-WQNgOAAAA; expires=Fri, 25-Jun-2021 19:20:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 26 May 2021 19:20:20 GMT',
  'Content-Length',
  '1321'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/farmers/test-farmer-1', {"name":"Updated","description":"Your custom farmer description here","status":"Active","properties":{"1":"numeric key","foo":"bar","numeric one":1}})
  .query(true)
  .reply(200, ["1f8b08000000000000038c8f416a03310c45af62bcaec11eda09c9aed0234c16edceb5e55694190fb2261042eedeef248b2e6b8490fe7fb6e48be56c0f56a9a92b51661217ec93a5297e41f63871ccc5f5c2f9b1a75e8d3ed2beec9e7b03ba69d4ad817f4dca27829284a2527e439a782658831f82f32f6e18a7b03f0c1ef10170ae990bff875ce2cd3daeb9bf0c21534bc2ab725da0bfd74d4cda9ad6d9dc3f62fe00e69ba4efb54a5d499409db5e6cc0bd6503cac9fcd0197ea915da67943ef0e1d40573c3f5fa0b0000ffff","03004e659ccb2b010000"], [
  'Server',
  'nginx/1.19.1',
  'Date',
  'Wed, 26 May 2021 19:20:20 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  '0HM903JCGNAKD:00000004',
  'api-supported-versions',
  '2021-03-31-preview',
  'api-deprecated-versions',
  '2020-12-31-preview',
  'x-ms-throttle-information',
  '5',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Content-Encoding',
  'gzip'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/farmers/test-farmer-1')
  .query(true)
  .reply(200, ["1f8b08000000000000038c8f416a03310c45af62bcaec11eda09c9aed0234c16edceb5e55694190fb2261042eedeef248b2e6b8490fe7fb6e48be56c0f56a9a92b51661217ec93a5297e41f63871ccc5f5c2f9b1a75e8d3ed2beec9e7b03ba69d4ad817f4dca27829284a2527e439a782658831f82f32f6e18a7b03f0c1ef10170ae990bff875ce2cd3daeb9bf0c21534bc2ab725da0bfd74d4cda9ad6d9dc3f62fe00e69ba4efb54a5d499409db5e6cc0bd6503cac9fcd0197ea915da67943ef0e1d40573c3f5fa0b0000ffff","03004e659ccb2b010000"], [
  'Server',
  'nginx/1.19.1',
  'Date',
  'Wed, 26 May 2021 19:20:20 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  '0HM903J177QF1:00000004',
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
