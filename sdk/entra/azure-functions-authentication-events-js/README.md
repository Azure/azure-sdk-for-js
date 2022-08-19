# Azure Template client library for JavaScript

<!-- NOTE: This README file is a template. Read through it and replace the instructions (keeping an eye out for package names like "@azure/template") with the ones that pertain to your package. For a complete example based on the real Azure App Configuration SDK, see README-TEMPLATE.md in this directory. -->

This project is used as a template package for the Azure SDK for JavaScript. It is intended to help Azure SDK developers bootstrap new packages, and it provides an example of how to organize the code and documentation of a client library for an Azure service.

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge, and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription][azure_sub].

Usually you'd put a shell command for provisioning the necessary Azure services here.

### Install the `@azure/template` package

Install the Template client library for JavaScript with `npm`:

```bash
npm install @azure/template
```

### Browser support

#### JavaScript Bundle

To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

#### CORS

<!--

NOTE: if your service supports CORS natively please provide instructions for enabling CORS at the service level (similar to the sample below), otherwise replace this section with guidance such as:

Due to Azure template service CORS limitation this library cannot be used to make direct calls to the template service from a browser. Please refer to [this document](https://github.com/Azure/azure-sdk-for-js/blob/main/samples/cors/ts/README.md) for guidance.

-->

You need to set up [Cross-Origin Resource Sharing (CORS)](https://docs.microsoft.com/rest/api/storageservices/cross-origin-resource-sharing--cors--support-for-the-azure-storage-services) rules for your storage account if you need to develop for browsers. Go to Azure portal and Azure Storage Explorer, find your storage account, create new CORS rules for blob/queue/file/table service(s).

For example, you can create the following CORS settings for debugging. But please customize the settings carefully according to your requirements in a production environment.

- Allowed origins: \*
- Allowed verbs: DELETE,GET,HEAD,MERGE,POST,OPTIONS,PUT
- Allowed headers: \*
- Exposed headers: \*
- Maximum age (seconds): 86400

### Further examples

Top-level examples usually include things like creating and authenticating the main Client. If your service supports multiple means of authenticating (e.g. key-based and Azure Active Directory) you can give a separate example of each.

## Key concepts

### ConfigurationClient

Describe your primary client here. Talk about what operations it can do and when a developer would want to use it.

### Additional Examples

Create a section for each top-level service concept you want to explain.

## Examples

### First Example

<!-- Examples should showcase the primary, or "champion" scenarios of the client SDK. -->

Create several code examples for how someone would use your library to accomplish a common task with the service.

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/template/template/samples) directory for detailed examples that demonstrate how to use the client libraries.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Ftemplate%2Ftemplate%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
