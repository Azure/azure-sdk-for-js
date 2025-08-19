// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { LogicManagementClient } from "@azure/arm-logic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes the integration service environment managed Api.
 *
 * @summary Deletes the integration service environment managed Api.
 * x-ms-original-file: specification/logic/resource-manager/Microsoft.Logic/stable/2019-05-01/examples/IntegrationServiceEnvironments_ManagedApis_Delete.json
 */
async function deletesTheIntegrationServiceEnvironmentManagedApis(): Promise<void> {
  const subscriptionId =
    process.env["LOGIC_SUBSCRIPTION_ID"] || "f34b22a3-2202-4fb1-b040-1332bd928c84";
  const resourceGroup = "testResourceGroup";
  const integrationServiceEnvironmentName = "testIntegrationServiceEnvironment";
  const apiName = "servicebus";
  const credential = new DefaultAzureCredential();
  const client = new LogicManagementClient(credential, subscriptionId);
  const result = await client.integrationServiceEnvironmentManagedApis.beginDeleteAndWait(
    resourceGroup,
    integrationServiceEnvironmentName,
    apiName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deletesTheIntegrationServiceEnvironmentManagedApis();
}

main().catch(console.error);
