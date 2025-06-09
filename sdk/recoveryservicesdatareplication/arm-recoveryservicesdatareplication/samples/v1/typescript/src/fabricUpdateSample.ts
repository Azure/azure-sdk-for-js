// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPI } from "@azure/arm-recoveryservicesdatareplication";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to performs update on the fabric.
 *
 * @summary performs update on the fabric.
 * x-ms-original-file: 2024-09-01/Fabric_Update.json
 */
async function updatesTheFabric(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  const result = await client.fabric.update("rgswagger_2024-09-01", "wPR", {
    properties: {
      customProperties: {
        instanceType: "FabricModelCustomProperties",
      },
    },
    tags: {},
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updatesTheFabric();
}

main().catch(console.error);
