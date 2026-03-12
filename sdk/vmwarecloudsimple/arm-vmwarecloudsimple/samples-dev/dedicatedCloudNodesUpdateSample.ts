// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Patches dedicated node properties
 *
 * @summary Patches dedicated node properties
 * x-ms-original-file: specification/vmwarecloudsimple/resource-manager/Microsoft.VMwareCloudSimple/stable/2019-04-01/examples/PatchDedicatedCloudNode.json
 */

import type { PatchPayload } from "@azure/arm-vmwarecloudsimple";
import { VMwareCloudSimple } from "@azure/arm-vmwarecloudsimple";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function patchDedicatedCloudNode(): Promise<void> {
  const subscriptionId = process.env["VMWARECLOUDSIMPLE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["VMWARECLOUDSIMPLE_RESOURCE_GROUP"] || "myResourceGroup";
  const dedicatedCloudNodeName = "myNode";
  const dedicatedCloudNodeRequest: PatchPayload = {
    tags: { myTag: "tagValue" },
  };
  const credential = new DefaultAzureCredential();
  const client = new VMwareCloudSimple(credential, subscriptionId);
  const result = await client.dedicatedCloudNodes.update(
    resourceGroupName,
    dedicatedCloudNodeName,
    dedicatedCloudNodeRequest,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await patchDedicatedCloudNode();
}

main().catch(console.error);
