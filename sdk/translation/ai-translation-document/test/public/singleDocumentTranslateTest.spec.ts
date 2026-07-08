// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { SingleDocumentTranslationClient } from "../../src/index.js";
import { createSingleDocumentTranslationClient, startRecorder } from "./utils/recordedClient.js";
import { streamToString } from "./utils/testHelper.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("SingleDocumentTranslate tests", () => {
  let recorder: Recorder;
  let client: SingleDocumentTranslationClient;

  beforeEach(async (ctx) => {
    recorder = await startRecorder(ctx);
    client = await createSingleDocumentTranslationClient({ recorder });
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("document translate", async () => {
    // The modular client throws automatically for non-success responses, so a
    // successful call is enough to validate the scenario.
    const response = await client.translate("hi", {
      document: {
        contents: "This is a test.",
        filename: "test-input.txt",
        contentType: "text/html",
      },
    });
    assert.isDefined(response);
  });

  it("single CSV glossary", async () => {
    const response = await client.translate("hi", {
      document: {
        contents: "This is a test.",
        filename: "test-input.txt",
        contentType: "text/html",
      },
      glossary: [
        {
          contents: "test,test",
          filename: "test-glossary.csv",
          contentType: "text/csv",
        },
      ],
    });

    const translatedContent = await streamToString(response.readableStreamBody);
    assert.isTrue(translatedContent.includes("test"));
  });

  it("Multiple CSV glossary", async () => {
    let errorThrown = false;
    try {
      await client.translate("hi", {
        document: {
          contents: "This is a test.",
          filename: "test-input.txt",
          contentType: "text/html",
        },
        glossary: [
          {
            contents: "test,test",
            filename: "test-glossary.csv",
            contentType: "text/csv",
          },
          {
            contents: "test,test",
            filename: "test-glossary.csv",
            contentType: "text/csv",
          },
        ],
      });
    } catch (error: any) {
      errorThrown = true;
      // The service rejects requests with more than one glossary file with a 400.
      assert.equal(error.statusCode, 400);
    }
    assert.isTrue(
      errorThrown,
      "Expected translate to reject when multiple glossaries are supplied",
    );
  });
});
