# Azure Communication Service SIP Routing library for JavaScript

[Azure Communication Services](https://azure.microsoft.com/en-us/services/communication-services/) is a set of rich communication APIs, video APIs, and SMS APIs for deploying your applications across any device, on any platform.

This client library provides access to the SIP routing configuration and is one of the available ACS client libraries.

## Getting started

### Currently supported environments

- Node.js version 8.x or higher

### Prerequisites

- An [Azure subscription][azure_sub].

Usually you'd put a shell command for provisioning the necessary Azure services here.

### Install the `@azure/communication-sip-routing` package

Install the SIP routing client library for JavaScript with `npm`:

```bash
npm install @azure/communication-sip-routing
```

### Browser support

#### JavaScript Bundle

To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

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
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/core/logger).

## Next steps

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/template/template/samples) directory for detailed examples that demonstrate how to use the client libraries.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Ftemplate%2Ftemplate%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
