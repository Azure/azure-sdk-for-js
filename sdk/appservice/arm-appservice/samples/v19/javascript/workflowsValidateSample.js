// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to validates the workflow definition.
 *
 * @summary validates the workflow definition.
 * x-ms-original-file: 2025-05-01/Workflows_Validate.json
 */
async function validateAWorkflow() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.workflows.validate("test-resource-group", "test-name", "test-workflow", {
    definition: {
      $schema:
        "https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2016-06-01/workflowdefinition.json#",
      actions: {},
      contentVersion: "1.0.0.0",
      outputs: {},
      parameters: {},
      triggers: {},
    },
    kind: "Stateful",
  });
}

async function main() {
  await validateAWorkflow();
}

main().catch(console.error);
