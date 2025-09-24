// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a ScriptCmdlet
 *
 * @summary get a ScriptCmdlet
 * x-ms-original-file: 2024-09-01/ScriptCmdlets_Get.json
 */
async function scriptCmdletsGet() {
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

async function main() {
  await scriptCmdletsGet();
}

main().catch(console.error);
