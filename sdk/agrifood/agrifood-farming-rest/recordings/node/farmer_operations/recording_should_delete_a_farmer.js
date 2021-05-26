let nock = require('nock');

module.exports.hash = "453e4f3bc2fff87cea1624fc53f45945";

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
  '7577d1d9-a53b-43ad-8b7f-3227f50a0200',
  'x-ms-ests-server',
  '2.1.11722.21 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AhNaePHXLuRMojJumm0LokJ4ycTJBwAAAPyVQNgOAAAA; expires=Fri, 25-Jun-2021 19:18:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 26 May 2021 19:18:51 GMT',
  'Content-Length',
  '1321'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/farmers/test-farmer-id-1622056699834')
  .query(true)
  .reply(400, {"error":{"code":"InvalidDeleteOperation","message":"The farmer with id 'test-farmer-id-1622056699834' has dependent farms, boundaries, oauth tokens, farm operations or attachments. Delete them first individually or use the cascade delete job.","target":null,"details":null,"innererror":null},"traceId":"0HM903J177QF0:00000003"}, [
  'Server',
  'nginx/1.19.1',
  'Date',
  'Wed, 26 May 2021 19:18:52 GMT',
  'Content-Type',
  'application/json',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'x-ms-throttle-information',
  '1',
  'x-ms-request-id',
  '0HM903J177QF0:00000003',
  'api-supported-versions',
  '2021-03-31-preview',
  'api-deprecated-versions',
  '2020-12-31-preview',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
