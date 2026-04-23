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
  createDefaultHttpClient,
  createEmptyPipeline,
  createPipelineRequest,
  type PipelinePolicy,
} from "@azure/core-rest-pipeline";
import { DefaultAzureCredential } from "@azure/identity";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { forPublishing } from "@azure-tools/test-publishing";
import { stringToUint8Array } from "./crypto.js";
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
        AZURE_KEYVAULT_ATTESTATION_URI: "https://azure_attestation.azurewebsites.net/",
      },
      removeCentralSanitizers: ["AZSDK3430"],
    });
    await recorder.setMatcher("BodilessMatcher");
    const credential = forPublishing(createTestCredential(), () => new DefaultAzureCredential());
    hsmClient = forPublishing(
      new KeyClient(
        assertEnvironmentVariable("AZURE_MANAGEDHSM_URI"),
        credential,
        recorder.configureClientOptions({ disableChallengeResourceVerification: true }),
      ),
      () =>
        new KeyClient(process.env["AZURE_MANAGEDHSM_URI"], credential),
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
    const attestationAuthority = forPublishing(
      assertEnvironmentVariable("AZURE_KEYVAULT_ATTESTATION_URI"),
      () => process.env["AZURE_KEYVAULT_ATTESTATION_URI"]!,
    );
    const encodedReleasePolicy = stringToUint8Array(
      JSON.stringify({
        anyOf: [
          { anyOf: [{ claim: "sdk-test", equals: "true" }], authority: attestationAuthority },
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
    // Fetch the attestation token from your Azure Attestation Service endpoint.
    const attestation = await forPublishing(
      (async () => {
        const { additionalPolicies } = recorder.configureClientOptions({});
        const attestationPipeline = createEmptyPipeline();
        for (const { policy, position } of additionalPolicies ?? []) {
          attestationPipeline.addPolicy(policy as PipelinePolicy, {
            afterPhase: position === "perRetry" ? "Sign" : undefined,
          });
        }
        const response = await attestationPipeline.sendRequest(
          createDefaultHttpClient(),
          createPipelineRequest({ url: `${attestationAuthority}/generate-test-token` }),
        );
        return JSON.parse(response.bodyAsText!).token as string;
      })(),
      async () =>
        createDefaultHttpClient()
          .sendRequest(
            createPipelineRequest({ url: `${attestationAuthority}/generate-test-token` }),
          )
          .then((r) => JSON.parse(r.bodyAsText!).token as string),
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
