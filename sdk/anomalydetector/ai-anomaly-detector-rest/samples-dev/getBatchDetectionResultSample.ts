// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createAnomalyDetectorRestClient from "@azure-rest/ai-anomaly-detector";
import { AzureKeyCredential } from "@azure/core-auth";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to For asynchronous inference, get multivariate anomaly detection result based on resultId returned by the BatchDetectAnomaly api.
 *
 * @summary For asynchronous inference, get multivariate anomaly detection result based on resultId returned by the BatchDetectAnomaly api.
 * x-ms-original-file: specification/cognitiveservices/data-plane/AnomalyDetector/stable/v1.1/examples/GetResult.json
 */
async function getDetectionResult() {
  const Endpoint = "{Endpoint}";
  const ApiVersion = "v1.1";
  const credential = new AzureKeyCredential("{Your API key}");
  const client = createAnomalyDetectorRestClient(Endpoint, ApiVersion, credential);
  const resultId = "663884e6-b117-11ea-b3de-0242ac130004";
  const result = await client.path("/multivariate/detect-batch/{resultId}", resultId).get();
  console.log(result);
}

getDetectionResult().catch(console.error);
