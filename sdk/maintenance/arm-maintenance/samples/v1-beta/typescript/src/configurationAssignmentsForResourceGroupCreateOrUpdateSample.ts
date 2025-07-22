// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MaintenanceManagementClient } from "@azure/arm-maintenance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to register configuration for resource.
 *
 * @summary register configuration for resource.
 * x-ms-original-file: 2023-10-01-preview/ConfigurationAssignmentsForResourceGroup_CreateOrUpdate.json
 */
async function configurationAssignmentsForResourceGroupCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5b4b650e-28b9-4790-b3ab-ddbd88d727c4";
  const client = new MaintenanceManagementClient(credential, subscriptionId);
  const result = await client.configurationAssignmentsForResourceGroup.createOrUpdate(
    "examplerg",
    "workervmConfiguration",
    {
      properties: {
        filter: {
          locations: ["Japan East", "UK South"],
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
  await configurationAssignmentsForResourceGroupCreateOrUpdate();
}

main().catch(console.error);
