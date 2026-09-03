# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                             | **Description**                                                                                                                                                                                                         |
| ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [globalAdministratorElevateAccessSample.ts][globaladministratorelevateaccesssample]       | Elevates access for a Global Administrator. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/ElevateAccess.json                                      |
| [permissionsListForResourceGroupSample.ts][permissionslistforresourcegroupsample]         | Gets all permissions the caller has for a resource group. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/GetPermissions.json                       |
| [permissionsListForResourceSample.ts][permissionslistforresourcesample]                   | Gets all permissions the caller has for a resource. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/GetResourcePermissions.json                     |
| [providerOperationsMetadataGetSample.ts][provideroperationsmetadatagetsample]             | Gets provider operations metadata for the specified resource provider. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/GetProviderOperationsRP.json |
| [providerOperationsMetadataListSample.ts][provideroperationsmetadatalistsample]           | Gets provider operations metadata for all resource providers. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/GetAllProviderOperations.json         |
| [roleAssignmentsCreateByIdSample.ts][roleassignmentscreatebyidsample]                     | Creates a role assignment by ID. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/PutRoleAssignmentById.json                                         |
| [roleAssignmentsCreateSample.ts][roleassignmentscreatesample]                             | Creates a role assignment. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/PutRoleAssignment.json                                                   |
| [roleAssignmentsDeleteByIdSample.ts][roleassignmentsdeletebyidsample]                     | Deletes a role assignment. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/DeleteRoleAssignmentById.json                                            |
| [roleAssignmentsDeleteSample.ts][roleassignmentsdeletesample]                             | Deletes a role assignment. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/DeleteRoleAssignmentByName.json                                          |
| [roleAssignmentsGetByIdSample.ts][roleassignmentsgetbyidsample]                           | Gets a role assignment by ID. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/GetRoleAssignmentById.json                                            |
| [roleAssignmentsGetSample.ts][roleassignmentsgetsample]                                   | Get the specified role assignment. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/GetRoleAssignmentByName.json                                     |
| [roleAssignmentsListForResourceGroupSample.ts][roleassignmentslistforresourcegroupsample] | Gets role assignments for a resource group. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/GetRoleAssignmentsForResourceGroup.json                 |
| [roleAssignmentsListForResourceSample.ts][roleassignmentslistforresourcesample]           | Gets role assignments for a resource. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/GetRoleAssignmentsForResource.json                            |
| [roleAssignmentsListForScopeSample.ts][roleassignmentslistforscopesample]                 | Gets role assignments for a scope. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/GetRoleAssignmentByScope.json                                    |
| [roleAssignmentsListSample.ts][roleassignmentslistsample]                                 | Gets all role assignments for the subscription. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/GetAllRoleAssignments.json                          |
| [roleDefinitionsCreateOrUpdateSample.ts][roledefinitionscreateorupdatesample]             | Creates or updates a role definition. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/PutRoleDefinition.json                                        |
| [roleDefinitionsDeleteSample.ts][roledefinitionsdeletesample]                             | Deletes a role definition. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/DeleteRoleDefinition.json                                                |
| [roleDefinitionsGetByIdSample.ts][roledefinitionsgetbyidsample]                           | Gets a role definition by ID. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/GetRoleDefinitionById.json                                            |
| [roleDefinitionsGetSample.ts][roledefinitionsgetsample]                                   | Get role definition by name (GUID). x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/GetRoleDefinitionByName.json                                    |
| [roleDefinitionsListSample.ts][roledefinitionslistsample]                                 | Get all role definitions that are applicable at scope and above. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/GetRoleDefinitionAtScope.json      |

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
node dist/globalAdministratorElevateAccessSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env AUTHORIZATION_SUBSCRIPTION_ID="<authorization subscription id>" node dist/globalAdministratorElevateAccessSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[globaladministratorelevateaccesssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/typescript/src/globalAdministratorElevateAccessSample.ts
[permissionslistforresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/typescript/src/permissionsListForResourceGroupSample.ts
[permissionslistforresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/typescript/src/permissionsListForResourceSample.ts
[provideroperationsmetadatagetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/typescript/src/providerOperationsMetadataGetSample.ts
[provideroperationsmetadatalistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/typescript/src/providerOperationsMetadataListSample.ts
[roleassignmentscreatebyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/typescript/src/roleAssignmentsCreateByIdSample.ts
[roleassignmentscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/typescript/src/roleAssignmentsCreateSample.ts
[roleassignmentsdeletebyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/typescript/src/roleAssignmentsDeleteByIdSample.ts
[roleassignmentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/typescript/src/roleAssignmentsDeleteSample.ts
[roleassignmentsgetbyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/typescript/src/roleAssignmentsGetByIdSample.ts
[roleassignmentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/typescript/src/roleAssignmentsGetSample.ts
[roleassignmentslistforresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/typescript/src/roleAssignmentsListForResourceGroupSample.ts
[roleassignmentslistforresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/typescript/src/roleAssignmentsListForResourceSample.ts
[roleassignmentslistforscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/typescript/src/roleAssignmentsListForScopeSample.ts
[roleassignmentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/typescript/src/roleAssignmentsListSample.ts
[roledefinitionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/typescript/src/roleDefinitionsCreateOrUpdateSample.ts
[roledefinitionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/typescript/src/roleDefinitionsDeleteSample.ts
[roledefinitionsgetbyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/typescript/src/roleDefinitionsGetByIdSample.ts
[roledefinitionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/typescript/src/roleDefinitionsGetSample.ts
[roledefinitionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/typescript/src/roleDefinitionsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-authorization-profile-2020-09-01-hybrid?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
