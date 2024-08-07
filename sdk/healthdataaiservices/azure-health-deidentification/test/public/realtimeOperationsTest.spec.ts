// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createRecordedDeidentificationClient, createRecorder } from "./utils/recordedClient.js";
import { beforeEach, afterEach, it, describe } from "vitest";
import { DeidentificationClient } from "../../src/clientDefinitions.js";
import { createTestCredential } from "@azure-tools/test-credential";

import { DeidentificationContent } from "../../src/models.js";
import { DeidentificationResultOutput } from "../../src/outputModels.js";
import { assert } from "@azure-tools/test-utils";
import { Recorder } from "@azure-tools/test-recorder";

const fakeServiceEndpoint = "example.com";
const replaceableVariables: Record<string, string> = {
  DEID_SERVICE_ENDPOINT: fakeServiceEndpoint,
};

describe("Realtime", () => {
  let recorder: Recorder;
  let client: DeidentificationClient;

  beforeEach(async function (context) {
    recorder = await createRecorder(context);
    await recorder.start({
      envSetupForPlayback: replaceableVariables,
      removeCentralSanitizers: ["AZSDK4001", "AZSDK2030", "AZSDK3430", "AZSDK3493"],
    });
    const credential = createTestCredential();
    if (process.env.DEID_SERVICE_ENDPOINT) {
      client = await createRecordedDeidentificationClient(recorder, credential);
    } else {
      throw new Error("DEID_SERVICE_ENDPOINT is not set");
    }
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("surrogate returns expected", async function () {
    const content: DeidentificationContent = {
      dataType: "Plaintext",
      inputText: "Hello, my name is John Smith.",
      operation: "Surrogate",
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
  }, 10000);

  it("tag returns expected", async function () {
    const content: DeidentificationContent = {
      dataType: "Plaintext",
      inputText: "Hello, my name is John Smith.",
      operation: "Tag",
    };
    const response = await client.path("/deid").post({ body: content });
    assert.equal(response.status, "200");
    const output = response.body as DeidentificationResultOutput;
    assert.isNotNull(output.taggerResult, "On Tag Operation, expect TaggerResult to be not null.");
    assert.isObject(output.taggerResult, "On Tag Operation, expect TaggerResult to be not null.");
    assert.isUndefined(output.outputText, "On Tag Operation, expect OutputText to be null.");
    assert.isTrue(output.taggerResult!.etag === undefined, "Expected Etag to be null.");
    assert.isTrue(output.taggerResult!.path === undefined, "Expected Path to be null.");

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
  }, 10000);
});
