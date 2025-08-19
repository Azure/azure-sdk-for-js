// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets an OpenAPI definition for the workflow.
 *
 * @summary Gets an OpenAPI definition for the workflow.
 * x-ms-original-file: specification/logic/resource-manager/Microsoft.Logic/stable/2019-05-01/examples/Workflows_ListSwagger.json
 */

import { LogicManagementClient } from "@azure/arm-logic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getTheSwaggerForAWorkflow(): Promise<void> {
  const subscriptionId =
    process.env["LOGIC_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["LOGIC_RESOURCE_GROUP"] || "testResourceGroup";
  const workflowName = "testWorkflowName";
  const credential = new DefaultAzureCredential();
  const client = new LogicManagementClient(credential, subscriptionId);
  const result = await client.workflows.listSwagger(resourceGroupName, workflowName);
  console.log(result);
}

async function main(): Promise<void> {
  await getTheSwaggerForAWorkflow();
}

main().catch(console.error);
