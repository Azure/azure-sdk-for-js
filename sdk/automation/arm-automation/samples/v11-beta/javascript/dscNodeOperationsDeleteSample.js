// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the dsc node identified by node id.
 *
 * @summary delete the dsc node identified by node id.
 * x-ms-original-file: 2024-10-23/deleteDscNode.json
 */
async function deleteADSCNode() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  await client.dscNodeOperations.delete(
    "rg",
    "myAutomationAccount9",
    "e1243a76-a9bd-432f-bde3-ad8f317ee786",
  );
}

async function main() {
  await deleteADSCNode();
}

main().catch(console.error);
