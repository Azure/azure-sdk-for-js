// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a ScriptPackage
 *
 * @summary get a ScriptPackage
 * x-ms-original-file: 2024-09-01/ScriptPackages_Get.json
 */
async function scriptPackagesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.scriptPackages.get(
    "group1",
    "cloud1",
    "Microsoft.AVS.Management@3.0.48",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await scriptPackagesGet();
}

main().catch(console.error);
