let nock = require('nock');

module.exports.hash = "622a3fd7cdca169239801a8ae7843dfd";

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
  '5181cea2-c7b2-49b4-b673-19acf5497100',
  'x-ms-ests-server',
  '2.1.11086.7 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AszGFwoG8hZNm38rm6OF0klJ4DFtAQAAALyHDdcOAAAA; expires=Wed, 04-Nov-2020 21:31:41 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 05 Oct 2020 21:31:41 GMT',
  'Content-Length',
  '1321'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/$schemagroups/azsdk_js_test_group/schemas/never-registered', {"type":"record","name":"User","namespace":"com.azure.schemaregistry.samples","fields":[{"name":"name","type":"string"},{"name":"favoriteNumber","type":"int"}]})
  .query(true)
  .reply(404, {"Code":404,"Detail":"Schema azsdk_js_test_group/never-registered does not exist. TrackingId:a14afd8a-8c44-47e5-b546-a1f4cb5c26ac_G4, SystemTracker:endpoint:$schemagroups/azsdk_js_test_group/schemas/never-registered, Timestamp:2020-10-05T21:31:42"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000',
  'Date',
  'Mon, 05 Oct 2020 21:31:42 GMT'
]);
