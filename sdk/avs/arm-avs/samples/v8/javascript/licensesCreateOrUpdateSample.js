// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a License
 *
 * @summary create a License
 * x-ms-original-file: 2025-09-01/Licenses_CreateOrUpdate.json
 */
async function licensesCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.licenses.createOrUpdate("group1", "cloud1", "VmwareFirewall", {});
  console.log(result);
}

async function main() {
  await licensesCreateOrUpdate();
}

main().catch(console.error);
