// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createHash } from "node:crypto";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";
import {
  AttestationAdministrationClient,
  AttestationClient,
  createAttestationPolicyToken,
  KnownAttestationType,
} from "@azure/attestation";
import { DefaultAzureCredential } from "@azure/identity";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const endpoint = "https://<attestation-instance>.<region>.attest.azure.net";
    const credentials = new DefaultAzureCredential();
    const client = new AttestationClient(endpoint, credentials);
    // @ts-preserve-whitespace
    // Retrieve the set of attestation policy signers from the attestation client.
    const attestationSigners = await client.getAttestationSigners();
  });

  it("ReadmeSampleCreateClient_Node_NoCreds", async () => {
    const endpoint = "https://<attestation-instance>.<region>.attest.azure.net";
    const client = new AttestationClient(endpoint);
    // @ts-preserve-whitespace
    // Retrieve the set of attestation policy signers from the attestation client.
    const attestationSigners = await client.getAttestationSigners();
  });

  it("ReadmeSampleCreateAdminClient_Node", async () => {
    const endpoint = "https://<attestation-instance>.<region>.attest.azure.net";
    const client = new AttestationAdministrationClient(endpoint, new DefaultAzureCredential());
    // @ts-preserve-whitespace
    // Retrieve the SGX policy from the specified attestation instance.
    const policyResponse = await client.getPolicy(KnownAttestationType.SgxEnclave);
  });

  it("ReadmeSampleGetPolicy", async () => {
    const endpoint = "https://<attestation-instance>.<region>.attest.azure.net";
    const client = new AttestationAdministrationClient(endpoint, new DefaultAzureCredential());
    // @ts-preserve-whitespace
    const policyResponse = await client.getPolicy(KnownAttestationType.OpenEnclave);
    // The text policy document is available in the `policyResult.body`
    // property.

    // The actual attestation token returned by the MAA service is available
    // in `policyResult.token`.
  });

  it("SetPolicy", async () => {
    const endpoint = "https://<attestation-instance>.<region>.attest.azure.net";
    const client = new AttestationAdministrationClient(endpoint, new DefaultAzureCredential());
    // @ts-preserve-whitespace
    const newPolicy = `<New Attestation Policy>`;
    // @ts-preserve-whitespace
    // Set the new attestation policy. Set the policy as an unsecured policy.
    const setPolicyResult = await client.setPolicy(KnownAttestationType.SgxEnclave, newPolicy);
  });

  it("SetPolicyIsolated", async () => {
    const endpoint = "https://<attestation-instance>.<region>.attest.azure.net";
    const client = new AttestationAdministrationClient(endpoint, new DefaultAzureCredential());
    // @ts-preserve-whitespace
    const newPolicy = `<New Policy Document>`;
    // @ts-preserve-whitespace
    // Set the new attestation policy. Set the policy as an secured policy.
    const privateKey = "<Retrieve isolated mode private key from storage>";
    const certificate = "<Retrieve certificate associated with that private key>";
    // @ts-preserve-whitespace
    const setPolicyResult = await client.setPolicy(KnownAttestationType.OpenEnclave, newPolicy, {
      privateKey: privateKey,
      certificate: certificate,
    });
  });

  it("CreatePolicyToken", async () => {
    // Set the new attestation policy. Set the policy as an secured policy.
    const privateKey = "<Retrieve isolated mode private key from storage>";
    const certificate = "<Retrieve certificate associated with that private key>";
    // @ts-preserve-whitespace
    const expectedPolicy = createAttestationPolicyToken(
      `<Policy Document>`,
      privateKey,
      certificate,
    );
    // @ts-preserve-whitespace
    // Use your favorite SHA256 hash generator function to create a hash of the stringified JWS.
    const expectedHash = createHash("sha256").update(expectedPolicy.serialize()).digest("hex");
    // @ts-preserve-whitespace
    // The hash returned in expectedHash should match the value in
    // `setResult.body.policyTokenHash`.
  });

  it("AttestOpenEnclave_RuntimeData", async () => {
    const endpoint = "https://<attestation-instance>.<region>.attest.azure.net";
    const credentials = new DefaultAzureCredential();
    const client = new AttestationClient(endpoint, credentials);
    // @ts-preserve-whitespace
    const report = new Uint8Array(0); // Report data from the enclave.
    const binaryRuntimeData = new Uint8Array(0); // Runtime data from the enclave.
    // @ts-preserve-whitespace
    const attestationResult = await client.attestOpenEnclave(report, {
      runTimeData: binaryRuntimeData,
    });
  });

  it("AttestOpenEnclave_RuntimeJson", async () => {
    const endpoint = "https://<attestation-instance>.<region>.attest.azure.net";
    const credentials = new DefaultAzureCredential();
    const client = new AttestationClient(endpoint, credentials);
    // @ts-preserve-whitespace
    const report = new Uint8Array(0); // Report data from the enclave.
    const binaryRuntimeData = new Uint8Array(0); // Runtime JSON data from the enclave.
    // @ts-preserve-whitespace
    const attestationResult = await client.attestOpenEnclave(report, {
      runTimeJson: binaryRuntimeData,
    });
  });

  it("AttestSgxEnclave", async () => {
    const endpoint = "https://<attestation-instance>.<region>.attest.azure.net";
    const credentials = new DefaultAzureCredential();
    const client = new AttestationClient(endpoint, credentials);
    // @ts-preserve-whitespace
    const quote = new Uint8Array(0); // Quote data.
    const binaryRuntimeData = new Uint8Array(0); // Runtime JSON data from the enclave.
    // @ts-preserve-whitespace
    const attestationResult = await client.attestSgxEnclave(quote, {
      runTimeData: binaryRuntimeData,
    });
  });

  it("GetSigningCertificates", async () => {
    const endpoint = "https://<attestation-instance>.<region>.attest.azure.net";
    const credentials = new DefaultAzureCredential();
    const client = new AttestationClient(endpoint, credentials);
    // @ts-preserve-whitespace
    const attestationSigners = await client.getAttestationSigners();
    // @ts-preserve-whitespace
    console.log(`There are ${attestationSigners.length} signers`);
  });

  it("Troubleshooting", async () => {
    const endpoint = "https://<attestation-instance>.<region>.attest.azure.net";
    const credentials = new DefaultAzureCredential();
    const client = new AttestationClient(endpoint, credentials);
    // @ts-preserve-whitespace
    const openEnclaveReport = new Uint8Array(0); // Open enclave report data
    // @ts-preserve-whitespace
    try {
      await client.attestSgxEnclave(openEnclaveReport);
    } catch (error) {
      console.log(`Exception thrown for invalid request: ${error.message}`);
    }
  });

  it("Attestation_Constructor_NoCreds", async () => {
    const endpoint = "https://<attestation-instance>.<region>.attest.azure.net";
    const client = new AttestationClient(endpoint);
  });

  it("Attestation_Constructor_Creds", async () => {
    const endpoint = "https://<attestation-instance>.<region>.attest.azure.net";
    const credentials = new DefaultAzureCredential();
    const client = new AttestationClient(endpoint, credentials);
  });

  it("AttestationClient_AttestTpm", async () => {
    const endpoint = "https://<attestation-instance>.<region>.attest.azure.net";
    const credentials = new DefaultAzureCredential();
    const client = new AttestationClient(endpoint, credentials);
    // @ts-preserve-whitespace
    const encodedPayload = JSON.stringify({ payload: { type: "aikcert" } });
    const result = await client.attestTpm(encodedPayload);
  });

  it("AttestationAdministrationClient_Constructor", async () => {
    const endpoint = "https://<attestation-instance>.<region>.attest.azure.net";
    const client = new AttestationAdministrationClient(endpoint, new DefaultAzureCredential());
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
