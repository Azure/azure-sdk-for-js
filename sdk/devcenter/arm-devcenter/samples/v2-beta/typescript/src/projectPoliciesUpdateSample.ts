// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to partially updates an project policy.
 *
 * @summary partially updates an project policy.
 * x-ms-original-file: 2026-01-01-preview/ProjectPolicies_Patch.json
 */
async function projectPoliciesUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58ffff1";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.projectPolicies.update("rg1", "Contoso", "DevOnlyResources", {
    resourcePolicies: [
      {
        resources:
          "/subscriptions/0ac520ee-14c0-480f-b6c9-0a90c58ffff1/resourceGroups/rg1/providers/Microsoft.DevCenter/devcenters/Contoso/attachednetworks/network-westus3",
      },
    ],
    configurationPolicies: {
      devBoxLimitsFeatureStatus: {
        statusModifiable: "Modifiable",
        valuesModifiable: "Modifiable",
        defaultStatus: "Enabled",
        defaultValues: [{ name: "maxDevBoxesPerUser", value: "10" }],
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await projectPoliciesUpdate();
}

main().catch(console.error);
