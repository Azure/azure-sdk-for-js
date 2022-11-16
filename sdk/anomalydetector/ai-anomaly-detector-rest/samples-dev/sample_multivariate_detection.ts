// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to train a model on multivariate data and use this model to detect anomalies.
 *
 * @summary detect multivaariate anomalies.
 */

import AnomalyDetector, {
  MultivariateDetectMultivariateBatchAnomalyParameters,
  MultivariateCreateAndTrainMultivariateModelParameters,
  MultivariateListMultivariateModelsParameters,
  paginate,
  isUnexpected,
} from "@azure-rest/ai-anomaly-detector";
import { AzureKeyCredential } from "@azure/core-auth";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set this environment variables or edit the following values
const apiKey = process.env["ANOMALY_DETECTOR_API_KEY"] || "";
const endpoint = process.env["ANOMALY_DETECTOR_ENDPOINT"] || "";
const dataSource = "<your data source>";

function sleep(time: number): Promise<NodeJS.Timer> {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export async function main() {
  // create client
  const credential = new AzureKeyCredential(apiKey);
  const apiVersion = "v1.1";
  const client = AnomalyDetector(endpoint, apiVersion, credential);

  // Already available models
  const options: MultivariateListMultivariateModelsParameters = {
    queryParameters: { skip: 0, top: 10 },
  };
  const initialResponse = await client.path(`/multivariate/models`).get(options);
  const pageData = paginate(client, initialResponse);
  const listModelsResult = [];
  for await (const item of pageData) {
    listModelsResult.push(item);
  }
  console.log(listModelsResult);

  // construct model request (notice that the start and end time are local time and may not align with your data source)
  const createMultivariateModelParameters: MultivariateCreateAndTrainMultivariateModelParameters = {
    body: {
      alignPolicy: {
        alignMode: "Outer",
        fillNAMethod: "Linear",
        paddingValue: 0,
      },
      dataSchema: "MultiTable",
      dataSource: dataSource,
      displayName: "Devops-MultiAD",
      endTime: "2021-01-02T05:00:00Z",
      slidingWindow: 200,
      startTime: "2021-01-02T00:00:00Z",
    },
    headers: { "Content-Type": "application/json" },
  };

  // train model
  const createModelResult = await client
    .path("/multivariate/models")
    .post(createMultivariateModelParameters);

  if (isUnexpected(createModelResult)) {
    throw createModelResult;
  }

  console.log(createModelResult);

  // get model status
  const modelId = createModelResult.body.modelId;
  let modelResponse = await client.path("/multivariate/models/{modelId}", modelId).get();
  if (isUnexpected(modelResponse)) {
    throw modelResponse;
  }
  if (modelResponse.body.modelInfo === undefined) {
    throw new Error("Empty model info");
  }
  let modelStatus = modelResponse.body.modelInfo.status;

  while (modelStatus != "READY" && modelStatus != "FAILED") {
    await sleep(2000).then(() => {});
    modelResponse = await client.path("/multivariate/models/{modelId}", modelId).get();

    if (isUnexpected(modelResponse)) {
      throw modelResponse.body;
    }
    if (modelResponse.body.modelInfo === undefined) {
      throw new Error("Empty model info");
    }
    modelStatus = modelResponse.body.modelInfo.status;
  }

  if (modelStatus == "FAILED") {
    console.log("Training failed.\nErrors:");
    for (const error of modelResponse.body.modelInfo.errors || []) {
      console.log("Error code: " + error.code + ". Message: " + error.message);
    }
    return;
  }

  // if model status is "READY"
  console.log("TRAINING FINISHED.");

  // get result
  const batchDetectAnomalyParameters: MultivariateDetectMultivariateBatchAnomalyParameters = {
    body: {
      dataSource: dataSource,
      endTime: "2021-01-02T05:00:00Z",
      startTime: "2021-01-02T00:00:00Z",
      topContributorCount: 10,
    },
    headers: { "Content-Type": "application/json" },
  };
  const batchDetectionResponse = await client
    .path("/multivariate/models/{modelId}:detect-batch", modelId)
    .post(batchDetectAnomalyParameters);

  if (isUnexpected(batchDetectionResponse)) {
    throw batchDetectionResponse.body;
  }

  const resultId = batchDetectionResponse.body.resultId;
  let getDetectionResultResponse = await client
    .path("/multivariate/detect-batch/{resultId}", resultId)
    .get();

  if (isUnexpected(getDetectionResultResponse)) {
    throw getDetectionResultResponse.body;
  }

  let resultStatus = getDetectionResultResponse.body.summary.status;

  while (resultStatus != "READY" && resultStatus != "FAILED") {
    await sleep(1000).then(() => {});
    getDetectionResultResponse = await client
      .path("/multivariate/detect-batch/{resultId}", resultId)
      .get();

    if (isUnexpected(getDetectionResultResponse)) {
      throw getDetectionResultResponse.body;
    }
    resultStatus = getDetectionResultResponse.body.summary.status;
  }

  if (resultStatus == "FAILED") {
    console.log("Detection failed.");
    console.log("Errors:");
    for (let error of getDetectionResultResponse.body.summary.errors || []) {
      console.log("Error code: " + error.code + ". Message: " + error.message);
    }
    return;
  }

  // if result status is "READY"
  console.log("Result status: " + resultStatus);
  console.log("Result Id: " + getDetectionResultResponse.body.resultId);

  // delete model
  const deleteResult = await client.path("/multivariate/models/{modelId}", modelId).delete();
  if (isUnexpected(deleteResult)) {
    throw deleteResult;
  }
  console.log("New model has been deleted.");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
