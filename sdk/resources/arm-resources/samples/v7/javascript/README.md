# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                               | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [providerResourceTypesListSample.js][providerresourcetypeslistsample]       | List the resource types for a specified resource provider. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2025-04-01/examples/GetProviderResourceTypes.json                                                                                                                                                                                                                                                                                                                                                                                                                       |
| [providersGetAtTenantScopeSample.js][providersgetattenantscopesample]       | Gets the specified resource provider at the tenant level. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2025-04-01/examples/GetNamedProviderAtTenant.json                                                                                                                                                                                                                                                                                                                                                                                                                        |
| [providersGetSample.js][providersgetsample]                                 | Gets the specified resource provider. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2025-04-01/examples/GetProvider.json                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| [providersListSample.js][providerslistsample]                               | Gets all resource providers for a subscription. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2025-04-01/examples/GetProviders.json                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| [providersProviderPermissionsSample.js][providersproviderpermissionssample] | Get the provider permissions. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2025-04-01/examples/GetProviderPermissions.json                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| [resourceGroupsCreateOrUpdateSample.js][resourcegroupscreateorupdatesample] | Creates or updates a resource group. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2025-04-01/examples/CreateResourceGroup.json                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| [resourceGroupsDeleteSample.js][resourcegroupsdeletesample]                 | When you delete a resource group, all of its resources are also deleted. Deleting a resource group deletes all of its template deployments and currently stored operations. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2025-04-01/examples/ForceDeleteVMsAndVMSSInResourceGroup.json                                                                                                                                                                                                                                                                                          |
| [resourceGroupsExportTemplateSample.js][resourcegroupsexporttemplatesample] | Captures the specified resource group as a template. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2025-04-01/examples/ExportResourceGroup.json                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| [tagsCreateOrUpdateAtScopeSample.js][tagscreateorupdateatscopesample]       | This operation allows adding or replacing the entire set of tags on the specified resource or subscription. The specified entity can have a maximum of 50 tags. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2025-04-01/examples/PutTagsResource.json                                                                                                                                                                                                                                                                                                                           |
| [tagsDeleteAtScopeSample.js][tagsdeleteatscopesample]                       | Deletes the entire set of tags on a resource or subscription. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2025-04-01/examples/DeleteTagsResource.json                                                                                                                                                                                                                                                                                                                                                                                                                          |
| [tagsGetAtScopeSample.js][tagsgetatscopesample]                             | Gets the entire set of tags on a resource or subscription. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2025-04-01/examples/GetTagsResource.json                                                                                                                                                                                                                                                                                                                                                                                                                                |
| [tagsUpdateAtScopeSample.js][tagsupdateatscopesample]                       | This operation allows replacing, merging or selectively deleting tags on the specified resource or subscription. The specified entity can have a maximum of 50 tags at the end of the operation. The 'replace' option replaces the entire set of existing tags with a new set. The 'merge' option allows adding tags with new names and updating the values of tags with existing names. The 'delete' option allows selectively deleting tags based on given names or name/value pairs. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2025-04-01/examples/PatchTagsResource.json |

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
npx cross-env RESOURCES_SUBSCRIPTION_ID="<resources subscription id>" node providerResourceTypesListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[providerresourcetypeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources/samples/v7/javascript/providerResourceTypesListSample.js
[providersgetattenantscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources/samples/v7/javascript/providersGetAtTenantScopeSample.js
[providersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources/samples/v7/javascript/providersGetSample.js
[providerslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources/samples/v7/javascript/providersListSample.js
[providersproviderpermissionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources/samples/v7/javascript/providersProviderPermissionsSample.js
[resourcegroupscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources/samples/v7/javascript/resourceGroupsCreateOrUpdateSample.js
[resourcegroupsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources/samples/v7/javascript/resourceGroupsDeleteSample.js
[resourcegroupsexporttemplatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources/samples/v7/javascript/resourceGroupsExportTemplateSample.js
[tagscreateorupdateatscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources/samples/v7/javascript/tagsCreateOrUpdateAtScopeSample.js
[tagsdeleteatscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources/samples/v7/javascript/tagsDeleteAtScopeSample.js
[tagsgetatscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources/samples/v7/javascript/tagsGetAtScopeSample.js
[tagsupdateatscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources/samples/v7/javascript/tagsUpdateAtScopeSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-resources?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/resources/arm-resources/README.md
