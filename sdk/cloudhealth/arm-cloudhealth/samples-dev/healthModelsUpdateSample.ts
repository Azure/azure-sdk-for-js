// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CloudHealthClient } from "@azure/arm-cloudhealth";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a HealthModel
 *
 * @summary update a HealthModel
 * x-ms-original-file: 2025-05-01-preview/HealthModels_Update.json
 */
async function healthModelsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4980D7D5-4E07-47AD-AD34-E76C6BC9F061";
  const client = new CloudHealthClient(credential, subscriptionId);
  const result = await client.healthModels.update("rgopenapi", "model1", {
    identity: {
      type: "SystemAssigned, UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/4980D7D5-4E07-47AD-AD34-E76C6BC9F061/resourceGroups/rgopenapi/providers/Microsoft.ManagedIdentity/userAssignedIdentities/ua1":
          {},
      },
    },
    tags: { key21: "menfkmseplchh" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await healthModelsUpdate();
}

main().catch(console.error);
