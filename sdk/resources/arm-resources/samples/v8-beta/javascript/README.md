# @azure/arm-resources client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-resources in some common scenarios.

| **File Name**                                                               | **Description**                                                                                                                                                                                                                                      |
| --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [providerResourceTypesListSample.js][providerresourcetypeslistsample]       | list the resource types for a specified resource provider. x-ms-original-file: 2025-04-01/GetProviderResourceTypes.json                                                                                                                              |
| [providersGetAtTenantScopeSample.js][providersgetattenantscopesample]       | gets the specified resource provider at the tenant level. x-ms-original-file: 2025-04-01/GetNamedProviderAtTenant.json                                                                                                                               |
| [providersGetSample.js][providersgetsample]                                 | gets the specified resource provider. x-ms-original-file: 2025-04-01/GetProvider.json                                                                                                                                                                |
| [providersListSample.js][providerslistsample]                               | gets all resource providers for a subscription. x-ms-original-file: 2025-04-01/GetProviders.json                                                                                                                                                     |
| [providersProviderPermissionsSample.js][providersproviderpermissionssample] | get the provider permissions. x-ms-original-file: 2025-04-01/GetProviderPermissions.json                                                                                                                                                             |
| [resourceGroupsCreateOrUpdateSample.js][resourcegroupscreateorupdatesample] | creates or updates a resource group. x-ms-original-file: 2025-04-01/CreateResourceGroup.json                                                                                                                                                         |
| [resourceGroupsDeleteSample.js][resourcegroupsdeletesample]                 | when you delete a resource group, all of its resources are also deleted. Deleting a resource group deletes all of its template deployments and currently stored operations. x-ms-original-file: 2025-04-01/ForceDeleteVMsAndVMSSInResourceGroup.json |
| [resourceGroupsExportTemplateSample.js][resourcegroupsexporttemplatesample] | captures the specified resource group as a template. x-ms-original-file: 2025-04-01/ExportResourceGroup.json                                                                                                                                         |

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
node providerResourceTypesListSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node providerResourceTypesListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[providerresourcetypeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources/samples/v8-beta/javascript/providerResourceTypesListSample.js
[providersgetattenantscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources/samples/v8-beta/javascript/providersGetAtTenantScopeSample.js
[providersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources/samples/v8-beta/javascript/providersGetSample.js
[providerslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources/samples/v8-beta/javascript/providersListSample.js
[providersproviderpermissionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources/samples/v8-beta/javascript/providersProviderPermissionsSample.js
[resourcegroupscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources/samples/v8-beta/javascript/resourceGroupsCreateOrUpdateSample.js
[resourcegroupsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources/samples/v8-beta/javascript/resourceGroupsDeleteSample.js
[resourcegroupsexporttemplatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources/samples/v8-beta/javascript/resourceGroupsExportTemplateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-resources?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/resources/arm-resources/README.md
