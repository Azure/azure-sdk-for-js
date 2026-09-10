// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the specified Arc deployment associated with the Cognitive Services account.
 *
 * @summary updates the specified Arc deployment associated with the Cognitive Services account.
 * x-ms-original-file: 2026-07-15-preview/UpdateArcDeployment.json
 */
async function updateArcDeployment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.arcDeployments.update(
    "resourceGroupName",
    "accountName",
    "phi-3-arc",
    {
      properties: {
        replicas: 3,
        resources: {
          requests: { cpu: "500m", memory: "2Gi" },
          limits: { cpu: "4", memory: "16Gi" },
        },
        nodeSelector: { agentpool: "cpu" },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateArcDeployment();
}

main().catch(console.error);
