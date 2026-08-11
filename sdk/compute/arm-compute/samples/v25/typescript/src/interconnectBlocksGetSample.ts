// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves information about an Interconnect Block.
 *
 * @summary retrieves information about an Interconnect Block.
 * x-ms-original-file: 2026-03-01/interconnectBlockExamples/InterconnectBlocks_Get.json
 */
async function getAnInterconnectBlock(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.interconnectBlocks.get("myResourceGroup", "myInterconnectBlock");
  console.log(result);
}

/**
 * This sample demonstrates how to retrieves information about an Interconnect Block.
 *
 * @summary retrieves information about an Interconnect Block.
 * x-ms-original-file: 2026-03-01/interconnectBlockExamples/InterconnectBlocks_Get_InstanceView.json
 */
async function getAnInterconnectBlockWithInstanceView(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.interconnectBlocks.get("myResourceGroup", "myInterconnectBlock", {
    expand: "instanceView",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await getAnInterconnectBlock();
  await getAnInterconnectBlockWithInstanceView();
}

main().catch(console.error);
