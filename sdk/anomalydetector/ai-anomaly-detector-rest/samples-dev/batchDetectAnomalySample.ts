// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createAnomalyDetectorRestClient, {
  BatchDetectAnomalyParameters,
  getLongRunningPoller,
} from "@azure-rest/ai-anomaly-detector";
import { AzureKeyCredential } from "@azure/core-auth";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Submit multivariate anomaly detection task with the modelId of trained model and inference data, the input schema should be the same with the training request. The request will complete asynchronously and return a resultId to query the detection result.The request should be a source link to indicate an externally accessible Azure storage Uri, either pointed to an Azure blob storage folder, or pointed to a CSV file in Azure blob storage.
 *
 * @summary Submit multivariate anomaly detection task with the modelId of trained model and inference data, the input schema should be the same with the training request. The request will complete asynchronously and return a resultId to query the detection result.The request should be a source link to indicate an externally accessible Azure storage Uri, either pointed to an Azure blob storage folder, or pointed to a CSV file in Azure blob storage.
 * x-ms-original-file: specification/cognitiveservices/data-plane/AnomalyDetector/stable/v1.1/examples/DetectAnomaly.json
 */
async function detectAnomalyWithMultivariateModel() {
  const Endpoint = "{Endpoint}";
  const ApiVersion = "v1.1";
  const credential = new AzureKeyCredential("{Your API key}");
  const client = createAnomalyDetectorRestClient(Endpoint, ApiVersion, credential);
  const modelId = "45aad126-aafd-11ea-b8fb-d89ef3400c5f";
  const options: BatchDetectAnomalyParameters = {
    body: {
      dataSource: "https://multiadsample.blob.core.windows.net/data/sample_data_2_1000.csv",
      endTime: new Date("2019-04-01T00:40:00Z"),
      startTime: new Date("2019-04-01T00:15:00Z"),
      topContributorCount: 10,
    },
    headers: { "Content-Type": "application/json" },
  };
  const initialResponse = await client
    .path("/multivariate/models/{modelId}:detect-batch", modelId)
    .post(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

detectAnomalyWithMultivariateModel().catch(console.error);
