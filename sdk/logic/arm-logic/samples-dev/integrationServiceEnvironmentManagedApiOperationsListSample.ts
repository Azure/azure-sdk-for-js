// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { LogicManagementClient } from "@azure/arm-logic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the managed Api operations.
 *
 * @summary Gets the managed Api operations.
 * x-ms-original-file: specification/logic/resource-manager/Microsoft.Logic/stable/2019-05-01/examples/IntegrationServiceEnvironments_ManagedApis_ListApiOperations.json
 */
async function getsTheIntegrationServiceEnvironmentManagedApis(): Promise<void> {
  const subscriptionId =
    process.env["LOGIC_SUBSCRIPTION_ID"] || "80d4fe69-c95b-4dd2-a938-9250f1c8ab03";
  const resourceGroup = "testResourceGroup";
  const integrationServiceEnvironmentName = "testIntegrationServiceEnvironment";
  const apiName = "servicebus";
  const credential = new DefaultAzureCredential();
  const client = new LogicManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.integrationServiceEnvironmentManagedApiOperations.list(
    resourceGroup,
    integrationServiceEnvironmentName,
    apiName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getsTheIntegrationServiceEnvironmentManagedApis();
}

main().catch(console.error);
