// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SaaSClient } = require("@azure/arm-saas");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to validates a proposed SaaS purchase within a resource group without creating the resource.
 *
 * @summary validates a proposed SaaS purchase within a resource group without creating the resource.
 * x-ms-original-file: 2026-04-01/SaasValidatePurchaseByResourceGroup.json
 */
async function validateASaaSPurchaseWithinAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1a950b42-75c2-44a6-ab02-fc0f840997aa";
  const client = new SaaSClient(credential, subscriptionId);
  const result = await client.saasSubscriptionLevelGlobal.validatePurchase("myResourceGroup", {
    location: "global",
    tags: { environment: "production" },
    properties: {
      name: "mySaasResource",
      description: "Contoso SaaS seat subscription",
      quantity: 5,
      autoRenew: true,
      storefront: "AzurePortal",
      quoteId: "11d0b05ae5a5",
      productCode: "0007150b-0000-0160-2654-64a36bcef7ba",
    },
  });
  console.log(result);
}

async function main() {
  await validateASaaSPurchaseWithinAResourceGroup();
}

main().catch(console.error);
