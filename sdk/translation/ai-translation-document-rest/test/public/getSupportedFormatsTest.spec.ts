// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { DocumentTranslationClient } from "../../src/index.js";
import { isUnexpected } from "../../src/index.js";
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

  it("all formats", async () => {
    const options = {
      queryParameters: {
        type: "",
      },
    };

    const response = await client.path("/document/formats").get(options);
    if (isUnexpected(response)) {
      throw response.body;
    }

    const fileFormatTypes = response.body;
    fileFormatTypes.value.forEach((fileFormatType) => {
      assert.isTrue(fileFormatType.format !== null);
      assert.isTrue(fileFormatType.contentTypes !== null);
      assert.isTrue(fileFormatType.fileExtensions !== null);
    });
  });

  it("document formats", async () => {
    // Define the query parameters with the specified type
    const options = {
      queryParameters: {
        type: "document",
      },
    };

    const response = await client.path("/document/formats").get(options);
    if (isUnexpected(response)) {
      throw response.body;
    }

    const fileFormatTypes = response.body;
    fileFormatTypes.value.forEach((fileFormatType) => {
      assert.isTrue(fileFormatType.format !== null);
      assert.isTrue(fileFormatType.contentTypes !== null);
      assert.isTrue(fileFormatType.fileExtensions !== null);
      assert.isTrue(fileFormatType.type === "Document");
      if (fileFormatType.format === "XLIFF") {
        assert.isTrue(fileFormatType.defaultVersion !== null);
      }
    });
  });

  it("glossary formats", async () => {
    // Define the query parameters with the specified type
    const options = {
      queryParameters: {
        type: "glossary",
      },
    };

    const response = await client.path("/document/formats").get(options);
    if (isUnexpected(response)) {
      throw response.body;
    }

    const fileFormatTypes = response.body;
    fileFormatTypes.value.forEach((fileFormatType) => {
      assert.isTrue(fileFormatType.format !== null);
      assert.isTrue(fileFormatType.contentTypes !== null);
      assert.isTrue(fileFormatType.fileExtensions !== null);
      assert.isTrue(fileFormatType.type === "Glossary");
      if (fileFormatType.format === "XLIFF") {
        assert.isTrue(fileFormatType.defaultVersion !== null);
      }
    });
  });
});
