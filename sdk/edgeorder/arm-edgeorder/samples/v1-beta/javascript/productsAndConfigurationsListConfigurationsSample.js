// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EdgeOrderClient } = require("@azure/arm-edgeorder");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list configurations for the given product family, product line and product for the given subscription.
 *
 * @summary list configurations for the given product family, product line and product for the given subscription.
 * x-ms-original-file: 2024-02-01/ListConfigurations.json
 */
async function listConfigurations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "eb5dc900-6186-49d8-b7d7-febd866fdc1d";
  const client = new EdgeOrderClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.productsAndConfigurations.listConfigurations({
    configurationFilter: {
      filterableProperty: [{ type: "ShipToCountries", supportedValues: ["US"] }],
      hierarchyInformation: {
        productFamilyName: "azurestackedge",
        productLineName: "azurestackedge",
        productName: "azurestackedgegpu",
      },
    },
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listConfigurations();
}

main().catch(console.error);
