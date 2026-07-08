// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { DocumentTranslationClient } from "../../src/index.js";
import { createDocumentTranslationClient, startRecorder } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("GetSupportedFormats tests", () => {
  let recorder: Recorder;
  let client: DocumentTranslationClient;

  beforeEach(async (ctx) => {
    recorder = await startRecorder(ctx);
    client = await createDocumentTranslationClient({ recorder });
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("document formats", async () => {
    const fileFormatTypes = await client.getSupportedFormats("document");
    fileFormatTypes.value.forEach((fileFormatType) => {
      assert.isTrue(fileFormatType.format !== null);
      assert.isTrue(fileFormatType.contentTypes !== null);
      assert.isTrue(fileFormatType.fileExtensions !== null);
      assert.isTrue(fileFormatType.type === "document");
      if (fileFormatType.format === "XLIFF") {
        assert.isTrue(fileFormatType.defaultVersion !== null);
      }
    });
  });

  it("glossary formats", async () => {
    const fileFormatTypes = await client.getSupportedFormats("glossary");
    fileFormatTypes.value.forEach((fileFormatType) => {
      assert.isTrue(fileFormatType.format !== null);
      assert.isTrue(fileFormatType.contentTypes !== null);
      assert.isTrue(fileFormatType.fileExtensions !== null);
      assert.isTrue(fileFormatType.type === "glossary");
      if (fileFormatType.format === "XLIFF") {
        assert.isTrue(fileFormatType.defaultVersion !== null);
      }
    });
  });
});
