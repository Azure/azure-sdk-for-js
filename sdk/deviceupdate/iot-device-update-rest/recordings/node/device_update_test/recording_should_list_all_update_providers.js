let nock = require('nock');

module.exports.hash = "974817594eb810ea9fe6c4d0131d4766";

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
  '67735430-9056-4ced-ab02-623e905a0500',
  'x-ms-ests-server',
  '2.1.12158.5 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Agzia1-B5qxHtthPl2cEU2jQ9y8kAQAAAJ2Y-dgOAAAA; expires=Sat, 13-Nov-2021 03:18:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Oct 2021 03:18:53 GMT',
  'Content-Length',
  '1679'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/deviceupdate/test/updates/providers')
  .query(true)
  .reply(200, {"value":[]}, [
  'Date',
  'Thu, 14 Oct 2021 03:18:55 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '12',
  'traceparent',
  '00-7d152769f5d25c44a76f7c7eb28ffddf-75b2be04b8b34c4c-00'
]);
