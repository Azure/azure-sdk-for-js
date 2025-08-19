// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Order } from "@azure/arm-databoxedge-profile-2020-09-01-hybrid";
import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates an order.
 *
 * @summary Creates or updates an order.
 * x-ms-original-file: specification/databoxedge/resource-manager/Microsoft.DataBoxEdge/stable/2019-08-01/examples/OrderPut.json
 */
async function orderPut(): Promise<void> {
  const subscriptionId =
    process.env["DATABOXEDGE_SUBSCRIPTION_ID"] || "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const deviceName = "testedgedevice";
  const resourceGroupName = process.env["DATABOXEDGE_RESOURCE_GROUP"] || "GroupForEdgeAutomation";
  const order: Order = {
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
  };
  const credential = new DefaultAzureCredential();
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.orders.beginCreateOrUpdateAndWait(
    deviceName,
    resourceGroupName,
    order,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await orderPut();
}

main().catch(console.error);
