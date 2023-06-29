# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                               | **Description**                                                                                                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [classicAdministratorsListSample.ts][classicadministratorslistsample]                                       | Gets service administrator, account administrator, and co-administrators for the subscription. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/GetClassicAdministrators.json |
| [denyAssignmentsGetByIdSample.ts][denyassignmentsgetbyidsample]                                             | Gets a deny assignment by ID. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2022-04-01/examples/GetDenyAssignmentById.json                                                                     |
| [denyAssignmentsGetSample.ts][denyassignmentsgetsample]                                                     | Get the specified deny assignment. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2022-04-01/examples/GetDenyAssignmentByNameId.json                                                            |
| [denyAssignmentsListForResourceGroupSample.ts][denyassignmentslistforresourcegroupsample]                   | Gets deny assignments for a resource group. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2022-04-01/examples/GetDenyAssignmentsForResourceGroup.json                                          |
| [denyAssignmentsListForResourceSample.ts][denyassignmentslistforresourcesample]                             | Gets deny assignments for a resource. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2022-04-01/examples/GetDenyAssignmentsForResource.json                                                     |
| [denyAssignmentsListForScopeSample.ts][denyassignmentslistforscopesample]                                   | Gets deny assignments for a scope. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2022-04-01/examples/GetDenyAssignmentByScope.json                                                             |
| [denyAssignmentsListSample.ts][denyassignmentslistsample]                                                   | Gets all deny assignments for the subscription. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2022-04-01/examples/GetAllDenyAssignments.json                                                   |
| [eligibleChildResourcesGetSample.ts][eligiblechildresourcesgetsample]                                       | Get the child resources of a resource on which user has eligible access x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2020-10-01/examples/GetEligibleChildResourcesByScope.json                |
| [globalAdministratorElevateAccessSample.ts][globaladministratorelevateaccesssample]                         | Elevates access for a Global Administrator. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/ElevateAccess.json                                                               |
| [permissionsListForResourceGroupSample.ts][permissionslistforresourcegroupsample]                           | Gets all permissions the caller has for a resource group. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2022-04-01/examples/GetPermissions.json                                                |
| [permissionsListForResourceSample.ts][permissionslistforresourcesample]                                     | Gets all permissions the caller has for a resource. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2022-04-01/examples/GetResourcePermissions.json                                              |
| [providerOperationsMetadataGetSample.ts][provideroperationsmetadatagetsample]                               | Gets provider operations metadata for the specified resource provider. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2022-04-01/examples/GetProviderOperationsRP.json                          |
| [providerOperationsMetadataListSample.ts][provideroperationsmetadatalistsample]                             | Gets provider operations metadata for all resource providers. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2022-04-01/examples/GetAllProviderOperations.json                                  |
| [roleAssignmentScheduleInstancesGetSample.ts][roleassignmentscheduleinstancesgetsample]                     | Gets the specified role assignment schedule instance. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2020-10-01/examples/GetRoleAssignmentScheduleInstanceByName.json                           |
| [roleAssignmentScheduleInstancesListForScopeSample.ts][roleassignmentscheduleinstanceslistforscopesample]   | Gets role assignment schedule instances of a role assignment schedule. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2020-10-01/examples/GetRoleAssignmentScheduleInstancesByScope.json        |
| [roleAssignmentScheduleRequestsCancelSample.ts][roleassignmentschedulerequestscancelsample]                 | Cancels a pending role assignment schedule request. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2020-10-01/examples/CancelRoleAssignmentScheduleRequestByName.json                           |
| [roleAssignmentScheduleRequestsCreateSample.ts][roleassignmentschedulerequestscreatesample]                 | Creates a role assignment schedule request. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2020-10-01/examples/PutRoleAssignmentScheduleRequest.json                                            |
| [roleAssignmentScheduleRequestsGetSample.ts][roleassignmentschedulerequestsgetsample]                       | Get the specified role assignment schedule request. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2020-10-01/examples/GetRoleAssignmentScheduleRequestByName.json                              |
| [roleAssignmentScheduleRequestsListForScopeSample.ts][roleassignmentschedulerequestslistforscopesample]     | Gets role assignment schedule requests for a scope. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2020-10-01/examples/GetRoleAssignmentScheduleRequestByScope.json                             |
| [roleAssignmentScheduleRequestsValidateSample.ts][roleassignmentschedulerequestsvalidatesample]             | Validates a new role assignment schedule request. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2020-10-01/examples/ValidateRoleAssignmentScheduleRequestByName.json                           |
| [roleAssignmentSchedulesGetSample.ts][roleassignmentschedulesgetsample]                                     | Get the specified role assignment schedule for a resource scope x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2020-10-01/examples/GetRoleAssignmentScheduleByName.json                         |
| [roleAssignmentSchedulesListForScopeSample.ts][roleassignmentscheduleslistforscopesample]                   | Gets role assignment schedules for a resource scope. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2020-10-01/examples/GetRoleAssignmentSchedulesByScope.json                                  |
| [roleAssignmentsCreateByIdSample.ts][roleassignmentscreatebyidsample]                                       | Create or update a role assignment by ID. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2022-04-01/examples/RoleAssignments_CreateById.json                                                    |
| [roleAssignmentsCreateSample.ts][roleassignmentscreatesample]                                               | Create or update a role assignment by scope and name. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2022-04-01/examples/RoleAssignments_CreateForResource.json                                 |
| [roleAssignmentsDeleteByIdSample.ts][roleassignmentsdeletebyidsample]                                       | Delete a role assignment by ID. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2022-04-01/examples/RoleAssignments_DeleteById.json                                                              |
| [roleAssignmentsDeleteSample.ts][roleassignmentsdeletesample]                                               | Delete a role assignment by scope and name. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2022-04-01/examples/RoleAssignments_Delete.json                                                      |
| [roleAssignmentsGetByIdSample.ts][roleassignmentsgetbyidsample]                                             | Get a role assignment by ID. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2022-04-01/examples/RoleAssignments_GetById.json                                                                    |
| [roleAssignmentsGetSample.ts][roleassignmentsgetsample]                                                     | Get a role assignment by scope and name. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2022-04-01/examples/RoleAssignments_Get.json                                                            |
| [roleAssignmentsListForResourceGroupSample.ts][roleassignmentslistforresourcegroupsample]                   | List all role assignments that apply to a resource group. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2022-04-01/examples/RoleAssignments_ListForResourceGroup.json                          |
| [roleAssignmentsListForResourceSample.ts][roleassignmentslistforresourcesample]                             | List all role assignments that apply to a resource. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2022-04-01/examples/RoleAssignments_ListForResource.json                                     |
| [roleAssignmentsListForScopeSample.ts][roleassignmentslistforscopesample]                                   | List all role assignments that apply to a scope. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2022-04-01/examples/RoleAssignments_ListForScope.json                                           |
| [roleAssignmentsListForSubscriptionSample.ts][roleassignmentslistforsubscriptionsample]                     | List all role assignments that apply to a subscription. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2022-04-01/examples/RoleAssignments_ListForSubscription.json                             |
| [roleDefinitionsCreateOrUpdateSample.ts][roledefinitionscreateorupdatesample]                               | Creates or updates a role definition. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2022-04-01/examples/PutRoleDefinition.json                                                                 |
| [roleDefinitionsDeleteSample.ts][roledefinitionsdeletesample]                                               | Deletes a role definition. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2022-04-01/examples/DeleteRoleDefinition.json                                                                         |
| [roleDefinitionsGetByIdSample.ts][roledefinitionsgetbyidsample]                                             | Gets a role definition by ID. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2022-04-01/examples/GetRoleDefinitionById.json                                                                     |
| [roleDefinitionsGetSample.ts][roledefinitionsgetsample]                                                     | Get role definition by name (GUID). x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2022-04-01/examples/GetRoleDefinitionByName.json                                                             |
| [roleDefinitionsListSample.ts][roledefinitionslistsample]                                                   | Get all role definitions that are applicable at scope and above. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2022-04-01/examples/GetRoleDefinitionAtScope.json                               |
| [roleEligibilityScheduleInstancesGetSample.ts][roleeligibilityscheduleinstancesgetsample]                   | Gets the specified role eligibility schedule instance. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2020-10-01/examples/GetRoleEligibilityScheduleInstanceByName.json                         |
| [roleEligibilityScheduleInstancesListForScopeSample.ts][roleeligibilityscheduleinstanceslistforscopesample] | Gets role eligibility schedule instances of a role eligibility schedule. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2020-10-01/examples/GetRoleEligibilityScheduleInstancesByScope.json     |
| [roleEligibilityScheduleRequestsCancelSample.ts][roleeligibilityschedulerequestscancelsample]               | Cancels a pending role eligibility schedule request. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2020-10-01/examples/CancelRoleEligibilityScheduleRequestByName.json                         |
| [roleEligibilityScheduleRequestsCreateSample.ts][roleeligibilityschedulerequestscreatesample]               | Creates a role eligibility schedule request. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2020-10-01/examples/PutRoleEligibilityScheduleRequest.json                                          |
| [roleEligibilityScheduleRequestsGetSample.ts][roleeligibilityschedulerequestsgetsample]                     | Get the specified role eligibility schedule request. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2020-10-01/examples/GetRoleEligibilityScheduleRequestByName.json                            |
| [roleEligibilityScheduleRequestsListForScopeSample.ts][roleeligibilityschedulerequestslistforscopesample]   | Gets role eligibility schedule requests for a scope. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2020-10-01/examples/GetRoleEligibilityScheduleRequestByScope.json                           |
| [roleEligibilityScheduleRequestsValidateSample.ts][roleeligibilityschedulerequestsvalidatesample]           | Validates a new role eligibility schedule request. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2020-10-01/examples/ValidateRoleEligibilityScheduleRequestByName.json                         |
| [roleEligibilitySchedulesGetSample.ts][roleeligibilityschedulesgetsample]                                   | Get the specified role eligibility schedule for a resource scope x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2020-10-01/examples/GetRoleEligibilityScheduleByName.json                       |
| [roleEligibilitySchedulesListForScopeSample.ts][roleeligibilityscheduleslistforscopesample]                 | Gets role eligibility schedules for a resource scope. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2020-10-01/examples/GetRoleEligibilitySchedulesByScope.json                                |
| [roleManagementPoliciesDeleteSample.ts][rolemanagementpoliciesdeletesample]                                 | Delete a role management policy x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2020-10-01/examples/DeleteRoleManagementPolicy.json                                                              |
| [roleManagementPoliciesGetSample.ts][rolemanagementpoliciesgetsample]                                       | Get the specified role management policy for a resource scope x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2020-10-01/examples/GetRoleManagementPolicyByName.json                             |
| [roleManagementPoliciesListForScopeSample.ts][rolemanagementpolicieslistforscopesample]                     | Gets role management policies for a resource scope. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2020-10-01/examples/GetRoleManagementPolicyByScope.json                                      |
| [roleManagementPoliciesUpdateSample.ts][rolemanagementpoliciesupdatesample]                                 | Update a role management policy x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2020-10-01/examples/PatchPartialRoleManagementPolicy.json                                                        |
| [roleManagementPolicyAssignmentsCreateSample.ts][rolemanagementpolicyassignmentscreatesample]               | Create a role management policy assignment x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2020-10-01/examples/PutRoleManagementPolicyAssignment.json                                            |
| [roleManagementPolicyAssignmentsDeleteSample.ts][rolemanagementpolicyassignmentsdeletesample]               | Delete a role management policy assignment x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2020-10-01/examples/DeleteRoleManagementPolicyAssignment.json                                         |
| [roleManagementPolicyAssignmentsGetSample.ts][rolemanagementpolicyassignmentsgetsample]                     | Get the specified role management policy assignment for a resource scope x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2020-10-01/examples/GetRoleManagementPolicyAssignmentByName.json        |
| [roleManagementPolicyAssignmentsListForScopeSample.ts][rolemanagementpolicyassignmentslistforscopesample]   | Gets role management assignment policies for a resource scope. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2020-10-01/examples/GetRoleManagementPolicyAssignmentByScope.json                 |

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
node dist/classicAdministratorsListSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env AUTHORIZATION_SUBSCRIPTION_ID="<authorization subscription id>" node dist/classicAdministratorsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[classicadministratorslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/classicAdministratorsListSample.ts
[denyassignmentsgetbyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/denyAssignmentsGetByIdSample.ts
[denyassignmentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/denyAssignmentsGetSample.ts
[denyassignmentslistforresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/denyAssignmentsListForResourceGroupSample.ts
[denyassignmentslistforresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/denyAssignmentsListForResourceSample.ts
[denyassignmentslistforscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/denyAssignmentsListForScopeSample.ts
[denyassignmentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/denyAssignmentsListSample.ts
[eligiblechildresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/eligibleChildResourcesGetSample.ts
[globaladministratorelevateaccesssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/globalAdministratorElevateAccessSample.ts
[permissionslistforresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/permissionsListForResourceGroupSample.ts
[permissionslistforresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/permissionsListForResourceSample.ts
[provideroperationsmetadatagetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/providerOperationsMetadataGetSample.ts
[provideroperationsmetadatalistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/providerOperationsMetadataListSample.ts
[roleassignmentscheduleinstancesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleAssignmentScheduleInstancesGetSample.ts
[roleassignmentscheduleinstanceslistforscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleAssignmentScheduleInstancesListForScopeSample.ts
[roleassignmentschedulerequestscancelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleAssignmentScheduleRequestsCancelSample.ts
[roleassignmentschedulerequestscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleAssignmentScheduleRequestsCreateSample.ts
[roleassignmentschedulerequestsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleAssignmentScheduleRequestsGetSample.ts
[roleassignmentschedulerequestslistforscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleAssignmentScheduleRequestsListForScopeSample.ts
[roleassignmentschedulerequestsvalidatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleAssignmentScheduleRequestsValidateSample.ts
[roleassignmentschedulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleAssignmentSchedulesGetSample.ts
[roleassignmentscheduleslistforscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleAssignmentSchedulesListForScopeSample.ts
[roleassignmentscreatebyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleAssignmentsCreateByIdSample.ts
[roleassignmentscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleAssignmentsCreateSample.ts
[roleassignmentsdeletebyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleAssignmentsDeleteByIdSample.ts
[roleassignmentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleAssignmentsDeleteSample.ts
[roleassignmentsgetbyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleAssignmentsGetByIdSample.ts
[roleassignmentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleAssignmentsGetSample.ts
[roleassignmentslistforresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleAssignmentsListForResourceGroupSample.ts
[roleassignmentslistforresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleAssignmentsListForResourceSample.ts
[roleassignmentslistforscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleAssignmentsListForScopeSample.ts
[roleassignmentslistforsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleAssignmentsListForSubscriptionSample.ts
[roledefinitionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleDefinitionsCreateOrUpdateSample.ts
[roledefinitionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleDefinitionsDeleteSample.ts
[roledefinitionsgetbyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleDefinitionsGetByIdSample.ts
[roledefinitionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleDefinitionsGetSample.ts
[roledefinitionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleDefinitionsListSample.ts
[roleeligibilityscheduleinstancesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleEligibilityScheduleInstancesGetSample.ts
[roleeligibilityscheduleinstanceslistforscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleEligibilityScheduleInstancesListForScopeSample.ts
[roleeligibilityschedulerequestscancelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleEligibilityScheduleRequestsCancelSample.ts
[roleeligibilityschedulerequestscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleEligibilityScheduleRequestsCreateSample.ts
[roleeligibilityschedulerequestsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleEligibilityScheduleRequestsGetSample.ts
[roleeligibilityschedulerequestslistforscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleEligibilityScheduleRequestsListForScopeSample.ts
[roleeligibilityschedulerequestsvalidatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleEligibilityScheduleRequestsValidateSample.ts
[roleeligibilityschedulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleEligibilitySchedulesGetSample.ts
[roleeligibilityscheduleslistforscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleEligibilitySchedulesListForScopeSample.ts
[rolemanagementpoliciesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleManagementPoliciesDeleteSample.ts
[rolemanagementpoliciesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleManagementPoliciesGetSample.ts
[rolemanagementpolicieslistforscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleManagementPoliciesListForScopeSample.ts
[rolemanagementpoliciesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleManagementPoliciesUpdateSample.ts
[rolemanagementpolicyassignmentscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleManagementPolicyAssignmentsCreateSample.ts
[rolemanagementpolicyassignmentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleManagementPolicyAssignmentsDeleteSample.ts
[rolemanagementpolicyassignmentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleManagementPolicyAssignmentsGetSample.ts
[rolemanagementpolicyassignmentslistforscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9/typescript/src/roleManagementPolicyAssignmentsListForScopeSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-authorization?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/authorization/arm-authorization/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
