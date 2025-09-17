// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create/Overwrite Azure Advisor configuration.
 *
 * @summary Create/Overwrite Azure Advisor configuration.
 * x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/CreateConfiguration.json
 */

import type { ConfigData } from "@azure/arm-advisor";
import { AdvisorManagementClient } from "@azure/arm-advisor";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function putConfigurations(): Promise<void> {
  const subscriptionId = process.env["ADVISOR_SUBSCRIPTION_ID"] || "subscriptionId";
  const configurationName = "default";
  const resourceGroup = "resourceGroup";
  const configContract: ConfigData = {
    digests: [
      {
        name: "digestConfigName",
        actionGroupResourceId:
          "/subscriptions/subscriptionId/resourceGroups/resourceGroup/providers/microsoft.insights/actionGroups/actionGroupName",
        categories: [
          "HighAvailability",
          "Security",
          "Performance",
          "Cost",
          "OperationalExcellence",
        ],
        frequency: 30,
        state: "Active",
        language: "en",
      },
    ],
    exclude: true,
    lowCpuThreshold: "5",
  };
  const credential = new DefaultAzureCredential();
  const client = new AdvisorManagementClient(credential, subscriptionId);
  const result = await client.configurations.createInResourceGroup(
    configurationName,
    resourceGroup,
    configContract,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await putConfigurations();
}

main().catch(console.error);
