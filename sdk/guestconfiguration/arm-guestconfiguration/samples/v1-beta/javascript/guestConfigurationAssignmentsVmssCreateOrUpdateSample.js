// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { GuestConfigurationClient } = require("@azure/arm-guestconfiguration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates an association between a VMSS and guest configuration
 *
 * @summary creates an association between a VMSS and guest configuration
 * x-ms-original-file: 2024-04-05/createOrUpdateGuestConfigurationVMSSAssignment.json
 */
async function createOrUpdateGuestConfigurationAssignment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "mySubscriptionId";
  const client = new GuestConfigurationClient(credential, subscriptionId);
  const result = await client.guestConfigurationAssignmentsVmss.createOrUpdate(
    "myResourceGroupName",
    "myVMSSName",
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
          contentManagedIdentity: "test_identity",
          contentUri: "https://thisisfake/pacakge",
          version: "1.0.0.3",
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateGuestConfigurationAssignment();
}

main().catch(console.error);
