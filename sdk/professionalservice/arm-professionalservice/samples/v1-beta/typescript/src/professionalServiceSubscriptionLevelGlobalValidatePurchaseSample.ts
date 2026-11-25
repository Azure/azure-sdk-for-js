// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProfessionalServiceClient } from "@azure/arm-professionalservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to validates a proposed Professional Service purchase within a resource group without creating the resource.
 *
 * @summary validates a proposed Professional Service purchase within a resource group without creating the resource.
 * x-ms-original-file: 2026-05-01/ProfessionalServiceValidatePurchaseByResourceGroup.json
 */
async function validateAProfessionalServicePurchaseWithinAResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1a950b42-75c2-44a6-ab02-fc0f840997aa";
  const client = new ProfessionalServiceClient(credential, subscriptionId);
  const result = await client.professionalServiceSubscriptionLevelGlobal.validatePurchase(
    "myResourceGroup",
    {
      location: "global",
      tags: { environment: "production" },
      properties: {
        name: "myPsResource",
        description: "Contoso consulting engagement",
        quantity: 1,
        autoRenew: false,
        storefront: "AzurePortal",
        quoteId: "11d0b05ae5a5",
        productCode: "0009ffc0-0000-0160-886c-6ed856eaff86",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await validateAProfessionalServicePurchaseWithinAResourceGroup();
}

main().catch(console.error);
