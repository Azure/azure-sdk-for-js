// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Uses a SecretClient to create, read, and update a secret in various ways.
 */

import { SecretClient } from "../../../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { forPublishing } from "@azure-tools/test-publishing";
import { describe, it, beforeEach, afterEach } from "vitest";
// Load the .env file if it exists
import "dotenv/config";

describe("helloWorld", () => {
  let recorder: Recorder;
  let client: SecretClient;

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
      new SecretClient(
        assertEnvironmentVariable("KEYVAULT_URI"),
        createTestCredential(),
        recorder.configureClientOptions({ disableChallengeResourceVerification: true }),
      ),
      () =>
        new SecretClient(
          process.env["KEYVAULT_URI"] || "<keyvault-url>",
          new DefaultAzureCredential(),
        ),
    );
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("create and read a secret", async () => {
    // Create a secret
    // The secret can be a string of any kind. For example,
    // a multiline text block such as an RSA private key with newline characters,
    // or a stringified JSON object, like `JSON.stringify({ mySecret: 'MySecretValue'})`.
    const secretName = forPublishing(
      recorder.variable("createReadSecretName", `sample-create-read-secret-${Date.now()}`),
      () => "MySecretName",
    );
    // @snippet ReadmeSampleCreateSecret
    const result = await client.setSecret(secretName, "MySecretValue");
    console.log("result: ", result);
    // @snippet-end ReadmeSampleCreateSecret

    // @snippet ReadmeSampleGetSecret
    // Read the secret we created
    const latestSecret = await client.getSecret(secretName);
    console.log(`Latest version of the secret ${secretName}: `, latestSecret);
    // @ts-preserve-whitespace
    const specificSecret = await client.getSecret(secretName, {
      version: latestSecret.properties.version!,
    });
    console.log(
      `The secret ${secretName} at the version ${latestSecret.properties.version!}: `,
      specificSecret,
    );
    // @snippet-end ReadmeSampleGetSecret
  });

  it("update secret properties", async () => {
    const secretName = forPublishing(
      recorder.variable("updateSecretName", `sample-update-secret-${Date.now()}`),
      () => "MySecretName",
    );
    await client.setSecret(secretName, "MySecretValue");

    // @snippet ReadmeSampleUpdateSecretAttributes
    // Update the secret with different attributes
    const result = await client.getSecret(secretName);
    await client.updateSecretProperties(secretName, result.properties.version!, {
      enabled: false,
    });
    // @snippet-end ReadmeSampleUpdateSecretAttributes
  });

  it("delete the secret", async () => {
    const secretName = forPublishing(
      recorder.variable("deleteSecretName", `sample-delete-secret-${Date.now()}`),
      () => "MyDeleteSecret",
    );
    await client.setSecret(secretName, "MySecretValue");

    // @snippet ReadmeSampleDeleteSecret
    // Delete the secret
    // If we don't want to purge the secret later, we don't need to wait until this finishes
    await client.beginDeleteSecret(secretName);
    // @snippet-end ReadmeSampleDeleteSecret
  });

  it("create a secret with attributes", async () => {
    const secretName = forPublishing(
      recorder.variable("createSecretWithAttrsName", `sample-attrs-secret-${Date.now()}`),
      () => "MyAttrsSecret",
    );

    // @snippet ReadmeSampleCreateSecretWithAttributes
    const result = await client.setSecret(secretName, "MySecretValue", {
      enabled: false,
    });
    console.log("result: ", result);
    // @snippet-end ReadmeSampleCreateSecretWithAttributes
  });
});
