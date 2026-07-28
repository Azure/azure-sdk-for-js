// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an alert configuration in the specified managed cluster.
 *
 * @summary creates or updates an alert configuration in the specified managed cluster.
 * x-ms-original-file: 2026-05-02-preview/AlertConfigurations_CreateOrUpdate.json
 */
async function createOrUpdateAlertConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.alertConfigurations.createOrUpdate(
    "rg1",
    "clustername1",
    "alertconfig1",
    {
      properties: {
        mode: "Managed",
        notification: {
          actionGroupId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Insights/actionGroups/actiongroup1",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAlertConfiguration();
}

main().catch(console.error);
