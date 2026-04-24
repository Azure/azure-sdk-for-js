// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Shows key operations that require a Managed HSM endpoint: creating OCT keys, getting key attestation, releasing keys, and getting random bytes. Set AZURE_MANAGEDHSM_URI to run these samples.
 */

// Load the .env file if it exists
require("dotenv/config");
const { DefaultAzureCredential } = require("@azure/identity");
const { KeyClient } = require("@azure/keyvault-keys");
const {
  openEnclaveReport,
  decodeBase64Url,
  getAttestationToken,
} = require("./attestationUtils.js");
const { stringToUint8Array } = require("./crypto.js");

let hsmClient;

async function createAnOctKey() {
  const keyName = `MyOctKeyName-${Date.now()}`;
  const result = await hsmClient.createOctKey(keyName, { hsm: true });
  console.log("result: ", result);
}

async function getKeyAttestation() {
  const keyName = `MyAttestKeyName-${Date.now()}`;
  await hsmClient.createRsaKey(keyName, { hsm: true });

  const latestKey = await hsmClient.getKeyAttestation(keyName);
  console.log(`Latest version of the key ${keyName}: `, latestKey);
  // The attestation property contains the attestation certificate and blobs that
  // prove the key material was generated inside the HSM.
  console.log(`Attestation for ${keyName}: `, latestKey.properties.attestation);

  const specificKey = await hsmClient.getKeyAttestation(keyName, {
    version: latestKey.properties.version,
  });
  console.log(`The key ${keyName} at the version ${latestKey.properties.version}: `, specificKey);
}

async function releaseAKey() {
  const keyName = `MyReleaseKey-${Date.now()}`;
  const attestationProviderUrl =
    process.env["AZURE_KEYVAULT_ATTESTATION_PROVIDER_URL"] ??
    (() => {
      throw new Error("AZURE_KEYVAULT_ATTESTATION_PROVIDER_URL environment variable is required.");
    })();
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
    attestationProviderUrl,
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

async function main() {
  const credential = new DefaultAzureCredential();
  const hsmUri =
    process.env["AZURE_MANAGEDHSM_URI"] ??
    (() => {
      throw new Error("AZURE_MANAGEDHSM_URI environment variable is required.");
    })();
  hsmClient = new KeyClient(hsmUri, credential);
  await createAnOctKey();
  await getKeyAttestation();
  await releaseAKey();
  await getRandomBytes();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

module.exports = { main };
