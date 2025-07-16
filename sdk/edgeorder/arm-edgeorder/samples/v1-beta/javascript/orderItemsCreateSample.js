// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EdgeOrderClient } = require("@azure/arm-edgeorder");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create an order item. Existing order item cannot be updated with this api and should instead be updated with the Update order item
 * API.
 *
 * @summary create an order item. Existing order item cannot be updated with this api and should instead be updated with the Update order item
 * API.
 * x-ms-original-file: 2024-02-01/CreateOrderItem.json
 */
async function createOrderItem() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "eb5dc900-6186-49d8-b7d7-febd866fdc1d";
  const client = new EdgeOrderClient(credential, subscriptionId);
  await client.orderItems.create("YourResourceGroupName", "TestOrderItemName2", {
    location: "eastus",
    properties: {
      addressDetails: {
        forwardAddress: {
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
      },
      orderId:
        "/subscriptions/eb5dc900-6186-49d8-b7d7-febd866fdc1d/resourceGroups/YourResourceGroupName/providers/Microsoft.EdgeOrder/locations/eastus/orders/TestOrderName2",
      orderItemDetails: {
        orderItemType: "Purchase",
        preferences: {
          transportPreferences: { preferredShipmentType: "MicrosoftManaged" },
        },
        productDetails: {
          hierarchyInformation: {
            configurationName: "edgep_base",
            productFamilyName: "azurestackedge",
            productLineName: "azurestackedge",
            productName: "azurestackedgegpu",
          },
        },
      },
    },
  });
}

async function main() {
  await createOrderItem();
}

main().catch(console.error);
