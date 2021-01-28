# Azure Template client library for JavaScript

<!-- NOTE: This README file is a template. Read through it and replace the instructions (keeping an eye out for package names like "@azure/template") with the ones that pertain to your package. For a complete example based on Azure Text Analytics, see README-TEMPLATE.md in this directory. -->

This project is used as a template package for the Azure SDK for JavaScript. It is intended to help Azure SDK developers bootstrap new packages, and it provides an example of how to organize the code and documentation of a client library for an Azure service.

## Getting started

### Currently supported environments

- Node.js version 8.x or higher

### Prerequisites

- An [Azure subscription][azure_sub].

Usually you'd put a shell command for provisioning the necessary Azure services here.

### Install the `@azure/template` package

Install the Template client library for JavaScript with `npm`:

```bash
npm install @azure/template
```

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

### Enable logs

You can set the following environment variable to see debug logs when using this library.

- Getting debug logs from the Azure TextAnalytics client library

```bash
export DEBUG=azure*
```

## Next steps

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/template/template/samples) directory for detailed examples that demonstrate how to use the client libraries.

## Contributing

This project welcomes contributions and suggestions. Most contributions require
you to agree to a Contributor License Agreement (CLA) declaring that you have
the right to, and actually do, grant us the rights to use your contribution.
For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether
you need to provide a CLA and decorate the PR appropriately (e.g., label,
comment). Simply follow the instructions provided by the bot. You will only
need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of
Conduct](https://opensource.microsoft.com/codeofconduct/). For more
information see the [Code of Conduct
FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact
[opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional
questions or comments.

If you'd like to contribute to this library, please read the [contributing
guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md)
to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Ftemplate%2Ftemplate%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
