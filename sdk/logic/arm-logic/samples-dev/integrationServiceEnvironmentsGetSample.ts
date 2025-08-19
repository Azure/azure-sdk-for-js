// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets an integration service environment.
 *
 * @summary Gets an integration service environment.
 * x-ms-original-file: specification/logic/resource-manager/Microsoft.Logic/stable/2019-05-01/examples/IntegrationServiceEnvironments_Get.json
 */

import { LogicManagementClient } from "@azure/arm-logic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getIntegrationServiceEnvironmentByName(): Promise<void> {
  const subscriptionId =
    process.env["LOGIC_SUBSCRIPTION_ID"] || "f34b22a3-2202-4fb1-b040-1332bd928c84";
  const resourceGroup = "testResourceGroup";
  const integrationServiceEnvironmentName = "testIntegrationServiceEnvironment";
  const credential = new DefaultAzureCredential();
  const client = new LogicManagementClient(credential, subscriptionId);
  const result = await client.integrationServiceEnvironments.get(
    resourceGroup,
    integrationServiceEnvironmentName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getIntegrationServiceEnvironmentByName();
}

main().catch(console.error);
