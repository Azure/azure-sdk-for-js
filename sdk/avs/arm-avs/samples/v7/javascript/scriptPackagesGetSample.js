// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a ScriptPackage
 *
 * @summary get a ScriptPackage
 * x-ms-original-file: 2024-09-01/ScriptPackages_Get.json
 */
async function scriptPackagesGet() {
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

async function main() {
  await scriptPackagesGet();
}

main().catch(console.error);
