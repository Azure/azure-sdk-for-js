// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve a test job stream of the test job identified by runbook name and stream id.
 *
 * @summary retrieve a test job stream of the test job identified by runbook name and stream id.
 * x-ms-original-file: 2024-10-23/runbook/getTestJobStream.json
 */
async function getTestJobStream() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "51766542-3ed7-4a72-a187-0c8ab644ddab";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.testJobStreams.get(
    "mygroup",
    "ContoseAutomationAccount",
    "Get-AzureVMTutorial",
    "851b2101-686f-40e2-8a4b-5b8df08afbd1_00636535684910693884_00000000000000000001",
  );
  console.log(result);
}

async function main() {
  await getTestJobStream();
}

main().catch(console.error);
