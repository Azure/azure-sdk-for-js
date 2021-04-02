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
  'Content-Length',
  '1321',
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
  '75b4dee7-fab8-4075-ad15-6de946d74902',
  'x-ms-ests-server',
  '2.1.11328.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AhwQEoGfzLxIjLs7cPxq-bJvWe_NAQAAAFZRfNcOAAAA; expires=Wed, 27-Jan-2021 22:21:10 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 28 Dec 2020 22:21:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/$schemagroups/getSchemaById/ffffffffffffffffffffffffffffffff')
  .query(true)
  .reply(404, {"Code":404,"Detail":"Schema id ffffffffffffffffffffffffffffffff does not exist. TrackingId:696e153b-95e9-4b1f-b8e0-5e6eb919fdfb_G23, SystemTracker:endpoint:$schemagroups/getSchemaById/ffffffffffffffffffffffffffffffff, Timestamp:2020-12-28T22:21:11"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000',
  'Date',
  'Mon, 28 Dec 2020 22:21:11 GMT'
]);
