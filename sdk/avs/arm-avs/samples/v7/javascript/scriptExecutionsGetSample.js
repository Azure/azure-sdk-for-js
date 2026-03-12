// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a ScriptExecution
 *
 * @summary get a ScriptExecution
 * x-ms-original-file: 2025-09-01/ScriptExecutions_Get.json
 */
async function scriptExecutionsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.scriptExecutions.get("group1", "cloud1", "addSsoServer");
  console.log(result);
}

async function main() {
  await scriptExecutionsGet();
}

main().catch(console.error);
