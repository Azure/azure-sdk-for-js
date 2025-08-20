// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { createRecorder } from "../utils/recorderUtils.js";
import DocumentIntelligence from "@azure-rest/ai-document-intelligence";
import { assert, describe, beforeEach, afterEach, it } from "vitest";
import type { DocumentIntelligenceClient } from "@azure-rest/ai-document-intelligence";
import { isUnexpected } from "@azure-rest/ai-document-intelligence";
import { getEndpoint } from "../../utils/injectables.js";

describe("DocumentIntelligenceClient", () => {
  let recorder: Recorder;
  let client: DocumentIntelligenceClient;
  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    await recorder.setMatcher("BodilessMatcher");
    client = DocumentIntelligence(
      getEndpoint(),
      createTestCredential(),
      recorder.configureClientOptions({}),
    );
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("API Key works - getInfo", async () => {
    const response = await client.path("/info").get();
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    assert.strictEqual(
      response.body.customDocumentModels.limit,
      20000,
      "expected customDocumentModels limit should be 20000",
    );
  });

  it("AAD works - getInfo", async function () {
    client = DocumentIntelligence(
      getEndpoint(),
      createTestCredential(),
      recorder.configureClientOptions({}),
    );
    const response = await client.path("/info").get();
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    assert.strictEqual(
      response.body.customDocumentModels.limit,
      20000,
      "expected customDocumentModels limit should be 20000",
    );
  });
});
