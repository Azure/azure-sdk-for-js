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
  'e8ea1af9-83d8-489d-a0b7-a125dcbb0100',
  'x-ms-ests-server',
  '2.1.11722.21 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AkU1v9mgOnFBjjaZ6V7PJkx4ycTJBAAAAF-WQNgOAAAA; expires=Fri, 25-Jun-2021 19:20:20 GMT; path=/; secure; HttpOnly; SameSite=None',
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
  .get('/farmers/test-farmer-1')
  .query(true)
  .reply(200, ["1f8b08000000000000038c8fc14a043110447f25e46c2019dc91dd9b287ec15cf416938e3632e921e91164d97fb7b222783484a653f53aa99c2d677bb24a5d5d896da5e682bdb1b4c437c81e2b1e7271a3717e1e6574b38f742c77b7e300ba6bd4bd83bf4fca9f0425358a4af91165e195604d7e0ace1fdc342fe1789a3cf60bc0553217fe0f59e3d57d90aad2c53c5dc342cfd453e34d592aec67d99b497b5759cdcf7fcc1fc0bc531bf1b6261b356542e8b30d98ab3b504ee683bee0171168af71dcffeb48c5f3e172f9060000ffff","030082e066bf32010000"], [
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
  '0HM903J177QF1:00000003',
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
