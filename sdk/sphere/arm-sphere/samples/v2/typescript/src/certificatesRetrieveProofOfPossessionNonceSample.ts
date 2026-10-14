// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSphereClient } from "@azure/arm-sphere";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the proof of possession nonce.
 *
 * @summary gets the proof of possession nonce.
 * x-ms-original-file: 2024-04-01/PostRetrieveProofOfPossessionNonce.json
 */
async function certificatesRetrieveProofOfPossessionNonce(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  const result = await client.certificates.retrieveProofOfPossessionNonce(
    "MyResourceGroup1",
    "MyCatalog1",
    "active",
    { proofOfPossessionNonce: "proofOfPossessionNonce" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await certificatesRetrieveProofOfPossessionNonce();
}

main().catch(console.error);
