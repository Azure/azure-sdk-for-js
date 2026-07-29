// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataBoxManagementClient } = require("@azure/arm-databox");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this method does all necessary pre-job creation validation under resource group.
 *
 * @summary this method does all necessary pre-job creation validation under resource group.
 * x-ms-original-file: 2025-07-01/ValidateInputsByResourceGroup.json
 */
async function validateInputsByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "YourSubscriptionId";
  const client = new DataBoxManagementClient(credential, subscriptionId);
  const result = await client.service.validateInputsByResourceGroup(
    "YourResourceGroupName",
    "westus",
    {
      individualRequestDetails: [
        {
          dataImportDetails: [
            {
              accountDetails: {
                dataAccountType: "StorageAccount",
                storageAccountId:
                  "/subscriptions/YourSubscriptionId/resourcegroups/YourResourceGroupName/providers/Microsoft.Storage/storageAccounts/YourStorageAccountName",
              },
            },
          ],
          deviceType: "DataBox",
          model: "DataBox",
          transferType: "ImportToAzure",
          validationType: "ValidateDataTransferDetails",
        },
        {
          deviceType: "DataBox",
          model: "DataBox",
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
          transportPreferences: { preferredShipmentType: "MicrosoftManaged" },
          validationType: "ValidateAddress",
        },
        { validationType: "ValidateSubscriptionIsAllowedToCreateJob" },
        {
          country: "XX",
          deviceType: "DataBox",
          location: "westus",
          model: "DataBox",
          transferType: "ImportToAzure",
          validationType: "ValidateSkuAvailability",
        },
        { deviceType: "DataBox", model: "DataBox", validationType: "ValidateCreateOrderLimit" },
        {
          deviceType: "DataBox",
          model: "DataBox",
          preference: { transportPreferences: { preferredShipmentType: "MicrosoftManaged" } },
          validationType: "ValidatePreferences",
        },
      ],
      validationCategory: "JobCreationValidation",
    },
  );
  console.log(result);
}

async function main() {
  await validateInputsByResourceGroup();
}

main().catch(console.error);
