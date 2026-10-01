// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve the Dsc node reports by node id and report id.
 *
 * @summary retrieve the Dsc node reports by node id and report id.
 * x-ms-original-file: 2024-10-23/getDscNodeReportContent.json
 */
async function getContentOfNode() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.nodeReports.getContent(
    "rg",
    "myAutomationAccount33",
    "nodeId",
    "reportId",
  );
  console.log(result);
}

async function main() {
  await getContentOfNode();
}

main().catch(console.error);
