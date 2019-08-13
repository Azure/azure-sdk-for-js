# Azure SDK for JavaScript

This repository contains official JavaScript libraries and TypeScript definitions for Azure services. For documentation go to [Azure SDK for JavaScript documentation](https://aka.ms/js-docs).

You can find a complete list of these libraries in [packages.md](https://github.com/Azure/azure-sdk-for-js/blob/master/packages.md).

## Getting started

For your convenience, each service has a separate set of libraries that you can choose to use instead of one, large Azure package. To get started with a specific library, see the **README.md** file located in the library's project folder. You can find service libraries in the `/sdk` directory.

Each service might have a number of libraries available from each of the following categories:

- [Client - July 2019 Preview](#Client-July-2019-Preview)
- [Client - Stable](#Client-Stable)
- [Management](#Management)

### Client: July 2019 Preview

New wave of packages that we are currently releasing in **Preview** and are released under the `npm` release named `next`. These libraries allow you to use and consume existing resources and interact with them. These libraries share a number of core functionalities such as retries, logging, transport protocols, authentication protocols, etc. Learn more about these libraries by reading [the guidelines](https://azure.github.io/azure-sdk/typescript/guidelines/) that they follow.

The libraries released in July preview:

- [@azure/storage-blob@next](https://github.com/Azure/azure-sdk-for-js/tree/feature/storage/sdk/storage/storage-blob)
- [@azure/storage-queue@next](https://github.com/Azure/azure-sdk-for-js/tree/feature/storage/sdk/storage/storage-queue)
- [@azure/storage-file@next](https://github.com/Azure/azure-sdk-for-js/tree/feature/storage/sdk/storage/storage-file)
- [@azure/keyvault-keys@next](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-keys)
- [@azure/keyvault-secrets@next](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-secrets)
- [@azure/event-hubs@next](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/event-hubs)

> NOTE: If you need to ensure your code is ready for production use one of the stable libraries.

### Client: Stable

Last stable versions of packages that have been provided for usage with Azure and are production-ready. These libraries provide you with similar functionalities to the Preview ones as they allow you to use and consume existing resources and interact with them, for example: upload a blob.

### Management

Libraries which enable you to provision specific resources. They are responsible for directly mirroring and consuming Azure service's REST endpoints. You can recognize these libraries by `mgmt` or `arm` in their package names.

## Need help?

- For detailed documentation visit our [Azure SDK for JavaScript documentation](https://aka.ms/js-docs)
- File an issue via [Github Issues](https://github.com/Azure/azure-sdk-for-js/issues)
- Check [previous questions](https://stackoverflow.com/questions/tagged/azure-sdk-js) or ask new ones on StackOverflow using `azure-sdk-js` tag.

## Contributing
For details on contributing to this repository, see the [contributing guide](CONTRIBUTING.md).

This project welcomes contributions and suggestions. Most contributions require you to agree to a Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us the rights to use your contribution. For details, visit
https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions provided by the bot. You will only need to do this once across all repositories using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

| Component            | Build Status                                                                                                                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Client Libraries     | [![Build Status](https://dev.azure.com/azure-sdk/public/_apis/build/status/614?branchName=master)](https://dev.azure.com/azure-sdk/public/_build/latest?definitionId=614&branchName=master) [![Dependencies](https://img.shields.io/badge/dependencies-analyzed-blue.svg)](https://azuresdkartifacts.blob.core.windows.net/azure-sdk-for-js/dependencies/dependencies.html) |
| Management Libraries | [![Build Status](https://dev.azure.com/azure-sdk/public/_apis/build/status/138?branchName=master)](https://dev.azure.com/azure-sdk/public/_build/latest?definitionId=138&branchName=master) |

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2FREADME.png)
