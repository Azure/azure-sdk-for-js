// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to This method does all necessary pre-job creation validation under resource group.
 *
 * @summary This method does all necessary pre-job creation validation under resource group.
 * x-ms-original-file: specification/databox/resource-manager/Microsoft.DataBox/stable/2025-02-01/examples/ValidateInputsByResourceGroup.json
 */

import {
  CreateJobValidations,
  DataBoxManagementClient,
} from "@azure/arm-databox";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function validateInputsByResourceGroup(): Promise<void> {
  const subscriptionId =
    process.env["DATABOX_SUBSCRIPTION_ID"] || "YourSubscriptionId";
  const resourceGroupName =
    process.env["DATABOX_RESOURCE_GROUP"] || "YourResourceGroupName";
  const location = "westus";
  const validationRequest: CreateJobValidations = {
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
      {
        deviceType: "DataBox",
        model: "DataBox",
        validationType: "ValidateCreateOrderLimit",
      },
      {
        deviceType: "DataBox",
        model: "DataBox",
        preference: {
          transportPreferences: { preferredShipmentType: "MicrosoftManaged" },
        },
        validationType: "ValidatePreferences",
      },
    ],
    validationCategory: "JobCreationValidation",
  };
  const credential = new DefaultAzureCredential();
  const client = new DataBoxManagementClient(credential, subscriptionId);
  const result = await client.service.validateInputsByResourceGroup(
    resourceGroupName,
    location,
    validationRequest,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await validateInputsByResourceGroup();
}

main().catch(console.error);
