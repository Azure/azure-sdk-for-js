let nock = require('nock');

module.exports.hash = "a53145d563369b7a1285efc043840c75";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://eastus2.keyvault_name.managedhsm-int.azure-int.net:443', {"encodedQueryParams":true})
  .get('///providers/Microsoft.Authorization/roleDefinitions')
  .query(true)
  .reply(401, "OK", [ 'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'www-authenticate',
  'Bearer authorization="https://login.windows-ppe.net/01ea9a65-813e-4238-8204-bf7328d63fc6", resource="https://managedhsm-int.azure-int.net"',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '2',
  'x-ms-request-id',
  '47087520-ec74-11ea-be1e-0242ac120005',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  'default-src \'self\'',
  'x-ms-build-version',
  '1.0.20200901-1-40187cd0-develop',
  'cache-control',
  'no-cache',
  'x-ms-server-latency',
  '1' ]);

nock('https://eastus2.keyvault_name.managedhsm-int.azure-int.net:443', {"encodedQueryParams":true})
  .get('///providers/Microsoft.Authorization/roleDefinitions')
  .query(true)
  .reply(200, {"value":[{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/a290e904-7015-4bba-90c8-60543313cdb4","name":"a290e904-7015-4bba-90c8-60543313cdb4","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/keys/read/action","Microsoft.KeyVault/managedHsm/keys/write/action","Microsoft.KeyVault/managedHsm/keys/deletedKeys/read/action","Microsoft.KeyVault/managedHsm/keys/deletedKeys/recover/action","Microsoft.KeyVault/managedHsm/keys/backup/action","Microsoft.KeyVault/managedHsm/keys/restore/action","Microsoft.KeyVault/managedHsm/roleAssignments/delete/action","Microsoft.KeyVault/managedHsm/roleAssignments/read/action","Microsoft.KeyVault/managedHsm/roleAssignments/write/action","Microsoft.KeyVault/managedHsm/roleDefinitions/read/action","Microsoft.KeyVault/managedHsm/keys/encrypt/action","Microsoft.KeyVault/managedHsm/keys/decrypt/action","Microsoft.KeyVault/managedHsm/keys/wrap/action","Microsoft.KeyVault/managedHsm/keys/unwrap/action","Microsoft.KeyVault/managedHsm/keys/sign/action","Microsoft.KeyVault/managedHsm/keys/verify/action","Microsoft.KeyVault/managedHsm/keys/create","Microsoft.KeyVault/managedHsm/keys/delete","Microsoft.KeyVault/managedHsm/keys/export/action","Microsoft.KeyVault/managedHsm/keys/import/action","Microsoft.KeyVault/managedHsm/keys/deletedKeys/delete","Microsoft.KeyVault/managedHsm/securitydomain/download/action","Microsoft.KeyVault/managedHsm/securitydomain/upload/action","Microsoft.KeyVault/managedHsm/securitydomain/upload/read","Microsoft.KeyVault/managedHsm/securitydomain/transferkey/read","Microsoft.KeyVault/managedHsm/backup/start/action","Microsoft.KeyVault/managedHsm/restore/start/action","Microsoft.KeyVault/managedHsm/backup/status/action","Microsoft.KeyVault/managedHsm/restore/status/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Administrator","type":""},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/515eb02d-2335-4d2d-92f2-b1cbdf9c3778","name":"515eb02d-2335-4d2d-92f2-b1cbdf9c3778","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/keys/read/action","Microsoft.KeyVault/managedHsm/keys/write/action","Microsoft.KeyVault/managedHsm/keys/deletedKeys/read/action","Microsoft.KeyVault/managedHsm/keys/deletedKeys/recover/action","Microsoft.KeyVault/managedHsm/keys/backup/action","Microsoft.KeyVault/managedHsm/keys/restore/action","Microsoft.KeyVault/managedHsm/keys/encrypt/action","Microsoft.KeyVault/managedHsm/keys/decrypt/action","Microsoft.KeyVault/managedHsm/keys/sign/action","Microsoft.KeyVault/managedHsm/keys/verify/action","Microsoft.KeyVault/managedHsm/keys/wrap/action","Microsoft.KeyVault/managedHsm/keys/unwrap/action","Microsoft.KeyVault/managedHsm/keys/create","Microsoft.KeyVault/managedHsm/keys/delete","Microsoft.KeyVault/managedHsm/keys/export/action","Microsoft.KeyVault/managedHsm/keys/import/action","Microsoft.KeyVault/managedHsm/keys/deletedKeys/delete"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Crypto Officer","type":""},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/21dbd100-6940-42c2-9190-5d6cb909625b","name":"21dbd100-6940-42c2-9190-5d6cb909625b","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/keys/read/action","Microsoft.KeyVault/managedHsm/keys/write/action","Microsoft.KeyVault/managedHsm/keys/backup/action","Microsoft.KeyVault/managedHsm/keys/create","Microsoft.KeyVault/managedHsm/keys/encrypt/action","Microsoft.KeyVault/managedHsm/keys/decrypt/action","Microsoft.KeyVault/managedHsm/keys/wrap/action","Microsoft.KeyVault/managedHsm/keys/unwrap/action","Microsoft.KeyVault/managedHsm/keys/sign/action","Microsoft.KeyVault/managedHsm/keys/verify/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Crypto User","type":""},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/4bd23610-cdcf-4971-bdee-bdc562cc28e4","name":"4bd23610-cdcf-4971-bdee-bdc562cc28e4","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/roleDefinitions/read/action","Microsoft.KeyVault/managedHsm/roleAssignments/read/action","Microsoft.KeyVault/managedHsm/roleAssignments/write/action","Microsoft.KeyVault/managedHsm/roleAssignments/delete/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Policy Administrator","type":""},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/2c18b078-7c48-4d3a-af88-5a3a1b3f82b3","name":"2c18b078-7c48-4d3a-af88-5a3a1b3f82b3","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/keys/read/action","Microsoft.KeyVault/managedHsm/keys/deletedKeys/read/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Crypto Auditor","type":""},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/33413926-3206-4cdd-b39a-83574fe37a17","name":"33413926-3206-4cdd-b39a-83574fe37a17","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/keys/read/action","Microsoft.KeyVault/managedHsm/keys/wrap/action","Microsoft.KeyVault/managedHsm/keys/unwrap/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Crypto Service Encryption","type":""},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/7b127d3c-77bd-4e3e-bbe0-dbb8971fa7f8","name":"7b127d3c-77bd-4e3e-bbe0-dbb8971fa7f8","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/backup/start/action","Microsoft.KeyVault/managedHsm/backup/status/action","Microsoft.KeyVault/managedHsm/keys/backup/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Backup","type":""},"type":"Microsoft.Authorization/roleDefinitions"}]}, [ 'x-frame-options',
  'SAMEORIGIN',
  'x-ms-request-id',
  '47087520-ec74-11ea-be1e-0242ac120005',
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-keyvault-region',
  'EASTUS',
  'content-length',
  '6428',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  'default-src \'self\'',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-build-version',
  '1.0.20200901-1-40187cd0-develop',
  'x-ms-keyvault-network-info',
  'addr=108.226.109.105',
  'x-ms-server-latency',
  '2' ]);

nock('https://eastus2.keyvault_name.managedhsm-int.azure-int.net:443', {"encodedQueryParams":true})
  .put('///providers/Microsoft.Authorization/roleAssignments/06217763-9724-4b26-9eed-c7ab7f90897d', {"properties":{"roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/a290e904-7015-4bba-90c8-60543313cdb4","principalId":"01ea9a65-813e-4238-8204-bf7328d63fc6"}})
  .query(true)
  .reply(201, {"id":"/providers/Microsoft.Authorization/roleAssignments/06217763-9724-4b26-9eed-c7ab7f90897d","name":"06217763-9724-4b26-9eed-c7ab7f90897d","properties":{"principalId":"01ea9a65-813e-4238-8204-bf7328d63fc6","roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/a290e904-7015-4bba-90c8-60543313cdb4","scope":"/"},"type":"Microsoft.Authorization/roleAssignments"}, [ 'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '398',
  'x-ms-request-id',
  '47087520-ec74-11ea-be1e-0242ac120005',
  'x-ms-keyvault-region',
  'EASTUS',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  'default-src \'self\'',
  'x-ms-keyvault-network-info',
  'addr=108.226.109.105',
  'x-ms-server-latency',
  '271',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN' ]);

nock('https://eastus2.keyvault_name.managedhsm-int.azure-int.net:443', {"encodedQueryParams":true})
  .get('///providers/Microsoft.Authorization/roleAssignments/06217763-9724-4b26-9eed-c7ab7f90897d')
  .query(true)
  .reply(200, {"id":"/providers/Microsoft.Authorization/roleAssignments/06217763-9724-4b26-9eed-c7ab7f90897d","name":"06217763-9724-4b26-9eed-c7ab7f90897d","properties":{"principalId":"01ea9a65-813e-4238-8204-bf7328d63fc6","roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/a290e904-7015-4bba-90c8-60543313cdb4","scope":"/"},"type":"Microsoft.Authorization/roleAssignments"}, [ 'x-frame-options',
  'SAMEORIGIN',
  'x-ms-request-id',
  '47087520-ec74-11ea-be1e-0242ac120005',
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-keyvault-region',
  'EASTUS',
  'content-length',
  '398',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  'default-src \'self\'',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-build-version',
  '1.0.20200901-1-40187cd0-develop',
  'x-ms-keyvault-network-info',
  'addr=108.226.109.105',
  'x-ms-server-latency',
  '0' ]);

nock('https://eastus2.keyvault_name.managedhsm-int.azure-int.net:443', {"encodedQueryParams":true})
  .delete('///providers/Microsoft.Authorization/roleAssignments/06217763-9724-4b26-9eed-c7ab7f90897d')
  .query(true)
  .reply(200, {"id":"/providers/Microsoft.Authorization/roleAssignments/06217763-9724-4b26-9eed-c7ab7f90897d","name":"06217763-9724-4b26-9eed-c7ab7f90897d","properties":{"principalId":"01ea9a65-813e-4238-8204-bf7328d63fc6","roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/a290e904-7015-4bba-90c8-60543313cdb4","scope":"/"},"type":"Microsoft.Authorization/roleAssignments"}, [ 'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '398',
  'x-ms-request-id',
  '47087520-ec74-11ea-be1e-0242ac120005',
  'x-ms-keyvault-region',
  'EASTUS',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  'default-src \'self\'',
  'x-ms-keyvault-network-info',
  'addr=108.226.109.105',
  'x-ms-server-latency',
  '310',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN' ]);
