// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to train a model on multivariate data and use this model to detect anomalies.
 * 
 * @summary detect multivaariate anomalies.
 */

import {
  AnomalyDetectorClient,
  AnomalyDetectorClientModelInfo,
  DetectionRequest
} from "@azure/ai-anomaly-detector";
import { AzureKeyCredential } from "@azure/core-auth";

import * as fs from "fs";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set this environment variables or edit the following values
const apiKey = process.env["API_KEY"] || "";
const endpoint = process.env["ENDPOINT"] || "";
const dataSource = "<Your own data source>";


function sleep(time: number): Promise<NodeJS.Timer> {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export async function main() {

  // create client
  const client = new AnomalyDetectorClient(endpoint, new AzureKeyCredential(apiKey));

  // Already available models
  const modelList = await client.listMultivariateModel();
  console.log("The latest 5 available models (if exist):");
  for (var i = 0; i < 5; i++) {
    var modelDetail = (await modelList.next());
    if (modelDetail.done) break;
    console.log(modelDetail.value);
  };

  // construct model request (notice that the start and end time are local time and may not align with your data source)
  const modelRequest: AnomalyDetectorClientModelInfo = {
    source: dataSource,
    startTime: new Date(2021, 0, 1, 0, 0, 0),
    endTime: new Date(2021, 0, 2, 12, 0, 0),
    slidingWindow: 200
  };

  // get train result
  console.log("Training a new model(it may take a few minutes)...");
  const trainResponse = await client.trainMultivariateModel(modelRequest);
  const modelId = trainResponse.location?.split("/").pop() ?? "";
  console.log("New model ID: " + modelId);

  // get model status
  var modelResponse = await client.getMultivariateModel(modelId);
  var modelStatus = modelResponse.modelInfo?.status;

  while (modelStatus != "READY" && modelStatus != "FAILED") {
    await sleep(2000).then(() => { });
    modelResponse = await client.getMultivariateModel(modelId);
    modelStatus = modelResponse.modelInfo?.status;
  };

  if (modelStatus == "FAILED") {
    console.log("Training failed.\nErrors:")
    for (let error of modelResponse.modelInfo?.errors ?? []) {
      console.log("Error code: " + error.code + ". Message: " + error.message);
    };
    return;
  };

  // if model status is "READY"
  console.log("TRAINING FINISHED.");

  // get result
  console.log("Start detecting(it may take a few seconds)...");
  const detectRequest: DetectionRequest = {
    source: dataSource,
    startTime: new Date(2021, 0, 2, 12, 0, 0),
    endTime: new Date(2021, 0, 3, 0, 0, 0)
  };
  var resultHeader = await client.detectAnomaly(modelId, detectRequest);
  var resultId = resultHeader.location?.split("/").pop() ?? "";
  var result = await client.getDetectionResult(resultId);
  var resultStatus = result.summary.status;

  while (resultStatus != 'READY' && resultStatus != "FAILED") {
    await sleep(1000).then(() => { });
    result = await client.getDetectionResult(resultId);
    resultStatus = result.summary.status;
  };

  if (resultStatus == "FAILED") {
    console.log("Detection failed.")
    console.log("Errors:")
    for (let error of result.summary.errors ?? []) {
      console.log("Error code: " + error.code + ". Message: " + error.message)
    }
    return;
  };

  // if result status is "READY"
  console.log("Result status: " + resultStatus);
  console.log("Result Id: " + result.resultId);

  // export the model
  var exportResult = await client.exportModel(modelId);
  var modelPath = "model.zip"
  var destination = fs.createWriteStream(modelPath);
  exportResult.readableStreamBody?.pipe(destination);
  console.log("New model has been exported to " + modelPath + ".");

  // delete model
  var deleteResult = await client.deleteMultivariateModel(modelId);

  if (deleteResult._response.status == 204) {
    console.log("New model has been deleted.")
  }
  else {
    console.log("Failed to delete the new model.");
  };
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
})
