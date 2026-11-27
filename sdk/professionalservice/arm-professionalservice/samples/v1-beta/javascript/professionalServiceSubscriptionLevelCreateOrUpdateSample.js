// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProfessionalServiceClient } = require("@azure/arm-professionalservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a Professional Service resource.
 *
 * @summary creates or updates a Professional Service resource.
 * x-ms-original-file: 2026-05-01/ProfessionalServicePut.json
 */
async function createAProfessionalServiceSubscriptionLevelResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1a950b42-75c2-44a6-ab02-fc0f840997aa";
  const client = new ProfessionalServiceClient(credential, subscriptionId);
  const result = await client.professionalServiceSubscriptionLevel.createOrUpdate(
    "myResourceGroup",
    "myPsResource",
    {
      location: "global",
      tags: { environment: "test" },
      properties: {
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

async function main() {
  await createAProfessionalServiceSubscriptionLevelResource();
}

main().catch(console.error);
