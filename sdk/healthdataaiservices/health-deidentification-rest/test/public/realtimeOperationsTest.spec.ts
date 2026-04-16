// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createRecordedDeidentificationClient, createRecorder } from "./utils/recordedClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { DeidentificationClient } from "../../src/clientDefinitions.js";
import { createTestCredential } from "@azure-tools/test-credential";

import type { DeidentificationContent } from "../../src/models.js";
import type { DeidentificationResultOutput } from "../../src/outputModels.js";
import type { Recorder } from "@azure-tools/test-recorder";

const inputText = "Hello, my name is John Smith.";

describe("Realtime", () => {
  let recorder: Recorder;
  let client: DeidentificationClient;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    const credential = createTestCredential();
    client = await createRecordedDeidentificationClient(recorder, credential);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("surrogate returns expected", async () => {
    const content: DeidentificationContent = {
      inputText: inputText,
      operation: "Surrogate",
      customizations: {
        surrogateLocale: "en-US",
      },
    };
    const response = await client.path("/deid").post({ body: content });
    assert.equal(response.status, "200");
    const output = response.body as DeidentificationResultOutput;
    assert.isUndefined(
      output.taggerResult,
      "On Surrogate Operation, expect TaggerResult to be null.",
    );
    assert.isNotNull(
      output.outputText,
      "On Surrogate Operation, expect OutputText to be not null.",
    );
    assert.isTrue(
      (output.outputText as string).length > 21,
      "Expected output text to be longer than the tag and a single character for each name token.",
    );
    assert.notEqual(
      content.inputText,
      output.outputText,
      "Expected output text to be different from input text.",
    );
  }, 20000);

  it("redact returns expected", async function () {
    const content: DeidentificationContent = {
      inputText: inputText,
      operation: "Redact",
      customizations: {
        redactionFormat: "*{len}",
      },
    };
    const response = await client.path("/deid").post({ body: content });
    assert.equal(response.status, "200");
    const output = response.body as DeidentificationResultOutput;
    assert.isUndefined(output.taggerResult, "On Redact Operation, expect TaggerResult to be null.");
    assert.isNotNull(output.outputText, "On Redact Operation, expect OutputText to be not null.");
    assert.isTrue(
      (output.outputText as string).length === inputText.length,
      "Expected redactionFormat *{len} to preserve length.",
    );
    assert.notEqual(
      content.inputText,
      output.outputText,
      "Expected output text to be different from input text.",
    );
  }, 10000);

  it("tag returns expected", async function () {
    const content: DeidentificationContent = {
      inputText: inputText,
      operation: "Tag",
    };
    const response = await client.path("/deid").post({ body: content });
    assert.equal(response.status, "200");
    const output = response.body as DeidentificationResultOutput;
    assert.isNotNull(output.taggerResult, "On Tag Operation, expect TaggerResult to be not null.");
    assert.isObject(output.taggerResult, "On Tag Operation, expect TaggerResult to be not null.");
    assert.isUndefined(output.outputText, "On Tag Operation, expect OutputText to be null.");

    assert.isTrue(
      output.taggerResult!.entities.length > 0,
      "Expected taggerResult to have at least one tag.",
    );
    assert.isTrue(
      output.taggerResult!.entities[0].category === "Doctor" ||
        output.taggerResult!.entities[0].category === "Patient",
      "Expected first tag to be a patient/doctor.",
    );
    assert.isTrue(
      output.taggerResult!.entities[0].text === "John Smith",
      "Expected first tag to be 'John Smith'.",
    );
    assert.isTrue(
      output.taggerResult!.entities[0].offset.utf8 === 18,
      "Expected first tag to start at index 19.",
    );
    assert.isTrue(
      output.taggerResult!.entities[0].length.utf8 === 10,
      "Expected first tag to be 10 characters long.",
    );
  }, 20000);

  it("surrogateOnly returns expected", async () => {
    const content: DeidentificationContent = {
      inputText: inputText,
      operation: "SurrogateOnly",
      taggedEntities: {
        encoding: "utf8",
        entities: [
          {
            category: "Patient",
            offset: 18,
            length: 10,
          },
        ],
      },
      customizations: {
        inputLocale: "en-US",
      },
    };

    const response = await client.path("/deid").post({ body: content });
    assert.equal(response.status, "200");
    const output = response.body as DeidentificationResultOutput;
    assert.isUndefined(
      output.taggerResult,
      "On SurrogateOnly Operation, expect TaggerResult to be null.",
    );
    assert.isNotNull(
      output.outputText,
      "On SurrogateOnly Operation, expect OutputText to be not null.",
    );
    assert.notEqual(
      content.inputText,
      output.outputText,
      "Expected output text to be different from input text.",
    );
  }, 20000);
});
