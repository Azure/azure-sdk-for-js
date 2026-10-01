// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataBoxEdgeManagementClient } = require("@azure/arm-databoxedge");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an order.
 *
 * @summary creates or updates an order.
 * x-ms-original-file: 2023-12-01/OrderPut.json
 */
async function orderPut() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.orders.createOrUpdate("testedgedevice", "GroupForEdgeAutomation", {
    contactInformation: {
      companyName: "Microsoft",
      contactPerson: "John Mcclane",
      emailList: ["john@microsoft.com"],
      phone: "(800) 426-9400",
    },
    shippingAddress: {
      addressLine1: "Microsoft Corporation",
      addressLine2: "One Microsoft Way",
      addressLine3: "Redmond",
      city: "WA",
      country: "USA",
      postalCode: "98052",
      state: "WA",
    },
  });
  console.log(result);
}

async function main() {
  await orderPut();
}

main().catch(console.error);
