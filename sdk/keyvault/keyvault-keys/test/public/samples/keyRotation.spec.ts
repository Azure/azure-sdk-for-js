// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Creates and updates a key's automated rotation policy, and rotates a key on-demand.
 */

import { KeyClient } from "../../../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { forPublishing } from "@azure-tools/test-publishing";
import { describe, it, beforeEach, afterEach } from "vitest";
// Load the .env file if it exists
import "dotenv/config";

describe("keyRotation", () => {
  let recorder: Recorder;
  let client: KeyClient;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start({
      envSetupForPlayback: {
        KEYVAULT_URI: "https://keyvault_name.vault.azure.net/",
      },
      removeCentralSanitizers: ["AZSDK3430"],
    });
    // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
    // See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
    // about DefaultAzureCredential and the other credentials that are available for use.
    client = forPublishing(
      new KeyClient(
        assertEnvironmentVariable("KEYVAULT_URI"),
        createTestCredential(),
        recorder.configureClientOptions({ disableChallengeResourceVerification: true }),
      ),
      () =>
        new KeyClient(
          process.env["KEYVAULT_URI"] || "<keyvault-url>",
          new DefaultAzureCredential(),
        ),
    );
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("create rotation policy and rotate", async () => {
    const keyName = forPublishing(
      recorder.variable("rotationKeyName", `key-rotation-sample-key-${Date.now()}`),
      () => `key-rotation-sample-key-${Date.now()}`,
    );

    const key = await client.createKey(keyName, "EC");
    console.log("created key", key);

    // Set the key's automated rotation policy to rotate the key 30 days after the key is created.
    const policy = await client.updateKeyRotationPolicy(key.name, {
      lifetimeActions: [
        {
          action: "Rotate",
          timeAfterCreate: "P30D",
        },
      ],
    });
    console.log("created policy", policy);

    // Get the key's current rotation policy
    const currentPolicy = await client.getKeyRotationPolicy(key.name);
    console.log("fetched policy", currentPolicy);

    // Update the key's automated rotation policy to notify 30 days before the key expires.
    // By using the ISO8601 duration standard, interoperability with any 3rd party library that supports Durations is supported.
    // For more information on the ISO 8601 Duration standard, please refer to the Wikipedia page on Durations:
    // https://wikipedia.org/wiki/ISO_8601#Durations
    const updatedPolicy = await client.updateKeyRotationPolicy(key.name, {
      lifetimeActions: [
        {
          action: "Notify",
          timeBeforeExpiry: "P30D",
        },
      ],
      expiresIn: "P90D",
    });
    console.log("updated policy", updatedPolicy);

    // Rotate the key on-demand, generating a new version of the key.
    const newKeyVersion = await client.rotateKey(key.name);
    console.log("rotated key", newKeyVersion);
  });

  it("get a key rotation policy", async () => {
    const keyName = forPublishing(
      recorder.variable("getRotPolicyKeyName", `key-getrotpol-${Date.now()}`),
      () => "MyKeyName",
    );
    await client.createKey(keyName, "EC");

    // @snippet ReadmeSampleGetKeyRotationPolicy
    const result = await client.getKeyRotationPolicy(keyName);
    console.log("result: ", result);
    // @snippet-end ReadmeSampleGetKeyRotationPolicy
  });

  it("update a key rotation policy", async () => {
    const keyName = forPublishing(
      recorder.variable("updRotPolicyKeyName", `key-updrotpol-${Date.now()}`),
      () => "MyKeyName",
    );
    await client.createKey(keyName, "EC");

    // @snippet ReadmeSampleUpdateKeyRotationPolicy
    const myPolicy = await client.getKeyRotationPolicy(keyName);
    // @ts-preserve-whitespace
    const setPolicy = await client.updateKeyRotationPolicy(keyName, myPolicy);
    console.log("setPolicy: ", setPolicy);
    // @snippet-end ReadmeSampleUpdateKeyRotationPolicy
  });

  it("rotate a key", async () => {
    const keyName = forPublishing(
      recorder.variable("keyRotationKeyName", `key-rotation-${Date.now()}`),
      () => "MyKeyName",
    );
    await client.createKey(keyName, "EC");

    // @snippet ReadmeSampleKeyRotation
    // Set the key's automated rotation policy to rotate the key 30 days before expiry.
    const policy = await client.updateKeyRotationPolicy(keyName, {
      lifetimeActions: [
        {
          action: "Rotate",
          timeBeforeExpiry: "P30D",
        },
      ],
      // You may also specify the duration after which any newly rotated key will expire.
      // In this case, any new key versions will expire after 90 days.
      expiresIn: "P90D",
    });
    // @ts-preserve-whitespace
    // You can get the current key rotation policy of a given key by calling the getKeyRotationPolicy method.
    const currentPolicy = await client.getKeyRotationPolicy(keyName);
    console.log("currentPolicy: ", currentPolicy);
    // @ts-preserve-whitespace
    // Finally, you can rotate a key on-demand by creating a new version of the given key.
    const rotatedKey = await client.rotateKey(keyName);
    console.log("rotatedKey: ", rotatedKey);
    // @snippet-end ReadmeSampleKeyRotation
  });
});
