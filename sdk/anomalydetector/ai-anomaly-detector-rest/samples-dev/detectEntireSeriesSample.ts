// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createAnomalyDetectorRestClient, {
  DetectEntireSeriesParameters,
} from "@azure-rest/ai-anomaly-detector";
import { AzureKeyCredential } from "@azure/core-auth";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to This operation generates a model with an entire series, each point is detected with the same model. With this method, points before and after a certain point are used to determine whether it is an anomaly. The entire detection can give user an overall status of the time series.
 *
 * @summary This operation generates a model with an entire series, each point is detected with the same model. With this method, points before and after a certain point are used to determine whether it is an anomaly. The entire detection can give user an overall status of the time series.
 * x-ms-original-file: specification/cognitiveservices/data-plane/AnomalyDetector/stable/v1.1/examples/EntireDetect.json
 */
async function findAnomaliesForTheEntireSeriesInBatchExample() {
  const Endpoint = "{Endpoint}";
  const ApiVersion = "v1.1";
  const credential = new AzureKeyCredential("{Your API key}");
  const client = createAnomalyDetectorRestClient(Endpoint, ApiVersion, credential);
  const options: DetectEntireSeriesParameters = {
    body: {
      granularity: "monthly",
      imputeMode: "auto",
      maxAnomalyRatio: 0.25,
      sensitivity: 95,
      series: [
        { timestamp: new Date("1972-01-01T00:00:00Z"), value: 826 },
        { timestamp: new Date("1972-02-01T00:00:00Z"), value: 799 },
        { timestamp: new Date("1972-03-01T00:00:00Z"), value: 890 },
        { timestamp: new Date("1972-04-01T00:00:00Z"), value: 900 },
        { timestamp: new Date("1972-05-01T00:00:00Z"), value: 961 },
        { timestamp: new Date("1972-06-01T00:00:00Z"), value: 935 },
        { timestamp: new Date("1972-07-01T00:00:00Z"), value: 894 },
        { timestamp: new Date("1972-08-01T00:00:00Z"), value: 855 },
        { timestamp: new Date("1972-09-01T00:00:00Z"), value: 809 },
        { timestamp: new Date("1972-10-01T00:00:00Z"), value: 810 },
        { timestamp: new Date("1972-11-01T00:00:00Z"), value: 766 },
        { timestamp: new Date("1972-12-01T00:00:00Z"), value: 805 },
        { timestamp: new Date("1973-01-01T00:00:00Z"), value: 821 },
        { timestamp: new Date("1973-02-01T00:00:00Z"), value: 773 },
        { timestamp: new Date("1973-03-01T00:00:00Z"), value: 883 },
        { timestamp: new Date("1973-04-01T00:00:00Z"), value: 898 },
        { timestamp: new Date("1973-05-01T00:00:00Z"), value: 957 },
        { timestamp: new Date("1973-06-01T00:00:00Z"), value: 924 },
        { timestamp: new Date("1973-07-01T00:00:00Z"), value: 881 },
        { timestamp: new Date("1973-08-01T00:00:00Z"), value: 837 },
        { timestamp: new Date("1973-09-01T00:00:00Z"), value: 784 },
        { timestamp: new Date("1973-10-01T00:00:00Z"), value: 791 },
        { timestamp: new Date("1973-11-01T00:00:00Z"), value: 760 },
        { timestamp: new Date("1973-12-01T00:00:00Z"), value: 802 },
        { timestamp: new Date("1974-01-01T00:00:00Z"), value: 828 },
        { timestamp: new Date("1974-02-01T00:00:00Z"), value: 1030 },
        { timestamp: new Date("1974-03-01T00:00:00Z"), value: 889 },
        { timestamp: new Date("1974-04-01T00:00:00Z"), value: 902 },
        { timestamp: new Date("1974-05-01T00:00:00Z"), value: 969 },
        { timestamp: new Date("1974-06-01T00:00:00Z"), value: 947 },
        { timestamp: new Date("1974-07-01T00:00:00Z"), value: 908 },
        { timestamp: new Date("1974-08-01T00:00:00Z"), value: 867 },
        { timestamp: new Date("1974-09-01T00:00:00Z"), value: 815 },
        { timestamp: new Date("1974-10-01T00:00:00Z"), value: 812 },
        { timestamp: new Date("1974-11-01T00:00:00Z"), value: 773 },
        { timestamp: new Date("1974-12-01T00:00:00Z"), value: 813 },
        { timestamp: new Date("1975-01-01T00:00:00Z"), value: 834 },
        { timestamp: new Date("1975-02-01T00:00:00Z"), value: 782 },
        { timestamp: new Date("1975-03-01T00:00:00Z"), value: 892 },
        { timestamp: new Date("1975-04-01T00:00:00Z"), value: 903 },
        { timestamp: new Date("1975-05-01T00:00:00Z"), value: 966 },
        { timestamp: new Date("1975-06-01T00:00:00Z"), value: 937 },
        { timestamp: new Date("1975-07-01T00:00:00Z"), value: 896 },
        { timestamp: new Date("1975-08-01T00:00:00Z"), value: 858 },
        { timestamp: new Date("1975-09-01T00:00:00Z"), value: 817 },
        { timestamp: new Date("1975-10-01T00:00:00Z"), value: 827 },
        { timestamp: new Date("1975-11-01T00:00:00Z"), value: 797 },
        { timestamp: new Date("1975-12-01T00:00:00Z"), value: 843 },
      ],
    },
    headers: { "Content-Type": "application/json" },
  };
  const result = await client.path("/timeseries/entire/detect").post(options);
  console.log(result);
}

findAnomaliesForTheEntireSeriesInBatchExample().catch(console.error);
