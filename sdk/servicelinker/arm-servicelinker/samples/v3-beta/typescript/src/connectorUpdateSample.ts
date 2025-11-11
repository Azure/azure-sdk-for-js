// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceLinkerManagementClient } from "@azure/arm-servicelinker";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to operation to update an existing Connector.
 *
 * @summary operation to update an existing Connector.
 * x-ms-original-file: 2024-07-01-preview/PatchConnector.json
 */
async function patchConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceLinkerManagementClient(credential, subscriptionId);
  const result = await client.connector.update("test-rg", "westus", "connectorName", {
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
  });
  console.log(result);
}

async function main(): Promise<void> {
  await patchConnector();
}

main().catch(console.error);
