# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                         | **Description**                                                                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [domainServiceOperationsListSample.ts][domainserviceoperationslistsample]             | Lists all the available Domain Services operations. x-ms-original-file: specification/domainservices/resource-manager/Microsoft.AAD/stable/2021-05-01/examples/GetOperations.json                                                                                                                                                                                             |
| [domainServicesCreateOrUpdateSample.ts][domainservicescreateorupdatesample]           | The Create Domain Service operation creates a new domain service with the specified parameters. If the specific service already exists, then any patchable properties will be updated and any immutable properties will remain unchanged. x-ms-original-file: specification/domainservices/resource-manager/Microsoft.AAD/stable/2021-05-01/examples/CreateDomainService.json |
| [domainServicesDeleteSample.ts][domainservicesdeletesample]                           | The Delete Domain Service operation deletes an existing Domain Service. x-ms-original-file: specification/domainservices/resource-manager/Microsoft.AAD/stable/2021-05-01/examples/DeleteDomainService.json                                                                                                                                                                   |
| [domainServicesGetSample.ts][domainservicesgetsample]                                 | The Get Domain Service operation retrieves a json representation of the Domain Service. x-ms-original-file: specification/domainservices/resource-manager/Microsoft.AAD/stable/2021-05-01/examples/GetDomainService.json                                                                                                                                                      |
| [domainServicesListByResourceGroupSample.ts][domainserviceslistbyresourcegroupsample] | The List Domain Services in Resource Group operation lists all the domain services available under the given resource group. x-ms-original-file: specification/domainservices/resource-manager/Microsoft.AAD/stable/2021-05-01/examples/ListDomainServicesByResourceGroup.json                                                                                                |
| [domainServicesListSample.ts][domainserviceslistsample]                               | The List Domain Services in Subscription operation lists all the domain services available under the given subscription (and across all resource groups within that subscription). x-ms-original-file: specification/domainservices/resource-manager/Microsoft.AAD/stable/2021-05-01/examples/ListDomainServicesBySubscription.json                                           |
| [domainServicesUpdateSample.ts][domainservicesupdatesample]                           | The Update Domain Service operation can be used to update the existing deployment. The update call only supports the properties listed in the PATCH body. x-ms-original-file: specification/domainservices/resource-manager/Microsoft.AAD/stable/2021-05-01/examples/UpdateDomainService.json                                                                                 |
| [ouContainerCreateSample.ts][oucontainercreatesample]                                 | The Create OuContainer operation creates a new OuContainer under the specified Domain Service instance. x-ms-original-file: specification/domainservices/resource-manager/Microsoft.AAD/stable/2021-05-01/examples/CreateOuContainer.json                                                                                                                                     |
| [ouContainerDeleteSample.ts][oucontainerdeletesample]                                 | The Delete OuContainer operation deletes specified OuContainer. x-ms-original-file: specification/domainservices/resource-manager/Microsoft.AAD/stable/2021-05-01/examples/DeleteOuContainer.json                                                                                                                                                                             |
| [ouContainerGetSample.ts][oucontainergetsample]                                       | Get OuContainer in DomainService instance. x-ms-original-file: specification/domainservices/resource-manager/Microsoft.AAD/stable/2021-05-01/examples/GetOuContainer.json                                                                                                                                                                                                     |
| [ouContainerListSample.ts][oucontainerlistsample]                                     | The List of OuContainers in DomainService instance. x-ms-original-file: specification/domainservices/resource-manager/Microsoft.AAD/stable/2021-05-01/examples/ListOuContainers.json                                                                                                                                                                                          |
| [ouContainerOperationsListSample.ts][oucontaineroperationslistsample]                 | Lists all the available OuContainer operations. x-ms-original-file: specification/domainservices/resource-manager/Microsoft.AAD/stable/2021-05-01/examples/GetOperations.json                                                                                                                                                                                                 |
| [ouContainerUpdateSample.ts][oucontainerupdatesample]                                 | The Update OuContainer operation can be used to update the existing OuContainers. x-ms-original-file: specification/domainservices/resource-manager/Microsoft.AAD/stable/2021-05-01/examples/UpdateOuContainer.json                                                                                                                                                           |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] to run these sample programs.

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/domainServiceOperationsListSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/domainServiceOperationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[domainserviceoperationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainservices/arm-domainservices/samples/v4/typescript/src/domainServiceOperationsListSample.ts
[domainservicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainservices/arm-domainservices/samples/v4/typescript/src/domainServicesCreateOrUpdateSample.ts
[domainservicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainservices/arm-domainservices/samples/v4/typescript/src/domainServicesDeleteSample.ts
[domainservicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainservices/arm-domainservices/samples/v4/typescript/src/domainServicesGetSample.ts
[domainserviceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainservices/arm-domainservices/samples/v4/typescript/src/domainServicesListByResourceGroupSample.ts
[domainserviceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainservices/arm-domainservices/samples/v4/typescript/src/domainServicesListSample.ts
[domainservicesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainservices/arm-domainservices/samples/v4/typescript/src/domainServicesUpdateSample.ts
[oucontainercreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainservices/arm-domainservices/samples/v4/typescript/src/ouContainerCreateSample.ts
[oucontainerdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainservices/arm-domainservices/samples/v4/typescript/src/ouContainerDeleteSample.ts
[oucontainergetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainservices/arm-domainservices/samples/v4/typescript/src/ouContainerGetSample.ts
[oucontainerlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainservices/arm-domainservices/samples/v4/typescript/src/ouContainerListSample.ts
[oucontaineroperationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainservices/arm-domainservices/samples/v4/typescript/src/ouContainerOperationsListSample.ts
[oucontainerupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainservices/arm-domainservices/samples/v4/typescript/src/ouContainerUpdateSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-domainservices?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/domainservices/arm-domainservices/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
