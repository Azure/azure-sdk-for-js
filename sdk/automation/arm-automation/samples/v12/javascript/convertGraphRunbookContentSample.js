// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to post operation to serialize or deserialize GraphRunbookContent
 *
 * @summary post operation to serialize or deserialize GraphRunbookContent
 * x-ms-original-file: 2024-10-23/deserializeGraphRunbookContent.json
 */
async function getGraphicalRunbookContentFromRawContent() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.convertGraphRunbookContent("rg", "MyAutomationAccount", {
    rawContent: {
      runbookDefinition:
        "AAEAAADAQAAAAAAAAAMAgAAAGJPcmNoZXN0cmF0b3IuR3JhcGhSdW5ib29rLk1vZGVsLCBWZXJzaW9uPTcuMy4wLjAsIEN1bHR....",
      runbookType: "GraphPowerShell",
      schemaVersion: "1.10",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to post operation to serialize or deserialize GraphRunbookContent
 *
 * @summary post operation to serialize or deserialize GraphRunbookContent
 * x-ms-original-file: 2024-10-23/serializeGraphRunbookContent.json
 */
async function getGraphicalRawRunbookContentFromGraphicalRunbookJsonObject() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.convertGraphRunbookContent("rg", "MyAutomationAccount", {
    graphRunbookJson: "<GraphRunbookJSON>",
  });
  console.log(result);
}

async function main() {
  await getGraphicalRunbookContentFromRawContent();
  await getGraphicalRawRunbookContentFromGraphicalRunbookJsonObject();
}

main().catch(console.error);
