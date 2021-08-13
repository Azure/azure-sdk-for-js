let nock = require('nock');

module.exports.hash = "d65fb11ac5d085b63d881bcaaad78af6";

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
  'bd5fb75c-23ba-449d-bbb1-3a829dfb0300',
  'x-ms-ests-server',
  '2.1.11722.21 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AhNaePHXLuRMojJumm0LokJ4ycTJBgAAAPyVQNgOAAAA; expires=Fri, 25-Jun-2021 19:18:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 26 May 2021 19:18:47 GMT',
  'Content-Length',
  '1321'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/farmers/test-farmer-id-1622056799927/boundaries/test-boundary-id-1622056799927')
  .query(true)
  .reply(400, {"error":{"code":"InvalidDeleteOperation","message":"The boundary with id 'test-boundary-id-1622056799927' has associated satellite data or attachments. Delete them first to proceed.","target":null,"details":null,"innererror":null},"traceId":"0HM903JCGNAKC:00000002"}, [
  'Server',
  'nginx/1.19.1',
  'Date',
  'Wed, 26 May 2021 19:18:51 GMT',
  'Content-Type',
  'application/json',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'x-ms-throttle-information',
  '1',
  'x-ms-request-id',
  '0HM903JCGNAKC:00000002',
  'api-supported-versions',
  '2021-03-31-preview',
  'api-deprecated-versions',
  '2020-12-31-preview',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
