// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list CloudExadataInfrastructure resources by subscription ID
 *
 * @summary list CloudExadataInfrastructure resources by subscription ID
 * x-ms-original-file: 2025-09-01/CloudExadataInfrastructures_ListBySubscription_MaximumSet_Gen.json
 */
async function listExadataInfrastructureBySubscriptionGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cloudExadataInfrastructures.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list CloudExadataInfrastructure resources by subscription ID
 *
 * @summary list CloudExadataInfrastructure resources by subscription ID
 * x-ms-original-file: 2025-09-01/CloudExadataInfrastructures_ListBySubscription_MinimumSet_Gen.json
 */
async function listExadataInfrastructureBySubscriptionGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cloudExadataInfrastructures.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list CloudExadataInfrastructure resources by subscription ID
 *
 * @summary list CloudExadataInfrastructure resources by subscription ID
 * x-ms-original-file: 2025-09-01/exaInfra_listBySubscription.json
 */
async function cloudExadataInfrastructuresListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cloudExadataInfrastructures.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listExadataInfrastructureBySubscriptionGeneratedByMaximumSetRule();
  await listExadataInfrastructureBySubscriptionGeneratedByMinimumSetRule();
  await cloudExadataInfrastructuresListBySubscription();
}

main().catch(console.error);
