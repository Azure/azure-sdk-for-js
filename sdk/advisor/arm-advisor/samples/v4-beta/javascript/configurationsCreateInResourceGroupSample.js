// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AdvisorManagementClient } = require("@azure/arm-advisor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create/Overwrite Azure Advisor configuration.
 *
 * @summary create/Overwrite Azure Advisor configuration.
 * x-ms-original-file: 2026-02-01-preview/CreateConfiguration.json
 */
async function putConfigurations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "58c3f667-7a62-4bfd-a658-846493e9a493";
  const client = new AdvisorManagementClient(credential, subscriptionId);
  const result = await client.configurations.createInResourceGroup("default", "resourceGroup", {
    lowCpuThreshold: "5",
    duration: "7",
    exclude: true,
    digests: [
      {
        name: "digestConfigName",
        actionGroupResourceId:
          "/subscriptions/58c3f667-7a62-4bfd-a658-846493e9a493/resourceGroups/resourceGroup/providers/microsoft.insights/actionGroups/actionGroupName",
        frequency: 30,
        categories: [
          "HighAvailability",
          "Security",
          "Performance",
          "Cost",
          "OperationalExcellence",
        ],
        language: "en",
        state: "Active",
      },
    ],
  });
  console.log(result);
}

async function main() {
  await putConfigurations();
}

main().catch(console.error);
