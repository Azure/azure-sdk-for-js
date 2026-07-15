// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to remove Database principals permissions.
 *
 * @summary remove Database principals permissions.
 * x-ms-original-file: 2025-02-14/KustoDatabaseRemovePrincipals.json
 */
async function kustoDatabaseRemovePrincipals(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.databases.removePrincipals(
    "kustorptest",
    "kustoCluster",
    "KustoDatabase8",
    {
      value: [
        {
          name: "Some User",
          type: "User",
          appId: "",
          email: "user@microsoft.com",
          fqn: "aaduser=some_guid",
          role: "Admin",
        },
        {
          name: "Kusto",
          type: "Group",
          appId: "",
          email: "kusto@microsoft.com",
          fqn: "aadgroup=some_guid",
          role: "Viewer",
        },
        {
          name: "SomeApp",
          type: "App",
          appId: "some_guid_app_id",
          email: "",
          fqn: "aadapp=some_guid_app_id",
          role: "Admin",
        },
      ],
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await kustoDatabaseRemovePrincipals();
}

main().catch(console.error);
