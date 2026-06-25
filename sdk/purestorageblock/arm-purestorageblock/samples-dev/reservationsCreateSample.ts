// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a reservation
 *
 * @summary create a reservation
 * x-ms-original-file: 2024-11-01/Reservations_Create_MaximumSet_Gen.json
 */
async function reservationsCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "BC47D6CC-AA80-4374-86F8-19D94EC70666";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.reservations.create("rgpurestorage", "storagePoolname", {
    properties: {
      marketplace: {
        subscriptionStatus: "PendingFulfillmentStart",
        offerDetails: {
          publisherId: "vejockfhoavaqjvhtwvctdnaefvw",
          offerId: "efojrbphbimq",
          planId: "caj",
          planName: "lvvzchm",
          termUnit: "ose",
          termId: "ucyvzkedohfjazifxweylhnbcmeza",
        },
      },
      user: {
        firstName: "bucysqbbclhwxrzig",
        lastName: "fnsvxlop",
        emailAddress: "abc@example.com",
        upn: "ekqbqgpdylggddusuiifrnjcwiefay",
        phoneNumber: "jglihtgsacdxocc",
        companyDetails: {
          companyName: "nrndfzmrakk",
          address: {
            addressLine1: "f",
            addressLine2: "gycfosmknj",
            city: "qxzhxjoatyuajoljfkd",
            state: "dnusygshfvmebpmcjsd",
            country: "nuexbknolfphlfguyzq",
            postalCode: "yjzqichkfffbdtcswzolmrl",
          },
        },
      },
    },
    tags: { key1110: "euhfdmtfpucwurtu" },
    location: "jynnbjysbc",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await reservationsCreate();
}

main().catch(console.error);
