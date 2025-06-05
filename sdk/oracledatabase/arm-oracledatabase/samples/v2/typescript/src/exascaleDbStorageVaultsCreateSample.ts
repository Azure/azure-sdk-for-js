// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a ExascaleDbStorageVault
 *
 * @summary create a ExascaleDbStorageVault
 * x-ms-original-file: 2025-03-01/ExascaleDbStorageVaults_Create_MaximumSet_Gen.json
 */
async function exascaleDbStorageVaultsCreateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.exascaleDbStorageVaults.create("rgopenapi", "vmClusterName", {
    properties: {
      additionalFlashCacheInPercent: 0,
      description: "dmnvnnduldfmrmkkvvsdtuvmsmruxzzpsfdydgytlckutfozephjygjetrauvbdfcwmti",
      displayName:
        "hbsybtelyvhpalemszcvartlhwvskrnpiveqfblvkdihoytqaotdgsgauvgivzaftfgeiwlyeqzssicwrrnlxtsmeakbcsxabjlt",
      highCapacityDatabaseStorageInput: { totalSizeInGbs: 21 },
      highCapacityDatabaseStorage: {
        availableSizeInGbs: 28,
        totalSizeInGbs: 16,
      },
      timeZone:
        "ltrbozwxjunncicrtzjrpqnqrcjgghohztrdlbfjrbkpenopyldwolslwgrgumjfkyovvkzcuxjujuxtjjzubvqvnhrswnbdgcbslopeofmtepbrrlymqwwszvsglmyuvlcuejshtpokirwklnwpcykhyinjmlqvxtyixlthtdishhmtipbygsayvgqzfrprgppylydlcskbmvwctxifdltippfvsxiughqbojqpqrekxsotnqsk",
      lifecycleState: "Provisioning",
      ocid: "ocid1.autonomousdatabase.oc1..aaaaa3klq",
    },
    zones: ["qk"],
    tags: { key7827: "xqi" },
    location: "ltguhzffucaytqg",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await exascaleDbStorageVaultsCreateMaximumSet();
}

main().catch(console.error);
