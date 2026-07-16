// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve the Dsc node report data by node id and report id.
 *
 * @summary retrieve the Dsc node report data by node id and report id.
 * x-ms-original-file: 2024-10-23/getDscNodeReport.json
 */
async function getDscNodeReportDataByNodeIdAndReportId() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.nodeReports.get(
    "rg",
    "myAutomationAccount33",
    "nodeId",
    "903a5ead-140c-11e7-a943-000d3a6140c9",
  );
  console.log(result);
}

async function main() {
  await getDscNodeReportDataByNodeIdAndReportId();
}

main().catch(console.error);
