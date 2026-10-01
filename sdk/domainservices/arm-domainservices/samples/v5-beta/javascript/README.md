# @azure/arm-domainservices client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-domainservices in some common scenarios.

| **File Name**                                                                         | **Description**                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [domainServiceOperationsListSample.js][domainserviceoperationslistsample]             | lists all the available Domain Services operations. x-ms-original-file: 2025-10-01-preview/GetOperations.json                                                                                                                                                                                             |
| [domainServicesCreateOrUpdateSample.js][domainservicescreateorupdatesample]           | the Create Domain Service operation creates a new domain service with the specified parameters. If the specific service already exists, then any patchable properties will be updated and any immutable properties will remain unchanged. x-ms-original-file: 2025-10-01-preview/CreateDomainService.json |
| [domainServicesDeleteSample.js][domainservicesdeletesample]                           | the Delete Domain Service operation deletes an existing Domain Service. x-ms-original-file: 2025-10-01-preview/DeleteDomainService.json                                                                                                                                                                   |
| [domainServicesGetSample.js][domainservicesgetsample]                                 | the Get Domain Service operation retrieves a json representation of the Domain Service. x-ms-original-file: 2025-10-01-preview/GetDomainService.json                                                                                                                                                      |
| [domainServicesListByResourceGroupSample.js][domainserviceslistbyresourcegroupsample] | the List Domain Services in Resource Group operation lists all the domain services available under the given resource group. x-ms-original-file: 2025-10-01-preview/ListDomainServicesByResourceGroup.json                                                                                                |
| [domainServicesListSample.js][domainserviceslistsample]                               | the List Domain Services in Subscription operation lists all the domain services available under the given subscription (and across all resource groups within that subscription). x-ms-original-file: 2025-10-01-preview/ListDomainServicesBySubscription.json                                           |
| [domainServicesUnsuspendSample.js][domainservicesunsuspendsample]                     | unsuspend a suspended Domain Service resource. x-ms-original-file: 2025-10-01-preview/UnsuspendDomainService.json                                                                                                                                                                                         |
| [domainServicesUpdateSample.js][domainservicesupdatesample]                           | the Update Domain Service operation can be used to update the existing deployment. The update call only supports the properties listed in the PATCH body. x-ms-original-file: 2025-10-01-preview/UpdateDomainService.json                                                                                 |
| [ouContainerOperationGrpCreateSample.js][oucontaineroperationgrpcreatesample]         | the Create OuContainer operation creates a new OuContainer under the specified Domain Service instance. x-ms-original-file: 2025-10-01-preview/CreateOuContainer.json                                                                                                                                     |
| [ouContainerOperationGrpDeleteSample.js][oucontaineroperationgrpdeletesample]         | the Delete OuContainer operation deletes specified OuContainer. x-ms-original-file: 2025-10-01-preview/DeleteOuContainer.json                                                                                                                                                                             |
| [ouContainerOperationGrpGetSample.js][oucontaineroperationgrpgetsample]               | get OuContainer in DomainService instance. x-ms-original-file: 2025-10-01-preview/GetOuContainer.json                                                                                                                                                                                                     |
| [ouContainerOperationGrpListSample.js][oucontaineroperationgrplistsample]             | the List of OuContainers in DomainService instance. x-ms-original-file: 2025-10-01-preview/ListOuContainers.json                                                                                                                                                                                          |
| [ouContainerOperationGrpUpdateSample.js][oucontaineroperationgrpupdatesample]         | the Update OuContainer operation can be used to update the existing OuContainers. x-ms-original-file: 2025-10-01-preview/UpdateOuContainer.json                                                                                                                                                           |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

You need [an Azure subscription][freesub] to run these sample programs.

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node domainServiceOperationsListSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node domainServiceOperationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[domainserviceoperationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainservices/arm-domainservices/samples/v5-beta/javascript/domainServiceOperationsListSample.js
[domainservicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainservices/arm-domainservices/samples/v5-beta/javascript/domainServicesCreateOrUpdateSample.js
[domainservicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainservices/arm-domainservices/samples/v5-beta/javascript/domainServicesDeleteSample.js
[domainservicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainservices/arm-domainservices/samples/v5-beta/javascript/domainServicesGetSample.js
[domainserviceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainservices/arm-domainservices/samples/v5-beta/javascript/domainServicesListByResourceGroupSample.js
[domainserviceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainservices/arm-domainservices/samples/v5-beta/javascript/domainServicesListSample.js
[domainservicesunsuspendsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainservices/arm-domainservices/samples/v5-beta/javascript/domainServicesUnsuspendSample.js
[domainservicesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainservices/arm-domainservices/samples/v5-beta/javascript/domainServicesUpdateSample.js
[oucontaineroperationgrpcreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainservices/arm-domainservices/samples/v5-beta/javascript/ouContainerOperationGrpCreateSample.js
[oucontaineroperationgrpdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainservices/arm-domainservices/samples/v5-beta/javascript/ouContainerOperationGrpDeleteSample.js
[oucontaineroperationgrpgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainservices/arm-domainservices/samples/v5-beta/javascript/ouContainerOperationGrpGetSample.js
[oucontaineroperationgrplistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainservices/arm-domainservices/samples/v5-beta/javascript/ouContainerOperationGrpListSample.js
[oucontaineroperationgrpupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/domainservices/arm-domainservices/samples/v5-beta/javascript/ouContainerOperationGrpUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-domainservices?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/domainservices/arm-domainservices/README.md
