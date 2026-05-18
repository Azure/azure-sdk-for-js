// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to finalize an already started AVS connection to a specific AVS SDDC
 *
 * @summary finalize an already started AVS connection to a specific AVS SDDC
 * x-ms-original-file: 2026-01-01-preview/StoragePools_FinalizeAvsConnection_MaximumSet_Gen.json
 */
async function storagePoolsFinalizeAvsConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  await client.storagePools.finalizeAvsConnection("rgpurestorage", "storagepool-01", {
    serviceInitializationDataEnc: "hlgzaxrohv",
    serviceInitializationData: {
      serviceAccountUsername: "axchgm",
      serviceAccountPassword: "i",
      vSphereIp: "lhbajnykbznxnxpxozyfdjaciennks",
      vSphereCertificate: "s",
    },
  });
}

async function main() {
  await storagePoolsFinalizeAvsConnection();
}

main().catch(console.error);
