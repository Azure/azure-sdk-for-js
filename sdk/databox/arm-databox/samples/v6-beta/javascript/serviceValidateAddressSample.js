// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataBoxManagementClient } = require("@azure/arm-databox");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to [DEPRECATED NOTICE: This operation will soon be removed]. This method validates the customer shipping address and provide alternate addresses if any.
 *
 * @summary [DEPRECATED NOTICE: This operation will soon be removed]. This method validates the customer shipping address and provide alternate addresses if any.
 * x-ms-original-file: 2025-07-01/ValidateAddressPost.json
 */
async function validateAddressPost() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "YourSubscriptionId";
  const client = new DataBoxManagementClient(credential, subscriptionId);
  const result = await client.service.validateAddress("westus", {
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
  });
  console.log(result);
}

async function main() {
  await validateAddressPost();
}

main().catch(console.error);
