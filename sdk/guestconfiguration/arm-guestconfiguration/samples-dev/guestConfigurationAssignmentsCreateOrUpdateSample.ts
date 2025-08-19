// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates an association between a VM and guest configuration
 *
 * @summary Creates an association between a VM and guest configuration
 * x-ms-original-file: specification/guestconfiguration/resource-manager/Microsoft.GuestConfiguration/stable/2022-01-25/examples/createOrUpdateGuestConfigurationAssignment.json
 */

import type { GuestConfigurationAssignment } from "@azure/arm-guestconfiguration";
import { GuestConfigurationClient } from "@azure/arm-guestconfiguration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createOrUpdateGuestConfigurationAssignment(): Promise<void> {
  const subscriptionId = process.env["GUESTCONFIGURATION_SUBSCRIPTION_ID"] || "mySubscriptionId";
  const guestConfigurationAssignmentName = "NotInstalledApplicationForWindows";
  const resourceGroupName =
    process.env["GUESTCONFIGURATION_RESOURCE_GROUP"] || "myResourceGroupName";
  const vmName = "myVMName";
  const parameters: GuestConfigurationAssignment = {
    name: "NotInstalledApplicationForWindows",
    location: "westcentralus",
    properties: {
      context: "Azure policy",
      guestConfiguration: {
        name: "NotInstalledApplicationForWindows",
        assignmentType: "ApplyAndAutoCorrect",
        configurationParameter: [
          {
            name: "[InstalledApplication]NotInstalledApplicationResource1;Name",
            value: "NotePad,sql",
          },
        ],
        contentHash: "123contenthash",
        contentUri: "https://thisisfake/pacakge",
        version: "1.0.0.3",
      },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new GuestConfigurationClient(credential, subscriptionId);
  const result = await client.guestConfigurationAssignments.createOrUpdate(
    guestConfigurationAssignmentName,
    resourceGroupName,
    vmName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateGuestConfigurationAssignment();
}

main().catch(console.error);
