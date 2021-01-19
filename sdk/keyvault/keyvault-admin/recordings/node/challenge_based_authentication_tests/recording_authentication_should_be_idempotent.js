let nock = require('nock');

module.exports.hash = "3eff7c58d008b0759e8b092d2dd8df1c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('///providers/Microsoft.Authorization/roleAssignments')
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
  'c2e381b2-5ab5-11eb-8460-0242ac120006',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-build-version',
  '1.0.20210112-1-4fbf61ac-develop',
  'cache-control',
  'no-cache',
  'x-ms-server-latency',
  '0'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('///providers/Microsoft.Authorization/roleAssignments')
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
  'c2e58b2e-5ab5-11eb-9b71-0242ac12000a',
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
  'fcfd7216-fe7d-4291-8193-53bb67000b00',
  'x-ms-ests-server',
  '2.1.11419.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Ar2LNiTibrZGlJnFfwGSMLZdWxHLAQAAABNvmdcOAAAA; expires=Fri, 19-Feb-2021 00:23:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 20 Jan 2021 00:23:46 GMT',
  'Content-Length',
  '1322'
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
  'cfc2df92-dc1b-4b47-aba7-d7e042725800',
  'x-ms-ests-server',
  '2.1.11397.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=At3qUWaQVUBJmj5Gv0S-0ildWxHLAQAAABJvmdcOAAAA; expires=Fri, 19-Feb-2021 00:23:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 20 Jan 2021 00:23:46 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('///providers/Microsoft.Authorization/roleAssignments')
  .query(true)
  .reply(200, {"value":[{"id":"/providers/Microsoft.Authorization/roleAssignments/d34dc562-cefa-4da8-a3b6-399b96361440","name":"d34dc562-cefa-4da8-a3b6-399b96361440","properties":{"principalId":"01ea9a65-813e-4238-8204-bf7328d63fc6","roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/7b127d3c-77bd-4e3e-bbe0-dbb8971fa7f8","scope":"/"},"type":"Microsoft.Authorization/roleAssignments"},{"id":"/providers/Microsoft.Authorization/roleAssignments/84e42b1c-341b-0999-b07e-b24e7621c4f7","name":"84e42b1c-341b-0999-b07e-b24e7621c4f7","properties":{"principalId":"01ea9a65-813e-4238-8204-bf7328d63fc6","roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/a290e904-7015-4bba-90c8-60543313cdb4","scope":"/"},"type":"Microsoft.Authorization/roleAssignments"}]}, [
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-request-id',
  'c32d5954-5ab5-11eb-8460-0242ac120006',
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-keyvault-region',
  'westeurope',
  'content-length',
  '809',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-build-version',
  '1.0.20210112-1-4fbf61ac-develop',
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '1'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('///providers/Microsoft.Authorization/roleAssignments')
  .query(true)
  .reply(200, {"value":[{"id":"/providers/Microsoft.Authorization/roleAssignments/d34dc562-cefa-4da8-a3b6-399b96361440","name":"d34dc562-cefa-4da8-a3b6-399b96361440","properties":{"principalId":"01ea9a65-813e-4238-8204-bf7328d63fc6","roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/7b127d3c-77bd-4e3e-bbe0-dbb8971fa7f8","scope":"/"},"type":"Microsoft.Authorization/roleAssignments"},{"id":"/providers/Microsoft.Authorization/roleAssignments/84e42b1c-341b-0999-b07e-b24e7621c4f7","name":"84e42b1c-341b-0999-b07e-b24e7621c4f7","properties":{"principalId":"01ea9a65-813e-4238-8204-bf7328d63fc6","roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/a290e904-7015-4bba-90c8-60543313cdb4","scope":"/"},"type":"Microsoft.Authorization/roleAssignments"}]}, [
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-request-id',
  'c33037fa-5ab5-11eb-9b71-0242ac12000a',
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-keyvault-region',
  'westeurope',
  'content-length',
  '809',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-build-version',
  '1.0.20210112-1-4fbf61ac-develop',
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '1'
]);
