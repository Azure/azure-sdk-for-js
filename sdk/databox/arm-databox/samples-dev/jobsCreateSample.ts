// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a new job with the specified parameters. Existing job cannot be updated with this API and should instead be updated with the Update job API.
 *
 * @summary Creates a new job with the specified parameters. Existing job cannot be updated with this API and should instead be updated with the Update job API.
 * x-ms-original-file: specification/databox/resource-manager/Microsoft.DataBox/stable/2025-02-01/examples/JobsCreate.json
 */

import { JobResource, DataBoxManagementClient } from "@azure/arm-databox";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function jobsCreate(): Promise<void> {
  const subscriptionId =
    process.env["DATABOX_SUBSCRIPTION_ID"] || "YourSubscriptionId";
  const resourceGroupName =
    process.env["DATABOX_RESOURCE_GROUP"] || "YourResourceGroupName";
  const jobName = "TestJobName1";
  const jobResource: JobResource = {
    location: "westus",
    sku: { name: "DataBox", model: "DataBox" },
    transferType: "ImportToAzure",
    details: {
      contactDetails: {
        contactName: "XXXX XXXX",
        emailList: ["xxxx@xxxx.xxx"],
        phone: "0000000000",
        phoneExtension: "",
      },
      dataImportDetails: [
        {
          accountDetails: {
            dataAccountType: "StorageAccount",
            storageAccountId:
              "/subscriptions/YourSubscriptionId/resourcegroups/YourResourceGroupName/providers/Microsoft.Storage/storageAccounts/YourStorageAccountName",
          },
        },
      ],
      jobDetailsType: "DataBox",
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
  const result = await client.jobs.beginCreateAndWait(
    resourceGroupName,
    jobName,
    jobResource,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new job with the specified parameters. Existing job cannot be updated with this API and should instead be updated with the Update job API.
 *
 * @summary Creates a new job with the specified parameters. Existing job cannot be updated with this API and should instead be updated with the Update job API.
 * x-ms-original-file: specification/databox/resource-manager/Microsoft.DataBox/stable/2025-02-01/examples/JobsCreateDevicePassword.json
 */
async function jobsCreateDevicePassword(): Promise<void> {
  const subscriptionId =
    process.env["DATABOX_SUBSCRIPTION_ID"] || "YourSubscriptionId";
  const resourceGroupName =
    process.env["DATABOX_RESOURCE_GROUP"] || "YourResourceGroupName";
  const jobName = "TestJobName1";
  const jobResource: JobResource = {
    location: "westus",
    sku: { name: "DataBox", model: "DataBox" },
    transferType: "ImportToAzure",
    details: {
      contactDetails: {
        contactName: "XXXX XXXX",
        emailList: ["xxxx@xxxx.xxx"],
        phone: "0000000000",
        phoneExtension: "",
      },
      dataImportDetails: [
        {
          accountDetails: {
            dataAccountType: "StorageAccount",
            sharePassword: "<sharePassword>",
            storageAccountId:
              "/subscriptions/YourSubscriptionId/resourceGroups/YourResourceGroupName/providers/Microsoft.Storage/storageAccounts/YourStorageAccountName",
          },
        },
      ],
      devicePassword: "<devicePassword>",
      jobDetailsType: "DataBox",
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
  const result = await client.jobs.beginCreateAndWait(
    resourceGroupName,
    jobName,
    jobResource,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new job with the specified parameters. Existing job cannot be updated with this API and should instead be updated with the Update job API.
 *
 * @summary Creates a new job with the specified parameters. Existing job cannot be updated with this API and should instead be updated with the Update job API.
 * x-ms-original-file: specification/databox/resource-manager/Microsoft.DataBox/stable/2025-02-01/examples/JobsCreateDoubleEncryption.json
 */
async function jobsCreateDoubleEncryption(): Promise<void> {
  const subscriptionId =
    process.env["DATABOX_SUBSCRIPTION_ID"] || "YourSubscriptionId";
  const resourceGroupName =
    process.env["DATABOX_RESOURCE_GROUP"] || "YourResourceGroupName";
  const jobName = "TestJobName1";
  const jobResource: JobResource = {
    location: "westus",
    sku: { name: "DataBox", model: "DataBox" },
    transferType: "ImportToAzure",
    details: {
      contactDetails: {
        contactName: "XXXX XXXX",
        emailList: ["xxxx@xxxx.xxx"],
        phone: "0000000000",
        phoneExtension: "",
      },
      dataImportDetails: [
        {
          accountDetails: {
            dataAccountType: "StorageAccount",
            storageAccountId:
              "/subscriptions/YourSubscriptionId/resourcegroups/YourResourceGroupName/providers/Microsoft.Storage/storageAccounts/YourStorageAccountName",
          },
        },
      ],
      jobDetailsType: "DataBox",
      preferences: { encryptionPreferences: { doubleEncryption: "Enabled" } },
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
  const result = await client.jobs.beginCreateAndWait(
    resourceGroupName,
    jobName,
    jobResource,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new job with the specified parameters. Existing job cannot be updated with this API and should instead be updated with the Update job API.
 *
 * @summary Creates a new job with the specified parameters. Existing job cannot be updated with this API and should instead be updated with the Update job API.
 * x-ms-original-file: specification/databox/resource-manager/Microsoft.DataBox/stable/2025-02-01/examples/JobsCreateExport.json
 */
async function jobsCreateExport(): Promise<void> {
  const subscriptionId =
    process.env["DATABOX_SUBSCRIPTION_ID"] || "YourSubscriptionId";
  const resourceGroupName =
    process.env["DATABOX_RESOURCE_GROUP"] || "YourResourceGroupName";
  const jobName = "TestJobName1";
  const jobResource: JobResource = {
    location: "westus",
    sku: { name: "DataBox", model: "DataBox" },
    transferType: "ExportFromAzure",
    details: {
      contactDetails: {
        contactName: "XXXX XXXX",
        emailList: ["xxxx@xxxx.xxx"],
        phone: "0000000000",
        phoneExtension: "",
      },
      dataExportDetails: [
        {
          accountDetails: {
            dataAccountType: "StorageAccount",
            storageAccountId:
              "/subscriptions/YourSubscriptionId/resourceGroups/YourResourceGroupName/providers/Microsoft.Storage/storageAccounts/YourStorageAccountName",
          },
          transferConfiguration: {
            transferAllDetails: {
              include: {
                dataAccountType: "StorageAccount",
                transferAllBlobs: true,
                transferAllFiles: true,
              },
            },
            transferConfigurationType: "TransferAll",
          },
        },
      ],
      jobDetailsType: "DataBox",
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
  const result = await client.jobs.beginCreateAndWait(
    resourceGroupName,
    jobName,
    jobResource,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new job with the specified parameters. Existing job cannot be updated with this API and should instead be updated with the Update job API.
 *
 * @summary Creates a new job with the specified parameters. Existing job cannot be updated with this API and should instead be updated with the Update job API.
 * x-ms-original-file: specification/databox/resource-manager/Microsoft.DataBox/stable/2025-02-01/examples/JobsCreateWithUserAssignedIdentity.json
 */
async function jobsCreateWithUserAssignedIdentity(): Promise<void> {
  const subscriptionId =
    process.env["DATABOX_SUBSCRIPTION_ID"] || "YourSubscriptionId";
  const resourceGroupName =
    process.env["DATABOX_RESOURCE_GROUP"] || "YourResourceGroupName";
  const jobName = "TestJobName1";
  const jobResource: JobResource = {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/YourSubscriptionId/resourceGroups/YourResourceGroupName/providers/MicrosoftManagedIdentity/userAssignedIdentities/testIdentity":
          {},
      },
    },
    location: "westus",
    sku: { name: "DataBox", model: "DataBox" },
    transferType: "ImportToAzure",
    details: {
      contactDetails: {
        contactName: "XXXX XXXX",
        emailList: ["xxxx@xxxx.xxx"],
        phone: "0000000000",
        phoneExtension: "",
      },
      dataImportDetails: [
        {
          accountDetails: {
            dataAccountType: "StorageAccount",
            storageAccountId:
              "/subscriptions/YourSubscriptionId/resourceGroups/YourResourceGroupName/providers/Microsoft.Storage/storageAccounts/YourStorageAccountName",
          },
        },
      ],
      jobDetailsType: "DataBox",
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
  const result = await client.jobs.beginCreateAndWait(
    resourceGroupName,
    jobName,
    jobResource,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await jobsCreate();
  await jobsCreateDevicePassword();
  await jobsCreateDoubleEncryption();
  await jobsCreateExport();
  await jobsCreateWithUserAssignedIdentity();
}

main().catch(console.error);
