// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { GuestConfigurationClient } from "@azure/arm-guestconfiguration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates an association between a Connected VM Sphere machine and guest configuration
 *
 * @summary creates an association between a Connected VM Sphere machine and guest configuration
 * x-ms-original-file: 2024-04-05/createOrUpdateGuestConfigurationConnectedVMwarevSphereAssignment.json
 */
async function createOrUpdateGuestConfigurationAssignment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "mySubscriptionId";
  const client = new GuestConfigurationClient(credential, subscriptionId);
  const result = await client.guestConfigurationConnectedVMwarevSphereAssignments.createOrUpdate(
    "myResourceGroupName",
    "myVMName",
    "NotInstalledApplicationForWindows",
    {
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
          version: "1.0.0.0",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateGuestConfigurationAssignment();
}

main().catch(console.error);
