// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves information about a dedicated host.
 *
 * @summary retrieves information about a dedicated host.
 * x-ms-original-file: 2025-04-01/dedicatedHostExamples/DedicatedHost_Get.json
 */
async function getADedicatedHost(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.dedicatedHosts.get(
    "myResourceGroup",
    "myDedicatedHostGroup",
    "myHost",
    { expand: "instanceView" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getADedicatedHost();
}

main().catch(console.error);
