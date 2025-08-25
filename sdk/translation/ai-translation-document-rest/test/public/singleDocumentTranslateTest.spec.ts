// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type {
  DocumentTranslateDefaultResponse,
  DocumentTranslateParameters,
  DocumentTranslationClient,
} from "@azure-rest/ai-translation-document";
import { isUnexpected } from "@azure-rest/ai-translation-document";
import { createDocumentTranslationClient, startRecorder } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createRestError } from "@azure-rest/core-client";

describe("SingleDocumentTranslate tests", () => {
  let recorder: Recorder;
  let client: DocumentTranslationClient;

  beforeEach(async (ctx) => {
    recorder = await startRecorder(ctx);
    client = await createDocumentTranslationClient({ recorder });
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("document translate", async () => {
    const response = await client.path("/document:translate").post({
      queryParameters: {
        targetLanguage: "hi",
      },
      contentType: "multipart/form-data",
      body: [
        {
          name: "document",
          body: "This is a test.",
          filename: "test-input.txt",
          contentType: "text/html",
        },
      ],
    });
    if (isUnexpected(response)) {
      throw createRestError(response);
    }
  });

  it("single CSV glossary", async () => {
    const options = {
      queryParameters: {
        targetLanguage: "hi",
      },
      contentType: "multipart/form-data",
      body: [
        {
          name: "document",
          body: "This is a test.",
          filename: "test-input.txt",
          contentType: "text/html",
        },
        {
          name: "glossary",
          body: "test,test",
          filename: "test-glossary.csv",
          contentType: "text/csv",
        },
      ],
    };

    const response = await client
      .path("/document:translate")
      .post(options as DocumentTranslateParameters);
    if (isUnexpected(response)) {
      throw response.body;
    }
    assert.isTrue(response.body.toString().includes("test"));
  });

  it("Multiple CSV glossary", async () => {
    const options = {
      queryParameters: {
        targetLanguage: "hi",
      },
      contentType: "multipart/form-data",
      body: [
        {
          name: "document",
          body: "This is a test.",
          filename: "test-input.txt",
          contentType: "text/html",
        },
        {
          name: "glossary",
          body: "test,test",
          filename: "test-glossary.csv",
          contentType: "text/csv",
        },
        {
          name: "glossary",
          body: "test,test",
          filename: "test-glossary.csv",
          contentType: "text/csv",
        },
      ],
    };

    const response = (await client
      .path("/document:translate")
      .post(options as DocumentTranslateParameters)) as DocumentTranslateDefaultResponse;

    if (isUnexpected(response)) {
      assert.equal(response.status, "400");
      assert.isTrue(
        response.body.error.message.includes(
          "The maximum number of glossary files has been exceeded",
        ),
      );
    } else {
      assert.isFalse(true);
    }
  });
});
