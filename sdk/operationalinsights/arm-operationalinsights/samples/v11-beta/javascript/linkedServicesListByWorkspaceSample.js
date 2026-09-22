// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the linked services instances in a workspace.
 *
 * @summary gets the linked services instances in a workspace.
 * x-ms-original-file: 2025-07-01/LinkedServicesListByWorkspace.json
 */
async function linkedServicesListByWorkspace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.linkedServices.listByWorkspace("mms-eus", "TestLinkWS")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await linkedServicesListByWorkspace();
}

main().catch(console.error);
