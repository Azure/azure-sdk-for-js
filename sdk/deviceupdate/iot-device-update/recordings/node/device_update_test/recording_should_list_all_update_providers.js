let nock = require('nock');

module.exports.hash = "53a7e97babbfa79b8fd3af873217fbb0";

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
  'fa4aa946-1777-4f58-9fd4-a1e357fc0100',
  'x-ms-ests-server',
  '2.1.12158.3 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AlXIqiH1sY9Gvyns8ZNKaInQ9y8kAQAAAON9-NgOAAAA; expires=Fri, 12-Nov-2021 07:12:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 13 Oct 2021 07:12:34 GMT',
  'Content-Length',
  '1679'
]);

nock('https://https%3A%2F%2Fendpoint', {"encodedQueryParams":true})
  .get('/deviceupdate/ztest/updates/providers')
  .query(true)
  .reply(200, {"value":[]}, [
  'Date',
  'Wed, 13 Oct 2021 07:12:37 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '12',
  'traceparent',
  '00-b222c9fc8820a44aa9c711e17611e94c-63280ab02f9c0147-00'
]);
