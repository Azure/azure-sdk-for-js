# Azure AnomalyDetectorRest REST client library for JavaScript

[Anomaly Detector](https://learn.microsoft.com/azure/cognitive-services/Anomaly-Detector/overview) is an AI service with a set of APIs, which enables you to monitor and detect anomalies in your time series data with little machine learning (ML) knowledge, either batch validation or real-time inference.

Please refer to our [REST client docs](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md) to use this library.

## Getting started

### Prerequisites

- LTS versions of Node.js
- You need an [Azure subscription][azure_sub] to use this package.
- An existing Cognitive Services Anomaly Detector instance.

### Install the `@azure-rest/ai-anomaly-detector` package

Install the Azure AnomalyDetectorRest REST client REST client library for JavaScript with `npm`:

```bash
npm install @azure-rest/ai-anomaly-detector
```

|SDK version|Supported API version of service |
|-------------|---------------|
|1.0.0-beta.1| 1.1|

### Create and authenticate a `AnomalyDetectorRestClient`

To use an [Azure Active Directory (AAD) token credential](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-a-pre-fetched-access-token),
provide an instance of the desired credential type obtained from the
[@azure/identity](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) library.

To authenticate with AAD, you must first `npm` install [`@azure/identity`](https://www.npmjs.com/package/@azure/identity) 

After setup, you can choose which type of [credential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) from `@azure/identity` to use.
As an example, [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential)
can be used to authenticate the client.

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables:
AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_CLIENT_SECRET

## Key concepts

With the Anomaly Detector, you can either detect anomalies in one variable using **Univariate Anomaly Detection**, or detect anomalies in multiple variables with **Multivariate Anomaly Detection**.

|Feature  |Description  |
|---------|---------|
|Univariate Anomaly Detection | Detect anomalies in one variable, like revenue, cost, etc. The model was selected automatically based on your data pattern. |
|Multivariate Anomaly Detection| Detect anomalies in multiple variables with correlations, which are usually gathered from equipment or other complex system. The underlying model used is Graph attention network.|

### Univariate Anomaly Detection

The Univariate Anomaly Detection API enables you to monitor and detect abnormalities in your time series data without having to know machine learning. The algorithms adapt by automatically identifying and applying the best-fitting models to your data, regardless of industry, scenario, or data volume. Using your time series data, the API determines boundaries for anomaly detection, expected values, and which data points are anomalies.

Using the Anomaly Detector doesn't require any prior experience in machine learning, and the REST API enables you to easily integrate the service into your applications and processes.

With the Univariate Anomaly Detection, you can automatically detect anomalies throughout your time series data, or as they occur in real-time.

|Feature  |Description  |
|---------|---------|
| Streaming detection| Detect anomalies in your streaming data by using previously seen data points to determine if your latest one is an anomaly. This operation generates a model using the data points you send, and determines if the target point is an anomaly. By calling the API with each new data point you generate, you can monitor your data as it's created. |
| Batch detection | Use your time series to detect any anomalies that might exist throughout your data. This operation generates a model using your entire time series data, with each point analyzed with the same model.         |
| Change points detection | Use your time series to detect any trend change points that exist in your data. This operation generates a model using your entire time series data, with each point analyzed with the same model.    |

### Multivariate Anomaly Detection

The **Multivariate Anomaly Detection** APIs further enable developers by easily integrating advanced AI for detecting anomalies from groups of metrics, without the need for machine learning knowledge or labeled data. Dependencies and inter-correlations between up to 300 different signals are now automatically counted as key factors. This new capability helps you to proactively protect your complex systems such as software applications, servers, factory machines, spacecraft, or even your business, from failures.

With the Multivariate Anomaly Detection, you can automatically detect anomalies throughout your time series data, or as they occur in real-time. There are three processes to use Multivariate Anomaly Detection.

- **Training**: Use Train Model API to create and train a model, then use Get Model Status API to get the status and model metadata.
- **Inference**:
  - Use Async Inference API to trigger an asynchronous inference process and use Get Inference results API to get detection results on a batch of data.
  - You could also use Sync Inference API to trigger a detection on one timestamp every time.
- **Other operations**: List Model API and Delete Model API are supported in Multivariate Anomaly Detection model for model management.

### Thread safety

We guarantee that all client instance methods are thread-safe and independent of each other ([guideline](https://azure.github.io/azure-sdk/dotnet_introduction.html#dotnet-service-methods-thread-safety)). This ensures that the recommendation of reusing client instances is always safe, even across threads.

## Examples

The following section provides several code snippets covering some of the most common Anomaly Detector service tasks, including:

- [Univariate Anomaly Detection - Batch detection](#batch-detection)
- [Univariate Anomaly Detection - Streaming detection](#streaming-detection)
- [Univariate Anomaly Detection - Detect change points](#detect-change-points)
- [Multivariate Anomaly Detection](#multivariate-anomaly-detection-sample)

### Batch detection

```typescript
const apiKey = process.env["ANOMALY_DETECTOR_API_KEY"] || "";
const endpoint = process.env["ANOMALY_DETECTOR_ENDPOINT"] || "";
const timeSeriesDataPath = "./samples-dev/example-data/request-data.csv";

function read_series_from_file(path: string): Array<TimeSeriesPoint> {
  let result = Array<TimeSeriesPoint>();
  let input = fs.readFileSync(path).toString();
  let parsed = parse(input, { skip_empty_lines: true });
  parsed.forEach(function (e: Array<string>) {
    result.push({ timestamp: new Date(e[0]), value: Number(e[1]) });
  });
  return result;
}

export async function main() {
  // create client
  const credential = new AzureKeyCredential(apiKey);
  const client = AnomalyDetector(endpoint, credential);

  // construct request
  const options: DetectUnivariateEntireSeriesParameters = {
    body: {
      granularity: "daily",
      imputeMode: "auto",
      maxAnomalyRatio: 0.25,
      sensitivity: 95,
      series: read_series_from_file(timeSeriesDataPath),
    },
    headers: { "Content-Type": "application/json" },
  };

  // get last detect result
  const result = await client.path("/timeseries/entire/detect").post(options);
  if (isUnexpected(result)) {
    throw result;
  }

  if (result.body.isAnomaly) {
    result.body.isAnomaly.forEach(function (anomaly, index) {
      if (anomaly === true) {
        console.log(index);
      }
    });
  } else {
    console.log("There is no anomaly detected from the series.");
  }
```

### Streaming Detection

```typescript
const apiKey = process.env["ANOMALY_DETECTOR_API_KEY"] || "";
const endpoint = process.env["ANOMALY_DETECTOR_ENDPOINT"] || "";
const timeSeriesDataPath = "./samples-dev/example-data/request-data.csv";

function read_series_from_file(path: string): Array<TimeSeriesPoint> {
  let result = Array<TimeSeriesPoint>();
  let input = fs.readFileSync(path).toString();
  let parsed = parse(input, { skip_empty_lines: true });
  parsed.forEach(function (e: Array<string>) {
    result.push({ timestamp: new Date(e[0]), value: Number(e[1]) });
  });
  return result;
}

export async function main() {
  // create client
  const credential = new AzureKeyCredential(apiKey);
  const client = AnomalyDetector(endpoint, credential);

  // construct request
  const options: DetectUnivariateLastPointParameters = {
    body: {
      granularity: "daily",
      imputeFixedValue: 800,
      imputeMode: "fixed",
      maxAnomalyRatio: 0.25,
      sensitivity: 95,
      series: read_series_from_file(timeSeriesDataPath),
    },
    headers: { "Content-Type": "application/json" },
  };

  // get last detect result
  const result = await client.path("/timeseries/last/detect").post(options);
  if (isUnexpected(result)) {
    throw result;
  }

  if (result.body.isAnomaly) {
    console.log("The latest point is detected as anomaly.");
  } else {
    console.log("The latest point is not detected as anomaly.");
  }
```

### Detect change points

```typescript
const apiKey = process.env["ANOMALY_DETECTOR_API_KEY"] || "";
const endpoint = process.env["ANOMALY_DETECTOR_ENDPOINT"] || "";
const timeSeriesDataPath = "./samples-dev/example-data/request-data.csv";

function read_series_from_file(path: string): Array<TimeSeriesPoint> {
  let result = Array<TimeSeriesPoint>();
  let input = fs.readFileSync(path).toString();
  let parsed = parse(input, { skip_empty_lines: true });
  parsed.forEach(function (e: Array<string>) {
    result.push({ timestamp: new Date(e[0]), value: Number(e[1]) });
  });
  return result;
}

export async function main() {
  const credential = new AzureKeyCredential(apiKey);
  const client = AnomalyDetector(endpoint, credential);
  const options: DetectUnivariateChangePointParameters = {
    body: {
      granularity: "daily",
      series: read_series_from_file(timeSeriesDataPath),
    },
    headers: { "Content-Type": "application/json" },
  };
  const result = await client.path("/timeseries/changepoint/detect").post(options);
  if (isUnexpected(result)) {
    throw result;
  }

  if (result.body.isChangePoint === undefined) throw new Error("Empty isChangePoint");
  if (
    result.body.isChangePoint.some(function (changePoint) {
      return changePoint === true;
    })
  ) {
    console.log("Change points were detected from the series at index:");
    result.body.isChangePoint.forEach(function (changePoint, index) {
      if (changePoint === true) console.log(index);
    });
  } else {
    console.log("There is no change point detected from the series.");
  }
```

### Multivariate Anomaly Detection Sample

To see how to use Anomaly Detector library to conduct Multivariate Anomaly Detection, see this [sample](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/anomalydetector/ai-anomaly-detector-rest/samples/v1-beta/typescript/src/sample_multivariate_detection.ts).

## Troubleshooting

### General

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

These code samples show common scenario operations with the Azure Anomaly Detector library. More samples can be found under the [samples](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/anomalydetector/Azure.AI.AnomalyDetector/tests/samples/) directory.

- Univariate Anomaly Detection - Batch Detection: [sample_detect_entire_series_anomaly.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/anomalydetector/ai-anomaly-detector-rest/samples/v1-beta/typescript/src/sample_detect_entire_series_anomaly.ts)

- Univariate Anomaly Detection - Streaming Detection: [ample_detect_last_point_anomaly.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/anomalydetector/ai-anomaly-detector-rest/samples/v1-beta/typescript/src/sample_detect_last_point_anomaly.ts)

- Univariate Anomaly Detection - Change Point Detection: [sample_detect_change_point.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/anomalydetector/ai-anomaly-detector-rest/samples/v1-beta/typescript/src/sample_detect_change_point.ts)

- Multivariate Anomaly Detection: [sample_multivariate_detection.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/anomalydetector/ai-anomaly-detector-rest/samples/v1-beta/typescript/src/sample_multivariate_detection.ts)

### Additional documentation

For more extensive documentation on Azure Anomaly Detector, see the [Anomaly Detector documentation](https://learn.microsoft.com/azure/cognitive-services/anomaly-detector/overview) on docs.microsoft.com.

## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us the rights to use your contribution. For details, visit [cla.microsoft.com][cla].

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct][code_of_conduct]. For more information see the [Code of Conduct FAQ][coc_faq] or contact [opencode@microsoft.com][coc_contact] with any additional questions or comments.

<!-- LINKS -->
[cla]: https://cla.microsoft.com
[code_of_conduct]: https://opensource.microsoft.com/codeofconduct/
[coc_faq]: https://opensource.microsoft.com/codeofconduct/faq/
[coc_contact]: mailto:opencode@microsoft.com
- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/anomalydetector/ai-anomaly-detector-rest)
- [Package (NPM)](https://www.npmjs.com/package/@azure-rest/ai-anomaly-detector)
- [API reference documentation](https://docs.microsoft.com/javascript/api/@azure-rest/ai-anomaly-detector?view=azure-node-preview)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/anomalydetector/ai-anomaly-detector-rest/samples)
