// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve the Dsc node report list by node id.
 *
 * @summary retrieve the Dsc node report list by node id.
 * x-ms-original-file: 2024-10-23/listDscNodeReportsByNode.json
 */
async function listDSCReportsByNodeId() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.nodeReports.listByNode("rg", "myAutomationAccount33", "nodeId")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to retrieve the Dsc node report list by node id.
 *
 * @summary retrieve the Dsc node report list by node id.
 * x-ms-original-file: 2024-10-23/listPagedDscNodeReportsByNode.json
 */
async function listPagedDSCReportsByNodeId() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.nodeReports.listByNode("rg", "myAutomationAccount33", "nodeId")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listDSCReportsByNodeId();
  await listPagedDSCReportsByNodeId();
}

main().catch(console.error);
