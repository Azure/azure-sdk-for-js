// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve the Dsc node report list by node id.
 *
 * @summary retrieve the Dsc node report list by node id.
 * x-ms-original-file: 2024-10-23/listDscNodeReportsByNode.json
 */
async function listDSCReportsByNodeId(): Promise<void> {
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
async function listPagedDSCReportsByNodeId(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.nodeReports.listByNode("rg", "myAutomationAccount33", "nodeId")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listDSCReportsByNodeId();
  await listPagedDSCReportsByNodeId();
}

main().catch(console.error);
