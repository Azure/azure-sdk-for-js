// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Validates the workflow definition.
 *
 * @summary Validates the workflow definition.
 * x-ms-original-file: specification/logic/resource-manager/Microsoft.Logic/stable/2019-05-01/examples/Workflows_ValidateByLocation.json
 */

import type { Workflow } from "@azure/arm-logic";
import { LogicManagementClient } from "@azure/arm-logic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function validateAWorkflow(): Promise<void> {
  const subscriptionId =
    process.env["LOGIC_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["LOGIC_RESOURCE_GROUP"] || "test-resource-group";
  const location = "brazilsouth";
  const workflowName = "test-workflow";
  const validate: Workflow = {
    definition: {
      $schema:
        "https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2016-06-01/workflowdefinition.json#",
      actions: {},
      contentVersion: "1.0.0.0",
      outputs: {},
      parameters: {},
      triggers: {},
    },
    integrationAccount: {
      id: "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/test-resource-group/providers/Microsoft.Logic/integrationAccounts/test-integration-account",
    },
    location: "brazilsouth",
    tags: {},
  };
  const credential = new DefaultAzureCredential();
  const client = new LogicManagementClient(credential, subscriptionId);
  const result = await client.workflows.validateByLocation(
    resourceGroupName,
    location,
    workflowName,
    validate,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await validateAWorkflow();
}

main().catch(console.error);
