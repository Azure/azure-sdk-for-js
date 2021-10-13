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
  '750c015b-5f2f-4175-8d21-691a01130000',
  'x-ms-ests-server',
  '2.1.12158.5 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AjjsZ3do8SRKn-NcLqbU4EbQ9y8kAQAAADCa-NgOAAAA; expires=Fri, 12-Nov-2021 09:13:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 13 Oct 2021 09:13:20 GMT',
  'Content-Length',
  '1679'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/deviceupdate/test/updates/providers')
  .query(true)
  .reply(200, {"value":[]}, [
  'Date',
  'Wed, 13 Oct 2021 09:13:21 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '12',
  'traceparent',
  '00-8cff581dcbea7d418508c222172151d0-304eeda84aa4a347-00'
]);
