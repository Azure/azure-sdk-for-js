# Azure Anomaly Detector client library for JavaScript

This package contains an isomorphic SDK (runs both in Node.js and in browsers) for Azure Anomaly Detector client.

The Anomaly Detector API detects anomalies automatically in time series data. It supports two kinds of mode, one is for stateless using, another is for stateful using. In stateless mode, there are three functionalities. Entire Detect is for detecting the whole series with model trained by the time series, Last Detect is detecting last point with model trained by points before. ChangePoint Detect is for detecting trend changes in time series. In stateful mode, user can store time series, the stored time series will be used for detection anomalies. Under this mode, user can still use the above three functionalities by only giving a time range without preparing time series in client side. Besides the above three functionalities, stateful model also provide group based detection and labeling service. By leveraging labeling service user can provide labels for each detection result, these labels will be used for retuning or regenerating detection models. Inconsistency detection is a kind of group based detection, this detection will find inconsistency ones in a set of time series. By using anomaly detector service, business customers can discover incidents and establish a logic flow for root cause analysis.

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitiveservices/cognitiveservices-anomalydetector) |
[Package (NPM)](https://www.npmjs.com/package/@azure/cognitiveservices-anomalydetector) |
[API reference documentation](https://docs.microsoft.com/javascript/api/@azure/cognitiveservices-anomalydetector?view=azure-node-preview) |
[Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitiveservices/cognitiveservices-anomalydetector/samples)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge and Firefox.

### Prerequisites

- An [Azure subscription][azure_sub].

### Install the `@azure/cognitiveservices-anomalydetector` package

Install the Azure Anomaly Detector client library for JavaScript with `npm`:

```bash
npm install @azure/cognitiveservices-anomalydetector
```

### Create and authenticate a `AnomalyDetectorClient`

To create a client object to access the Azure Anomaly Detector API, you will need the `endpoint` of your Azure Anomaly Detector resource and a `credential`. The Azure Anomaly Detector client can use Azure Active Directory credentials to authenticate.
You can find the endpoint for your Azure Anomaly Detector resource in the [Azure Portal][azure_portal].

You can authenticate with Azure Active Directory using a credential from the [@azure/identity][azure_identity] library or [an existing AAD Token](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-a-pre-fetched-access-token).

To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

You will also need to **register a new AAD application and grant access to Azure Anomaly Detector** by assigning the suitable role to your service principal (note: roles such as `"Owner"` will not grant the necessary permissions).
Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.

For more information about how to create an Azure AD Application check out [this guide](https://docs.microsoft.com/azure/active-directory/develop/howto-create-service-principal-portal).

```javascript
const { AnomalyDetectorClient } = require("@azure/cognitiveservices-anomalydetector");
const { DefaultAzureCredential } = require("@azure/identity");
const client = new AnomalyDetectorClient("<endpoint>", new DefaultAzureCredential());
```


### JavaScript Bundle
To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

## Key concepts

### AnomalyDetectorClient

`AnomalyDetectorClient` is the primary interface for developers using the Azure Anomaly Detector client library. Explore the methods on this client object to understand the different features of the Azure Anomaly Detector service that you can access.

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");
setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitiveservices/cognitiveservices-anomalydetector/samples) directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcognitiveservices%2Fcognitiveservices-anomalydetector%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
