// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list CloudExadataInfrastructure resources by resource group
 *
 * @summary list CloudExadataInfrastructure resources by resource group
 * x-ms-original-file: 2025-09-01/CloudExadataInfrastructures_ListByResourceGroup_MaximumSet_Gen.json
 */
async function listExadataInfrastructureByResourceGroupGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cloudExadataInfrastructures.listByResourceGroup("rgopenapi")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list CloudExadataInfrastructure resources by resource group
 *
 * @summary list CloudExadataInfrastructure resources by resource group
 * x-ms-original-file: 2025-09-01/CloudExadataInfrastructures_ListByResourceGroup_MinimumSet_Gen.json
 */
async function listExadataInfrastructureByResourceGroupGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cloudExadataInfrastructures.listByResourceGroup("rgopenapi")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list CloudExadataInfrastructure resources by resource group
 *
 * @summary list CloudExadataInfrastructure resources by resource group
 * x-ms-original-file: 2025-09-01/exaInfra_listByResourceGroup.json
 */
async function cloudExadataInfrastructuresListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cloudExadataInfrastructures.listByResourceGroup("rg000")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listExadataInfrastructureByResourceGroupGeneratedByMaximumSetRule();
  await listExadataInfrastructureByResourceGroupGeneratedByMinimumSetRule();
  await cloudExadataInfrastructuresListByResourceGroup();
}

main().catch(console.error);
