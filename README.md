# Azure SDK for JavaScript


| Component            | Build Status                                                                                                                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Management Libraries | [![Build Status](https://dev.azure.com/azure-sdk/public/_apis/build/status/138?branchName=master)](https://dev.azure.com/azure-sdk/public/_build/latest?definitionId=138&branchName=master) |
| Client Libraries     | [![Build Status](https://dev.azure.com/azure-sdk/public/_apis/build/status/45?branchName=master)](https://dev.azure.com/azure-sdk/public/_build/latest?definitionId=45&branchName=master)   |

This repository contains official JavaScript libraries for Azure services. For documentation go to [Azure SDK for JavaScript documentation](https://aka.ms/js-docs).

You can find a complete list of all the packages for these libraries [here](https://github.com/Azure/azure-sdk-for-js/blob/master/packages.md).

## Getting started

For your convenience, each service has a separate set of libraries that you can choose to use instead of one, large Azure package. To get started with a specific library, see the **README.md** file located in the library's project folder. You can find service libraries in the `/sdk` directory.

## Packages available
Each service might have a number of libraries available from each of the following categories:
* [Client - July 2019 Preview](#Client-July-2019-Preview)
* [Client - Stable](#Client-Stable)
* [Management](#Management)


### Client: July 2019 Preview
New wave of packages that we are currently releasing in **Preview** and are released under the `npm` release named `next`. These libraries allow you to use and consume existing resources and interact with them. These libraries share a number of core functionalities such as retries, logging, transport protocols, authentication protocols, etc. You can learn more about these libraries by reading guidelines that they follow [here](https://azuresdkspecs.z5.web.core.windows.net/TypeScriptSpec.html).

The libraries released in July preview:
- [@azure/storage-blob@next](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob)
- [@azure/storage-queue@next](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-queue)
- [@azure/storage-file@next](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file)
- [@azure/kevault-keys@next](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-keys)
- [@azure/kevault-secrets@next](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-secrets)
- [@azure/event-hubs@next](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/event-hubs)

>NOTE: If you need to ensure your code is ready for production use one of the stable libraries.


### Client: Stable
Last stable versions of packages that have been provided for usage with Azure and are production-ready. These libraries provide you with similar functionalities to the Preview ones as they allow you to use and consume existing resources and interact with them, for example: upload a blob.

### Management
Libraries which enable you to provision specific resources. They are responsible for directly mirroring and consuming Azure service's REST endpoints. You can recognize these libraries by `mgmt` or `arm` in their package names.

## Need help?
* For detailed documentation visit our [Azure SDK for JavaScript documentation](https://aka.ms/js-docs)
* File an issue via [Github Issues](https://github.com/Azure/azure-sdk-for-js/issues)
* Check [previous questions](https://stackoverflow.com/questions/tagged/azure-sdk-js) or ask new ones on StackOverflow using `azure-sdk-js` tag.

## Contributing
For details on contributing to this repository, see the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md).

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2FREADME.png)
