// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Validates an address. Use the operation to validate an address before using it as soldTo or a billTo address.
 *
 * @summary Validates an address. Use the operation to validate an address before using it as soldTo or a billTo address.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/addressValidateInvalid.json
 */

import type { AddressDetails } from "@azure/arm-billing";
import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function addressValidateInvalid(): Promise<void> {
  const parameters: AddressDetails = {
    addressLine1: "1 Test",
    city: "bellevue",
    country: "us",
    postalCode: "12345",
    region: "wa",
  };
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.address.validate(parameters);
  console.log(result);
}

/**
 * This sample demonstrates how to Validates an address. Use the operation to validate an address before using it as soldTo or a billTo address.
 *
 * @summary Validates an address. Use the operation to validate an address before using it as soldTo or a billTo address.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/addressValidateValid.json
 */
async function addressValidateValid(): Promise<void> {
  const parameters: AddressDetails = {
    addressLine1: "1 Test",
    city: "bellevue",
    country: "us",
    postalCode: "12345",
    region: "wa",
  };
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.address.validate(parameters);
  console.log(result);
}

async function main(): Promise<void> {
  await addressValidateInvalid();
  await addressValidateValid();
}

main().catch(console.error);
