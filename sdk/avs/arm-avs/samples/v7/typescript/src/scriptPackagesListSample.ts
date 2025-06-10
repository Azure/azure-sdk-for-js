// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list ScriptPackage resources by PrivateCloud
 *
 * @summary list ScriptPackage resources by PrivateCloud
 * x-ms-original-file: 2024-09-01/ScriptPackages_List.json
 */
async function scriptPackagesList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.scriptPackages.list("group1", "cloud1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await scriptPackagesList();
}

main().catch(console.error);
