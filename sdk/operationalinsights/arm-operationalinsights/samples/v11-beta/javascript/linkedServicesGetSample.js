// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a linked service instance.
 *
 * @summary gets a linked service instance.
 * x-ms-original-file: 2025-07-01/LinkedServicesGet.json
 */
async function linkedServicesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.linkedServices.get("mms-eus", "TestLinkWS", "Cluster");
  console.log(result);
}

async function main() {
  await linkedServicesGet();
}

main().catch(console.error);
