// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConfigurationAssignment } from "@azure/arm-maintenance";
import { MaintenanceManagementClient } from "@azure/arm-maintenance";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Register configuration for resource.
 *
 * @summary Register configuration for resource.
 * x-ms-original-file: specification/maintenance/resource-manager/Microsoft.Maintenance/preview/2023-10-01-preview/examples/ConfigurationAssignmentsForResourceGroup_UpdateForResource.json
 */
async function configurationAssignmentsForResourceGroupCreateOrUpdate(): Promise<void> {
  const subscriptionId =
    process.env["MAINTENANCE_SUBSCRIPTION_ID"] || "5b4b650e-28b9-4790-b3ab-ddbd88d727c4";
  const resourceGroupName = process.env["MAINTENANCE_RESOURCE_GROUP"] || "examplerg";
  const configurationAssignmentName = "workervmConfiguration";
  const configurationAssignment: ConfigurationAssignment = {
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
  };
  const credential = new DefaultAzureCredential();
  const client = new MaintenanceManagementClient(credential, subscriptionId);
  const result = await client.configurationAssignmentsForResourceGroup.update(
    resourceGroupName,
    configurationAssignmentName,
    configurationAssignment,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await configurationAssignmentsForResourceGroupCreateOrUpdate();
}

main().catch(console.error);
