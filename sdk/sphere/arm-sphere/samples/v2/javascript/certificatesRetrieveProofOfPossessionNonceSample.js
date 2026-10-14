// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureSphereClient } = require("@azure/arm-sphere");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the proof of possession nonce.
 *
 * @summary gets the proof of possession nonce.
 * x-ms-original-file: 2024-04-01/PostRetrieveProofOfPossessionNonce.json
 */
async function certificatesRetrieveProofOfPossessionNonce() {
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

async function main() {
  await certificatesRetrieveProofOfPossessionNonce();
}

main().catch(console.error);
