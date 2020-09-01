# Azure SDK for JavaScript

[![Packages](https://img.shields.io/badge/packages-latest-blue.svg)](https://azure.github.io/azure-sdk/releases/latest/js.html) [![Dependencies](https://img.shields.io/badge/dependency-report-blue.svg)](https://azuresdkartifacts.blob.core.windows.net/azure-sdk-for-js/dependencies/dependencies.html) [![DependencyGraph](https://img.shields.io/badge/dependency-graph-blue.svg)](https://azuresdkartifacts.blob.core.windows.net/azure-sdk-for-js/dependencies/InterdependencyGraph.html)

This repository is for active development of the Azure SDK for JavaScript (NodeJS & Browser). For consumers of the SDK we recommend visiting our [public developer docs](https://docs.microsoft.com/en-us/javascript/azure/) or our versioned [developer docs](https://azure.github.io/azure-sdk-for-js).

## Getting started

For your convenience, each service has a separate set of libraries that you can choose to use instead of one, large Azure package. To get started with a specific library, see the **README.md** file located in the library's project folder. You can find service libraries in the `/sdk` directory.

Each service might have a number of libraries available from each of the following categories:

- [Client - New Releases](#Client-New-Releases)
- [Client - Previous Versions](#Client-Previous-Versions)
- [Management](#Management)

### Client: New Releases

New wave of packages that we are announcing as **GA** and several that are currently releasing in **preview** on `npm`. These libraries allow you to use and consume existing resources and interact with them. These libraries share a number of core functionalities found in the Azure Core package such as retries, logging, transport protocols, authentication protocols, etc. Learn more about these libraries by reading [the guidelines](https://azure.github.io/azure-sdk/typescript/guidelines/) that they follow.

You can find the [most up to date list of all of the new packages on our page](https://azure.github.io/azure-sdk/releases/latest/index.html#javascript-packages)

> NOTE: If you need to ensure your code is ready for production use one of the stable, non-preview libraries.

### Client: Previous Versions

Last stable versions of packages that have been provided for usage with Azure and are production-ready. These libraries provide you with similar functionalities to the Preview ones as they allow you to use and consume existing resources and interact with them, for example: upload a blob. They might not implement the [guidelines](https://azure.github.io/azure-sdk/typescript_introduction.html) or have the same feature set as the Novemeber releases. They do however offer wider coverage of services.

### Management

Libraries which enable you to provision specific resources. They are responsible for directly mirroring and consuming Azure service's REST endpoints. You can recognize these libraries by `mgmt` or `arm` in their package names.

## Need help?

- For detailed documentation visit our [Azure SDK for JavaScript documentation](https://aka.ms/js-docs)
- File an issue via [GitHub Issues](https://github.com/Azure/azure-sdk-for-js/issues)
- Check [previous questions](https://stackoverflow.com/questions/tagged/azure-sdk-js) or ask new ones on StackOverflow using `azure-sdk-js` tag.

### Reporting security issues and security bugs

Security issues and bugs should be reported privately, via email, to the Microsoft Security Response Center (MSRC) <secure@microsoft.com>. You should receive a response within 24 hours. If for some reason you do not, please follow up via email to ensure we received your original message. Further information, including the MSRC PGP key, can be found in the [Security TechCenter](https://www.microsoft.com/msrc/faqs-report-an-issue).

## Contributing
For details on contributing to this repository, see the [contributing guide](CONTRIBUTING.md).

This project welcomes contributions and suggestions. Most contributions require you to agree to a Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us the rights to use your contribution. For details, visit
https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions provided by the bot. You will only need to do this once across all repositories using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2FREADME.png)
