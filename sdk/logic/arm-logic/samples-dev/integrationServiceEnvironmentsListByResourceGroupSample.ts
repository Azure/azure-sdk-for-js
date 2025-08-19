// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { LogicManagementClient } from "@azure/arm-logic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets a list of integration service environments by resource group.
 *
 * @summary Gets a list of integration service environments by resource group.
 * x-ms-original-file: specification/logic/resource-manager/Microsoft.Logic/stable/2019-05-01/examples/IntegrationServiceEnvironments_ListByResourceGroup.json
 */
async function listIntegrationServiceEnvironmentsByResourceGroupName(): Promise<void> {
  const subscriptionId =
    process.env["LOGIC_SUBSCRIPTION_ID"] || "f34b22a3-2202-4fb1-b040-1332bd928c84";
  const resourceGroup = "testResourceGroup";
  const credential = new DefaultAzureCredential();
  const client = new LogicManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.integrationServiceEnvironments.listByResourceGroup(
    resourceGroup,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listIntegrationServiceEnvironmentsByResourceGroupName();
}

main().catch(console.error);
