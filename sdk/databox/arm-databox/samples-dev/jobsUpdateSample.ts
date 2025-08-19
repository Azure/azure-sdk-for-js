// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates the properties of an existing job.
 *
 * @summary Updates the properties of an existing job.
 * x-ms-original-file: specification/databox/resource-manager/Microsoft.DataBox/stable/2025-02-01/examples/JobsPatch.json
 */

import {
  JobResourceUpdateParameter,
  DataBoxManagementClient,
} from "@azure/arm-databox";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function jobsPatch(): Promise<void> {
  const subscriptionId =
    process.env["DATABOX_SUBSCRIPTION_ID"] || "YourSubscriptionId";
  const resourceGroupName =
    process.env["DATABOX_RESOURCE_GROUP"] || "YourResourceGroupName";
  const jobName = "TestJobName1";
  const jobResourceUpdateParameter: JobResourceUpdateParameter = {
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
  };
  const credential = new DefaultAzureCredential();
  const client = new DataBoxManagementClient(credential, subscriptionId);
  const result = await client.jobs.beginUpdateAndWait(
    resourceGroupName,
    jobName,
    jobResourceUpdateParameter,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates the properties of an existing job.
 *
 * @summary Updates the properties of an existing job.
 * x-ms-original-file: specification/databox/resource-manager/Microsoft.DataBox/stable/2025-02-01/examples/JobsPatchCmk.json
 */
async function jobsPatchCmk(): Promise<void> {
  const subscriptionId =
    process.env["DATABOX_SUBSCRIPTION_ID"] || "YourSubscriptionId";
  const resourceGroupName =
    process.env["DATABOX_RESOURCE_GROUP"] || "YourResourceGroupName";
  const jobName = "TestJobName1";
  const jobResourceUpdateParameter: JobResourceUpdateParameter = {
    details: {
      keyEncryptionKey: {
        kekType: "CustomerManaged",
        kekUrl: "https://xxx.xxx.xx",
        kekVaultResourceID:
          "/subscriptions/YourSubscriptionId/resourceGroups/YourResourceGroupName/providers/Microsoft.KeyVault/vaults/YourKeyVaultName",
      },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new DataBoxManagementClient(credential, subscriptionId);
  const result = await client.jobs.beginUpdateAndWait(
    resourceGroupName,
    jobName,
    jobResourceUpdateParameter,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates the properties of an existing job.
 *
 * @summary Updates the properties of an existing job.
 * x-ms-original-file: specification/databox/resource-manager/Microsoft.DataBox/stable/2025-02-01/examples/JobsPatchSystemAssignedToUserAssigned.json
 */
async function jobsPatchSystemAssignedToUserAssigned(): Promise<void> {
  const subscriptionId =
    process.env["DATABOX_SUBSCRIPTION_ID"] || "YourSubscriptionId";
  const resourceGroupName =
    process.env["DATABOX_RESOURCE_GROUP"] || "YourResourceGroupName";
  const jobName = "TestJobName1";
  const jobResourceUpdateParameter: JobResourceUpdateParameter = {
    identity: {
      type: "SystemAssigned,UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/YourSubscriptionId/resourceGroups/YourResourceGroupName/providers/MicrosoftManagedIdentity/userAssignedIdentities/testIdentity":
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
  };
  const credential = new DefaultAzureCredential();
  const client = new DataBoxManagementClient(credential, subscriptionId);
  const result = await client.jobs.beginUpdateAndWait(
    resourceGroupName,
    jobName,
    jobResourceUpdateParameter,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await jobsPatch();
  await jobsPatchCmk();
  await jobsPatchSystemAssignedToUserAssigned();
}

main().catch(console.error);
