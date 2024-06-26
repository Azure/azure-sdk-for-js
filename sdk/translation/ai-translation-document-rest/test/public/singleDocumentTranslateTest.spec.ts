// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import {
  DocumentTranslateDefaultResponse,
  DocumentTranslateParameters,
  DocumentTranslationClient,
  isUnexpected,
} from "../../src";
import { createDocumentTranslationClient, startRecorder } from "./utils/recordedClient";
import { Context } from "mocha";

describe("SingleDocumentTranslate tests", () => {
  let recorder: Recorder;
  let client: DocumentTranslationClient;

  beforeEach(async function (this: Context) {
    recorder = await startRecorder(this);
    client = await createDocumentTranslationClient({ recorder });
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("document translate", async () => {
    const options: DocumentTranslateParameters = {
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
    };

    const response = await client.path("/document:translate").post(options);
    const typedResponse = response as DocumentTranslateDefaultResponse;

    if (typedResponse.status === "200") {
      console.log(
        "Response code: " + typedResponse.status + ", Response body: " + typedResponse.body,
      );
      assert.isTrue(typedResponse.body !== null);
    } else {
      console.log(
        "Response code: " +
          typedResponse.status +
          ", Response body: " +
          typedResponse.body.error.message,
      );
      throw typedResponse.body;
    }
  });

  it("single CSV glossary", async () => {
    const options: DocumentTranslateParameters = {
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

    const response = await client.path("/document:translate").post(options);

    if (response.status === "200") {
      console.log("Response code: " + response.status + ", Response body: " + response.body);
      assert.isTrue(response.body !== null);
      assert.isTrue(response.body.toString().includes("test"));
    } else {
      const typedResponse = response as DocumentTranslateDefaultResponse;
      console.log(
        "Response code: " +
          typedResponse.status +
          ", Response body: " +
          typedResponse.body.error.message,
      );
      throw typedResponse.body;
    }
  });

  it("Multiple CSV glossary", async () => {
    const options: DocumentTranslateParameters = {
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
      .post(options)) as DocumentTranslateDefaultResponse;

    if (isUnexpected(response)) {
      console.log(
        "Response code: " +
          response.status +
          ", Response error message: " +
          response.body.error.message,
      );
      assert.isTrue(response.body.error.message.includes("exceeded"));
    } else {
      assert.isFalse(true);
    }
  });
});
