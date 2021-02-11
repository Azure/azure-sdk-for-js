let nock = require('nock');

module.exports.hash = "c58abc637aa52862ea5435cbdf1adea8";

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
  '772467d3-7e89-4f81-8e50-d50ae99c1c02',
  'x-ms-ests-server',
  '2.1.11328.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AkOBaJLeghVLhnpItHNyCZJvWe_NAQAAAFNRfNcOAAAA; expires=Wed, 27-Jan-2021 22:21:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 28 Dec 2020 22:21:06 GMT',
  'Content-Length',
  '1321'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .put('/$schemagroups/group/schemas/azsdk_js_test', {"type":"record","name":"User","namespace":"com.azure.schemaregistry.samples","fields":[{"name":"name","type":"string"},{"name":"favoriteNumber","type":"int"}]})
  .query(true)
  .reply(200, {"id":"f1675059e3c9410d8b06564af2eb4645"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Location',
  'https://endpoint:443/$schemagroups/group/schemas/azsdk_js_test/versions/1?api-version=2020-09-01-preview',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Schema-Id',
  'f1675059e3c9410d8b06564af2eb4645',
  'Schema-Id-Location',
  'https://endpoint:443/$schemagroups/getschemabyid/f1675059e3c9410d8b06564af2eb4645?api-version=2020-09-01-preview',
  'Serialization-Type',
  'Avro',
  'Schema-Version',
  '1',
  'Schema-Versions-Location',
  'https://endpoint:443/$schemagroups/group/schemas/azsdk_js_test/versions?api-version=2020-09-01-preview',
  'Strict-Transport-Security',
  'max-age=31536000',
  'Date',
  'Mon, 28 Dec 2020 22:21:07 GMT'
]);
