// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { randomUUID } from "crypto";
import { readFileSync } from "fs";

import { createRecorder, createClient } from "../utils/recordedClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { Recorder } from "@azure-tools/test-recorder";

import { FaceClient, isUnexpected } from "../../../src/index.js";

describe("SessionWithVerify", () => {
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

  it("TestCreateVerifySessionWithImage", async () => {
    const deviceCorrelationId = recorder.variable("deviceCorrelationId", randomUUID());
    const createLivenessSessionResponse = await client
      .path("/detectLivenessWithVerify/singleModal/sessions")
      .post({
        contentType: "multipart/form-data",
        body: [
          {
            name: "VerifyImage",
            body: readFileSync("samples-dev/data/detection1.jpg"),
          },
          {
            name: "Parameters",
            body: {
              livenessOperationMode: "Passive",
              sendResultsToClient: false,
              authTokenTimeToLiveInSeconds: 60,
              deviceCorrelationId: deviceCorrelationId,
            },
          },
        ],
      });
    if (isUnexpected(createLivenessSessionResponse)) {
      throw new Error(createLivenessSessionResponse.body.error.message);
    }
    assert.equal(createLivenessSessionResponse.status, "200");
    assert.isNotEmpty(createLivenessSessionResponse.body.sessionId);
    assert.isNotEmpty(createLivenessSessionResponse.body.authToken);
    assert.isNotEmpty(createLivenessSessionResponse.body.verifyImage?.faceRectangle);
    assert.isNotEmpty(createLivenessSessionResponse.body.verifyImage?.qualityForRecognition);

    const { sessionId } = createLivenessSessionResponse.body;

    const getLivenessSessionResultResponse = await client
      .path("/detectLivenessWithVerify/singleModal/sessions/{sessionId}", sessionId)
      .get();
    if (isUnexpected(getLivenessSessionResultResponse)) {
      throw new Error(getLivenessSessionResultResponse.body.error.message);
    }
    assert.equal(getLivenessSessionResultResponse.status, "200");
    assert.equal(getLivenessSessionResultResponse.body.deviceCorrelationId, deviceCorrelationId);

    const deleteLivenessSessionResponse = await client
      .path("/detectLivenessWithVerify/singleModal/sessions/{sessionId}", sessionId)
      .delete();
    if (isUnexpected(deleteLivenessSessionResponse)) {
      throw new Error(deleteLivenessSessionResponse.body.error.message);
    }
    assert.equal(deleteLivenessSessionResponse.status, "200");
  });
});
