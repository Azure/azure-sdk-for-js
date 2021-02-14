let nock = require('nock');

module.exports.hash = "b2324b2ce082cf85b4d733d70669171a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://eastus2.keyvault_name.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('///providers/Microsoft.Authorization/roleAssignments')
  .query(true)
  .reply(401, "OK", [ 'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'www-authenticate',
  'Bearer authorization="https://login.windows-ppe.net/azure_tenant_id", resource="https://managedhsm-int.azure-int.net"',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '2',
  'x-ms-request-id',
  'e6aeb748-f2ae-11ea-857a-0242ac120004',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  'default-src \'self\'',
  'x-ms-build-version',
  '1.0.20200909-2-c73be597-develop',
  'cache-control',
  'no-cache',
  'x-ms-server-latency',
  '1' ]);

nock('https://eastus2.keyvault_name.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('///providers/Microsoft.Authorization/roleAssignments')
  .query(true)
  .reply(200, {"value":[{"id":"/providers/Microsoft.Authorization/roleAssignments/8e7fe831-35fe-0488-beaf-5b0866306cbb","name":"8e7fe831-35fe-0488-beaf-5b0866306cbb","properties":{"principalId":"4f584d72-47b3-48d1-971c-ce0ae8a47560","roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/a290e904-7015-4bba-90c8-60543313cdb4","scope":"/"},"type":"Microsoft.Authorization/roleAssignments"},{"id":"/providers/Microsoft.Authorization/roleAssignments/65e1be51-aa38-4250-967a-8658fdfb260b","name":"65e1be51-aa38-4250-967a-8658fdfb260b","properties":{"principalId":"49acc88b-8f9e-4619-9856-16691db66767","roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/a290e904-7015-4bba-90c8-60543313cdb4","scope":"/"},"type":"Microsoft.Authorization/roleAssignments"},{"id":"/providers/Microsoft.Authorization/roleAssignments/967a0ebd-73a1-0145-85fc-3b6514ac2581","name":"967a0ebd-73a1-0145-85fc-3b6514ac2581","properties":{"principalId":"e7941875-b7e4-4ba2-9527-d3ef2a9b58fa","roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/a290e904-7015-4bba-90c8-60543313cdb4","scope":"/"},"type":"Microsoft.Authorization/roleAssignments"},{"id":"/providers/Microsoft.Authorization/roleAssignments/1d8e08be-5415-4c5f-94f2-22ba4f889ef7","name":"1d8e08be-5415-4c5f-94f2-22ba4f889ef7","properties":{"principalId":"c2101ce9-648a-4bbe-8f0e-3e891ff1658d","roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/a290e904-7015-4bba-90c8-60543313cdb4","scope":"/"},"type":"Microsoft.Authorization/roleAssignments"},{"id":"/providers/Microsoft.Authorization/roleAssignments/1587adcd-1227-4799-03dc-a4194c659c07","name":"1587adcd-1227-4799-03dc-a4194c659c07","properties":{"principalId":"2bca474d-4fac-495d-919a-30376e0fe515","roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/a290e904-7015-4bba-90c8-60543313cdb4","scope":"/"},"type":"Microsoft.Authorization/roleAssignments"},{"id":"/providers/Microsoft.Authorization/roleAssignments/129c2001-45e7-0814-13d0-9d933e794b37","name":"129c2001-45e7-0814-13d0-9d933e794b37","properties":{"principalId":"d0596a07-8d8d-433f-a25e-5c6f46787784","roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/a290e904-7015-4bba-90c8-60543313cdb4","scope":"/"},"type":"Microsoft.Authorization/roleAssignments"}]}, [ 'x-frame-options',
  'SAMEORIGIN',
  'x-ms-request-id',
  'e6aeb748-f2ae-11ea-857a-0242ac120004',
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-keyvault-region',
  'EASTUS',
  'content-length',
  '2405',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  'default-src \'self\'',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-build-version',
  '1.0.20200909-2-c73be597-develop',
  'x-ms-keyvault-network-info',
  'addr=108.226.109.105',
  'x-ms-server-latency',
  '1' ]);

nock('https://eastus2.keyvault_name.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('///providers/Microsoft.Authorization/roleDefinitions')
  .query(true)
  .reply(200, {"value":[{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/a290e904-7015-4bba-90c8-60543313cdb4","name":"a290e904-7015-4bba-90c8-60543313cdb4","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/keys/read/action","Microsoft.KeyVault/managedHsm/keys/write/action","Microsoft.KeyVault/managedHsm/keys/deletedKeys/read/action","Microsoft.KeyVault/managedHsm/keys/deletedKeys/recover/action","Microsoft.KeyVault/managedHsm/keys/backup/action","Microsoft.KeyVault/managedHsm/keys/restore/action","Microsoft.KeyVault/managedHsm/roleAssignments/delete/action","Microsoft.KeyVault/managedHsm/roleAssignments/read/action","Microsoft.KeyVault/managedHsm/roleAssignments/write/action","Microsoft.KeyVault/managedHsm/roleDefinitions/read/action","Microsoft.KeyVault/managedHsm/keys/encrypt/action","Microsoft.KeyVault/managedHsm/keys/decrypt/action","Microsoft.KeyVault/managedHsm/keys/wrap/action","Microsoft.KeyVault/managedHsm/keys/unwrap/action","Microsoft.KeyVault/managedHsm/keys/sign/action","Microsoft.KeyVault/managedHsm/keys/verify/action","Microsoft.KeyVault/managedHsm/keys/create","Microsoft.KeyVault/managedHsm/keys/delete","Microsoft.KeyVault/managedHsm/keys/export/action","Microsoft.KeyVault/managedHsm/keys/import/action","Microsoft.KeyVault/managedHsm/keys/deletedKeys/delete","Microsoft.KeyVault/managedHsm/securitydomain/download/action","Microsoft.KeyVault/managedHsm/securitydomain/upload/action","Microsoft.KeyVault/managedHsm/securitydomain/upload/read","Microsoft.KeyVault/managedHsm/securitydomain/transferkey/read","Microsoft.KeyVault/managedHsm/backup/start/action","Microsoft.KeyVault/managedHsm/restore/start/action","Microsoft.KeyVault/managedHsm/backup/status/action","Microsoft.KeyVault/managedHsm/restore/status/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Administrator","type":""},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/515eb02d-2335-4d2d-92f2-b1cbdf9c3778","name":"515eb02d-2335-4d2d-92f2-b1cbdf9c3778","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/keys/read/action","Microsoft.KeyVault/managedHsm/keys/write/action","Microsoft.KeyVault/managedHsm/keys/deletedKeys/read/action","Microsoft.KeyVault/managedHsm/keys/deletedKeys/recover/action","Microsoft.KeyVault/managedHsm/keys/backup/action","Microsoft.KeyVault/managedHsm/keys/restore/action","Microsoft.KeyVault/managedHsm/keys/encrypt/action","Microsoft.KeyVault/managedHsm/keys/decrypt/action","Microsoft.KeyVault/managedHsm/keys/sign/action","Microsoft.KeyVault/managedHsm/keys/verify/action","Microsoft.KeyVault/managedHsm/keys/wrap/action","Microsoft.KeyVault/managedHsm/keys/unwrap/action","Microsoft.KeyVault/managedHsm/keys/create","Microsoft.KeyVault/managedHsm/keys/delete","Microsoft.KeyVault/managedHsm/keys/export/action","Microsoft.KeyVault/managedHsm/keys/import/action","Microsoft.KeyVault/managedHsm/keys/deletedKeys/delete"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Crypto Officer","type":""},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/21dbd100-6940-42c2-9190-5d6cb909625b","name":"21dbd100-6940-42c2-9190-5d6cb909625b","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/keys/read/action","Microsoft.KeyVault/managedHsm/keys/write/action","Microsoft.KeyVault/managedHsm/keys/backup/action","Microsoft.KeyVault/managedHsm/keys/create","Microsoft.KeyVault/managedHsm/keys/encrypt/action","Microsoft.KeyVault/managedHsm/keys/decrypt/action","Microsoft.KeyVault/managedHsm/keys/wrap/action","Microsoft.KeyVault/managedHsm/keys/unwrap/action","Microsoft.KeyVault/managedHsm/keys/sign/action","Microsoft.KeyVault/managedHsm/keys/verify/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Crypto User","type":""},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/4bd23610-cdcf-4971-bdee-bdc562cc28e4","name":"4bd23610-cdcf-4971-bdee-bdc562cc28e4","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/roleDefinitions/read/action","Microsoft.KeyVault/managedHsm/roleAssignments/read/action","Microsoft.KeyVault/managedHsm/roleAssignments/write/action","Microsoft.KeyVault/managedHsm/roleAssignments/delete/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Policy Administrator","type":""},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/2c18b078-7c48-4d3a-af88-5a3a1b3f82b3","name":"2c18b078-7c48-4d3a-af88-5a3a1b3f82b3","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/keys/read/action","Microsoft.KeyVault/managedHsm/keys/deletedKeys/read/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Crypto Auditor","type":""},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/33413926-3206-4cdd-b39a-83574fe37a17","name":"33413926-3206-4cdd-b39a-83574fe37a17","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/keys/read/action","Microsoft.KeyVault/managedHsm/keys/wrap/action","Microsoft.KeyVault/managedHsm/keys/unwrap/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Crypto Service Encryption","type":""},"type":"Microsoft.Authorization/roleDefinitions"},{"id":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/7b127d3c-77bd-4e3e-bbe0-dbb8971fa7f8","name":"7b127d3c-77bd-4e3e-bbe0-dbb8971fa7f8","properties":{"assignableScopes":["/"],"description":"","permissions":[{"actions":[],"dataActions":["Microsoft.KeyVault/managedHsm/backup/start/action","Microsoft.KeyVault/managedHsm/backup/status/action","Microsoft.KeyVault/managedHsm/keys/backup/action"],"notActions":[],"notDataActions":[]}],"roleName":"Managed HSM Backup","type":""},"type":"Microsoft.Authorization/roleDefinitions"}]}, [ 'x-frame-options',
  'SAMEORIGIN',
  'x-ms-request-id',
  'e6aeb748-f2ae-11ea-857a-0242ac120004',
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
  '1.0.20200909-2-c73be597-develop',
  'x-ms-keyvault-network-info',
  'addr=108.226.109.105',
  'x-ms-server-latency',
  '1' ]);

nock('https://eastus2.keyvault_name.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .put('///providers/Microsoft.Authorization/roleAssignments/b36b00af-89c6-435f-a43d-9a3087015c27', {"properties":{"roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/a290e904-7015-4bba-90c8-60543313cdb4","principalId":"01ea9a65-813e-4238-8204-bf7328d63fc6"}})
  .query(true)
  .reply(201, {"id":"/providers/Microsoft.Authorization/roleAssignments/b36b00af-89c6-435f-a43d-9a3087015c27","name":"b36b00af-89c6-435f-a43d-9a3087015c27","properties":{"principalId":"01ea9a65-813e-4238-8204-bf7328d63fc6","roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/a290e904-7015-4bba-90c8-60543313cdb4","scope":"/"},"type":"Microsoft.Authorization/roleAssignments"}, [ 'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '398',
  'x-ms-request-id',
  'e6aeb748-f2ae-11ea-857a-0242ac120004',
  'x-ms-keyvault-region',
  'EASTUS',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  'default-src \'self\'',
  'x-ms-keyvault-network-info',
  'addr=108.226.109.105',
  'x-ms-server-latency',
  '282',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN' ]);

nock('https://eastus2.keyvault_name.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('///providers/Microsoft.Authorization/roleAssignments/b36b00af-89c6-435f-a43d-9a3087015c27')
  .query(true)
  .reply(200, {"id":"/providers/Microsoft.Authorization/roleAssignments/b36b00af-89c6-435f-a43d-9a3087015c27","name":"b36b00af-89c6-435f-a43d-9a3087015c27","properties":{"principalId":"01ea9a65-813e-4238-8204-bf7328d63fc6","roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/a290e904-7015-4bba-90c8-60543313cdb4","scope":"/"},"type":"Microsoft.Authorization/roleAssignments"}, [ 'x-frame-options',
  'SAMEORIGIN',
  'x-ms-request-id',
  'e6aeb748-f2ae-11ea-857a-0242ac120004',
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
  '1.0.20200909-2-c73be597-develop',
  'x-ms-keyvault-network-info',
  'addr=108.226.109.105',
  'x-ms-server-latency',
  '0' ]);

nock('https://eastus2.keyvault_name.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .delete('///providers/Microsoft.Authorization/roleAssignments/b36b00af-89c6-435f-a43d-9a3087015c27')
  .query(true)
  .reply(200, {"id":"/providers/Microsoft.Authorization/roleAssignments/b36b00af-89c6-435f-a43d-9a3087015c27","name":"b36b00af-89c6-435f-a43d-9a3087015c27","properties":{"principalId":"01ea9a65-813e-4238-8204-bf7328d63fc6","roleDefinitionId":"Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/a290e904-7015-4bba-90c8-60543313cdb4","scope":"/"},"type":"Microsoft.Authorization/roleAssignments"}, [ 'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '398',
  'x-ms-request-id',
  'e6aeb748-f2ae-11ea-857a-0242ac120004',
  'x-ms-keyvault-region',
  'EASTUS',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  'default-src \'self\'',
  'x-ms-keyvault-network-info',
  'addr=108.226.109.105',
  'x-ms-server-latency',
  '286',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN' ]);

nock('https://eastus2.keyvault_name.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('///providers/Microsoft.Authorization/roleAssignments/b36b00af-89c6-435f-a43d-9a3087015c27')
  .query(true)
  .reply(404, {"error":{"code":"RoleAssignmentNotFound","message":"Requested role assignment not found (Activity ID: e6aeb748-f2ae-11ea-857a-0242ac120004)"}}, [ 'content-type',
  'application/json; charset=utf-8',
  'x-ms-server-latency',
  '0',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '143',
  'x-ms-request-id',
  'e6aeb748-f2ae-11ea-857a-0242ac120004',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  'default-src \'self\'',
  'x-ms-build-version',
  '1.0.20200909-2-c73be597-develop',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN' ]);
