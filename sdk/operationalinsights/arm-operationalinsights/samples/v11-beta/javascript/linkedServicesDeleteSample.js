// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a linked service instance.
 *
 * @summary deletes a linked service instance.
 * x-ms-original-file: 2025-07-01/LinkedServicesDelete.json
 */
async function linkedServicesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.linkedServices.delete("rg1", "TestLinkWS", "Cluster");
  console.log(result);
}

async function main() {
  await linkedServicesDelete();
}

main().catch(console.error);
