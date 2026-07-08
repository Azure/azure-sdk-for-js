// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { DocumentTranslationClient } from "../../../src/index.js";
import { createDocumentTranslationClient, startRecorder } from "../utils/recordedClient.js";
import {
  createBatchRequest,
  createSourceInput,
  createTargetInput,
  getTranslationIdFromPoller,
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

    // Start translation (do not await the poller, otherwise it would poll to completion)
    const poller = client.startTranslation({ inputs: [batchRequest] });
    const id = await getTranslationIdFromPoller(poller);

    // Cancel translation
    await client.cancelTranslation(id);

    // get translation status and verify
    const response = await client.getTranslationStatus(id);

    const idOutput = response.id;
    assert.isTrue(idOutput === id, "IDOutput is:" + idOutput);
    const statusOutput = response.status;
    assert.isTrue(
      statusOutput === "Cancelled" ||
        statusOutput === "Cancelling" ||
        statusOutput === "NotStarted",
      "Status output is: " + statusOutput,
    );
  });
});
