# Azure AnomalyDetectorRest client library for JavaScript

AnomalyDetector Rest Client

**Please rely heavily on our [REST client docs](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md) to use this library**

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/anomalydetector/ai-anomaly-detector-rest)
- [Package (NPM)](https://www.npmjs.com/package/@azure-rest/ai-anomaly-detector)
- [API reference documentation](https://docs.microsoft.com/javascript/api/@azure-rest/ai-anomaly-detector?view=azure-node-preview)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/anomalydetector/ai-anomaly-detector-rest/samples)

## Getting started

### Currently supported environments

- LTS versions of Node.js

### Prerequisites

- You must have an [Azure subscription](https://azure.microsoft.com/free/) to use this package.

### Install the `@azure-rest/ai-anomaly-detector` package

Install the Azure AnomalyDetectorRest client REST client library for JavaScript with `npm`:

```bash
npm install @azure-rest/ai-anomaly-detector
```

### Create and authenticate an `AnomalyDetectorRest`

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

Once you have an API key and endpoint, you can set the values of the keys and endpoint secret of the AAD application as environment variables: `ANOMALY_DETECTOR_ENDPOINT`, `ANOMALY_DETECTOR_API_KEY`

#### Using an Azure Active Directory Credential

Client API key authentication is used in most of the examples, but you can also authenticate with Azure Active Directory using the [Azure Identity library]. To use the DefaultAzureCredential provider shown below,
or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

You will also need to register a new AAD application and grant access to Anomaly Detector by assigning the `"Cognitive Services User"` role to your service principal (note: other roles such as `"Owner"` will not grant the necessary permissions, only `"Cognitive Services User"` will suffice to run the examples and the sample code).

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.

```js
const { AnomalyDetectorClient } = require("@azure-rest/ai-anomaly-detector");
const { DefaultAzureCredential } = require("@azure/identity");

const client = new AnomalyDetectorClient("<endpoint>", new DefaultAzureCredential());
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).
