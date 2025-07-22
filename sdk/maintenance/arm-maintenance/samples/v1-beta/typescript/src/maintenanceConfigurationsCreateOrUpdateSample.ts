// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MaintenanceManagementClient } from "@azure/arm-maintenance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or Update configuration record
 *
 * @summary create or Update configuration record
 * x-ms-original-file: 2023-10-01-preview/MaintenanceConfigurations_CreateOrUpdateForResource.json
 */
async function maintenanceConfigurationsCreateOrUpdateForResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5b4b650e-28b9-4790-b3ab-ddbd88d727c4";
  const client = new MaintenanceManagementClient(credential, subscriptionId);
  const result = await client.maintenanceConfigurations.createOrUpdate(
    "examplerg",
    "configuration1",
    {
      location: "westus2",
      properties: {
        maintenanceScope: "OSImage",
        maintenanceWindow: {
          duration: "05:00",
          expirationDateTime: "9999-12-31 00:00",
          recurEvery: "Day",
          startDateTime: "2020-04-30 08:00",
          timeZone: "Pacific Standard Time",
        },
        namespace: "Microsoft.Maintenance",
        visibility: "Custom",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await maintenanceConfigurationsCreateOrUpdateForResource();
}

main().catch(console.error);
