// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the monitors configured under a Confluent organization.
 *
 * @summary lists the monitors configured under a Confluent organization.
 * x-ms-original-file: 2026-10-21-preview/MonitorResources_ListByOrganization_MaximumSet_Gen.json
 */
async function monitorResourcesListByOrganizationMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitorResources.listByOrganization(
    "rgconfluent",
    "myOrganization",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await monitorResourcesListByOrganizationMaximumSet();
}

main().catch(console.error);
