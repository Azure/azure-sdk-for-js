let nock = require('nock');

module.exports.hash = "cb3c3461eeb933a605624c89b8994889";

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
  '1da4d9f2-6196-11eb-aa64-0242ac120009',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-build-version',
  '1.0.20210112-1-4fbf61ac-develop',
  'cache-control',
  'no-cache',
  'x-ms-server-latency',
  '2'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fmanagedhsm.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1317',
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
  '5f15c7bb-a439-436a-a95d-27a958dacd00',
  'x-ms-ests-server',
  '2.1.11444.8 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AsL5eNaSdj9Hv8NUxPN0i95dWxHLAgAAAHP4pNcOAAAA; expires=Sat, 27-Feb-2021 18:24:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 28 Jan 2021 18:24:52 GMT'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('///providers/Microsoft.Authorization/roleDefinitions')
  .query(true)
  .reply(200, {"value":[{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/7b127d3c-77bd-4e3e-bbe0-dbb8971fa7f8","name":"7b127d3c-77bd-4e3e-bbe0-dbb8971fa7f8","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/backup/start/action","Microsoft.KeyVault/managedHsm/backup/status/action","Microsoft.KeyVault/managedHsm/keys/backup/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Backup","type":"AKVBuiltInRole"},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/33413926-3206-4cdd-b39a-83574fe37a17","name":"33413926-3206-4cdd-b39a-83574fe37a17","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/keys/read/action","Microsoft.KeyVault/managedHsm/keys/wrap/action","Microsoft.KeyVault/managedHsm/keys/unwrap/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Crypto Service Encryption","type":"AKVBuiltInRole"},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/2c18b078-7c48-4d3a-af88-5a3a1b3f82b3","name":"2c18b078-7c48-4d3a-af88-5a3a1b3f82b3","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/keys/read/action","Microsoft.KeyVault/managedHsm/keys/deletedKeys/read/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Crypto Auditor","type":"AKVBuiltInRole"},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/4bd23610-cdcf-4971-bdee-bdc562cc28e4","name":"4bd23610-cdcf-4971-bdee-bdc562cc28e4","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/roleDefinitions/read/action","Microsoft.KeyVault/managedHsm/roleDefinitions/write/action","Microsoft.KeyVault/managedHsm/roleDefinitions/delete/action","Microsoft.KeyVault/managedHsm/roleAssignments/read/action","Microsoft.KeyVault/managedHsm/roleAssignments/write/action","Microsoft.KeyVault/managedHsm/roleAssignments/delete/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Policy Administrator","type":"AKVBuiltInRole"},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/21dbd100-6940-42c2-9190-5d6cb909625b","name":"21dbd100-6940-42c2-9190-5d6cb909625b","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/keys/read/action","Microsoft.KeyVault/managedHsm/keys/write/action","Microsoft.KeyVault/managedHsm/keys/backup/action","Microsoft.KeyVault/managedHsm/keys/create","Microsoft.KeyVault/managedHsm/keys/encrypt/action","Microsoft.KeyVault/managedHsm/keys/decrypt/action","Microsoft.KeyVault/managedHsm/keys/wrap/action","Microsoft.KeyVault/managedHsm/keys/unwrap/action","Microsoft.KeyVault/managedHsm/keys/sign/action","Microsoft.KeyVault/managedHsm/keys/verify/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Crypto User","type":"AKVBuiltInRole"},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/515eb02d-2335-4d2d-92f2-b1cbdf9c3778","name":"515eb02d-2335-4d2d-92f2-b1cbdf9c3778","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/keys/read/action","Microsoft.KeyVault/managedHsm/keys/write/action","Microsoft.KeyVault/managedHsm/keys/deletedKeys/read/action","Microsoft.KeyVault/managedHsm/keys/deletedKeys/recover/action","Microsoft.KeyVault/managedHsm/keys/backup/action","Microsoft.KeyVault/managedHsm/keys/restore/action","Microsoft.KeyVault/managedHsm/keys/encrypt/action","Microsoft.KeyVault/managedHsm/keys/decrypt/action","Microsoft.KeyVault/managedHsm/keys/sign/action","Microsoft.KeyVault/managedHsm/keys/verify/action","Microsoft.KeyVault/managedHsm/keys/wrap/action","Microsoft.KeyVault/managedHsm/keys/unwrap/action","Microsoft.KeyVault/managedHsm/keys/create","Microsoft.KeyVault/managedHsm/keys/delete","Microsoft.KeyVault/managedHsm/keys/export/action","Microsoft.KeyVault/managedHsm/keys/import/action","Microsoft.KeyVault/managedHsm/keys/deletedKeys/delete"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Crypto Officer","type":"AKVBuiltInRole"},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/a290e904-7015-4bba-90c8-60543313cdb4","name":"a290e904-7015-4bba-90c8-60543313cdb4","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/keys/read/action","Microsoft.KeyVault/managedHsm/keys/write/action","Microsoft.KeyVault/managedHsm/keys/deletedKeys/read/action","Microsoft.KeyVault/managedHsm/keys/deletedKeys/recover/action","Microsoft.KeyVault/managedHsm/keys/backup/action","Microsoft.KeyVault/managedHsm/keys/restore/action","Microsoft.KeyVault/managedHsm/roleAssignments/delete/action","Microsoft.KeyVault/managedHsm/roleAssignments/read/action","Microsoft.KeyVault/managedHsm/roleAssignments/write/action","Microsoft.KeyVault/managedHsm/roleDefinitions/read/action","Microsoft.KeyVault/managedHsm/roleDefinitions/write/action","Microsoft.KeyVault/managedHsm/roleDefinitions/delete/action","Microsoft.KeyVault/managedHsm/keys/encrypt/action","Microsoft.KeyVault/managedHsm/keys/decrypt/action","Microsoft.KeyVault/managedHsm/keys/wrap/action","Microsoft.KeyVault/managedHsm/keys/unwrap/action","Microsoft.KeyVault/managedHsm/keys/sign/action","Microsoft.KeyVault/managedHsm/keys/verify/action","Microsoft.KeyVault/managedHsm/keys/create","Microsoft.KeyVault/managedHsm/keys/delete","Microsoft.KeyVault/managedHsm/keys/export/action","Microsoft.KeyVault/managedHsm/keys/import/action","Microsoft.KeyVault/managedHsm/keys/deletedKeys/delete","Microsoft.KeyVault/managedHsm/securitydomain/download/action","Microsoft.KeyVault/managedHsm/securitydomain/upload/action","Microsoft.KeyVault/managedHsm/securitydomain/upload/read","Microsoft.KeyVault/managedHsm/securitydomain/transferkey/read","Microsoft.KeyVault/managedHsm/backup/start/action","Microsoft.KeyVault/managedHsm/restore/start/action","Microsoft.KeyVault/managedHsm/backup/status/action","Microsoft.KeyVault/managedHsm/restore/status/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Administrator","type":"AKVBuiltInRole"},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/0e2caeee-c32b-4f0b-92db-15920a0e576b","name":"0e2caeee-c32b-4f0b-92db-15920a0e576b","properties":{"assignableScopes":["/"],"description":"custom role description","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/backup/start/action","Microsoft.KeyVault/managedHsm/backup/status/action"],"notActions":[],"notDataActions":[]}],"roleName":"0e2caeee-c32b-4f0b-92db-15920a0e576b","type":"CustomRole"},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/d9340e70-7651-44b0-bcc8-f65db7f911f2","name":"d9340e70-7651-44b0-bcc8-f65db7f911f2","properties":{"assignableScopes":["/"],"description":"custom role description","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/backup/start/action","Microsoft.KeyVault/managedHsm/backup/status/action"],"notActions":[],"notDataActions":[]}],"roleName":"d9340e70-7651-44b0-bcc8-f65db7f911f2","type":"CustomRole"},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/foo","name":"foo","properties":{"assignableScopes":["/"],"description":"","permissions":[],"roleName":"foo","type":"CustomRole"},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/7bba88c3-6be8-476e-aeeb-789f96cbf634","name":"7bba88c3-6be8-476e-aeeb-789f96cbf634","properties":{"assignableScopes":["/"],"description":"custom role description","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/backup/start/action","Microsoft.KeyVault/managedHsm/backup/status/action"],"notActions":[],"notDataActions":[]},{"actions":[],"dataActions":[],"notActions":[],"notDataActions":["Microsoft.KeyVault/managedHsm/keys/encrypt/action"]}],"roleName":"7bba88c3-6be8-476e-aeeb-789f96cbf634","type":"CustomRole"},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/86eb7f81-018e-43aa-b733-17b5f3d1fdfc","name":"86eb7f81-018e-43aa-b733-17b5f3d1fdfc","properties":{"assignableScopes":["/"],"description":"custom role description","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/backup/start/action","Microsoft.KeyVault/managedHsm/backup/status/action"],"notActions":[],"notDataActions":[]}],"roleName":"86eb7f81-018e-43aa-b733-17b5f3d1fdfc","type":"CustomRole"},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/a5e8be4f-79ef-40d7-8b21-dfe4cf04beb2","name":"a5e8be4f-79ef-40d7-8b21-dfe4cf04beb2","properties":{"assignableScopes":["/"],"description":"custom role description","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/backup/start/action","Microsoft.KeyVault/managedHsm/backup/status/action"],"notActions":[],"notDataActions":[]},{"actions":[],"dataActions":[],"notActions":[],"notDataActions":["Microsoft.KeyVault/managedHsm/keys/encrypt/action"]}],"roleName":"a5e8be4f-79ef-40d7-8b21-dfe4cf04beb2","type":"CustomRole"},"type":"Microsoft.Authorization/roleDefinitions"}]}, [
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-request-id',
  '1dc76030-6196-11eb-aa64-0242ac120009',
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-keyvault-region',
  'westeurope',
  'content-length',
  '10005',
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
  '2'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .put('///providers/Microsoft.Authorization/roleAssignments/b36b00af-89c6-435f-a43d-9a3087015c27', {"properties":{"roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/21dbd100-6940-42c2-9190-5d6cb909625b","principalId":"01ea9a65-813e-4238-8204-bf7328d63fc6"}})
  .query(true)
  .reply(201, {"id":"/providers/Microsoft.Authorization/roleAssignments/b36b00af-89c6-435f-a43d-9a3087015c27","name":"b36b00af-89c6-435f-a43d-9a3087015c27","properties":{"principalId":"01ea9a65-813e-4238-8204-bf7328d63fc6","roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/21dbd100-6940-42c2-9190-5d6cb909625b","scope":"/"},"type":"Microsoft.Authorization/roleAssignments"}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '398',
  'x-ms-request-id',
  '1de0c6b0-6196-11eb-aa64-0242ac120009',
  'x-ms-keyvault-region',
  'westeurope',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '67',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('///providers/Microsoft.Authorization/roleAssignments/b36b00af-89c6-435f-a43d-9a3087015c27')
  .query(true)
  .reply(200, {"id":"/providers/Microsoft.Authorization/roleAssignments/b36b00af-89c6-435f-a43d-9a3087015c27","name":"b36b00af-89c6-435f-a43d-9a3087015c27","properties":{"principalId":"01ea9a65-813e-4238-8204-bf7328d63fc6","roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/21dbd100-6940-42c2-9190-5d6cb909625b","scope":"/"},"type":"Microsoft.Authorization/roleAssignments"}, [
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-request-id',
  '1e03c368-6196-11eb-aa64-0242ac120009',
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-keyvault-region',
  'westeurope',
  'content-length',
  '398',
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
  '0'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .delete('///providers/Microsoft.Authorization/roleAssignments/b36b00af-89c6-435f-a43d-9a3087015c27')
  .query(true)
  .reply(200, {"id":"/providers/Microsoft.Authorization/roleAssignments/b36b00af-89c6-435f-a43d-9a3087015c27","name":"b36b00af-89c6-435f-a43d-9a3087015c27","properties":{"principalId":"01ea9a65-813e-4238-8204-bf7328d63fc6","roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/21dbd100-6940-42c2-9190-5d6cb909625b","scope":"/"},"type":"Microsoft.Authorization/roleAssignments"}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '398',
  'x-ms-request-id',
  '1e1c51bc-6196-11eb-aa64-0242ac120009',
  'x-ms-keyvault-region',
  'westeurope',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '88',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('///providers/Microsoft.Authorization/roleAssignments/b36b00af-89c6-435f-a43d-9a3087015c27')
  .query(true)
  .reply(404, {"error":{"code":"RoleAssignmentNotFound","message":"Requested role assignment not found (Activity ID: 1e42e94e-6196-11eb-aa64-0242ac120009)"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-server-latency',
  '0',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '143',
  'x-ms-request-id',
  '1e42e94e-6196-11eb-aa64-0242ac120009',
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
