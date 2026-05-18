// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a reservation
 *
 * @summary update a reservation
 * x-ms-original-file: 2026-01-01-preview/Reservations_Update_MaximumSet_Gen.json
 */
async function reservationsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.reservations.update("rgpurestorage", "storagepool-01", {
    tags: { key8751: "oikntqrti" },
    properties: {
      user: {
        firstName: "sjzquetrvxcrajxdfwfeuro",
        lastName: "qimvqxnlbclfouwzfk",
        emailAddress: "john.doe@contoso.com",
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
