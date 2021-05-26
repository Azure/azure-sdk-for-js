let nock = require('nock');

module.exports.hash = "9f89fda930dbd54f39b54fbecc405ec3";

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
  'abef033c-bb49-49f9-86ec-d7dff4b20400',
  'x-ms-ests-server',
  '2.1.11722.21 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AvdLD2y-oatMiFpwSkE7LmV4ycTJCAAAAAelQNgOAAAA; expires=Fri, 25-Jun-2021 20:22:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 26 May 2021 20:22:59 GMT',
  'Content-Length',
  '1321' ]);

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/farmers/test-farmer', {"name":"Contoso Farmer","description":"Your custom farmer description here","status":"Active","properties":{"1":"numeric key","foo":"bar","numeric one":1}})
  .query(true)
  .reply(201, {"id":"test-farmer","eTag":"0000d90c-0000-0600-0000-60aeae230000","status":"Active","createdDateTime":"2021-05-26T20:22:59Z","modifiedDateTime":"2021-05-26T20:22:59Z","name":"Contoso Farmer","description":"Your custom farmer description here","properties":{"1":"numeric key","foo":"bar","numeric one":1}}, [ 'Server',
  'nginx/1.19.1',
  'Date',
  'Wed, 26 May 2021 20:22:59 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '304',
  'Connection',
  'keep-alive',
  'etag',
  '0000d90c-0000-0600-0000-60aeae230000',
  'location',
  'http://endpoint/farmers/test-farmer',
  'x-ms-request-id',
  '0HM903J177QF5:00000003',
  'api-supported-versions',
  '2021-03-31-preview',
  'api-deprecated-versions',
  '2020-12-31-preview',
  'x-ms-throttle-information',
  '5',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains' ]);
