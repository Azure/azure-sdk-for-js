// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxManagementClient } from "@azure/arm-databox";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the properties of an existing job.
 *
 * @summary updates the properties of an existing job.
 * x-ms-original-file: 2025-07-01/JobsPatch.json
 */
async function jobsPatch(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "YourSubscriptionId";
  const client = new DataBoxManagementClient(credential, subscriptionId);
  const result = await client.jobs.update("YourResourceGroupName", "TestJobName1", {
    details: {
      contactDetails: {
        contactName: "XXXX XXXX",
        emailList: ["xxxx@xxxx.xxx"],
        phone: "0000000000",
        phoneExtension: "",
      },
      shippingAddress: {
        addressType: "Commercial",
        city: "XXXX XXXX",
        companyName: "XXXX XXXX",
        country: "XX",
        postalCode: "00000",
        stateOrProvince: "XX",
        streetAddress1: "XXXX XXXX",
        streetAddress2: "XXXX XXXX",
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates the properties of an existing job.
 *
 * @summary updates the properties of an existing job.
 * x-ms-original-file: 2025-07-01/JobsPatchCmk.json
 */
async function jobsPatchCmk(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "YourSubscriptionId";
  const client = new DataBoxManagementClient(credential, subscriptionId);
  const result = await client.jobs.update("YourResourceGroupName", "TestJobName1", {
    details: {
      keyEncryptionKey: {
        kekType: "CustomerManaged",
        kekUrl: "https://xxx.xxx.xx",
        kekVaultResourceID:
          "/subscriptions/YourSubscriptionId/resourceGroups/YourResourceGroupName/providers/Microsoft.KeyVault/vaults/YourKeyVaultName",
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates the properties of an existing job.
 *
 * @summary updates the properties of an existing job.
 * x-ms-original-file: 2025-07-01/JobsPatchSystemAssignedToUserAssigned.json
 */
async function jobsPatchSystemAssignedToUserAssigned(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "YourSubscriptionId";
  const client = new DataBoxManagementClient(credential, subscriptionId);
  const result = await client.jobs.update("YourResourceGroupName", "TestJobName1", {
    identity: {
      type: "SystemAssigned,UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/YourSubscriptionId/resourceGroups/YourResourceGroupName/providers/Microsoft.ManagedIdentity/userAssignedIdentities/testIdentity":
          {},
      },
    },
    details: {
      keyEncryptionKey: {
        identityProperties: {
          type: "UserAssigned",
          userAssigned: {
            resourceId:
              "/subscriptions/YourSubscriptionId/resourceGroups/YourResourceGroupName/providers/Microsoft.ManagedIdentity/userAssignedIdentities/testIdentity",
          },
        },
        kekType: "CustomerManaged",
        kekUrl: "https://xxx.xxx.xx",
        kekVaultResourceID:
          "/subscriptions/YourSubscriptionId/resourceGroups/YourResourceGroupName/providers/Microsoft.KeyVault/vaults/YourKeyVaultName",
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await jobsPatch();
  await jobsPatchCmk();
  await jobsPatchSystemAssignedToUserAssigned();
}

main().catch(console.error);
