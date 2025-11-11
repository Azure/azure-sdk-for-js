// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceLinkerManagementClient } from "@azure/arm-servicelinker";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update Connector resource.
 *
 * @summary create or update Connector resource.
 * x-ms-original-file: 2024-07-01-preview/PutConnector.json
 */
async function putConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceLinkerManagementClient(credential, subscriptionId);
  const result = await client.connector.createOrUpdate("test-rg", "westus", "connectorName", {
    properties: {
      authInfo: { authType: "secret" },
      secretStore: {
        keyVaultId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.KeyVault/vaults/test-kv",
      },
      targetService: {
        type: "AzureResource",
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.DocumentDb/databaseAccounts/test-acc/mongodbDatabases/test-db",
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await putConnector();
}

main().catch(console.error);
