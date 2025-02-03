// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential, MixedRealityStsClient } from "../src/index.js";
import { createClient, createRecorder } from "./utils/recordedClient.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { createTokenCredentialFromMRKeyCredential } from "./utils/tokenCredentialHelper.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("MixedRealityStsClient", () => {
  const accountDomain = "mixedreality.azure.com";
  const accountId = "00000000-0000-0000-0000-000000000000";
  const accountKey = "00000000-0000-0000-0000-000000000000";
  const endpointUrl = "https://sts.mixedreality.azure.com";
  const keyCredential = new AzureKeyCredential(accountKey);

  it("can create", () => {
    const client = new MixedRealityStsClient(accountId, accountDomain, keyCredential);

    assert.isNotNull(client);
    assert.equal(client.accountId, accountId);
    assert.equal(client.endpointUrl, endpointUrl);
  });

  it("can create with invalid arguments", () => {
    assert.throws(
      () => new MixedRealityStsClient(undefined!, accountDomain, keyCredential),
      "Argument cannot be null or empty: 'accountId'.",
    );
    assert.throws(
      () => new MixedRealityStsClient(null!, accountDomain, keyCredential),
      "Argument cannot be null or empty: 'accountId'.",
    );
    assert.throws(
      () => new MixedRealityStsClient("", accountDomain, keyCredential),
      "Argument cannot be null or empty: 'accountId'.",
    );

    assert.throws(
      () => new MixedRealityStsClient(accountId, undefined!, keyCredential),
      "Argument cannot be null or empty: 'accountDomain'.",
    );
    assert.throws(
      () => new MixedRealityStsClient(accountId, null!, keyCredential),
      "Argument cannot be null or empty: 'accountDomain'.",
    );
    assert.throws(
      () => new MixedRealityStsClient(accountId, "", keyCredential),
      "Argument cannot be null or empty: 'accountDomain'.",
    );
  });

  it("can create with endpointUrl", () => {
    const expectedEndpointUrl = "https://sts.westus2.mixedreality.azure.com";

    const client = new MixedRealityStsClient(accountId, accountDomain, keyCredential, {
      customEndpointUrl: expectedEndpointUrl,
    });

    assert.isNotNull(client);
    assert.equal(client.accountId, accountId);
    assert.equal(client.endpointUrl, expectedEndpointUrl);
  });

  it("can create with token credential", () => {
    const tokenCredential = createTokenCredentialFromMRKeyCredential(accountId, keyCredential);

    const client = new MixedRealityStsClient(accountId, accountDomain, tokenCredential);

    assert.isNotNull(client);
    assert.equal(client.accountId, accountId);
    assert.equal(client.endpointUrl, endpointUrl);
  });
});

describe("[AccountKey] MixedRealityStsClient functional tests", () => {
  let client: MixedRealityStsClient;
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async () => {
    // Stop the recording.
    await recorder.stop();
  });

  it("get token", async () => {
    const token = await client.getToken();

    assert.isOk(token);
    assert.isNumber(token.expiresOnTimestamp);
    assert.isOk(token.token);
  });
});
