// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates operations available on Azure Managed HSM.
 *
 * @summary Shows key operations that require a Managed HSM endpoint:
 * creating OCT keys, getting key attestation, releasing keys, and getting random bytes.
 * Set AZURE_MANAGEDHSM_URI to run these samples.
 */

import { KeyClient } from "../../../../src/index.js";
import {
  AttestationAdministrationClient,
  AttestationClient,
  KnownAttestationType,
} from "@azure/attestation";
import { DefaultAzureCredential } from "@azure/identity";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { forPublishing } from "@azure-tools/test-publishing";
import { stringToUint8Array } from "./crypto.js";
import { openEnclaveReport, decodeBase64Url, getAttestationToken } from "./attestationUtils.js";
import { describe, it, beforeEach, afterEach } from "vitest";
// Load the .env file if it exists
import "dotenv/config";

describe("hsmOperations", () => {
  let recorder: Recorder;
  let hsmClient: KeyClient;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start({
      envSetupForPlayback: {
        AZURE_MANAGEDHSM_URI: "https://azure_managedhsm.managedhsm.azure.net/",
        AZURE_KEYVAULT_ATTESTATION_PROVIDER_URL: "https://azure_attestation.eus.attest.azure.net/",
      },
      removeCentralSanitizers: ["AZSDK3430"],
    });
    await recorder.setMatcher("BodilessMatcher");
    await recorder.addSanitizers({
      bodyKeySanitizers: [
        {
          jsonPath: "$.release_policy.data",
          value: "eyAic2FuaXRpemVkIjogInNhbml0aXplZCIgfQ==",
        },
      ],
    });
    const credential = forPublishing(createTestCredential(), () => new DefaultAzureCredential());
    hsmClient = forPublishing(
      new KeyClient(
        assertEnvironmentVariable("AZURE_MANAGEDHSM_URI"),
        credential,
        recorder.configureClientOptions({ disableChallengeResourceVerification: true }),
      ),
      () => new KeyClient(process.env["AZURE_MANAGEDHSM_URI"], credential),
    );
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("create an OCT key", async () => {
    // @snippet ReadmeSampleCreateOctKey
    const keyName = forPublishing(
      recorder.variable("octKeyName", `sample-oct-key-${Date.now()}`),
      () => "MyOctKeyName",
    );
    const result = await hsmClient.createOctKey(keyName, { hsm: true });
    console.log("result: ", result);
    // @snippet-end ReadmeSampleCreateOctKey
  });

  it("get key attestation", async () => {
    const keyName = forPublishing(
      recorder.variable("attestKeyName", `sample-attest-key-${Date.now()}`),
      () => "MyAttestKeyName",
    );
    await hsmClient.createRsaKey(keyName, { hsm: true });

    // @snippet ReadmeSampleGetKeyAttestation
    const latestKey = await hsmClient.getKeyAttestation(keyName);
    console.log(`Latest version of the key ${keyName}: `, latestKey);
    // @ts-preserve-whitespace
    const specificKey = await hsmClient.getKeyAttestation(keyName, {
      version: latestKey.properties.version!,
    });
    console.log(
      `The key ${keyName} at the version ${latestKey.properties.version!}: `,
      specificKey,
    );
    // @snippet-end ReadmeSampleGetKeyAttestation
  });

  it("release a key", async () => {
    const keyName = forPublishing(
      recorder.variable("releaseKeyName", `sample-release-key-${Date.now()}`),
      () => "myKey",
    );
    const attestationProviderUrl = forPublishing(
      assertEnvironmentVariable("AZURE_KEYVAULT_ATTESTATION_PROVIDER_URL"),
      () => process.env["AZURE_KEYVAULT_ATTESTATION_PROVIDER_URL"]!,
    );
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
    const attestation = await forPublishing(
      (async () => {
        const providerUrl = assertEnvironmentVariable("AZURE_KEYVAULT_ATTESTATION_PROVIDER_URL");
        const credential = createTestCredential();
        const adminClient = new AttestationAdministrationClient(
          providerUrl,
          credential,
          recorder.configureClientOptions({}),
        );
        const attestClient = new AttestationClient(
          providerUrl,
          credential,
          recorder.configureClientOptions({}),
        );
        try {
          await adminClient.setPolicy(
            KnownAttestationType.OpenEnclave,
            `version=1.0; authorizationrules{=> permit();}; issuancerules{issue(type="sdk-test", value="true");};`,
          );
          const result = await attestClient.attestOpenEnclave(decodeBase64Url(openEnclaveReport));
          return result.token.serialize();
        } finally {
          await adminClient.resetPolicy(KnownAttestationType.OpenEnclave);
        }
      })(),
      () =>
        getAttestationToken(
          process.env["AZURE_KEYVAULT_ATTESTATION_PROVIDER_URL"]!,
          new DefaultAzureCredential(),
          decodeBase64Url(openEnclaveReport),
        ),
    );

    // @snippet ReadmeSampleReleaseKey
    // @ts-preserve-whitespace
    const result = await hsmClient.releaseKey(keyName, attestation);
    console.log("result: ", result);
    // @snippet-end ReadmeSampleReleaseKey
  });

  it("get random bytes", async () => {
    // @snippet ReadmeSampleGetRandomBytes
    const bytes = await hsmClient.getRandomBytes(10);
    console.log("bytes: ", bytes);
    // @snippet-end ReadmeSampleGetRandomBytes
  });
});
