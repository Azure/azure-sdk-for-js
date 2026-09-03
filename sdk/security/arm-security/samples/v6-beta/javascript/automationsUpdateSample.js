// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a security automation
 *
 * @summary updates a security automation
 * x-ms-original-file: 2023-12-01-preview/Automations/PatchAutomation_example.json
 */
async function updateASecurityAutomation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a5caac9c-5c04-49af-b3d0-e204f40345d5";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.automations.update("exampleResourceGroup", "exampleAutomation", {
    description:
      "An example of a security automation that triggers one LogicApp resource (myTest1) on any security assessment",
    actions: [
      {
        actionType: "LogicApp",
        logicAppResourceId:
          "/subscriptions/e54a4a18-5b94-4f90-9471-bd3decad8a2e/resourceGroups/sample/providers/Microsoft.Logic/workflows/MyTest1",
        uri: "https://exampleTriggerUri1.com",
      },
    ],
    scopes: [
      {
        description:
          "A description that helps to identify this scope - for example: security assessments that relate to the resource group myResourceGroup within the subscription a5caac9c-5c04-49af-b3d0-e204f40345d5",
        scopePath:
          "/subscriptions/a5caac9c-5c04-49af-b3d0-e204f40345d5/resourceGroups/myResourceGroup",
      },
    ],
    sources: [{ eventSource: "Assessments" }],
    tags: { Example: "exampleTag" },
  });
  console.log(result);
}

async function main() {
  await updateASecurityAutomation();
}

main().catch(console.error);
