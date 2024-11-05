// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import type { DocumentTranslationClient } from "../../src";
import { isUnexpected } from "../../src";
import { createDocumentTranslationClient, startRecorder } from "./utils/recordedClient";
import type { Context } from "mocha";

describe("GetSupportedFormats tests", () => {
  let recorder: Recorder;
  let client: DocumentTranslationClient;

  beforeEach(async function (this: Context) {
    recorder = await startRecorder(this);
    client = await createDocumentTranslationClient({ recorder });
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("all formats", async () => {
    const response = await client.path("/document/formats").get();
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
