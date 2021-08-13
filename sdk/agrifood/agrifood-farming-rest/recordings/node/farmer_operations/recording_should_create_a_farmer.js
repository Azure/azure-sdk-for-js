let nock = require('nock');

module.exports.hash = "adfa321b39054fc240bf8b1e82d8e29c";

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
  'c239eb0f-696b-4aaf-a705-0a5d00ac9b00',
  'x-ms-ests-server',
  '2.1.11829.8 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AuprCnhyY41DlXA04J6n6rR4ycTJAQAAAGkJZNgOAAAA; expires=Thu, 22-Jul-2021 16:40:10 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Jun 2021 16:40:09 GMT',
  'Content-Length',
  '1321'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/farmers/tst103node', {"name":"Contoso Farmer","description":"Your custom farmer description here","status":"Active","properties":{"1":"numeric key","foo":"bar","numeric one":1}})
  .query(true)
  .reply(201, {"id":"tst103node","eTag":"0300d67f-0000-0600-0000-60d2126b0000","status":"Active","createdDateTime":"2021-06-22T16:40:11Z","modifiedDateTime":"2021-06-22T16:40:11Z","name":"Contoso Farmer","description":"Your custom farmer description here","properties":{"1":"numeric key","foo":"bar","numeric one":1}}, [
  'Date',
  'Tue, 22 Jun 2021 16:40:11 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '303',
  'Connection',
  'keep-alive',
  'etag',
  '0300d67f-0000-0600-0000-60d2126b0000',
  'location',
  'http://endpoint/farmers/tst103node',
  'x-ms-request-id',
  '0HM9KPQFKPIRS:00000001',
  'api-supported-versions',
  '2021-03-31-preview',
  'api-deprecated-versions',
  '2020-12-31-preview',
  'x-ms-throttle-information',
  '5',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
