# Azure Anomaly Detector client library for JavaScript

[Azure AnomalyDetector](https://azure.microsoft.com/services/cognitive-services/anomaly-detector/) API enables you to monitor and detect abnormalities in your time series data with machine learning.

[Source code](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/anomalydetector/ai-anomaly-detector/) |
[Package (NPM)](https://www.npmjs.com/package/@azure/ai-anomaly-detector) |
[API reference documentation](https://aka.ms/azsdk/net/docs/ref/anomalydetector) |
[Product documentation](https://docs.microsoft.com/en-us/azure/cognitive-services/anomaly-detector/) |[Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/anomalydetector/ai-anomaly-detector/samples)
[Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/anomalydetector/ai-anomaly-detector/samples)

## Key concepts

Coming soon (#10865)

## Getting started

### Currently supported environments

- Node.js version 8.x.x or higher

### Prerequisites

- An [Azure subscription][azure_sub].
- An existing [Cognitive Services][cognitive_resource] or Anomaly Detector resource. If you need to create the resource, you can use the [Azure Portal][azure_portal] or [Azure CLI][azure_cli].

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

You can find the endpoint for your Anomaly Detector resource either in the [Azure Portal][azure_portal] or by using the [Azure CLI][azure_cli] snippet below:

```bash
az cognitiveservices account show --name <your-resource-name> --resource-group <your-resource-group-name> --query "endpoint"
```

#### Using an API Key

Use the [Azure Portal][azure_portal] to browse to your Anomaly Detector resource and retrieve an API key, or use the [Azure CLI][azure_cli] snippet below:

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

Client API key authentication is used in most of the examples, but you can also authenticate with Azure Active Directory using the [Azure Identity library][azure_identity]. To use the [DefaultAzureCredential][defaultazurecredential] provider shown below,
or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

You will also need to [register a new AAD application][register_aad_app] and grant access to Anomaly Detector by assigning the `"Cognitive Services User"` role to your service principal (note: other roles such as `"Owner"` will not grant the necessary permissions, only `"Cognitive Services User"` will suffice to run the examples and the sample code).

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.

```js
const { AnomalyDetectorClient } = require("@azure/ai-anomaly-detector");
const { DefaultAzureCredential } = require("@azure/identity");

const client = new AnomalyDetectorClient("<endpoint>", new DefaultAzureCredential());
```

## Examples

Coming soon (#10865)

## Troubleshooting

### Enable logs

You can set the following environment variable to see debug logs when using this library.

- Getting debug logs from the Azure Anomaly Detector client library

```bash
export DEBUG=azure*
```

## Next steps

Please take a look at the
[samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/anomalydetector/ai-anomaly-detector/samples)
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

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.
