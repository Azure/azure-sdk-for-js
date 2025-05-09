/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { ConfigData } from "@azure/arm-advisor";
import { AdvisorManagementClient } from "@azure/arm-advisor";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create/Overwrite Azure Advisor configuration and also delete all configurations of contained resource groups.
 *
 * @summary Create/Overwrite Azure Advisor configuration and also delete all configurations of contained resource groups.
 * x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/CreateConfiguration.json
 */
async function putConfigurations(): Promise<void> {
  const subscriptionId = process.env["ADVISOR_SUBSCRIPTION_ID"] || "subscriptionId";
  const configurationName = "default";
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
  const result = await client.configurations.createInSubscription(
    configurationName,
    configContract,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await putConfigurations();
}

main().catch(console.error);
