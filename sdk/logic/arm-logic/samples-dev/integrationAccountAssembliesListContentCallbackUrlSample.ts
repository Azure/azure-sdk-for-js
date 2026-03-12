// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the content callback url for an integration account assembly.
 *
 * @summary Get the content callback url for an integration account assembly.
 * x-ms-original-file: specification/logic/resource-manager/Microsoft.Logic/stable/2019-05-01/examples/IntegrationAccountAssemblies_ListContentCallbackUrl.json
 */

import { LogicManagementClient } from "@azure/arm-logic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getTheCallbackUrlForAnIntegrationAccountAssembly(): Promise<void> {
  const subscriptionId =
    process.env["LOGIC_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["LOGIC_RESOURCE_GROUP"] || "testResourceGroup";
  const integrationAccountName = "testIntegrationAccount";
  const assemblyArtifactName = "testAssembly";
  const credential = new DefaultAzureCredential();
  const client = new LogicManagementClient(credential, subscriptionId);
  const result = await client.integrationAccountAssemblies.listContentCallbackUrl(
    resourceGroupName,
    integrationAccountName,
    assemblyArtifactName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getTheCallbackUrlForAnIntegrationAccountAssembly();
}

main().catch(console.error);
