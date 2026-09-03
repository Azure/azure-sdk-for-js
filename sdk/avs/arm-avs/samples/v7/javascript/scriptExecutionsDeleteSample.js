// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a ScriptExecution
 *
 * @summary delete a ScriptExecution
 * x-ms-original-file: 2025-09-01/ScriptExecutions_Delete.json
 */
async function scriptExecutionsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.scriptExecutions.delete("group1", "cloud1", "addSsoServer");
}

async function main() {
  await scriptExecutionsDelete();
}

main().catch(console.error);
