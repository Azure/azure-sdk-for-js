// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConsumptionManagementClient } = require("@azure/arm-consumption");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all Azure credits for a customer. The API is only supported for Microsoft Partner  Agreements (MPA) billing accounts.
 *
 * @summary lists all Azure credits for a customer. The API is only supported for Microsoft Partner  Agreements (MPA) billing accounts.
 * x-ms-original-file: 2026-06-01/LotsListByCustomer.json
 */
async function lotsListByCustomer() {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.lotsOperations.listByCustomer("1234:5678", "1234:5678")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all Azure credits for a customer. The API is only supported for Microsoft Partner  Agreements (MPA) billing accounts.
 *
 * @summary lists all Azure credits for a customer. The API is only supported for Microsoft Partner  Agreements (MPA) billing accounts.
 * x-ms-original-file: 2026-06-01/LotsListByCustomerWithFilters.json
 */
async function lotsListByCustomerWithFilter() {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.lotsOperations.listByCustomer("1234:5678", "1234:5678", {
    filter: "status eq 'active' AND source eq 'consumptioncommitment'",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await lotsListByCustomer();
  await lotsListByCustomerWithFilter();
}

main().catch(console.error);
