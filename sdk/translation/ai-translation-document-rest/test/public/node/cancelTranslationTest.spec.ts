// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { DocumentTranslationClient } from "@azure-rest/ai-translation-document";
import { isUnexpected } from "@azure-rest/ai-translation-document";
import { createDocumentTranslationClient, startRecorder } from "../utils/recordedClient.js";
import {
  createBatchRequest,
  createSourceInput,
  createTargetInput,
  getTranslationOperationID,
} from "../utils/testHelper.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { getContainers } from "../../utils/injectables.js";

describe("CancelTranslation tests", () => {
  let recorder: Recorder;
  let client: DocumentTranslationClient;
  const containers = getContainers();

  beforeEach(async (ctx) => {
    recorder = await startRecorder(ctx);
    client = await createDocumentTranslationClient({ recorder });
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("cancel translation", async () => {
    const sourceUrl = containers["source-container1"].url;
    const sourceInput = createSourceInput(sourceUrl);
    const targetUrl = containers["target-container16"].url;
    const targetInput = createTargetInput(targetUrl, "fr");
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);

    // Start translation
    const batchRequests = { inputs: [batchRequest] };
    const initialResponse = await client.path("/document/batches").post({
      body: batchRequests,
    });
    const id = getTranslationOperationID(initialResponse.headers["operation-location"]);

    // Cancel translation
    await client.path("/document/batches/{id}", id).delete();

    // get translation status and verify
    const response = await client.path("/document/batches/{id}", id).get();
    if (isUnexpected(response)) {
      throw response.body;
    }

    const idOutput = response.body.id;
    assert.isTrue(idOutput === id, "IDOutput is:" + idOutput);
    const statusOutput = response.body.status;
    assert.isTrue(
      statusOutput === "Cancelled" ||
        statusOutput === "Cancelling" ||
        statusOutput === "NotStarted",
      "Status output is: " + statusOutput,
    );
  });
});
