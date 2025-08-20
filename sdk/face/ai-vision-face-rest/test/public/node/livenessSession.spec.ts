// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import { createRecorder, createClient } from "../utils/recordedClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import type { FaceClient } from "@azure-rest/ai-vision-face";
import { isUnexpected } from "@azure-rest/ai-vision-face";

describe("LivenessWithVerifySession", () => {
  let recorder: Recorder;
  let client: FaceClient;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = await createClient(recorder);
  });

  afterEach(async () => {
    if (recorder?.recordingId) {
      await recorder.stop();
    }
  });

  it.runIf(isPlaybackMode())("TestLivenessWithVerifySession", async () => {
    const deviceCorrelationId = recorder.variable("deviceCorrelationId", randomUUID());

    const createLivenessSessionResponse = await client
      .path("/detectLivenessWithVerify-sessions")
      .post({
        contentType: "multipart/form-data",
        body: [
          {
            name: "livenessOperationMode",
            body: "Passive",
          },
          {
            name: "deviceCorrelationId",
            body: deviceCorrelationId,
          },
          {
            name: "enableSessionImage",
            body: true,
          },
          {
            name: "verifyImage",
            body: readFileSync("samples-dev/data/detection1.jpg"),
            filename: "verifyImage.jpg",
          },
        ],
      });
    if (isUnexpected(createLivenessSessionResponse)) {
      throw new Error(createLivenessSessionResponse.body.error.message);
    }
    assert.equal(createLivenessSessionResponse.body.status, "NotStarted");
    assert.equal(createLivenessSessionResponse.body.results.attempts.length, 0);

    const { sessionId /* authToken */ } = createLivenessSessionResponse.body;

    // start session

    const getLivenessSessionResultResponse1 = await client
      .path("/detectLivenessWithVerify-sessions/{sessionId}", sessionId)
      .get();
    if (isUnexpected(getLivenessSessionResultResponse1)) {
      throw new Error(getLivenessSessionResultResponse1.body.error.message);
    }
    assert.equal(getLivenessSessionResultResponse1.body.status, "Running");
    assert.equal(getLivenessSessionResultResponse1.body.results.attempts.length, 0);

    // send payloads

    const getLivenessSessionResultResponse2 = await client
      .path("/detectLivenessWithVerify-sessions/{sessionId}", sessionId)
      .get();
    if (isUnexpected(getLivenessSessionResultResponse2)) {
      throw new Error(getLivenessSessionResultResponse2.body.error.message);
    }
    assert.equal(getLivenessSessionResultResponse2.body.status, "Succeeded");
    assert.equal(getLivenessSessionResultResponse2.body.results.attempts.length, 1);
    assert.equal(
      getLivenessSessionResultResponse2.body.results.attempts[0].attemptStatus,
      "Succeeded",
    );
    assert.equal(
      getLivenessSessionResultResponse2.body.results.attempts[0].result?.livenessDecision,
      "realface",
    );
    assert.equal(
      getLivenessSessionResultResponse2.body.results.attempts[0].result?.verifyResult?.isIdentical,
      false,
    );
    assert.isNotNull(
      getLivenessSessionResultResponse2.body.results.attempts[0].result?.sessionImageId,
    );

    const sessionImageId = getLivenessSessionResultResponse2.body.results.attempts[0].result
      ?.sessionImageId as string;
    const getSessionImageResponse = await client
      .path("/sessionImages/{sessionImageId}", sessionImageId)
      .get();
    if (isUnexpected(getSessionImageResponse)) {
      throw new Error(getSessionImageResponse.body.error.message);
    }
    assert.equal(getSessionImageResponse.body.length, 639232);

    const deleteLivenessSessionResponse = await client
      .path("/detectLivenessWithVerify-sessions/{sessionId}", sessionId)
      .delete();
    if (isUnexpected(deleteLivenessSessionResponse)) {
      throw new Error(deleteLivenessSessionResponse.body.error.message);
    }
  });
});
