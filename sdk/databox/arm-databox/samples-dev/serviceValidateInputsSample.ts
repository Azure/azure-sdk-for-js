// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  CreateJobValidations,
  DataBoxManagementClient,
} from "@azure/arm-databox";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to This method does all necessary pre-job creation validation under subscription.
 *
 * @summary This method does all necessary pre-job creation validation under subscription.
 * x-ms-original-file: specification/databox/resource-manager/Microsoft.DataBox/stable/2025-02-01/examples/ValidateInputs.json
 */
async function validateInputs(): Promise<void> {
  const subscriptionId =
    process.env["DATABOX_SUBSCRIPTION_ID"] || "YourSubscriptionId";
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
  const result = await client.service.validateInputs(
    location,
    validationRequest,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await validateInputs();
}

main().catch(console.error);
