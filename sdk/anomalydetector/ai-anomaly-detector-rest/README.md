# Azure AnomalyDetector REST client library for JavaScript

The Anomaly Detector API detects anomalies automatically in time series data.
It supports both a stateless detection mode and a
stateful detection mode. In stateless mode, there are three functionalities. Entire
Detect is for detecting the whole series, with the model trained by the time series.
Last Detect is for detecting the last point, with the model trained by points before.
ChangePoint Detect is for detecting trend changes in the time series. In stateful
mode, the user can store time series. The stored time series will be used for
detection anomalies. In this mode, the user can still use the preceding three
functionalities by only giving a time range without preparing time series on the
client side. Besides the preceding three functionalities, the stateful model
provides group-based detection and labeling services. By using the labeling
service, the user can provide labels for each detection result. These labels will be
used for retuning or regenerating detection models. Inconsistency detection is
a kind of group-based detection that finds inconsistencies in
a set of time series. By using the anomaly detector service, business customers can
discover incidents and establish a logic flow for root cause analysis.

**Please rely heavily on our [REST client docs](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md) to use this library**

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/anomalydetector/ai-anomaly-detector-rest)
- [Package (NPM)](https://www.npmjs.com/package/@azure-rest/ai-anomaly-detector)
- [API reference documentation](https://learn.microsoft.com/javascript/api/@azure-rest/ai-anomaly-detector?view=azure-node-preview)

## Getting started

### Currently supported environments

- LTS versions of Node.js

### Prerequisites

- You must have an [Azure subscription](https://azure.microsoft.com/free/) to use this package.

### Install the `@azure-rest/ai-anomaly-detector` package

Install the Azure AnomalyDetector REST client REST client library for JavaScript with `npm`:

```bash
npm install @azure-rest/ai-anomaly-detector
```

### Create and authenticate a `AnomalyDetectorClient`

To use an [Azure Active Directory (AAD) token credential](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-a-pre-fetched-access-token),
provide an instance of the desired credential type obtained from the
[@azure/identity](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) library.

To authenticate with AAD, you must first `npm` install [`@azure/identity`](https://www.npmjs.com/package/@azure/identity) 

After setup, you can choose which type of [credential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) from `@azure/identity` to use.
As an example, [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential)
can be used to authenticate the client.

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).
