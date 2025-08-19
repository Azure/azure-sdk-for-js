// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates mobile network tags and managed identity.
 *
 * @summary Updates mobile network tags and managed identity.
 * x-ms-original-file: specification/mobilenetwork/resource-manager/Microsoft.MobileNetwork/stable/2024-04-01/examples/MobileNetworkUpdateTags.json
 */

import type { IdentityAndTagsObject } from "@azure/arm-mobilenetwork";
import { MobileNetworkManagementClient } from "@azure/arm-mobilenetwork";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateMobileNetworkTags(): Promise<void> {
  const subscriptionId =
    process.env["MOBILENETWORK_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["MOBILENETWORK_RESOURCE_GROUP"] || "rg1";
  const mobileNetworkName = "testMobileNetwork";
  const parameters: IdentityAndTagsObject = {
    tags: { tag1: "value1", tag2: "value2" },
  };
  const credential = new DefaultAzureCredential();
  const client = new MobileNetworkManagementClient(credential, subscriptionId);
  const result = await client.mobileNetworks.updateTags(
    resourceGroupName,
    mobileNetworkName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateMobileNetworkTags();
}

main().catch(console.error);
