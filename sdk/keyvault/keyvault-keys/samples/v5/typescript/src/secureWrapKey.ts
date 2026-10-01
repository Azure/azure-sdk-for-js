// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Wraps a TEE-generated symmetric key with a Key Vault key, then unwraps it.
 *
 * Demonstrates the SECURE WRAP and SECURE UNWRAP operations on Azure Managed
 * HSM. Unlike the regular wrap/unwrap operations, the symmetric key being
 * wrapped is generated inside a Trusted Execution Environment (TEE) and the
 * unwrap operation is gated by attestation through Microsoft Azure
 * Attestation (MAA).
 *
 * These operations are only available on Managed HSM and require an
 * exportable RSA key with an appropriate release policy. Replace
 * `<attestation-target>` below with a valid MAA token for your environment.
 */

import { KeyClient } from "@azure/keyvault-keys";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

export async function main(): Promise<void> {
  // DefaultAzureCredential supports several authentication mechanisms.
  // See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme
  const credential = new DefaultAzureCredential();

  // Secure wrap/unwrap operations require a Managed HSM endpoint.
  const url = process.env["AZURE_MANAGEDHSM_URI"] || "<managed-hsm-url>";
  const client = new KeyClient(url, credential);

  // The wrapping key must already exist in the Managed HSM and have a
  // release policy that permits secure wrap/unwrap.
  const keyName = process.env["KEY_NAME"] || "myWrappingKey";

  // 1) Generate and wrap a 256-bit AES key inside the TEE using the wrapping key.
  const wrapped = await client.secureWrapKey(keyName, "RSA-OAEP-256");
  console.log("Wrapped key:");
  console.log("  keyID    :", wrapped.keyID);
  console.log("  algorithm:", wrapped.algorithm);
  console.log("  bytes    :", wrapped.result.byteLength);

  // 2) Unwrap the wrapped key. The attestation token must be issued by an MAA
  //    instance trusted by your Managed HSM.
  const attestationToken = process.env["MAA_ATTESTATION_TOKEN"] || "<attestation-target>";

  const unwrapped = await client.secureUnwrapKey(
    keyName,
    wrapped.algorithm,
    wrapped.result,
    attestationToken,
  );
  console.log("Unwrapped key:");
  console.log("  keyID    :", unwrapped.keyID);
  console.log("  algorithm:", unwrapped.algorithm);
  console.log("  bytes    :", unwrapped.result.byteLength);
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
