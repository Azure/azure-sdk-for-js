# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                             | **Description**                                                                                                                                                                                                         |
| ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [globalAdministratorElevateAccessSample.js][globaladministratorelevateaccesssample]       | Elevates access for a Global Administrator. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/ElevateAccess.json                                      |
| [permissionsListForResourceGroupSample.js][permissionslistforresourcegroupsample]         | Gets all permissions the caller has for a resource group. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/GetPermissions.json                       |
| [permissionsListForResourceSample.js][permissionslistforresourcesample]                   | Gets all permissions the caller has for a resource. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/GetResourcePermissions.json                     |
| [providerOperationsMetadataGetSample.js][provideroperationsmetadatagetsample]             | Gets provider operations metadata for the specified resource provider. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/GetProviderOperationsRP.json |
| [providerOperationsMetadataListSample.js][provideroperationsmetadatalistsample]           | Gets provider operations metadata for all resource providers. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/GetAllProviderOperations.json         |
| [roleAssignmentsCreateByIdSample.js][roleassignmentscreatebyidsample]                     | Creates a role assignment by ID. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/PutRoleAssignmentById.json                                         |
| [roleAssignmentsCreateSample.js][roleassignmentscreatesample]                             | Creates a role assignment. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/PutRoleAssignment.json                                                   |
| [roleAssignmentsDeleteByIdSample.js][roleassignmentsdeletebyidsample]                     | Deletes a role assignment. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/DeleteRoleAssignmentById.json                                            |
| [roleAssignmentsDeleteSample.js][roleassignmentsdeletesample]                             | Deletes a role assignment. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/DeleteRoleAssignmentByName.json                                          |
| [roleAssignmentsGetByIdSample.js][roleassignmentsgetbyidsample]                           | Gets a role assignment by ID. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/GetRoleAssignmentById.json                                            |
| [roleAssignmentsGetSample.js][roleassignmentsgetsample]                                   | Get the specified role assignment. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/GetRoleAssignmentByName.json                                     |
| [roleAssignmentsListForResourceGroupSample.js][roleassignmentslistforresourcegroupsample] | Gets role assignments for a resource group. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/GetRoleAssignmentsForResourceGroup.json                 |
| [roleAssignmentsListForResourceSample.js][roleassignmentslistforresourcesample]           | Gets role assignments for a resource. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/GetRoleAssignmentsForResource.json                            |
| [roleAssignmentsListForScopeSample.js][roleassignmentslistforscopesample]                 | Gets role assignments for a scope. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/GetRoleAssignmentByScope.json                                    |
| [roleAssignmentsListSample.js][roleassignmentslistsample]                                 | Gets all role assignments for the subscription. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/GetAllRoleAssignments.json                          |
| [roleDefinitionsCreateOrUpdateSample.js][roledefinitionscreateorupdatesample]             | Creates or updates a role definition. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/PutRoleDefinition.json                                        |
| [roleDefinitionsDeleteSample.js][roledefinitionsdeletesample]                             | Deletes a role definition. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/DeleteRoleDefinition.json                                                |
| [roleDefinitionsGetByIdSample.js][roledefinitionsgetbyidsample]                           | Gets a role definition by ID. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/GetRoleDefinitionById.json                                            |
| [roleDefinitionsGetSample.js][roledefinitionsgetsample]                                   | Get role definition by name (GUID). x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/GetRoleDefinitionByName.json                                    |
| [roleDefinitionsListSample.js][roledefinitionslistsample]                                 | Get all role definitions that are applicable at scope and above. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/GetRoleDefinitionAtScope.json      |

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
node globalAdministratorElevateAccessSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env AUTHORIZATION_SUBSCRIPTION_ID="<authorization subscription id>" node globalAdministratorElevateAccessSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[globaladministratorelevateaccesssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/javascript/globalAdministratorElevateAccessSample.js
[permissionslistforresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/javascript/permissionsListForResourceGroupSample.js
[permissionslistforresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/javascript/permissionsListForResourceSample.js
[provideroperationsmetadatagetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/javascript/providerOperationsMetadataGetSample.js
[provideroperationsmetadatalistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/javascript/providerOperationsMetadataListSample.js
[roleassignmentscreatebyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/javascript/roleAssignmentsCreateByIdSample.js
[roleassignmentscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/javascript/roleAssignmentsCreateSample.js
[roleassignmentsdeletebyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/javascript/roleAssignmentsDeleteByIdSample.js
[roleassignmentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/javascript/roleAssignmentsDeleteSample.js
[roleassignmentsgetbyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/javascript/roleAssignmentsGetByIdSample.js
[roleassignmentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/javascript/roleAssignmentsGetSample.js
[roleassignmentslistforresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/javascript/roleAssignmentsListForResourceGroupSample.js
[roleassignmentslistforresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/javascript/roleAssignmentsListForResourceSample.js
[roleassignmentslistforscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/javascript/roleAssignmentsListForScopeSample.js
[roleassignmentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/javascript/roleAssignmentsListSample.js
[roledefinitionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/javascript/roleDefinitionsCreateOrUpdateSample.js
[roledefinitionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/javascript/roleDefinitionsDeleteSample.js
[roledefinitionsgetbyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/javascript/roleDefinitionsGetByIdSample.js
[roledefinitionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/javascript/roleDefinitionsGetSample.js
[roledefinitionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/samples/v3/javascript/roleDefinitionsListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-authorization-profile-2020-09-01-hybrid?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/authorization/arm-authorization-profile-2020-09-01-hybrid/README.md
