// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a IscsiPath
 *
 * @summary create a IscsiPath
 * x-ms-original-file: 2024-09-01/IscsiPaths_CreateOrUpdate.json
 */
async function iscsiPathsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.iscsiPaths.createOrUpdate("group1", "cloud1", {
    properties: { networkBlock: "192.168.0.0/24" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await iscsiPathsCreateOrUpdate();
}

main().catch(console.error);
