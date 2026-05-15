# @azure/arm-resources client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-resources in some common scenarios.

| **File Name**                                                               | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [providerResourceTypesListSample.ts][providerresourcetypeslistsample]       | list the resource types for a specified resource provider. x-ms-original-file: 2025-04-01/GetProviderResourceTypes.json                                                                                                                                                                                                                                                                                                                                                                                                                       |
| [providersGetAtTenantScopeSample.ts][providersgetattenantscopesample]       | gets the specified resource provider at the tenant level. x-ms-original-file: 2025-04-01/GetNamedProviderAtTenant.json                                                                                                                                                                                                                                                                                                                                                                                                                        |
| [providersGetSample.ts][providersgetsample]                                 | gets the specified resource provider. x-ms-original-file: 2025-04-01/GetProvider.json                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| [providersListSample.ts][providerslistsample]                               | gets all resource providers for a subscription. x-ms-original-file: 2025-04-01/GetProviders.json                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| [providersProviderPermissionsSample.ts][providersproviderpermissionssample] | get the provider permissions. x-ms-original-file: 2025-04-01/GetProviderPermissions.json                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| [resourceGroupsCreateOrUpdateSample.ts][resourcegroupscreateorupdatesample] | creates or updates a resource group. x-ms-original-file: 2025-04-01/CreateResourceGroup.json                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| [resourceGroupsDeleteSample.ts][resourcegroupsdeletesample]                 | when you delete a resource group, all of its resources are also deleted. Deleting a resource group deletes all of its template deployments and currently stored operations. x-ms-original-file: 2025-04-01/ForceDeleteVMsAndVMSSInResourceGroup.json                                                                                                                                                                                                                                                                                          |
| [resourceGroupsExportTemplateSample.ts][resourcegroupsexporttemplatesample] | captures the specified resource group as a template. x-ms-original-file: 2025-04-01/ExportResourceGroup.json                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| [tagsCreateOrUpdateAtScopeSample.ts][tagscreateorupdateatscopesample]       | this operation allows adding or replacing the entire set of tags on the specified resource or subscription. The specified entity can have a maximum of 50 tags. x-ms-original-file: 2025-04-01/PutTagsResource.json                                                                                                                                                                                                                                                                                                                           |
| [tagsDeleteAtScopeSample.ts][tagsdeleteatscopesample]                       | deletes the entire set of tags on a resource or subscription. x-ms-original-file: 2025-04-01/DeleteTagsResource.json                                                                                                                                                                                                                                                                                                                                                                                                                          |
| [tagsGetAtScopeSample.ts][tagsgetatscopesample]                             | gets the entire set of tags on a resource or subscription. x-ms-original-file: 2025-04-01/GetTagsResource.json                                                                                                                                                                                                                                                                                                                                                                                                                                |
| [tagsUpdateAtScopeSample.ts][tagsupdateatscopesample]                       | this operation allows replacing, merging or selectively deleting tags on the specified resource or subscription. The specified entity can have a maximum of 50 tags at the end of the operation. The 'replace' option replaces the entire set of existing tags with a new set. The 'merge' option allows adding tags with new names and updating the values of tags with existing names. The 'delete' option allows selectively deleting tags based on given names or name/value pairs. x-ms-original-file: 2025-04-01/PatchTagsResource.json |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

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
node dist/providerResourceTypesListSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/providerResourceTypesListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[providerresourcetypeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources/samples/v8-beta/typescript/src/providerResourceTypesListSample.ts
[providersgetattenantscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources/samples/v8-beta/typescript/src/providersGetAtTenantScopeSample.ts
[providersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources/samples/v8-beta/typescript/src/providersGetSample.ts
[providerslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources/samples/v8-beta/typescript/src/providersListSample.ts
[providersproviderpermissionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources/samples/v8-beta/typescript/src/providersProviderPermissionsSample.ts
[resourcegroupscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources/samples/v8-beta/typescript/src/resourceGroupsCreateOrUpdateSample.ts
[resourcegroupsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources/samples/v8-beta/typescript/src/resourceGroupsDeleteSample.ts
[resourcegroupsexporttemplatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources/samples/v8-beta/typescript/src/resourceGroupsExportTemplateSample.ts
[tagscreateorupdateatscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources/samples/v8-beta/typescript/src/tagsCreateOrUpdateAtScopeSample.ts
[tagsdeleteatscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources/samples/v8-beta/typescript/src/tagsDeleteAtScopeSample.ts
[tagsgetatscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources/samples/v8-beta/typescript/src/tagsGetAtScopeSample.ts
[tagsupdateatscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resources/arm-resources/samples/v8-beta/typescript/src/tagsUpdateAtScopeSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-resources?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/resources/arm-resources/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
