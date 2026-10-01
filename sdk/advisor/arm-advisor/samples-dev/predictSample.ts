// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AdvisorManagementClient } from "@azure/arm-advisor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to predicts a recommendation.
 *
 * @summary predicts a recommendation.
 * x-ms-original-file: 2026-02-01-preview/Predict.json
 */
async function predict(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new AdvisorManagementClient(credential, subscriptionId);
  const result = await client.predict({
    predictionType: "PredictiveRightsizing",
    extendedProperties: {
      region: "CentralUS",
      deploymentType: "Linux_IaaS_Software_Store",
      sku: "Standard_Dv4",
      type: "iaas",
      numberOfInstances: 10,
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await predict();
}

main().catch(console.error);
