# Azure SDK for JavaScript

[![Packages](https://img.shields.io/badge/packages-latest-blue.svg)](https://azure.github.io/azure-sdk/releases/latest/js.html) [![Dependencies](https://img.shields.io/badge/dependency-report-blue.svg)](https://azuresdkartifacts.blob.core.windows.net/azure-sdk-for-js/dependencies/dependencies.html) [![DependencyGraph](https://img.shields.io/badge/dependency-graph-blue.svg)](https://azuresdkartifacts.blob.core.windows.net/azure-sdk-for-js/dependencies/InterdependencyGraph.html)

This repository is for active development of the Azure SDK for JavaScript (NodeJS & Browser). It contains the management libraries for all Azure services and a growing set of client libraries for a subset of Azure services. Management libraries are packages that you would use to provision and manage Azure resources. Client libraries are packages that you would use to consume these resources and interact with them.

For information on package usage and samples, please refer to these packages on npm or the readme files for each package in the source code in this repository under the `/sdk` directory.
For API reference documentation of the latest versions of these packages, visit our [public developer docs](https://docs.microsoft.com/javascript/azure/).
For API reference documentation of older versions, visit our versioned [developer docs](https://azure.github.io/azure-sdk-for-js).

## Getting started

For your convenience, each service has a separate set of libraries that you can choose to use instead of one, large Azure package. To get started with a specific library, see the **README.md** file located in the library's project folder. You can find service libraries in the `/sdk` directory.

Each service might have a number of libraries available from each of the following categories:

- [Client - New Releases](#client-new-releases)
- [Client - Previous Versions](#client-previous-versions)
- [Management](#management)

### Client: New Releases

Given an Azure resource already exists, you would use the client libraries to consume it and interact with it.
The new wave of packages that we are actively working on follow the [Azure SDK Design Guidelines for JavaScript & TypeScript](https://azure.github.io/azure-sdk/typescript_introduction.html). These packages share a number of core functionalities such as retries, logging, transport protocols, authentication protocols, etc.

You can find the [most up to date list of all of the new packages on our page](https://azure.github.io/azure-sdk/releases/latest/index.html#javascript-packages)

> NOTE: Some of these packages have beta versions. If you need to ensure your code is ready for production use one of the stable, non-preview i.e. non-beta packages.

### Client: Previous Versions

This repository also hosts client libraries i.e. the ones you would use to consume and interact with an existing Azure resource, that do not follow the [Azure SDK Design Guidelines for JavaScript & TypeScript](https://azure.github.io/azure-sdk/typescript_introduction.html). These are either packages for which we have a whole new counterparts that do follow the guidelines or are the ones that will be updated in near future to follow the guidelines. 


### Management

Libraries which enable you to provision specific resources. They are responsible for directly mirroring and consuming Azure service's REST endpoints. You can recognize these libraries by `@azure/arm-` in their package names.

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
