// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the source control.
 *
 * @summary delete the source control.
 * x-ms-original-file: 2024-10-23/sourceControl/deleteSourceControl.json
 */
async function deleteASourceControl() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  await client.sourceControl.delete("rg", "sampleAccount9", "sampleSourceControl");
}

async function main() {
  await deleteASourceControl();
}

main().catch(console.error);
