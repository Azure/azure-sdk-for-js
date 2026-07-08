// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { DocumentTranslationClient, TranslationStatus } from "../../../src/index.js";
import { createDocumentTranslationClient, startRecorder } from "../utils/recordedClient.js";
import {
  createBatchRequest,
  createSourceInput,
  createTargetInput,
  getTranslationIdFromPoller,
  sleep,
} from "../utils/testHelper.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { getContainers, isLiveMode } from "../../utils/injectables.js";

export const testPollingOptions = {
  updateIntervalInMs: isLiveMode() ? undefined : 1,
};

// TODO: Re-record test
describe("TranslationFilter tests", { skip: true }, () => {
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

  it("Translation Statuses Filter By Status", async () => {
    createTranslationJobs(
      containers["source-container11"].url,
      [containers["target-container18"].url],
      "Succeeded",
    );
    const cancelledIds = createTranslationJobs(
      containers["source-container10"].url,
      [containers["target-container19"].url],
      "Cancelled",
    );

    // list translations with filter
    const cancelledStatusList = ["Cancelled", "Cancelling"];
    const testStartTime = recorder.variable("testStartTime", new Date().toISOString());

    // get Translation Status
    for await (const translationStatus of client.getTranslationsStatus({
      statuses: cancelledStatusList,
      createdDateTimeUtcStart: new Date(testStartTime),
    })) {
      assert.isTrue(cancelledStatusList.includes(translationStatus.status));
      assert.isTrue((await cancelledIds).includes(translationStatus.id));
    }
  });

  // TODO: Re-record test
  it.skip("Translation Statuses Filter By Id", async () => {
    const allIds = createTranslationJobs(
      containers["source-container11"].url,
      [containers["target-container19"].url, containers["target-container20"].url],
      "Succeeded",
    );
    const targetIds: string[] = [];
    targetIds.push((await allIds)[0]);

    // get Translation Status
    for await (const translationStatus of client.getTranslationsStatus({
      translationIds: targetIds,
    })) {
      assert.isTrue(targetIds.includes(translationStatus.id));
    }
  });

  // TODO: Re-record test
  it.skip("Translation Statuses Filter By Created After", async () => {
    const testStartTime = recorder.variable("testStartTime", new Date().toISOString());
    const targetIds = createTranslationJobs(
      containers["source-container11"].url,
      [containers["target-container21"].url],
      "Succeeded",
    );

    // get Translation Status
    for await (const translationStatus of client.getTranslationsStatus({
      createdDateTimeUtcStart: new Date(testStartTime),
    })) {
      assert.isTrue((await targetIds).includes(translationStatus.id));
      assert.isTrue(new Date(translationStatus.createdDateTimeUtc).toISOString() > testStartTime);
    }
  });

  // TODO: Re-record test
  it.skip("Translation Statuses Filter By Created Before", async () => {
    const targetIds = createTranslationJobs(
      containers["source-container11"].url,
      [containers["target-container22"].url],
      "Succeeded",
    );
    for (let i = 0; i < (await targetIds).length; i++) {
      console.log(`targetIds[${i}]:`, (await targetIds)[i]);
    }

    const endDateTime = recorder.variable("endDateTime", new Date().toISOString());
    createTranslationJobs(
      containers["source-container11"].url,
      [containers["target-container23"].url],
      "Succeeded",
    );

    // getting only translations from the last hour
    const testDateTime = new Date();
    testDateTime.setHours(testDateTime.getHours() - 1);
    const startDateTime = recorder.variable("startDateTime", testDateTime.toISOString());

    // get Translation Status
    let idExists = false;
    for await (const translationStatus of client.getTranslationsStatus({
      createdDateTimeUtcStart: new Date(startDateTime),
      createdDateTimeUtcEnd: new Date(endDateTime),
    })) {
      if ((await targetIds).includes(translationStatus.id)) {
        idExists = true;
      }
      assert.isTrue(new Date(translationStatus.createdDateTimeUtc).toISOString() < endDateTime);
    }
    assert.isTrue(idExists);
  });

  // TODO: Re-record test
  it.skip("Translation Statuses Filter By Created On", async () => {
    createTranslationJobs(
      containers["source-container11"].url,
      [
        containers["target-container24"].url,
        containers["target-container25"].url,
        containers["target-container26"].url,
      ],
      "Succeeded",
    );

    // Add filter
    const startDateTime = recorder.variable("startDateTime", new Date().toISOString());
    const orderByList = ["createdDateTimeUtc asc"];

    let timestamp = new Date(-8640000000000000); // Minimum valid Date value in JavaScript

    for await (const translationStatus of client.getTranslationsStatus({
      createdDateTimeUtcStart: new Date(startDateTime),
      orderby: orderByList,
    })) {
      assert.isTrue(new Date(translationStatus.createdDateTimeUtc) > timestamp);
      timestamp = new Date(translationStatus.createdDateTimeUtc);
    }
  });

  async function createTranslationJobs(
    sourceContainerUrl: string,
    targetContainerUrls: string[],
    jobTerminalStatus: string,
  ): Promise<string[]> {
    // create source container
    const sourceInput = createSourceInput(sourceContainerUrl);

    // create a translation job
    const translationIds: string[] = [];
    for (const targetContainerUrl of targetContainerUrls) {
      const targetInput = createTargetInput(targetContainerUrl, "fr");
      const batchRequest = createBatchRequest(sourceInput, [targetInput]);

      // Start translation (without awaiting the poller to completion)
      const poller = client.startTranslation({ inputs: [batchRequest] }, testPollingOptions);
      const operationId = await getTranslationIdFromPoller(poller);
      translationIds.push(operationId);

      if (jobTerminalStatus.includes("succeeded")) {
        // Wait until the operation completes
        const result = await poller.pollUntilDone();
        assert.equal(result.status, "Succeeded");
      } else if (jobTerminalStatus.includes("cancelled")) {
        await client.cancelTranslation(operationId);
      }
    }

    // ensure that cancel status has propagated before returning
    if (jobTerminalStatus.includes("cancelled")) {
      await waitForJobCancellation(translationIds);
    }
    return translationIds;
  }

  async function waitForJobCancellation(translationIds: string[]): Promise<void> {
    const retryCount = 10;

    for (const translationId of translationIds) {
      let translationStatus: TranslationStatus | null = null;
      let retriesLeft = retryCount;
      do {
        try {
          await sleep(10000);
          retriesLeft--;
          translationStatus = await client.getTranslationStatus(translationId);
        } catch (error) {
          console.error("Error during translation status retrieval:", error);
        }
      } while (translationStatus && translationStatus.summary.cancelled > 0 && retriesLeft > 0);
    }
    return;
  }
});
