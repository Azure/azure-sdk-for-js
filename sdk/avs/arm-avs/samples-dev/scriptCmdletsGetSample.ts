// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a ScriptCmdlet
 *
 * @summary get a ScriptCmdlet
 * x-ms-original-file: 2024-09-01/ScriptCmdlets_Get.json
 */
async function scriptCmdletsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.scriptCmdlets.get(
    "group1",
    "cloud1",
    "package@1.0.2",
    "New-ExternalSsoDomain",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await scriptCmdletsGet();
}

main().catch(console.error);
