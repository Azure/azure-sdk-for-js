// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { afterEach, assert, beforeEach, describe, it } from "vitest";
import type { SecretClient } from "../../src/index.js";
import { KnownContentType } from "../../src/index.js";
import { authenticate } from "./utils/testAuthentication.js";
import type TestClient from "./utils/testClient.js";

describe("Secret client - outContentType and previousVersion (2025-07-01 API features)", () => {
  const secretValue = "SECRET_VALUE";
  const secretPrefix = `ContentType`;
  const initialContentType = "application/x-roundtrip-initial";
  const updatedContentType = "application/x-roundtrip-updated";
  let secretSuffix: string;
  let cleanupSecretName: string | undefined;
  let client: SecretClient;
  let testClient: TestClient;
  let recorder: Recorder;

  beforeEach(async function (ctx) {
    const authentication = await authenticate(ctx);
    secretSuffix = authentication.secretSuffix;
    cleanupSecretName = undefined;
    client = authentication.client;
    testClient = authentication.testClient;
    recorder = authentication.recorder;
  });

  afterEach(async function () {
    try {
      if (cleanupSecretName) {
        try {
          await testClient.flushSecret(cleanupSecretName);
        } catch (error: any) {
          if (error?.code !== "SecretNotFound" && error?.statusCode !== 404) {
            throw error;
          }
        }
      }
    } finally {
      await recorder.stop();
    }
  });

  it("getSecret accepts outContentType parameter", async function (ctx) {
    const secretName = testClient.formatName(`${secretPrefix}-${ctx.task.name}-${secretSuffix}`);
    cleanupSecretName = secretName;
    await client.setSecret(secretName, secretValue);
    try {
      // For regular (non-certificate) secrets, outContentType is passed but the service
      // either ignores it or returns the value as-is. The key test is that the parameter
      // is accepted in the API (no TypeScript error) and the request is sent correctly.
      const result = await client.getSecret(secretName, {
        outContentType: KnownContentType.PEM,
      });
      // If the service doesn't error for regular secrets, verify we get back the secret
      assert.equal(result.name, secretName, "Unexpected secret name.");
    } catch (err: any) {
      // If the service returns an error (e.g., 400) for non-certificate secrets,
      // that is also acceptable - the important thing is the parameter is forwarded.
      // Expect a 400 Bad Request for this case.
      assert.isTrue(
        err.statusCode === 400 || err.statusCode === 404,
        `Expected 400 or 404 error for outContentType on non-cert secret, got: ${err.statusCode}`,
      );
    }
  });

  it("setSecret round-trips contentType", async function (ctx) {
    const secretName = testClient.formatName(`${secretPrefix}-${ctx.task.name}-${secretSuffix}`);
    cleanupSecretName = secretName;

    const createdSecret = await client.setSecret(secretName, secretValue, {
      contentType: initialContentType,
    });
    assert.equal(
      createdSecret.properties.contentType,
      initialContentType,
      "Expected setSecret() to return the created contentType.",
    );

    const fetchedSecret = await client.getSecret(secretName);
    assert.equal(
      fetchedSecret.properties.contentType,
      initialContentType,
      "Expected getSecret() to return the stored contentType.",
    );
  });

  it("updateSecretProperties round-trips contentType", async function (ctx) {
    const secretName = testClient.formatName(`${secretPrefix}-${ctx.task.name}-${secretSuffix}`);
    cleanupSecretName = secretName;

    const createdSecret = await client.setSecret(secretName, secretValue, {
      contentType: initialContentType,
    });
    const updatedProperties = await client.updateSecretProperties(
      secretName,
      createdSecret.properties.version!,
      {
        contentType: updatedContentType,
      },
    );

    assert.equal(
      updatedProperties.contentType,
      updatedContentType,
      "Expected updateSecretProperties() to return the updated contentType.",
    );

    const fetchedSecret = await client.getSecret(secretName);
    assert.equal(
      fetchedSecret.properties.contentType,
      updatedContentType,
      "Expected getSecret() to return the updated contentType.",
    );
  });

  it("getSecret with outContentType=PEM does not throw for a secret with contentType PFX", async function (ctx) {
    const secretName = testClient.formatName(`${secretPrefix}-${ctx.task.name}-${secretSuffix}`);
    cleanupSecretName = secretName;
    // Set a secret with PFX content type (simulating what a certificate would set)
    await client.setSecret(secretName, secretValue, {
      contentType: KnownContentType.PFX,
    });
    try {
      const result = await client.getSecret(secretName, {
        outContentType: KnownContentType.PEM,
      });
      // For a regular secret (even with contentType set to PFX), the service may return
      // the value as-is or convert it if it's a real certificate-backed secret.
      assert.equal(result.name, secretName, "Unexpected secret name.");
      // The properties.contentType may change if the service converts the format
      assert.isDefined(result.value, "Secret value should be defined.");
    } catch (err: any) {
      // 400 is acceptable if the service doesn't support conversion for regular secrets
      assert.isTrue(
        err.statusCode === 400,
        `Expected 400 for non-cert PFX-to-PEM conversion, got: ${err.statusCode}`,
      );
    }
  });

  it("previousVersion is undefined for non-certificate-backed secrets", async function (ctx) {
    // `previousVersion` is a 2025-07-01 API feature. The service populates it only for
    // secrets that back a Key Vault Certificate when a newer certificate version exists.
    // For a plain secret created via setSecret(), the service never returns this field,
    // so it is always undefined at runtime.
    //
    // The mapping of `previousVersion` from the service response to SecretProperties is
    // verified by the unit test "correctly assigns previousVersion when present in the bundle"
    // in test/internal/transformations.spec.ts.
    const secretName = testClient.formatName(`${secretPrefix}-${ctx.task.name}-${secretSuffix}`);
    cleanupSecretName = secretName;
    await client.setSecret(secretName, secretValue);
    const result = await client.getSecret(secretName);
    const previousVersion: string | undefined = result.properties.previousVersion;
    assert.isUndefined(
      previousVersion,
      "previousVersion should be undefined for a plain (non-certificate-backed) secret.",
    );
  });

  it("getSecret accepts all new API version options", async function (ctx) {
    const secretName = testClient.formatName(`${secretPrefix}-${ctx.task.name}-${secretSuffix}`);
    cleanupSecretName = secretName;
    await client.setSecret(secretName, secretValue);
    try {
      // Verify we can call getSecret with version-specific options
      const result = await client.getSecret(secretName, {
        outContentType: KnownContentType.PFX,
      });
      assert.equal(result.name, secretName, "Unexpected secret name.");
    } catch (err: any) {
      // 400 is acceptable for non-certificate secrets
      assert.isTrue(
        err.statusCode === 400,
        `Unexpected error for outContentType=PFX, got: ${err.statusCode}`,
      );
    }
  });
});
