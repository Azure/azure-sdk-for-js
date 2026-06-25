// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a reservation
 *
 * @summary update a reservation
 * x-ms-original-file: 2024-11-01/Reservations_Update_MaximumSet_Gen.json
 */
async function reservationsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "BC47D6CC-AA80-4374-86F8-19D94EC70666";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.reservations.update("rgpurestorage", "storagePoolname", {
    tags: { key8751: "oikntqrti" },
    properties: {
      user: {
        firstName: "sjzquetrvxcrajxdfwfeuro",
        lastName: "qimvqxnlbclfouwzfk",
        emailAddress: "abc@example.com",
        upn: "pvafwnbigmhuigxfu",
        phoneNumber: "jfljnoxsfsplwczwgvmlurfnorimvl",
        companyDetails: {
          companyName: "uleytbkckdhaiykwjjcjqmnlik",
          address: {
            addressLine1: "ryaasdffnhwialrgmukpiwtcjgbb",
            addressLine2: "cvyuuqnvuqfrpkoplfzmhnwrqsbsgn",
            city: "kdpzfxfbgozxwunkkhjthqdsnmce",
            state: "fygrbnektar",
            country: "trmpjpxsfmxprlnv",
            postalCode: "yjttfktdxdzhsgomefhcn",
          },
        },
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await reservationsUpdate();
}

main().catch(console.error);
