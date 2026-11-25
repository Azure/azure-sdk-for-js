// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProfessionalServiceClient } = require("@azure/arm-professionalservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to validates a proposed Professional Service purchase at subscription scope before a resource group is selected.
 *
 * @summary validates a proposed Professional Service purchase at subscription scope before a resource group is selected.
 * x-ms-original-file: 2026-05-01/ProfessionalServiceValidatePurchaseBySubscription.json
 */
async function validateAProfessionalServicePurchaseAtSubscriptionScope() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1a950b42-75c2-44a6-ab02-fc0f840997aa";
  const client = new ProfessionalServiceClient(credential, subscriptionId);
  const result =
    await client.professionalServiceSubscriptionLevelGlobal.validatePurchaseBySubscription({
      location: "global",
      properties: {
        name: "myPsResource",
        quantity: 1,
        autoRenew: false,
        storefront: "AzurePortal",
        quoteId: "11d0b05ae5a5",
        productCode: "0009ffc0-0000-0160-886c-6ed856eaff86",
      },
    });
  console.log(result);
}

async function main() {
  await validateAProfessionalServicePurchaseAtSubscriptionScope();
}

main().catch(console.error);
