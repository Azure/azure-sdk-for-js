// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeOrderClient } from "@azure/arm-edgeorder";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a new address with the specified parameters. Existing address cannot be updated with this API and should
 * instead be updated with the Update address API.
 *
 * @summary create a new address with the specified parameters. Existing address cannot be updated with this API and should
 * instead be updated with the Update address API.
 * x-ms-original-file: 2024-02-01/CreateAddress.json
 */
async function createAddress(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "eb5dc900-6186-49d8-b7d7-febd866fdc1d";
  const client = new EdgeOrderClient(credential, subscriptionId);
  await client.addresses.create("YourResourceGroupName", "TestAddressName2", {
    location: "eastus",
    properties: {
      addressClassification: "Shipping",
      contactDetails: {
        contactName: "XXXX XXXX",
        emailList: ["xxxx@xxxx.xxx"],
        phone: "0000000000",
        phoneExtension: "",
      },
      shippingAddress: {
        addressType: "None",
        city: "San Francisco",
        companyName: "Microsoft",
        country: "US",
        postalCode: "94107",
        stateOrProvince: "CA",
        streetAddress1: "16 TOWNSEND ST",
        streetAddress2: "UNIT 1",
      },
    },
  });
}

async function main(): Promise<void> {
  await createAddress();
}

main().catch(console.error);
