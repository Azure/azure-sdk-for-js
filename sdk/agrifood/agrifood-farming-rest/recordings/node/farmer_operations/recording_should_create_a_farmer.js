let nock = require('nock');

module.exports.hash = "208fb1e6e1ffe45feb70c62dc829fb1e";

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
  'e8ea1af9-83d8-489d-a0b7-a1254cb90100',
  'x-ms-ests-server',
  '2.1.11722.21 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AkU1v9mgOnFBjjaZ6V7PJkx4ycTJAQAAAF-WQNgOAAAA; expires=Fri, 25-Jun-2021 19:20:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 26 May 2021 19:19:59 GMT',
  'Content-Length',
  '1321'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/farmers/test-farmer-id-1622056799927', {"name":"Contoso Farmer","description":"Your custom farmer description here","status":"Active","properties":{"1":"numeric key","foo":"bar","numeric one":1}})
  .query(true)
  .reply(201, {"id":"test-farmer-id-1622056799927","eTag":"00008a0c-0000-0600-0000-60ae9f610000","status":"Active","createdDateTime":"2021-05-26T19:20:01Z","modifiedDateTime":"2021-05-26T19:20:01Z","name":"Contoso Farmer","description":"Your custom farmer description here","properties":{"1":"numeric key","foo":"bar","numeric one":1}}, [
  'Server',
  'nginx/1.19.1',
  'Date',
  'Wed, 26 May 2021 19:20:01 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '321',
  'Connection',
  'keep-alive',
  'etag',
  '00008a0c-0000-0600-0000-60ae9f610000',
  'location',
  'http://endpoint/farmers/test-farmer-id-1622056799927',
  'x-ms-request-id',
  '0HM903JCGNAKD:00000001',
  'api-supported-versions',
  '2021-03-31-preview',
  'api-deprecated-versions',
  '2020-12-31-preview',
  'x-ms-throttle-information',
  '5',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
