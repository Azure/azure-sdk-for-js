// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { createRecorder, createRecordedClient } from "./utils/recordedClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { PlanetaryComputerProClient } from "../../src/index.js";
import { EnvironmentVariableNames, assertEnvironmentVariable } from "./utils/envVars.js";

/**
 * Test suite for Shared Access Signature (SAS) operations.
 * Ported from Python test_planetary_computer_03_shared_access_signature.py
 */
describe("Shared Access Signature", () => {
  let recorder: Recorder;
  let client: PlanetaryComputerProClient;

  beforeEach(async function (context) {
    recorder = await createRecorder(context);
    client = await createRecordedClient(recorder);
  });

  afterEach(async function () {
    if (recorder) {
      await recorder.stop();
    }
  });

  it("test_01_get_token_with_default_duration - should generate a SAS token with default duration", async function () {
    console.log("=".repeat(80));
    console.log("TEST: test_01_get_token_with_default_duration");
    console.log("=".repeat(80));

    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );

    console.log(`Input - collection_id: ${collectionId}`);
    console.log(`Calling: getToken(collectionId=${collectionId})`);

    const response = await client.sharedAccessSignature.getToken(collectionId);

    console.log(`Response type: ${typeof response}`);
    console.log(`Response: ${JSON.stringify(response)}`);

    // Assert response is correct type
    assert.isDefined(response, "Response should not be undefined");
    assert.property(response, "token", "Response should have token property");
    assert.property(response, "expiresOn", "Response should have expiresOn property");

    // Verify token format
    if (!isPlaybackMode()) {
      // In live mode, verify SAS token format with regex
      const sasTokenPattern = /st=[^&]+&se=[^&]+&sp=[^&]+&sv=[^&]+&sr=[^&]+&.*sig=[^&]+/;
      assert.match(
        response.token!,
        sasTokenPattern,
        "Token should match SAS token format (st, se, sp, sv, sr, sig)",
      );
    } else {
      // In playback mode, just verify token exists as a non-empty string
      assert.isString(response.token, "Token should be a string");
      assert.isTrue(response.token!.length > 0, "Token should not be empty");
    }

    // Verify expiresOn is a Date in the future
    assert.instanceOf(response.expiresOn, Date, "expiresOn should be a Date object");

    if (!isPlaybackMode()) {
      const now = new Date();
      assert.isTrue(response.expiresOn! > now, "Token expiry should be in the future");

      // Verify default duration is approximately 24 hours (allow 5 minute tolerance for clock skew)
      const expectedExpiry = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      const timeDiff = Math.abs(response.expiresOn!.getTime() - expectedExpiry.getTime()) / 1000;
      assert.isTrue(timeDiff < 300, `Expiry should be ~24 hours from now (diff: ${timeDiff}s)`);
    }

    console.log("Test PASSED\n");
  });

  it("test_02_get_token_with_custom_duration - should generate a SAS token with custom duration", async function () {
    console.log("=".repeat(80));
    console.log("TEST: test_02_get_token_with_custom_duration");
    console.log("=".repeat(80));

    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );

    console.log(`Input - collection_id: ${collectionId}`);
    console.log("Input - durationInMinutes: 60");
    console.log(`Calling: getToken(collectionId=${collectionId}, durationInMinutes=60)`);

    const response = await client.sharedAccessSignature.getToken(collectionId, {
      durationInMinutes: 60,
    });

    console.log(`Response type: ${typeof response}`);
    console.log(`Response: ${JSON.stringify(response)}`);

    // Assert response is correct type
    assert.isDefined(response, "Response should not be undefined");
    assert.property(response, "token", "Response should have token property");
    assert.property(response, "expiresOn", "Response should have expiresOn property");

    // Verify token format
    if (!isPlaybackMode()) {
      // In live mode, verify SAS token format with regex
      const sasTokenPattern = /st=[^&]+&se=[^&]+&sp=[^&]+&sv=[^&]+&sr=[^&]+&.*sig=[^&]+/;
      assert.match(
        response.token!,
        sasTokenPattern,
        "Token should match SAS token format (st, se, sp, sv, sr, sig)",
      );
    } else {
      // In playback mode, just verify token exists as a non-empty string
      assert.isString(response.token, "Token should be a string");
      assert.isTrue(response.token!.length > 0, "Token should not be empty");
    }

    // Verify expiresOn is a Date in the future
    assert.instanceOf(response.expiresOn, Date, "expiresOn should be a Date object");

    if (!isPlaybackMode()) {
      const now = new Date();
      assert.isTrue(response.expiresOn! > now, "Token expiry should be in the future");

      // Verify custom duration is approximately 60 minutes (allow 5 minute tolerance for clock skew)
      const expectedExpiry = new Date(now.getTime() + 60 * 60 * 1000);
      const timeDiff = Math.abs(response.expiresOn!.getTime() - expectedExpiry.getTime()) / 1000;
      assert.isTrue(timeDiff < 300, `Expiry should be ~60 minutes from now (diff: ${timeDiff}s)`);
    }

    console.log("Test PASSED\n");
  });

  it("test_03_get_sign_with_collection_thumbnail - should sign an asset HREF using collection thumbnail", async function () {
    console.log("=".repeat(80));
    console.log("TEST: test_03_get_sign_with_collection_thumbnail");
    console.log("=".repeat(80));

    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );

    console.log(`Input - collection_id: ${collectionId}`);
    console.log("Getting collection...");

    const collection = await client.stac.getCollection(collectionId);

    assert.isDefined(collection, "Collection should not be undefined");
    assert.isDefined(collection.assets, "Collection should have assets");
    assert.property(collection.assets!, "thumbnail", "Collection should have thumbnail asset");

    const originalHref = collection.assets!.thumbnail!.href!;
    console.log(`Original HREF: ${originalHref}`);
    assert.isDefined(originalHref, "Original HREF should not be undefined");

    console.log(`Calling: getSign(href=${originalHref})`);
    const response = await client.sharedAccessSignature.getSign(originalHref);

    console.log(`Response type: ${typeof response}`);
    console.log(`Response: ${JSON.stringify(response)}`);

    // Assert response is correct type
    assert.isDefined(response, "Response should not be undefined");
    assert.property(response, "href", "Response should have href property");

    const signedHref = response.href!;
    console.log(`Signed HREF: ${signedHref}`);
    console.log(`HREF changed: ${signedHref !== originalHref}`);
    console.log(`Has query params: ${signedHref.includes("?")}`);
    console.log(`Has sig param: ${signedHref.toLowerCase().includes("sig=")}`);

    // Verify signed HREF is different and contains SAS parameters
    assert.notEqual(signedHref, originalHref, "Signed HREF should differ from original HREF");

    // Verify SAS parameters in HREF - skip regex in playback due to sanitization variations
    if (!isPlaybackMode()) {
      // In live mode, verify SAS HREF format with regex
      const sasHrefPattern = /\?.*st=[^&]+&se=[^&]+&sp=[^&]+&sv=[^&]+&sr=[^&]+&.*sig=[^&]+/;
      assert.match(
        signedHref,
        sasHrefPattern,
        "Signed HREF should contain SAS parameters (st, se, sp, sv, sr, sig)",
      );
    } else {
      // In playback mode, just verify basic SAS structure exists
      assert.include(signedHref, "?", "Signed HREF should have query parameters");
      assert.include(
        signedHref.toLowerCase(),
        "sig=",
        "Signed HREF should contain signature parameter",
      );
    }

    // Verify expiresOn is a datetime in the future (if present)
    if (response.expiresOn) {
      assert.instanceOf(response.expiresOn, Date, "expiresOn should be a Date object");

      if (!isPlaybackMode()) {
        const now = new Date();
        assert.isTrue(response.expiresOn > now, "Token expiry should be in the future");
      }
    }

    // Verify the signed HREF starts with the original base URL (strip query params first)
    const originalBase = originalHref.split("?")[0];
    const signedBase = signedHref.split("?")[0];
    assert.equal(signedBase, originalBase, "Signed HREF should have the same base URL as original");

    console.log("Test PASSED\n");
  });

  it("test_04_signed_href_can_download_asset - should use a signed HREF to download an asset", async function () {
    console.log("=".repeat(80));
    console.log("TEST: test_04_signed_href_can_download_asset");
    console.log("=".repeat(80));

    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );

    console.log(`Input - collection_id: ${collectionId}`);
    console.log("Getting collection...");

    const collection = await client.stac.getCollection(collectionId);
    const thumbnailHref = collection.assets!.thumbnail!.href!;
    console.log(`Thumbnail HREF: ${thumbnailHref}`);

    console.log(`Calling: getSign(href=${thumbnailHref})`);
    const signResponse = await client.sharedAccessSignature.getSign(thumbnailHref);
    const signedHref = signResponse.href!;
    console.log(`Signed HREF: ${signedHref}`);

    if (!isPlaybackMode()) {
      console.log("Attempting to download asset (live mode)...");

      const downloadResponse = await fetch(signedHref);
      const content = await downloadResponse.arrayBuffer();

      console.log(`Download status code: ${downloadResponse.status}`);
      console.log(`Content length: ${content.byteLength} bytes`);
      const contentType = downloadResponse.headers.get("content-type")?.toLowerCase() || "";
      console.log(`Content-Type: ${contentType}`);

      // Verify successful download
      assert.equal(downloadResponse.status, 200, `Expected 200, got ${downloadResponse.status}`);
      assert.isTrue(content.byteLength > 0, "Downloaded content should not be empty");

      // Verify content is binary data (image file)
      assert.isTrue(content.byteLength > 1000, "Downloaded file should be larger than 1KB");

      // Verify it's actually binary image data by checking PNG magic bytes
      const uint8Array = new Uint8Array(content);
      assert.equal(uint8Array[0], 0x89, "First byte should be 0x89 (PNG magic)");
      assert.equal(uint8Array[1], 0x50, "Second byte should be 0x50 (P)");
      assert.equal(uint8Array[2], 0x4e, "Third byte should be 0x4E (N)");
      assert.equal(uint8Array[3], 0x47, "Fourth byte should be 0x47 (G)");
      console.log("Downloaded content is a valid PNG image");
    } else {
      console.log("Skipping download test (playback mode)");
    }

    console.log("Test PASSED\n");
  });

  it("test_05_revoke_token - should revoke a SAS token", async function () {
    console.log("=".repeat(80));
    console.log("TEST: test_05_revoke_token");
    console.log("=".repeat(80));

    const collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );

    console.log(`Input - collection_id: ${collectionId}`);

    // Generate a SAS token first
    console.log("Step 1: Generating SAS token...");
    const tokenResponse = await client.sharedAccessSignature.getToken(collectionId, {
      durationInMinutes: 60,
    });

    console.log(`Token generated: ${tokenResponse.token!.substring(0, 50)}...`);
    assert.isDefined(tokenResponse, "Token response should not be undefined");
    assert.property(tokenResponse, "token", "Response should have token property");

    // Revoke the token
    console.log("Step 2: Revoking token...");
    await client.sharedAccessSignature.revokeToken();
    console.log("Token revoked successfully (no exception thrown)");

    console.log("Test PASSED\n");
  });
});
