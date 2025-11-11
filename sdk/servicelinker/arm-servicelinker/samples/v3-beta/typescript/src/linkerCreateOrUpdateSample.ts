// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceLinkerManagementClient } from "@azure/arm-servicelinker";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update Linker resource.
 *
 * @summary create or update Linker resource.
 * x-ms-original-file: 2024-07-01-preview/PutLinker.json
 */
async function putLinker(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new ServiceLinkerManagementClient(credential, subscriptionId);
  const result = await client.linker.createOrUpdate(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.Web/sites/test-app",
    "linkName",
    {
      properties: {
        authInfo: {
          name: "name",
          authType: "secret",
          secretInfo: { secretType: "rawValue", value: "secret" },
        },
        targetService: {
          type: "AzureResource",
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.DBforPostgreSQL/servers/test-pg/databases/test-db",
        },
        vNetSolution: { type: "serviceEndpoint" },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await putLinker();
}

main().catch(console.error);
