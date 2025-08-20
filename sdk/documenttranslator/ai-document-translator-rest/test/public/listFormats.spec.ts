// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DocumentTranslatorClient } from "@azure-rest/ai-document-translator";
import { Recorder } from "@azure-tools/test-recorder";
import { createClient } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("List Document Formats", () => {
  let recorder: Recorder;
  let client: DocumentTranslatorClient;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    client = await createClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should list all available document formats", async () => {
    const result = await client.path("/documents/formats").get();
    if (result.status !== "200") {
      assert.fail(`GET "/documents/formats" failed with ${result.status}`);
    }

    assert.isTrue(result.body.value.length > 0);
  });
});
