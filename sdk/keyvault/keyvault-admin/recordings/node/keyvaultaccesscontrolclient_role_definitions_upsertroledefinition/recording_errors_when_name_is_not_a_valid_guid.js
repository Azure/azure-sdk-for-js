let nock = require('nock');

module.exports.hash = "aa49bc26dd2b5eaa4bd55c512d8cdb8f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .put('///providers/Microsoft.Authorization/roleDefinitions/foo')
  .query(true)
  .reply(401, "", [
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-server-latency',
  '1',
  'x-content-type-options',
  'nosniff',
  'www-authenticate',
  'Bearer authorization="https://login.microsoftonline.com/azure_tenant_id", resource="https://managedhsm.azure.net"',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '0',
  'x-ms-request-id',
  '14b3bc12-8038-11eb-9948-000d3abf52b7',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'cache-control',
  'no-cache'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fmanagedhsm.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1322',
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
  '1813e1cd-340a-4404-8b03-ae835734e000',
  'x-ms-ests-server',
  '2.1.11530.15 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Aj1PYPqGGBZCvaKaRYAFcclYXQRlAQAAABdd2NcOAAAA; expires=Wed, 07-Apr-2021 17:59:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 08 Mar 2021 17:59:51 GMT'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .put('///providers/Microsoft.Authorization/roleDefinitions/foo', {"properties":{"roleName":"foo","type":"CustomRole","permissions":[],"assignableScopes":["/"]}})
  .query(true)
  .reply(400, {"error":{"code":"BadParameter","message":"Role definition name must be a GUID (Activity ID: 14e58ff8-8038-11eb-9948-000d3abf52b7)"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-server-latency',
  '1',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '133',
  'x-ms-request-id',
  '14e58ff8-8038-11eb-9948-000d3abf52b7',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-frame-options',
  'SAMEORIGIN'
]);
