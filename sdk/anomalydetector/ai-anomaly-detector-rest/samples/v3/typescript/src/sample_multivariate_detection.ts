// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to train a model on multivariate data and use this model to detect anomalies.
 *
 * @summary detect multivaariate anomalies.
 */

import createAnomalyDetectorRestClient, {
  BatchDetectAnomalyParameters,
  CreateMultivariateModelParameters,
  DetectionResultOutput,
  ListMultivariateModelParameters,
  ModelOutput,
  paginate,
} from "@azure-rest/ai-anomaly-detector";
import { AzureKeyCredential } from "@azure/core-auth";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set this environment variables or edit the following values

const apiKey = process.env["API_KEY"] || "";
const endpoint = process.env["ENDPOINT"] || "";
const apiVersion = "v1.1";

const dataSource =
  "https://mvaddataset.blob.core.windows.net/sample-multitable/sample_data_20_3000";

function sleep(time: number): Promise<NodeJS.Timer> {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export async function main() {
  // create client
  const credential = new AzureKeyCredential(apiKey);
  const client = createAnomalyDetectorRestClient(endpoint, apiVersion, credential);

  // Already available models
  const options: ListMultivariateModelParameters = {
    queryParameters: { skip: 0, top: 10 },
  };
  const initialResponse = await client.path("/multivariate/models").get(options);
  const pageData = paginate(client, initialResponse);
  const listModelsResult = [];
  for await (const item of pageData) {
    listModelsResult.push(item);
  }
  console.log(listModelsResult);

  // construct model request (notice that the start and end time are local time and may not align with your data source)
  const createMultivariateModelParameters: CreateMultivariateModelParameters = {
    body: {
      alignPolicy: {
        alignMode: "Outer",
        fillNAMethod: "Linear",
        paddingValue: 0,
      },
      dataSchema: "MultiTable",
      dataSource: dataSource,
      displayName: "Devops-MultiAD",
      endTime: new Date("2021-01-02T05:00:00Z"),
      slidingWindow: 200,
      startTime: new Date("2021-01-02T00:00:00Z"),
    },
    headers: { "Content-Type": "application/json" },
  };

  // train model
  const createModelResult = await client
    .path("/multivariate/models")
    .post(createMultivariateModelParameters);
  console.log(createModelResult);

  // get model status
  const modelId = (createModelResult.body as ModelOutput).modelId;
  var modelResponse = await client.path("/multivariate/models/{modelId}", modelId).get();
  console.log(modelResponse);
  var modelStatus = (modelResponse.body as ModelOutput)?.modelInfo?.status;

  while (modelStatus != "READY" && modelStatus != "FAILED") {
    await sleep(2000).then(() => {});
    modelResponse = await client.path("/multivariate/models/{modelId}", modelId).get();
    modelStatus = (modelResponse.body as ModelOutput)?.modelInfo?.status;
  }

  if (modelStatus == "FAILED") {
    console.log("Training failed.\nErrors:");
    for (let error of (modelResponse.body as ModelOutput).modelInfo?.errors ?? []) {
      console.log("Error code: " + error.code + ". Message: " + error.message);
    }
    return;
  }

  // if model status is "READY"
  console.log("TRAINING FINISHED.");

  // get result
  const batchDetectAnomalyParameters: BatchDetectAnomalyParameters = {
    body: {
      dataSource: dataSource,
      endTime: new Date("2021-01-02T05:00:00Z"),
      startTime: new Date("2021-01-02T00:00:00Z"),
      topContributorCount: 10,
    },
    headers: { "Content-Type": "application/json" },
  };
  const batchDetectionResponse = await client
    .path("/multivariate/models/{modelId}:detect-batch", modelId)
    .post(batchDetectAnomalyParameters);

  const resultId = (batchDetectionResponse.body as DetectionResultOutput).resultId;
  var getDetectionResultResponse = await client
    .path("/multivariate/detect-batch/{resultId}", resultId)
    .get();
  var detectionResultOutput = getDetectionResultResponse.body as DetectionResultOutput;
  var resultStatus = detectionResultOutput.summary.status;

  while (resultStatus != "READY" && resultStatus != "FAILED") {
    await sleep(1000).then(() => {});
    getDetectionResultResponse = await client
      .path("/multivariate/detect-batch/{resultId}", resultId)
      .get();
    detectionResultOutput = getDetectionResultResponse.body as DetectionResultOutput;
    resultStatus = detectionResultOutput.summary.status;
  }

  if (resultStatus == "FAILED") {
    console.log("Detection failed.");
    console.log("Errors:");
    for (let error of detectionResultOutput.summary.errors ?? []) {
      console.log("Error code: " + error.code + ". Message: " + error.message);
    }
    return;
  }

  // if result status is "READY"
  console.log("Result status: " + resultStatus);
  console.log("Result Id: " + detectionResultOutput.resultId);

  // delete model
  const deleteResult = await client.path("/multivariate/models/{modelId}", modelId).delete();

  if (deleteResult.status == "204") {
    console.log("New model has been deleted.");
  } else {
    console.log("Failed to delete the new model.");
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
