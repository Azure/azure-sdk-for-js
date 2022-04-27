# Azure Anomaly Detector client library for JavaScript

[Azure AnomalyDetector](https://azure.microsoft.com/services/cognitive-services/anomaly-detector/) API enables you to monitor and detect abnormalities in your time series data with machine learning.

Key links:
- [Source code](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/anomalydetector/ai-anomaly-detector/)
- [Package (NPM)](https://www.npmjs.com/package/@azure/ai-anomaly-detector)
- [API reference documentation](https://docs.microsoft.com/javascript/api/@azure/ai-anomaly-detector)
- [Product documentation](https://docs.microsoft.com/azure/cognitive-services/anomaly-detector/)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/anomalydetector/ai-anomaly-detector/samples)

## Key concepts

The `AnomalyDetectorClient` provides methods for anomaly detection:

- `detectEntireSeries` - Detects anomalies on an entire data set
- `detectLastPoint` - Detects anomalies in the latest data point
- `detectChangePoint` - Evaluates change point score of every series point

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge, and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription](https://azure.microsoft.com/free/).
- An existing Anomaly Detector resource.

If you use the Azure CLI, replace `<your-resource-group-name>` and `<your-resource-name>` with your own unique names:

```PowerShell
az cognitiveservices account create --kind AnomalyDetector --resource-group <your-resource-group-name> --name <your-resource-name>
```

### Install the `@azure/ai-anomaly-detector` package

Install the Azure Anomaly Detector client library for JavaScript with `npm`:

```bash
npm install @azure/ai-anomaly-detector
```

### Create and authenticate a `AnomalyDetectorClient`

To create a client object to access the Anomaly Detector API, you will need the `endpoint` of your Anomaly Detector resource and a `credential`. The Anomaly Detector client can use either Azure Active Directory credentials or an API key credential to authenticate.

You can find the endpoint for your Anomaly Detector resource in the Azure Portal by clicking `Keys and Endpoint` under Resource Management in the menu or by using the Azure CLI snippet below:

```bash
az cognitiveservices account show --name <your-resource-name> --resource-group <your-resource-group-name> --query "endpoint"
```

#### Using an API Key

Use the Azure Portal to browse to your Anomaly Detector resource and retrieve an API key by clicking `Keys and Endpoint` under Resource Management, or use the Azure CLI snippet below:

**Note:** Sometimes the API key is referred to as a "subscription key" or "subscription API key."

```PowerShell
az cognitiveservices account keys list --resource-group <your-resource-group-name> --name <your-resource-name>
```

Once you have an API key and endpoint, you can use the `AzureKeyCredential` class to authenticate the client as follows:

```js
const { AnomalyDetectorClient, AzureKeyCredential } = require("@azure/ai-anomaly-detector");

const client = new AnomalyDetectorClient("<endpoint>", new AzureKeyCredential("<API key>"));
```

#### Using an Azure Active Directory Credential

Client API key authentication is used in most of the examples, but you can also authenticate with Azure Active Directory using the [Azure Identity library]. To use the DefaultAzureCredential provider shown below,
or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

You will also need to register a new AAD application and grant access to Anomaly Detector by assigning the `"Cognitive Services User"` role to your service principal (note: other roles such as `"Owner"` will not grant the necessary permissions, only `"Cognitive Services User"` will suffice to run the examples and the sample code).

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.

```js
const { AnomalyDetectorClient } = require("@azure/ai-anomaly-detector");
const { DefaultAzureCredential } = require("@azure/identity");

const client = new AnomalyDetectorClient("<endpoint>", new DefaultAzureCredential());
```

## Examples

### Detect Change Points

This sample demonstrates how to detect change points on entire series.

```javascript
const { AnomalyDetectorClient, TimeGranularity } = require("@azure/ai-anomaly-detector");
const { AzureKeyCredential } = require("@azure/core-auth");

// You will need to set this environment variables in .env file or edit the following values
const apiKey = process.env["API_KEY"] || "";
const endpoint = process.env["ENDPOINT"] || "";

async function main() {
  // create client
  const client = new AnomalyDetectorClient(endpoint, new AzureKeyCredential(apiKey));

  // construct request
  const request = {
    series: [
      { timestamp: new Date("2018-03-01T00:00:00Z"), value: 32858923 },
      { timestamp: new Date("2018-03-02T00:00:00Z"), value: 29615278 },
      { timestamp: new Date("2018-03-03T00:00:00Z"), value: 22839355 },
      { timestamp: new Date("2018-03-04T00:00:00Z"), value: 25948736 },
      { timestamp: new Date("2018-03-05T00:00:00Z"), value: 34139159 },
      { timestamp: new Date("2018-03-06T00:00:00Z"), value: 33843985 },
      { timestamp: new Date("2018-03-07T00:00:00Z"), value: 33637661 },
      { timestamp: new Date("2018-03-08T00:00:00Z"), value: 32627350 },
      { timestamp: new Date("2018-03-09T00:00:00Z"), value: 29881076 },
      { timestamp: new Date("2018-03-10T00:00:00Z"), value: 22681575 },
      { timestamp: new Date("2018-03-11T00:00:00Z"), value: 24629393 },
      { timestamp: new Date("2018-03-12T00:00:00Z"), value: 34010679 },
      { timestamp: new Date("2018-03-13T00:00:00Z"), value: 33893888 },
      { timestamp: new Date("2018-03-14T00:00:00Z"), value: 33760076 },
      { timestamp: new Date("2018-03-15T00:00:00Z"), value: 33093515 }
    ],
    granularity: TimeGranularity.daily
  };

  // get change point detect results
  const result = await client.detectChangePoint(request);
  const isChangePointDetected = result.isChangePoint.some((changePoint) => changePoint);

  if (isChangePointDetected) {
    console.log("Change points were detected from the series at index:");
    result.isChangePoint.forEach((changePoint, index) => {
      if (changePoint === true) {
        console.log(index);
      }
    });
  } else {
    console.log("There is no change point detected from the series.");
  }
  // output:
  // Change points were detected from the series at index:
  // 9
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

More Samples can be found [here](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/anomalydetector/ai-anomaly-detector/samples)

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

Please take a look at the
[samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/anomalydetector/ai-anomaly-detector/samples)
directory for detailed examples on how to use this library.

## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.
