// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Shows key operations that require a Managed HSM endpoint: creating OCT keys, getting key attestation, releasing keys, and getting random bytes. Set AZURE_MANAGEDHSM_URI to run these samples.
 */

// Load the .env file if it exists
import "dotenv/config";
import { DefaultAzureCredential } from "@azure/identity";
import { KeyClient } from "@azure/keyvault-keys";
import { openEnclaveReport, decodeBase64Url, getAttestationToken } from "./attestationUtils.js";
import { stringToUint8Array } from "./crypto.js";

let hsmClient: KeyClient;

async function createAnOctKey() {
  const keyName = "MyOctKeyName";
  const result = await hsmClient.createOctKey(keyName, { hsm: true });
  console.log("result: ", result);
}

async function getKeyAttestation() {
  const keyName = "MyAttestKeyName";
  await hsmClient.createRsaKey(keyName, { hsm: true });

  const latestKey = await hsmClient.getKeyAttestation(keyName);
  console.log(`Latest version of the key ${keyName}: `, latestKey);

  const specificKey = await hsmClient.getKeyAttestation(keyName, {
    version: latestKey.properties.version!,
  });
  console.log(`The key ${keyName} at the version ${latestKey.properties.version!}: `, specificKey);
}

async function releaseAKey() {
  const keyName = "myKey";
  const attestationProviderUrl = process.env["AZURE_KEYVAULT_ATTESTATION_PROVIDER_URL"]!;
  const encodedReleasePolicy = stringToUint8Array(
    JSON.stringify({
      anyOf: [
        { anyOf: [{ claim: "sdk-test", equals: "true" }], authority: attestationProviderUrl },
      ],
      version: "1.0.0",
    }),
  );
  await hsmClient.createRsaKey(keyName, {
    exportable: true,
    hsm: true,
    keyOps: ["encrypt", "decrypt"],
    releasePolicy: { encodedPolicy: encodedReleasePolicy },
  });
  // Obtain an attestation token from Azure Attestation Service using the OpenEnclave report.
  const attestation = await getAttestationToken(
    process.env["AZURE_KEYVAULT_ATTESTATION_PROVIDER_URL"]!,
    new DefaultAzureCredential(),
    decodeBase64Url(openEnclaveReport),
  );

  const result = await hsmClient.releaseKey(keyName, attestation);
  console.log("result: ", result);
}

async function getRandomBytes() {
  const bytes = await hsmClient.getRandomBytes(10);
  console.log("bytes: ", bytes);
}

export async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();
  hsmClient = new KeyClient(process.env["AZURE_MANAGEDHSM_URI"], credential);
  await createAnOctKey();
  await getKeyAttestation();
  await releaseAKey();
  await getRandomBytes();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
