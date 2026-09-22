// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to validates an address. Use the operation to validate an address before using it as soldTo or a billTo address.
 *
 * @summary validates an address. Use the operation to validate an address before using it as soldTo or a billTo address.
 * x-ms-original-file: 2024-04-01/addressValidateInvalid.json
 */
async function addressValidateInvalid(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.address.validate({
    addressLine1: "1 Test",
    city: "bellevue",
    country: "us",
    postalCode: "12345",
    region: "wa",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to validates an address. Use the operation to validate an address before using it as soldTo or a billTo address.
 *
 * @summary validates an address. Use the operation to validate an address before using it as soldTo or a billTo address.
 * x-ms-original-file: 2024-04-01/addressValidateValid.json
 */
async function addressValidateValid(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.address.validate({
    addressLine1: "1 Test",
    city: "bellevue",
    country: "us",
    postalCode: "12345",
    region: "wa",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await addressValidateInvalid();
  await addressValidateValid();
}

main().catch(console.error);
