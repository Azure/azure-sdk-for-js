let nock = require('nock');

module.exports.hash = "658e704e366e52115c051e007a209b89";

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
  'ca846ba1-661c-406f-bd22-26583e590100',
  'x-ms-ests-server',
  '2.1.11722.21 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ahx2j0U8YgdBpu7AcFFete14ycTJAwAAAHiIQNgOAAAA; expires=Fri, 25-Jun-2021 18:20:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 26 May 2021 18:20:41 GMT',
  'Content-Length',
  '1321'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/farmers/test-farmer-1', {"name":"Updated","description":"Your custom farmer description here","status":"Active","properties":{"1":"numeric key","foo":"bar","numeric one":1}})
  .query(true)
  .reply(200, ["1f8b0800000000000003848fc16ec3200c865f05711e12a035eb729bd447c80edd8d82d35a152132a6d214e5dd67b61d769b0f96f9ffcfd8de34263d6a86ca660e94818cd34f1aa67015d94a5c0e29995e183bf4d4abc10678752fa13f84ae1cb855e1df22e30344890481219d244d98412c6fbd33f660fc30b9e3e8edf8ec3e04cc25e18cff90be934bf876dfd7d47f1621418d842b6359443f97462ab6ca25ab9f43d41f40dd80fa5e2b9515881164db4d3be95b9aa018d51d3ec59f4b11ed12a80ffc75ca2273ddbe7f010000ffff","0300090e99fb2b010000"], [
  'Server',
  'nginx/1.19.1',
  'Date',
  'Wed, 26 May 2021 18:20:43 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  '0HM903J1GUNCO:00000002',
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
  .reply(200, ["1f8b0800000000000003848fc16ec3200c865f05711e12a035eb729bd447c80edd8d82d35a152132a6d214e5dd67b61d769b0f96f9ffcfd8de34263d6a86ca660e94818cd34f1aa67015d94a5c0e29995e183bf4d4abc10678752fa13f84ae1cb855e1df22e30344890481219d244d98412c6fbd33f660fc30b9e3e8edf8ec3e04cc25e18cff90be934bf876dfd7d47f1621418d842b6359443f97462ab6ca25ab9f43d41f40dd80fa5e2b9515881164db4d3be95b9aa018d51d3ec59f4b11ed12a80ffc75ca2273ddbe7f010000ffff","0300090e99fb2b010000"], [
  'Server',
  'nginx/1.19.1',
  'Date',
  'Wed, 26 May 2021 18:20:43 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  '0HM903J177QEN:00000003',
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
