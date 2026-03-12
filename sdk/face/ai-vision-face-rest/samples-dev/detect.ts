// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to detect faces in an image through local file or URL.
 *
 * @summary Face detection.
 */

import { readFileSync } from "node:fs";
import { AzureKeyCredential } from "@azure/core-auth";
import createFaceClient, { isUnexpected } from "@azure-rest/ai-vision-face";
import "dotenv/config";

async function detectFromImage(): Promise<void> {
  const endpoint = process.env["FACE_ENDPOINT"] ?? "<endpoint>";
  const apikey = process.env["FACE_APIKEY"] ?? "<apikey>";
  const credential = new AzureKeyCredential(apikey);
  const client = createFaceClient(endpoint, credential);

  const filename = "data/detection5.jpg";
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
    body: readFileSync(filename),
  });
  if (isUnexpected(response)) {
    throw new Error(response.body.error.message);
  }
  console.log(`Detect from image: ${filename}`);
  console.log(JSON.stringify(response.body, null, 2));
}

async function detectFromUrl(): Promise<void> {
  const endpoint = process.env["FACE_ENDPOINT"] ?? "<endpoint>";
  const apikey = process.env["FACE_APIKEY"] ?? "<apikey>";
  const credential = new AzureKeyCredential(apikey);
  const client = createFaceClient(endpoint, credential);

  const url = "https://aka.ms/facesampleurl";
  const response = await client.path("/detect").post({
    contentType: "application/json",
    queryParameters: {
      detectionModel: "detection_01",
      recognitionModel: "recognition_04",
      returnFaceLandmarks: true,
      returnRecognitionModel: true,
      faceIdTimeToLive: 120,
      returnFaceAttributes: ["accessories", "glasses", "exposure", "noise"],
      returnFaceId: false,
    },
    body: { url },
  });
  if (isUnexpected(response)) {
    throw new Error(response.body.error.message);
  }
  console.log(`Detect from URL: ${url}`);
  console.log(JSON.stringify(response.body, null, 2));
}

async function main(): Promise<void> {
  await detectFromImage();
  await detectFromUrl();
}

main().catch(console.error);
