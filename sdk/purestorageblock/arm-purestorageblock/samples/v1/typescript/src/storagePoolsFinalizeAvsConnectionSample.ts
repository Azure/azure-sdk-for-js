// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to finalize an already started AVS connection to a specific AVS SDDC
 *
 * @summary finalize an already started AVS connection to a specific AVS SDDC
 * x-ms-original-file: 2024-11-01/StoragePools_FinalizeAvsConnection_MaximumSet_Gen.json
 */
async function storagePoolsFinalizeAvsConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "BC47D6CC-AA80-4374-86F8-19D94EC70666";
  const client = new BlockClient(credential, subscriptionId);
  await client.storagePools.finalizeAvsConnection("rgpurestorage", "storagePoolname", {
    serviceInitializationDataEnc: "hlgzaxrohv",
    serviceInitializationData: {
      serviceAccountUsername: "axchgm",
      serviceAccountPassword: "i",
      vSphereIp: "lhbajnykbznxnxpxozyfdjaciennks",
      vSphereCertificate: "s",
    },
  });
}

async function main(): Promise<void> {
  await storagePoolsFinalizeAvsConnection();
}

main().catch(console.error);
