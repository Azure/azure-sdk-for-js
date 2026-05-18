// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a reservation
 *
 * @summary create a reservation
 * x-ms-original-file: 2026-01-01-preview/Reservations_Create_MaximumSet_Gen.json
 */
async function reservationsCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.reservations.create("rgpurestorage", "reservation-01", {
    properties: {
      marketplace: {
        subscriptionStatus: "PendingFulfillmentStart",
        offerDetails: {
          publisherId: "pure_storage",
          offerId: "purestorage-block-offer",
          planId: "standard-plan",
          planName: "Standard Plan",
          termUnit: "month",
          termId: "12-month-term",
        },
      },
      user: {
        firstName: "John",
        lastName: "Doe",
        emailAddress: "john.doe@contoso.com",
        upn: "john.doe@contoso.com",
        phoneNumber: "+1-425-555-1234",
        companyDetails: {
          companyName: "Contoso Ltd.",
          address: {
            addressLine1: "1 Microsoft Way",
            addressLine2: "Suite 100",
            city: "Redmond",
            state: "Washington",
            country: "United States",
            postalCode: "98052",
          },
        },
      },
    },
    tags: { environment: "production" },
    location: "eastus",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await reservationsCreate();
}

main().catch(console.error);
