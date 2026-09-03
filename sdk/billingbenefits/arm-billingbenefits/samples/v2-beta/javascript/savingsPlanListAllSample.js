// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingBenefitsRP } = require("@azure/arm-billingbenefits");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list savings plans.
 *
 * @summary list savings plans.
 * x-ms-original-file: 2025-12-01-preview/SavingsPlansList.json
 */
async function savingsPlansList() {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const resArray = new Array();
  for await (const item of client.savingsPlan.listAll({
    filter: "(properties%2farchived+eq+false)",
    orderby: "properties/displayName asc",
    skiptoken: 50,
    take: 1,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await savingsPlansList();
}

main().catch(console.error);
