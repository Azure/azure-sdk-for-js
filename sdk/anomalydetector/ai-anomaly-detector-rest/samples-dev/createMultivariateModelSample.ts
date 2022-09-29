// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createAnomalyDetectorRestClient, {
  CreateMultivariateModelParameters,
} from "@azure-rest/ai-anomaly-detector";
import { AzureKeyCredential } from "@azure/core-auth";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Create and train a multivariate anomaly detection model. The request must include a source parameter to indicate an externally accessible Azure blob storage URI.There are two types of data input: An URI pointed to an Azure blob storage folder which contains multiple CSV files, and each CSV file contains two columns, timestamp and variable. Another type of input is an URI pointed to a CSV file in Azure blob storage, which contains all the variables and a timestamp column.
 *
 * @summary Create and train a multivariate anomaly detection model. The request must include a source parameter to indicate an externally accessible Azure blob storage URI.There are two types of data input: An URI pointed to an Azure blob storage folder which contains multiple CSV files, and each CSV file contains two columns, timestamp and variable. Another type of input is an URI pointed to a CSV file in Azure blob storage, which contains all the variables and a timestamp column.
 * x-ms-original-file: specification/cognitiveservices/data-plane/AnomalyDetector/stable/v1.1/examples/TrainModel.json
 */
async function trainMultivariateModel() {
  const Endpoint = "{Endpoint}";
  const ApiVersion = "v1.1";
  const credential = new AzureKeyCredential("{Your API key}");
  const client = createAnomalyDetectorRestClient(Endpoint, ApiVersion, credential);
  const options: CreateMultivariateModelParameters = {
    body: {
      alignPolicy: {
        alignMode: "Outer",
        fillNAMethod: "Linear",
        paddingValue: 0,
      },
      dataSchema: "OneTable",
      dataSource: "https://multiadsample.blob.core.windows.net/data/sample_data_2_1000.csv",
      displayName: "Devops-MultiAD",
      endTime: new Date("2019-04-02T00:00:00Z"),
      slidingWindow: 20,
      startTime: new Date("2019-04-01T00:00:00Z"),
    },
    headers: { "Content-Type": "application/json" },
  };
  const result = await client.path("/multivariate/models").post(options);
  console.log(result);
}

trainMultivariateModel().catch(console.error);
