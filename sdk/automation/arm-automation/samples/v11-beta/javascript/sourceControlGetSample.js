// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve the source control identified by source control name.
 *
 * @summary retrieve the source control identified by source control name.
 * x-ms-original-file: 2024-10-23/sourceControl/getSourceControl.json
 */
async function getASourceControl() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.sourceControl.get("rg", "sampleAccount9", "sampleSourceControl");
  console.log(result);
}

async function main() {
  await getASourceControl();
}

main().catch(console.error);
