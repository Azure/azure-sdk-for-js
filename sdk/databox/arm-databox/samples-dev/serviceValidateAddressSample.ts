// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ValidateAddress, DataBoxManagementClient } from "@azure/arm-databox";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to [DEPRECATED NOTICE: This operation will soon be removed]. This method validates the customer shipping address and provide alternate addresses if any.
 *
 * @summary [DEPRECATED NOTICE: This operation will soon be removed]. This method validates the customer shipping address and provide alternate addresses if any.
 * x-ms-original-file: specification/databox/resource-manager/Microsoft.DataBox/stable/2025-02-01/examples/ValidateAddressPost.json
 */
async function validateAddressPost(): Promise<void> {
  const subscriptionId =
    process.env["DATABOX_SUBSCRIPTION_ID"] || "YourSubscriptionId";
  const location = "westus";
  const validateAddress: ValidateAddress = {
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
    validationType: "ValidateAddress",
  };
  const credential = new DefaultAzureCredential();
  const client = new DataBoxManagementClient(credential, subscriptionId);
  const result = await client.service.validateAddress(
    location,
    validateAddress,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await validateAddressPost();
}

main().catch(console.error);
