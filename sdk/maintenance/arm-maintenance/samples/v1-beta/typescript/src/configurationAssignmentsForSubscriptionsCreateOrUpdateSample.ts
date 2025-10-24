// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MaintenanceManagementClient } from "@azure/arm-maintenance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to register configuration for resource.
 *
 * @summary register configuration for resource.
 * x-ms-original-file: 2023-10-01-preview/ConfigurationAssignmentsForSubscriptions_CreateOrUpdate.json
 */
async function configurationAssignmentsForSubscriptionsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5b4b650e-28b9-4790-b3ab-ddbd88d727c4";
  const client = new MaintenanceManagementClient(credential, subscriptionId);
  const result = await client.configurationAssignmentsForSubscriptions.createOrUpdate(
    "workervmConfiguration",
    {
      properties: {
        filter: {
          locations: ["Japan East", "UK South"],
          resourceGroups: ["RG1", "RG2"],
          resourceTypes: ["Microsoft.HybridCompute/machines", "Microsoft.Compute/virtualMachines"],
          tagSettings: {
            filterOperator: "Any",
            tags: {
              tag1: ["tag1Value1", "tag1Value2", "tag1Value3"],
              tag2: ["tag2Value1", "tag2Value2", "tag2Value3"],
            },
          },
        },
        maintenanceConfigurationId:
          "/subscriptions/5b4b650e-28b9-4790-b3ab-ddbd88d727c4/resourcegroups/examplerg/providers/Microsoft.Maintenance/maintenanceConfigurations/configuration1",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await configurationAssignmentsForSubscriptionsCreateOrUpdate();
}

main().catch(console.error);
