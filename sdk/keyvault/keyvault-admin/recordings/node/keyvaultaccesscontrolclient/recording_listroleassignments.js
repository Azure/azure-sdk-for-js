let nock = require('nock');

module.exports.hash = "40a7c9b72f55641675802c7541f1b95b";

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
