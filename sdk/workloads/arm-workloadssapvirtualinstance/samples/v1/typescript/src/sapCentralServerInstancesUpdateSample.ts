// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadsClient } from "@azure/arm-workloadssapvirtualinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the SAP Central Services Instance resource. &lt;br&gt;&lt;br&gt;This can be used to update tags on the resource.
 *
 * @summary updates the SAP Central Services Instance resource. &lt;br&gt;&lt;br&gt;This can be used to update tags on the resource.
 * x-ms-original-file: 2024-09-01/SapCentralInstances_Update.json
 */
async function sapCentralServerInstancesUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6d875e77-e412-4d7d-9af4-8895278b4443";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapCentralServerInstances.update("test-rg", "X00", "centralServer", {
    tags: { tag1: "value1" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await sapCentralServerInstancesUpdate();
}

main().catch(console.error);
