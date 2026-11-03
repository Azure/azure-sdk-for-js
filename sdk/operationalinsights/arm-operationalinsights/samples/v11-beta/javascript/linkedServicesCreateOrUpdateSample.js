// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a linked service.
 *
 * @summary create or update a linked service.
 * x-ms-original-file: 2025-07-01/LinkedServicesCreate.json
 */
async function linkedServicesCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.linkedServices.createOrUpdate("mms-eus", "TestLinkWS", "Cluster", {
    writeAccessResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/mms-eus/providers/Microsoft.OperationalInsights/clusters/testcluster",
  });
  console.log(result);
}

async function main() {
  await linkedServicesCreate();
}

main().catch(console.error);
