let nock = require('nock');

module.exports.hash = "b96059cfe95741f044cae7bbb098b470";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('///providers/Microsoft.Authorization/roleDefinitions/does_not_exist')
  .query(true)
  .reply(401, "OK", [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'www-authenticate',
  'Bearer authorization="https://login.microsoftonline.com/azure_tenant_id", resource="https://managedhsm.azure.net"',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '2',
  'x-ms-request-id',
  '4f0aa482-619f-11eb-b800-0242ac120008',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-build-version',
  '1.0.20210112-1-4fbf61ac-develop',
  'cache-control',
  'no-cache',
  'x-ms-server-latency',
  '1'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fmanagedhsm.azure.net%2F.default")
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
  'bf7144ff-ceda-4fe4-9558-67d92cc74000',
  'x-ms-ests-server',
  '2.1.11444.8 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AtPrFn7AQ_pDqMxLfhrMzbZdWxHLAgAAAOAHpdcOAAAA; expires=Sat, 27-Feb-2021 19:30:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 28 Jan 2021 19:30:41 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('///providers/Microsoft.Authorization/roleDefinitions/does_not_exist')
  .query(true)
  .reply(404, {"error":{"code":"RoleDefinitionNotFound","message":"Requested role definition not found (Activity ID: 4f3d786c-619f-11eb-b800-0242ac120008)"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-server-latency',
  '1',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '143',
  'x-ms-request-id',
  '4f3d786c-619f-11eb-b800-0242ac120008',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-build-version',
  '1.0.20210112-1-4fbf61ac-develop',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);
