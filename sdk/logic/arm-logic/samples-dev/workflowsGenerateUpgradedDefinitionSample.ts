// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { GenerateUpgradedDefinitionParameters } from "@azure/arm-logic";
import { LogicManagementClient } from "@azure/arm-logic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Generates the upgraded definition for a workflow.
 *
 * @summary Generates the upgraded definition for a workflow.
 * x-ms-original-file: specification/logic/resource-manager/Microsoft.Logic/stable/2019-05-01/examples/Workflows_GenerateUpgradedDefinition.json
 */
async function generateAnUpgradedDefinition(): Promise<void> {
  const subscriptionId =
    process.env["LOGIC_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["LOGIC_RESOURCE_GROUP"] || "test-resource-group";
  const workflowName = "test-workflow";
  const parameters: GenerateUpgradedDefinitionParameters = {
    targetSchemaVersion: "2016-06-01",
  };
  const credential = new DefaultAzureCredential();
  const client = new LogicManagementClient(credential, subscriptionId);
  const result = await client.workflows.generateUpgradedDefinition(
    resourceGroupName,
    workflowName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await generateAnUpgradedDefinition();
}

main().catch(console.error);
