// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a workflow.
 *
 * @summary Creates or updates a workflow.
 * x-ms-original-file: specification/logic/resource-manager/Microsoft.Logic/stable/2019-05-01/examples/Workflows_CreateOrUpdate.json
 */

import type { Workflow } from "@azure/arm-logic";
import { LogicManagementClient } from "@azure/arm-logic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createOrUpdateAWorkflow(): Promise<void> {
  const subscriptionId =
    process.env["LOGIC_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["LOGIC_RESOURCE_GROUP"] || "test-resource-group";
  const workflowName = "test-workflow";
  const workflow: Workflow = {
    definition: {
      $schema:
        "https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2016-06-01/workflowdefinition.json#",
      actions: {
        Find_pet_by_ID: {
          type: "ApiConnection",
          inputs: {
            path: "/pet/@{encodeURIComponent('1')}",
            method: "get",
            host: {
              connection: {
                name: "@parameters('$connections')['test-custom-connector']['connectionId']",
              },
            },
          },
          runAfter: {},
        },
      },
      contentVersion: "1.0.0.0",
      outputs: {},
      parameters: { $connections: { type: "Object", defaultValue: {} } },
      triggers: {
        manual: { type: "Request", inputs: { schema: {} }, kind: "Http" },
      },
    },
    integrationAccount: {
      id: "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/test-resource-group/providers/Microsoft.Logic/integrationAccounts/test-integration-account",
    },
    location: "brazilsouth",
    parameters: {
      $connections: {
        value: {
          "test-custom-connector": {
            connectionId:
              "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/test-resource-group/providers/Microsoft.Web/connections/test-custom-connector",
            connectionName: "test-custom-connector",
            id: "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/providers/Microsoft.Web/locations/brazilsouth/managedApis/test-custom-connector",
          },
        },
      },
    },
    tags: {},
  };
  const credential = new DefaultAzureCredential();
  const client = new LogicManagementClient(credential, subscriptionId);
  const result = await client.workflows.createOrUpdate(resourceGroupName, workflowName, workflow);
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAWorkflow();
}

main().catch(console.error);
