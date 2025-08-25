// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import FaceClient, { getLongRunningPoller, isUnexpected } from "@azure-rest/ai-vision-face";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";
import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Entra", async () => {
    const endpoint = process.env["FACE_ENDPOINT"] || "<endpoint>";
    const credential = new DefaultAzureCredential();
    const client = FaceClient(endpoint, credential);
  });

  it("ReadmeSampleCreateClient_KeyCredential", async () => {
    const endpoint = process.env["FACE_ENDPOINT"] || "<endpoint>";
    const apikey = process.env["FACE_APIKEY"] || "<apikey>";
    const credential = new AzureKeyCredential(apikey);
    const client = FaceClient(endpoint, credential);
  });

  it("ReadmeSampleFaceDetection", async () => {
    const endpoint = process.env["FACE_ENDPOINT"] || "<endpoint>";
    const credential = new DefaultAzureCredential();
    const client = FaceClient(endpoint, credential);
    // @ts-preserve-whitespace
    const response = await client.path("/detect").post({
      contentType: "application/octet-stream",
      queryParameters: {
        detectionModel: "detection_03",
        recognitionModel: "recognition_04",
        returnFaceLandmarks: true,
        returnRecognitionModel: true,
        faceIdTimeToLive: 120,
        returnFaceAttributes: ["headPose", "mask", "qualityForRecognition"],
        returnFaceId: false,
      },
      body: readFileSync("path/to/test/image"),
    });
    // @ts-preserve-whitespace
    if (isUnexpected(response)) {
      throw new Error(response.body.error.message);
    }
    // @ts-preserve-whitespace
    console.log(response.body);
  });

  it("ReadmeSampleFaceRecognitionFromLargePersonGroup", async () => {
    const endpoint = process.env["FACE_ENDPOINT"] || "<endpoint>";
    const credential = new DefaultAzureCredential();
    const client = FaceClient(endpoint, credential);
    // @ts-preserve-whitespace
    const largePersonGroupId = "lpg_family";
    // @ts-preserve-whitespace
    console.log(`Create a large person group with id: ${largePersonGroupId}`);
    const createLargePersonGroupResponse = await client
      .path("/largepersongroups/{largePersonGroupId}", largePersonGroupId)
      .put({
        body: {
          name: "My Family",
          recognitionModel: "recognition_04",
        },
      });
    // @ts-preserve-whitespace
    console.log("Create a Person Bill and add a face to him.");
    const createLargePersonGroupPersonResponse_bill = await client
      .path("/largepersongroups/{largePersonGroupId}/persons", largePersonGroupId)
      .post({
        body: {
          name: "Bill",
          userData: "Dad",
        },
      });
    // @ts-preserve-whitespace
    if (isUnexpected(createLargePersonGroupPersonResponse_bill)) {
      throw new Error(createLargePersonGroupPersonResponse_bill.body.error.message);
    }
    // @ts-preserve-whitespace
    const personId_bill = createLargePersonGroupPersonResponse_bill.body.personId;
    await client
      .path(
        "/largepersongroups/{largePersonGroupId}/persons/{personId}/persistedfaces",
        largePersonGroupId,
        personId_bill,
      )
      .post({
        queryParameters: {
          userData: "Dad-0001",
          detectionModel: "detection_03",
        },
        contentType: "application/octet-stream",
        body: readFileSync("path/to/bill/image"),
      });
    // @ts-preserve-whitespace
    console.log("Create a Person Clare and add a face to her.");
    const createLargePersonGroupPersonResponse_clare = await client
      .path("/largepersongroups/{largePersonGroupId}/persons", largePersonGroupId)
      .post({
        body: {
          name: "Clare",
          userData: "Mom",
        },
      });
    // @ts-preserve-whitespace
    if (isUnexpected(createLargePersonGroupPersonResponse_clare)) {
      throw new Error(createLargePersonGroupPersonResponse_clare.body.error.message);
    }
    // @ts-preserve-whitespace
    const personId_clare = createLargePersonGroupPersonResponse_clare.body.personId;
    await client
      .path(
        "/largepersongroups/{largePersonGroupId}/persons/{personId}/persistedfaces",
        largePersonGroupId,
        personId_clare,
      )
      .post({
        queryParameters: {
          userData: "Mom-0001",
          detectionModel: "detection_03",
        },
        contentType: "application/octet-stream",
        body: readFileSync("path/to/clare/image"),
      });
  });

  it("ReadmeSampleFaceRecognitionFromLargePersonGroup_Train", async () => {
    const endpoint = process.env["FACE_ENDPOINT"] || "<endpoint>";
    const credential = new DefaultAzureCredential();
    const client = FaceClient(endpoint, credential);
    // @ts-preserve-whitespace
    const largePersonGroupId = "lpg_family";
    // @ts-preserve-whitespace
    console.log(`Start to train the large person group: ${largePersonGroupId}`);
    const trainResponse = await client
      .path("/largepersongroups/{largePersonGroupId}/train", largePersonGroupId)
      .post();
    const trainPoller = await getLongRunningPoller(client, trainResponse);
    await trainPoller.pollUntilDone();
    // Check if poller.getOperationState().status is 'succeeded'.
  });

  it("ReadmeSampleFaceRecognitionFromLargePersonGroup_Identify", async () => {
    const endpoint = process.env["FACE_ENDPOINT"] || "<endpoint>";
    const credential = new DefaultAzureCredential();
    const client = FaceClient(endpoint, credential);
    // @ts-preserve-whitespace
    const largePersonGroupId = "lpg_family";
    // @ts-preserve-whitespace
    console.log("Detect faces from the target image.");
    const detectResponse = await client.path("/detect").post({
      contentType: "application/octet-stream",
      queryParameters: {
        detectionModel: "detection_03",
        recognitionModel: "recognition_04",
        returnFaceId: true,
      },
      body: readFileSync("path/to/target/image"),
    });
    // @ts-preserve-whitespace
    if (isUnexpected(detectResponse)) {
      throw new Error(detectResponse.body.error.message);
    }
    // @ts-preserve-whitespace
    const faceIds = detectResponse.body.map((face) => face.faceId as string);
    // @ts-preserve-whitespace
    console.log("Identify the faces in the large person group.");
    // @ts-preserve-whitespace
    const identifyResponse = await client.path("/identify").post({
      body: { faceIds, largePersonGroupId },
    });
    // @ts-preserve-whitespace
    if (isUnexpected(identifyResponse)) {
      throw new Error(identifyResponse.body.error.message);
    }
    // @ts-preserve-whitespace
    console.log(identifyResponse.body);
  });

  it("ReadmeSampleFaceRecognitionFromLargePersonGroup_Delete", async () => {
    const endpoint = process.env["FACE_ENDPOINT"] || "<endpoint>";
    const credential = new DefaultAzureCredential();
    const client = FaceClient(endpoint, credential);
    // @ts-preserve-whitespace
    const largePersonGroupId = "lpg_family";
    // @ts-preserve-whitespace
    console.log(`Delete the large person group: ${largePersonGroupId}`);
    await client.path("/largepersongroups/{largePersonGroupId}", largePersonGroupId).delete();
  });

  it("ReadmeSampleLivenessDetection", async () => {
    const endpoint = process.env["FACE_ENDPOINT"] || "<endpoint>";
    const credential = new DefaultAzureCredential();
    const client = FaceClient(endpoint, credential);
    // @ts-preserve-whitespace
    console.log("Create a new liveness session.");
    const createLivenessSessionResponse = await client
      .path("/detectLiveness/singleModal/sessions")
      .post({
        body: {
          livenessOperationMode: "Passive",
          deviceCorrelationId: randomUUID(),
          sendResultsToClient: false,
          authTokenTimeToLiveInSeconds: 60,
        },
      });
    // @ts-preserve-whitespace
    if (isUnexpected(createLivenessSessionResponse)) {
      throw new Error(createLivenessSessionResponse.body.error.message);
    }
    console.log(createLivenessSessionResponse.body);
    // @ts-preserve-whitespace
    const { sessionId } = createLivenessSessionResponse.body;
    // @ts-preserve-whitespace
    console.log("Get liveness detection results.");
    const getLivenessSessionResponse = await client
      .path("/detectLiveness/singleModal/sessions/{sessionId}", sessionId)
      .get();
    // @ts-preserve-whitespace
    if (isUnexpected(getLivenessSessionResponse)) {
      throw new Error(getLivenessSessionResponse.body.error.message);
    }
    console.log(getLivenessSessionResponse.body);
  });

  it("ReadmeSampleLivenessDetectionWithVerify", async () => {
    const endpoint = process.env["FACE_ENDPOINT"] || "<endpoint>";
    const credential = new DefaultAzureCredential();
    const client = FaceClient(endpoint, credential);
    // @ts-preserve-whitespace
    console.log("Create a new liveness with verify session with verify image.");
    const createLivenessSessionResponse = await client
      .path("/detectLivenessWithVerify/singleModal/sessions")
      .post({
        contentType: "multipart/form-data",
        body: [
          {
            name: "VerifyImage",
            body: readFileSync("path/to/verify/image"),
          },
          {
            name: "Parameters",
            body: {
              livenessOperationMode: "Passive",
              sendResultsToClient: false,
              authTokenTimeToLiveInSeconds: 60,
              deviceCorrelationId: randomUUID(),
            },
          },
        ],
      });
    // @ts-preserve-whitespace
    if (isUnexpected(createLivenessSessionResponse)) {
      throw new Error(createLivenessSessionResponse.body.error.message);
    }
    console.log(createLivenessSessionResponse.body);
    // @ts-preserve-whitespace
    const { sessionId } = createLivenessSessionResponse.body;
    // @ts-preserve-whitespace
    console.log("Get the liveness detection and verification result.");
    const getLivenessSessionResultResponse = await client
      .path("/detectLivenessWithVerify/singleModal/sessions/{sessionId}", sessionId)
      .get();
    // @ts-preserve-whitespace
    if (isUnexpected(getLivenessSessionResultResponse)) {
      throw new Error(getLivenessSessionResultResponse.body.error.message);
    }
    console.log(getLivenessSessionResultResponse.body);
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
