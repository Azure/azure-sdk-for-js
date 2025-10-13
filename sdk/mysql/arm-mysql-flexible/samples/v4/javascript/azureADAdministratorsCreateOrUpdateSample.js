// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an existing Azure Active Directory administrator.
 *
 * @summary creates or updates an existing Azure Active Directory administrator.
 * x-ms-original-file: 2024-12-30/AzureADAdministratorCreate.json
 */
async function createAnAzureAdAdministrator() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.azureADAdministrators.createOrUpdate(
    "testrg",
    "mysqltestsvc4",
    "ActiveDirectory",
    {
      properties: {
        administratorType: "ActiveDirectory",
        identityResourceId:
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/test-group/providers/Microsoft.ManagedIdentity/userAssignedIdentities/test-umi",
        login: "bob@contoso.com",
        sid: "c6b82b90-a647-49cb-8a62-0d2d3cb7ac7c",
        tenantId: "c12b7025-bfe2-46c1-b463-993b5e4cd467",
      },
    },
  );
  console.log(result);
}

async function main() {
  await createAnAzureAdAdministrator();
}

main().catch(console.error);
