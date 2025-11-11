// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceLinkerManagementClient } = require("@azure/arm-servicelinker");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to operation to update an existing Linker.
 *
 * @summary operation to update an existing Linker.
 * x-ms-original-file: 2024-07-01-preview/PatchLinker.json
 */
async function patchLinker() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new ServiceLinkerManagementClient(credential, subscriptionId);
  const result = await client.linker.update(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.Web/sites/test-app",
    "linkName",
    {
      properties: {
        authInfo: {
          authType: "servicePrincipalSecret",
          clientId: "name",
          principalId: "id",
          secret: "secret",
        },
        targetService: {
          type: "AzureResource",
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.DocumentDb/databaseAccounts/test-acc/mongodbDatabases/test-db",
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await patchLinker();
}

main().catch(console.error);
