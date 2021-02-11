let nock = require('nock');

module.exports.hash = "2b71da0768a562fe2e037f0b22ed74b9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('///providers/Microsoft.Authorization/roleDefinitions')
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
  'f33c3e26-5ace-11eb-88fb-0242ac120006',
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
  '31c7d331-206d-4f11-865f-dca2bd0bfe00',
  'x-ms-ests-server',
  '2.1.11397.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AruM6-s0o4dGuoROwfwoa4NdWxHLAwAAAFGZmdcOAAAA; expires=Fri, 19-Feb-2021 03:24:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 20 Jan 2021 03:24:05 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('///providers/Microsoft.Authorization/roleDefinitions')
  .query(true)
  .reply(200, {"value":[{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/7b127d3c-77bd-4e3e-bbe0-dbb8971fa7f8","name":"7b127d3c-77bd-4e3e-bbe0-dbb8971fa7f8","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/backup/start/action","Microsoft.KeyVault/managedHsm/backup/status/action","Microsoft.KeyVault/managedHsm/keys/backup/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Backup","type":"AKVBuiltInRole"},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/33413926-3206-4cdd-b39a-83574fe37a17","name":"33413926-3206-4cdd-b39a-83574fe37a17","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/keys/read/action","Microsoft.KeyVault/managedHsm/keys/wrap/action","Microsoft.KeyVault/managedHsm/keys/unwrap/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Crypto Service Encryption","type":"AKVBuiltInRole"},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/2c18b078-7c48-4d3a-af88-5a3a1b3f82b3","name":"2c18b078-7c48-4d3a-af88-5a3a1b3f82b3","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/keys/read/action","Microsoft.KeyVault/managedHsm/keys/deletedKeys/read/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Crypto Auditor","type":"AKVBuiltInRole"},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/4bd23610-cdcf-4971-bdee-bdc562cc28e4","name":"4bd23610-cdcf-4971-bdee-bdc562cc28e4","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/roleDefinitions/read/action","Microsoft.KeyVault/managedHsm/roleDefinitions/write/action","Microsoft.KeyVault/managedHsm/roleDefinitions/delete/action","Microsoft.KeyVault/managedHsm/roleAssignments/read/action","Microsoft.KeyVault/managedHsm/roleAssignments/write/action","Microsoft.KeyVault/managedHsm/roleAssignments/delete/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Policy Administrator","type":"AKVBuiltInRole"},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/21dbd100-6940-42c2-9190-5d6cb909625b","name":"21dbd100-6940-42c2-9190-5d6cb909625b","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/keys/read/action","Microsoft.KeyVault/managedHsm/keys/write/action","Microsoft.KeyVault/managedHsm/keys/backup/action","Microsoft.KeyVault/managedHsm/keys/create","Microsoft.KeyVault/managedHsm/keys/encrypt/action","Microsoft.KeyVault/managedHsm/keys/decrypt/action","Microsoft.KeyVault/managedHsm/keys/wrap/action","Microsoft.KeyVault/managedHsm/keys/unwrap/action","Microsoft.KeyVault/managedHsm/keys/sign/action","Microsoft.KeyVault/managedHsm/keys/verify/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Crypto User","type":"AKVBuiltInRole"},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/515eb02d-2335-4d2d-92f2-b1cbdf9c3778","name":"515eb02d-2335-4d2d-92f2-b1cbdf9c3778","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/keys/read/action","Microsoft.KeyVault/managedHsm/keys/write/action","Microsoft.KeyVault/managedHsm/keys/deletedKeys/read/action","Microsoft.KeyVault/managedHsm/keys/deletedKeys/recover/action","Microsoft.KeyVault/managedHsm/keys/backup/action","Microsoft.KeyVault/managedHsm/keys/restore/action","Microsoft.KeyVault/managedHsm/keys/encrypt/action","Microsoft.KeyVault/managedHsm/keys/decrypt/action","Microsoft.KeyVault/managedHsm/keys/sign/action","Microsoft.KeyVault/managedHsm/keys/verify/action","Microsoft.KeyVault/managedHsm/keys/wrap/action","Microsoft.KeyVault/managedHsm/keys/unwrap/action","Microsoft.KeyVault/managedHsm/keys/create","Microsoft.KeyVault/managedHsm/keys/delete","Microsoft.KeyVault/managedHsm/keys/export/action","Microsoft.KeyVault/managedHsm/keys/import/action","Microsoft.KeyVault/managedHsm/keys/deletedKeys/delete"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Crypto Officer","type":"AKVBuiltInRole"},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/a290e904-7015-4bba-90c8-60543313cdb4","name":"a290e904-7015-4bba-90c8-60543313cdb4","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/keys/read/action","Microsoft.KeyVault/managedHsm/keys/write/action","Microsoft.KeyVault/managedHsm/keys/deletedKeys/read/action","Microsoft.KeyVault/managedHsm/keys/deletedKeys/recover/action","Microsoft.KeyVault/managedHsm/keys/backup/action","Microsoft.KeyVault/managedHsm/keys/restore/action","Microsoft.KeyVault/managedHsm/roleAssignments/delete/action","Microsoft.KeyVault/managedHsm/roleAssignments/read/action","Microsoft.KeyVault/managedHsm/roleAssignments/write/action","Microsoft.KeyVault/managedHsm/roleDefinitions/read/action","Microsoft.KeyVault/managedHsm/roleDefinitions/write/action","Microsoft.KeyVault/managedHsm/roleDefinitions/delete/action","Microsoft.KeyVault/managedHsm/keys/encrypt/action","Microsoft.KeyVault/managedHsm/keys/decrypt/action","Microsoft.KeyVault/managedHsm/keys/wrap/action","Microsoft.KeyVault/managedHsm/keys/unwrap/action","Microsoft.KeyVault/managedHsm/keys/sign/action","Microsoft.KeyVault/managedHsm/keys/verify/action","Microsoft.KeyVault/managedHsm/keys/create","Microsoft.KeyVault/managedHsm/keys/delete","Microsoft.KeyVault/managedHsm/keys/export/action","Microsoft.KeyVault/managedHsm/keys/import/action","Microsoft.KeyVault/managedHsm/keys/deletedKeys/delete","Microsoft.KeyVault/managedHsm/securitydomain/download/action","Microsoft.KeyVault/managedHsm/securitydomain/upload/action","Microsoft.KeyVault/managedHsm/securitydomain/upload/read","Microsoft.KeyVault/managedHsm/securitydomain/transferkey/read","Microsoft.KeyVault/managedHsm/backup/start/action","Microsoft.KeyVault/managedHsm/restore/start/action","Microsoft.KeyVault/managedHsm/backup/status/action","Microsoft.KeyVault/managedHsm/restore/status/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Administrator","type":"AKVBuiltInRole"},"type":"Microsoft.Authorization/roleDefinitions"}]}, [
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-request-id',
  'f36ca304-5ace-11eb-88fb-0242ac120006',
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-keyvault-region',
  'westeurope',
  'content-length',
  '6772',
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
