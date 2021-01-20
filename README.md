# Azure SDK for JavaScript

[![Packages](https://img.shields.io/badge/packages-latest-blue.svg)](https://azure.github.io/azure-sdk/releases/latest/js.html) [![Dependencies](https://img.shields.io/badge/dependency-report-blue.svg)](https://azuresdkartifacts.blob.core.windows.net/azure-sdk-for-js/dependencies/dependencies.html) [![DependencyGraph](https://img.shields.io/badge/dependency-graph-blue.svg)](https://azuresdkartifacts.blob.core.windows.net/azure-sdk-for-js/dependencies/InterdependencyGraph.html)

This repository is for the Azure SDK for JavaScript (NodeJS & Browser). It contains the management libraries for all Azure services and client libraries for a growing subset of Azure services. Management libraries are packages that you would use to provision and manage Azure resources. Client libraries are packages that you would use to consume these resources and interact with them.

## Getting started

A few helpful resources to get started are:

- The readme for each package contains code samples and package information. This readme can be found in the corresponding package folder under the folder of the service of your choice in the `/sdk` folder of this repository. The same readme file can be found on the landing page for the package in [npm](https://www.npmjs.com/).
- The API reference documentation of the latest versions of these packages, can be found at our [public developer docs](https://docs.microsoft.com/javascript/azure/).
- The API reference documentation of older versions, can be found in our [versioned developer docs](https://azure.github.io/azure-sdk-for-js).

Each service might have a number of libraries available from each of the following categories:

- [Client](#client)
- [Management](#management)

### Client

Given an Azure resource already exists, you would use the client libraries to consume it and interact with it.
Most of these libraries follow the [Azure SDK Design Guidelines for JavaScript & TypeScript](https://azure.github.io/azure-sdk/typescript_introduction.html) and share a number of core functionalities such as retries, logging, transport protocols, authentication protocols, etc. Others will be updated in the near future to follow the guidelines as well.

> NOTE: Some of these packages have beta versions. If you need to ensure your code is ready for production, use one of the stable, non-beta packages.

### Management

Libraries which enable you to provision specific resources. You can recognize these libraries by `@azure/arm-` in their package names. These are purely auto-generated based on the swagger files that represent the APIs for resource management. These swagger files can be found in the [azure-rest-api-specs repository](https://github.com/Azure/azure-rest-api-specs/).

## Need help?

- For detailed documentation visit our [Azure SDK for JavaScript documentation](https://aka.ms/js-docs)
- File an issue via [GitHub Issues](https://github.com/Azure/azure-sdk-for-js/issues)
- Check [previous questions](https://stackoverflow.com/questions/tagged/azure-sdk-js) or ask new ones on StackOverflow using `azure-sdk-js` tag.

### Reporting security issues and security bugs

Security issues and bugs should be reported privately, via email, to the Microsoft Security Response Center (MSRC) <secure@microsoft.com>. You should receive a response within 24 hours. If for some reason you do not, please follow up via email to ensure we received your original message. Further information, including the MSRC PGP key, can be found in the [Security TechCenter](https://www.microsoft.com/msrc/faqs-report-an-issue).

## Contributing

For details on contributing to this repository, see the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md).

This project welcomes contributions and suggestions. Most contributions require you to agree to a Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us the rights to use your contribution. For details, visit
https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions provided by the bot. You will only need to do this once across all repositories using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2FREADME.png)
