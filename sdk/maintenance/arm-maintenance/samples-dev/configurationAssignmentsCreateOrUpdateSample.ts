// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MaintenanceManagementClient } from "@azure/arm-maintenance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to register configuration for resource.
 *
 * @summary register configuration for resource.
 * x-ms-original-file: 2023-10-01-preview/ConfigurationAssignments_CreateOrUpdate.json
 */
async function configurationAssignmentsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5b4b650e-28b9-4790-b3ab-ddbd88d727c4";
  const client = new MaintenanceManagementClient(credential, subscriptionId);
  const result = await client.configurationAssignments.createOrUpdate(
    "examplerg",
    "Microsoft.Compute",
    "virtualMachineScaleSets",
    "smdtest1",
    "workervmConfiguration",
    {
      properties: {
        maintenanceConfigurationId:
          "/subscriptions/5b4b650e-28b9-4790-b3ab-ddbd88d727c4/resourcegroups/examplerg/providers/Microsoft.Maintenance/maintenanceConfigurations/configuration1",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await configurationAssignmentsCreateOrUpdate();
}

main().catch(console.error);
