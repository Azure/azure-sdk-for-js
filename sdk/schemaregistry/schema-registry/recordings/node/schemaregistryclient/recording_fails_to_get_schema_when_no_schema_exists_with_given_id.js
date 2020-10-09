let nock = require('nock');

module.exports.hash = "8a7a25f38a53c528d64492b8a40d024c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Feventhubs.azure.net%2F.default")
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
  'af534171-5c3c-4bcb-9a85-ee5dca8a4701',
  'x-ms-ests-server',
  '2.1.11086.7 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=ArAKYg2zrPpLjrqM5pf-AGlJ4DFtAQAAAL-HDdcOAAAA; expires=Wed, 04-Nov-2020 21:31:44 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 05 Oct 2020 21:31:43 GMT',
  'Content-Length',
  '1321'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/$schemagroups/getSchemaById/ffffffffffffffffffffffffffffffff')
  .query(true)
  .reply(404, {"Code":404,"Detail":"Schema id ffffffffffffffffffffffffffffffff does not exist. TrackingId:4c61053c-d700-4fa8-ad15-90ab640077f3_G2, SystemTracker:endpoint:$schemagroups/getSchemaById/ffffffffffffffffffffffffffffffff, Timestamp:2020-10-05T21:31:45"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000',
  'Date',
  'Mon, 05 Oct 2020 21:31:45 GMT'
]);
