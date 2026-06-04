# @azure/arm-authorization client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-authorization in some common scenarios.

| **File Name**                                                                                               | **Description**                                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [alertConfigurationsGetSample.js][alertconfigurationsgetsample]                                             | get the specified alert configuration. x-ms-original-file: 2022-08-01-preview/GetAlertConfigurationById.json                                                    |
| [alertConfigurationsListForScopeSample.js][alertconfigurationslistforscopesample]                           | gets alert configurations for a resource scope. x-ms-original-file: 2022-08-01-preview/GetAlertConfigurations.json                                              |
| [alertConfigurationsUpdateSample.js][alertconfigurationsupdatesample]                                       | update an alert configuration. x-ms-original-file: 2022-08-01-preview/UpdateAlertConfiguration.json                                                             |
| [alertDefinitionsGetSample.js][alertdefinitionsgetsample]                                                   | get the specified alert definition. x-ms-original-file: 2022-08-01-preview/GetAlertDefinitionById.json                                                          |
| [alertDefinitionsListForScopeSample.js][alertdefinitionslistforscopesample]                                 | gets alert definitions for a resource scope. x-ms-original-file: 2022-08-01-preview/GetAlertDefinitions.json                                                    |
| [alertIncidentsGetSample.js][alertincidentsgetsample]                                                       | get the specified alert incident. x-ms-original-file: 2022-08-01-preview/GetAlertIncidentById.json                                                              |
| [alertIncidentsListForScopeSample.js][alertincidentslistforscopesample]                                     | gets alert incidents for a resource scope. x-ms-original-file: 2022-08-01-preview/GetAlertIncidents.json                                                        |
| [alertIncidentsRemediateSample.js][alertincidentsremediatesample]                                           | remediate an alert incident. x-ms-original-file: 2022-08-01-preview/RemediateAlertIncident.json                                                                 |
| [alertOperationGetSample.js][alertoperationgetsample]                                                       | get the specified alert operation. x-ms-original-file: 2022-08-01-preview/GetAlertOperationById.json                                                            |
| [alertsGetSample.js][alertsgetsample]                                                                       | get the specified alert. x-ms-original-file: 2022-08-01-preview/GetAlertById.json                                                                               |
| [alertsListForScopeSample.js][alertslistforscopesample]                                                     | gets alerts for a resource scope. x-ms-original-file: 2022-08-01-preview/GetAlerts.json                                                                         |
| [alertsRefreshAllSample.js][alertsrefreshallsample]                                                         | refresh all alerts for a resource scope. x-ms-original-file: 2022-08-01-preview/RefreshAllAlerts.json                                                           |
| [alertsRefreshSample.js][alertsrefreshsample]                                                               | refresh an alert. x-ms-original-file: 2022-08-01-preview/RefreshAlert.json                                                                                      |
| [alertsUpdateSample.js][alertsupdatesample]                                                                 | update an alert. x-ms-original-file: 2022-08-01-preview/UpdateAlert.json                                                                                        |
| [classicAdministratorsListSample.js][classicadministratorslistsample]                                       | gets service administrator, account administrator, and co-administrators for the subscription. x-ms-original-file: 2015-07-01/GetClassicAdministrators.json     |
| [denyAssignmentsCreateOrUpdateSample.js][denyassignmentscreateorupdatesample]                               | create or update a deny assignment by scope and name. x-ms-original-file: 2024-07-01-preview/DenyAssignments_CreateForSubscription.json                         |
| [denyAssignmentsDeleteSample.js][denyassignmentsdeletesample]                                               | delete a deny assignment by scope and name. x-ms-original-file: 2024-07-01-preview/DenyAssignments_Delete.json                                                  |
| [denyAssignmentsGetByIdSample.js][denyassignmentsgetbyidsample]                                             | gets a deny assignment by ID. x-ms-original-file: 2024-07-01-preview/GetDenyAssignmentById.json                                                                 |
| [denyAssignmentsGetSample.js][denyassignmentsgetsample]                                                     | get the specified deny assignment. x-ms-original-file: 2024-07-01-preview/GetDenyAssignmentByNameId.json                                                        |
| [denyAssignmentsListForResourceGroupSample.js][denyassignmentslistforresourcegroupsample]                   | gets deny assignments for a resource group. x-ms-original-file: 2024-07-01-preview/GetDenyAssignmentsForResourceGroup.json                                      |
| [denyAssignmentsListForResourceSample.js][denyassignmentslistforresourcesample]                             | gets deny assignments for a resource. x-ms-original-file: 2024-07-01-preview/GetDenyAssignmentsForResource.json                                                 |
| [denyAssignmentsListForScopeSample.js][denyassignmentslistforscopesample]                                   | gets deny assignments for a scope. x-ms-original-file: 2024-07-01-preview/GetDenyAssignmentByScope.json                                                         |
| [denyAssignmentsListSample.js][denyassignmentslistsample]                                                   | gets all deny assignments for the subscription. x-ms-original-file: 2024-07-01-preview/GetAllDenyAssignments.json                                               |
| [eligibleChildResourcesListSample.js][eligiblechildresourceslistsample]                                     | get the child resources of a resource on which user has eligible access x-ms-original-file: 2024-09-01-preview/GetEligibleChildResourcesByScope.json            |
| [globalAdministratorElevateAccessSample.js][globaladministratorelevateaccesssample]                         | elevates access for a Global Administrator. x-ms-original-file: 2015-07-01/ElevateAccess.json                                                                   |
| [permissionsListForResourceGroupSample.js][permissionslistforresourcegroupsample]                           | gets all permissions the caller has for a resource group. x-ms-original-file: 2022-05-01-preview/GetPermissions.json                                            |
| [permissionsListForResourceSample.js][permissionslistforresourcesample]                                     | gets all permissions the caller has for a resource. x-ms-original-file: 2022-05-01-preview/GetResourcePermissions.json                                          |
| [providerOperationsMetadataGetSample.js][provideroperationsmetadatagetsample]                               | gets provider operations metadata for the specified resource provider. x-ms-original-file: 2022-04-01/GetProviderOperationsRP.json                              |
| [providerOperationsMetadataListSample.js][provideroperationsmetadatalistsample]                             | gets provider operations metadata for all resource providers. x-ms-original-file: 2022-04-01/GetAllProviderOperations.json                                      |
| [roleAssignmentScheduleInstancesGetSample.js][roleassignmentscheduleinstancesgetsample]                     | gets the specified role assignment schedule instance. x-ms-original-file: 2024-09-01-preview/GetRoleAssignmentScheduleInstanceByName.json                       |
| [roleAssignmentScheduleInstancesListForScopeSample.js][roleassignmentscheduleinstanceslistforscopesample]   | gets role assignment schedule instances of a role assignment schedule. x-ms-original-file: 2024-09-01-preview/GetRoleAssignmentScheduleInstancesByScope.json    |
| [roleAssignmentScheduleRequestsCancelSample.js][roleassignmentschedulerequestscancelsample]                 | cancels a pending role assignment schedule request. x-ms-original-file: 2024-09-01-preview/CancelRoleAssignmentScheduleRequestByName.json                       |
| [roleAssignmentScheduleRequestsCreateSample.js][roleassignmentschedulerequestscreatesample]                 | creates a role assignment schedule request. x-ms-original-file: 2024-09-01-preview/PutRoleAssignmentScheduleRequest.json                                        |
| [roleAssignmentScheduleRequestsGetSample.js][roleassignmentschedulerequestsgetsample]                       | get the specified role assignment schedule request. x-ms-original-file: 2024-09-01-preview/GetRoleAssignmentScheduleRequestByName.json                          |
| [roleAssignmentScheduleRequestsListForScopeSample.js][roleassignmentschedulerequestslistforscopesample]     | gets role assignment schedule requests for a scope. x-ms-original-file: 2024-09-01-preview/GetRoleAssignmentScheduleRequestByScope.json                         |
| [roleAssignmentScheduleRequestsValidateSample.js][roleassignmentschedulerequestsvalidatesample]             | validates a new role assignment schedule request. x-ms-original-file: 2024-09-01-preview/ValidateRoleAssignmentScheduleRequestByName.json                       |
| [roleAssignmentSchedulesGetSample.js][roleassignmentschedulesgetsample]                                     | get the specified role assignment schedule for a resource scope x-ms-original-file: 2024-09-01-preview/GetRoleAssignmentScheduleByName.json                     |
| [roleAssignmentSchedulesListForScopeSample.js][roleassignmentscheduleslistforscopesample]                   | gets role assignment schedules for a resource scope. x-ms-original-file: 2024-09-01-preview/GetRoleAssignmentSchedulesByScope.json                              |
| [roleAssignmentsCreateByIdSample.js][roleassignmentscreatebyidsample]                                       | create or update a role assignment by ID. x-ms-original-file: 2022-04-01/RoleAssignments_CreateById.json                                                        |
| [roleAssignmentsCreateSample.js][roleassignmentscreatesample]                                               | create or update a role assignment by scope and name. x-ms-original-file: 2022-04-01/RoleAssignments_CreateForResource.json                                     |
| [roleAssignmentsDeleteByIdSample.js][roleassignmentsdeletebyidsample]                                       | delete a role assignment by ID. x-ms-original-file: 2022-04-01/RoleAssignments_DeleteById.json                                                                  |
| [roleAssignmentsDeleteSample.js][roleassignmentsdeletesample]                                               | delete a role assignment by scope and name. x-ms-original-file: 2022-04-01/RoleAssignments_Delete.json                                                          |
| [roleAssignmentsGetByIdSample.js][roleassignmentsgetbyidsample]                                             | get a role assignment by ID. x-ms-original-file: 2022-04-01/RoleAssignments_GetById.json                                                                        |
| [roleAssignmentsGetSample.js][roleassignmentsgetsample]                                                     | get a role assignment by scope and name. x-ms-original-file: 2022-04-01/RoleAssignments_Get.json                                                                |
| [roleAssignmentsListForResourceGroupSample.js][roleassignmentslistforresourcegroupsample]                   | list all role assignments that apply to a resource group. x-ms-original-file: 2022-04-01/RoleAssignments_ListForResourceGroup.json                              |
| [roleAssignmentsListForResourceSample.js][roleassignmentslistforresourcesample]                             | list all role assignments that apply to a resource. x-ms-original-file: 2022-04-01/RoleAssignments_ListForResource.json                                         |
| [roleAssignmentsListForScopeSample.js][roleassignmentslistforscopesample]                                   | list all role assignments that apply to a scope. x-ms-original-file: 2022-04-01/RoleAssignments_ListForScope.json                                               |
| [roleAssignmentsListForSubscriptionSample.js][roleassignmentslistforsubscriptionsample]                     | list all role assignments that apply to a subscription. x-ms-original-file: 2022-04-01/RoleAssignments_ListForSubscription.json                                 |
| [roleDefinitionsCreateOrUpdateSample.js][roledefinitionscreateorupdatesample]                               | creates or updates a role definition. x-ms-original-file: 2022-05-01-preview/PutRoleDefinition.json                                                             |
| [roleDefinitionsDeleteSample.js][roledefinitionsdeletesample]                                               | deletes a role definition. x-ms-original-file: 2022-05-01-preview/DeleteRoleDefinition.json                                                                     |
| [roleDefinitionsGetByIdSample.js][roledefinitionsgetbyidsample]                                             | gets a role definition by ID. x-ms-original-file: 2022-05-01-preview/GetRoleDefinitionByRoleId.json                                                             |
| [roleDefinitionsGetSample.js][roledefinitionsgetsample]                                                     | get role definition by ID (GUID). x-ms-original-file: 2022-05-01-preview/GetRoleDefinitionById.json                                                             |
| [roleDefinitionsListSample.js][roledefinitionslistsample]                                                   | get all role definitions that are applicable at scope and above. x-ms-original-file: 2022-05-01-preview/GetRoleDefinitionAtScope.json                           |
| [roleEligibilityScheduleInstancesGetSample.js][roleeligibilityscheduleinstancesgetsample]                   | gets the specified role eligibility schedule instance. x-ms-original-file: 2024-09-01-preview/GetRoleEligibilityScheduleInstanceByName.json                     |
| [roleEligibilityScheduleInstancesListForScopeSample.js][roleeligibilityscheduleinstanceslistforscopesample] | gets role eligibility schedule instances of a role eligibility schedule. x-ms-original-file: 2024-09-01-preview/GetRoleEligibilityScheduleInstancesByScope.json |
| [roleEligibilityScheduleRequestsCancelSample.js][roleeligibilityschedulerequestscancelsample]               | cancels a pending role eligibility schedule request. x-ms-original-file: 2024-09-01-preview/CancelRoleEligibilityScheduleRequestByName.json                     |
| [roleEligibilityScheduleRequestsCreateSample.js][roleeligibilityschedulerequestscreatesample]               | creates a role eligibility schedule request. x-ms-original-file: 2024-09-01-preview/PutRoleEligibilityScheduleRequest.json                                      |
| [roleEligibilityScheduleRequestsGetSample.js][roleeligibilityschedulerequestsgetsample]                     | get the specified role eligibility schedule request. x-ms-original-file: 2024-09-01-preview/GetRoleEligibilityScheduleRequestByName.json                        |
| [roleEligibilityScheduleRequestsListForScopeSample.js][roleeligibilityschedulerequestslistforscopesample]   | gets role eligibility schedule requests for a scope. x-ms-original-file: 2024-09-01-preview/GetRoleEligibilityScheduleRequestByScope.json                       |
| [roleEligibilityScheduleRequestsValidateSample.js][roleeligibilityschedulerequestsvalidatesample]           | validates a new role eligibility schedule request. x-ms-original-file: 2024-09-01-preview/ValidateRoleEligibilityScheduleRequestByName.json                     |
| [roleEligibilitySchedulesGetSample.js][roleeligibilityschedulesgetsample]                                   | get the specified role eligibility schedule for a resource scope x-ms-original-file: 2024-09-01-preview/GetRoleEligibilityScheduleByName.json                   |
| [roleEligibilitySchedulesListForScopeSample.js][roleeligibilityscheduleslistforscopesample]                 | gets role eligibility schedules for a resource scope. x-ms-original-file: 2024-09-01-preview/GetRoleEligibilitySchedulesByScope.json                            |
| [roleManagementPoliciesDeleteSample.js][rolemanagementpoliciesdeletesample]                                 | delete a role management policy x-ms-original-file: 2024-09-01-preview/DeleteRoleManagementPolicy.json                                                          |
| [roleManagementPoliciesGetSample.js][rolemanagementpoliciesgetsample]                                       | get the specified role management policy for a resource scope x-ms-original-file: 2024-09-01-preview/GetRoleManagementPolicyByName.json                         |
| [roleManagementPoliciesListForScopeSample.js][rolemanagementpolicieslistforscopesample]                     | gets role management policies for a resource scope. x-ms-original-file: 2024-09-01-preview/GetRoleManagementPolicyByScope.json                                  |
| [roleManagementPoliciesUpdateSample.js][rolemanagementpoliciesupdatesample]                                 | update a role management policy x-ms-original-file: 2024-09-01-preview/PatchPartialRoleManagementPolicy.json                                                    |
| [roleManagementPolicyAssignmentsCreateSample.js][rolemanagementpolicyassignmentscreatesample]               | create a role management policy assignment x-ms-original-file: 2024-09-01-preview/PutRoleManagementPolicyAssignment.json                                        |
| [roleManagementPolicyAssignmentsDeleteSample.js][rolemanagementpolicyassignmentsdeletesample]               | delete a role management policy assignment x-ms-original-file: 2024-09-01-preview/DeleteRoleManagementPolicyAssignment.json                                     |
| [roleManagementPolicyAssignmentsGetSample.js][rolemanagementpolicyassignmentsgetsample]                     | get the specified role management policy assignment for a resource scope x-ms-original-file: 2024-09-01-preview/GetRoleManagementPolicyAssignmentByName.json    |
| [roleManagementPolicyAssignmentsListForScopeSample.js][rolemanagementpolicyassignmentslistforscopesample]   | gets role management assignment policies for a resource scope. x-ms-original-file: 2024-09-01-preview/GetRoleManagementPolicyAssignmentByScope.json             |

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
node alertConfigurationsGetSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node alertConfigurationsGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[alertconfigurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/alertConfigurationsGetSample.js
[alertconfigurationslistforscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/alertConfigurationsListForScopeSample.js
[alertconfigurationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/alertConfigurationsUpdateSample.js
[alertdefinitionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/alertDefinitionsGetSample.js
[alertdefinitionslistforscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/alertDefinitionsListForScopeSample.js
[alertincidentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/alertIncidentsGetSample.js
[alertincidentslistforscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/alertIncidentsListForScopeSample.js
[alertincidentsremediatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/alertIncidentsRemediateSample.js
[alertoperationgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/alertOperationGetSample.js
[alertsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/alertsGetSample.js
[alertslistforscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/alertsListForScopeSample.js
[alertsrefreshallsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/alertsRefreshAllSample.js
[alertsrefreshsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/alertsRefreshSample.js
[alertsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/alertsUpdateSample.js
[classicadministratorslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/classicAdministratorsListSample.js
[denyassignmentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/denyAssignmentsCreateOrUpdateSample.js
[denyassignmentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/denyAssignmentsDeleteSample.js
[denyassignmentsgetbyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/denyAssignmentsGetByIdSample.js
[denyassignmentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/denyAssignmentsGetSample.js
[denyassignmentslistforresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/denyAssignmentsListForResourceGroupSample.js
[denyassignmentslistforresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/denyAssignmentsListForResourceSample.js
[denyassignmentslistforscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/denyAssignmentsListForScopeSample.js
[denyassignmentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/denyAssignmentsListSample.js
[eligiblechildresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/eligibleChildResourcesListSample.js
[globaladministratorelevateaccesssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/globalAdministratorElevateAccessSample.js
[permissionslistforresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/permissionsListForResourceGroupSample.js
[permissionslistforresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/permissionsListForResourceSample.js
[provideroperationsmetadatagetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/providerOperationsMetadataGetSample.js
[provideroperationsmetadatalistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/providerOperationsMetadataListSample.js
[roleassignmentscheduleinstancesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleAssignmentScheduleInstancesGetSample.js
[roleassignmentscheduleinstanceslistforscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleAssignmentScheduleInstancesListForScopeSample.js
[roleassignmentschedulerequestscancelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleAssignmentScheduleRequestsCancelSample.js
[roleassignmentschedulerequestscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleAssignmentScheduleRequestsCreateSample.js
[roleassignmentschedulerequestsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleAssignmentScheduleRequestsGetSample.js
[roleassignmentschedulerequestslistforscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleAssignmentScheduleRequestsListForScopeSample.js
[roleassignmentschedulerequestsvalidatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleAssignmentScheduleRequestsValidateSample.js
[roleassignmentschedulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleAssignmentSchedulesGetSample.js
[roleassignmentscheduleslistforscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleAssignmentSchedulesListForScopeSample.js
[roleassignmentscreatebyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleAssignmentsCreateByIdSample.js
[roleassignmentscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleAssignmentsCreateSample.js
[roleassignmentsdeletebyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleAssignmentsDeleteByIdSample.js
[roleassignmentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleAssignmentsDeleteSample.js
[roleassignmentsgetbyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleAssignmentsGetByIdSample.js
[roleassignmentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleAssignmentsGetSample.js
[roleassignmentslistforresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleAssignmentsListForResourceGroupSample.js
[roleassignmentslistforresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleAssignmentsListForResourceSample.js
[roleassignmentslistforscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleAssignmentsListForScopeSample.js
[roleassignmentslistforsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleAssignmentsListForSubscriptionSample.js
[roledefinitionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleDefinitionsCreateOrUpdateSample.js
[roledefinitionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleDefinitionsDeleteSample.js
[roledefinitionsgetbyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleDefinitionsGetByIdSample.js
[roledefinitionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleDefinitionsGetSample.js
[roledefinitionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleDefinitionsListSample.js
[roleeligibilityscheduleinstancesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleEligibilityScheduleInstancesGetSample.js
[roleeligibilityscheduleinstanceslistforscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleEligibilityScheduleInstancesListForScopeSample.js
[roleeligibilityschedulerequestscancelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleEligibilityScheduleRequestsCancelSample.js
[roleeligibilityschedulerequestscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleEligibilityScheduleRequestsCreateSample.js
[roleeligibilityschedulerequestsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleEligibilityScheduleRequestsGetSample.js
[roleeligibilityschedulerequestslistforscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleEligibilityScheduleRequestsListForScopeSample.js
[roleeligibilityschedulerequestsvalidatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleEligibilityScheduleRequestsValidateSample.js
[roleeligibilityschedulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleEligibilitySchedulesGetSample.js
[roleeligibilityscheduleslistforscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleEligibilitySchedulesListForScopeSample.js
[rolemanagementpoliciesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleManagementPoliciesDeleteSample.js
[rolemanagementpoliciesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleManagementPoliciesGetSample.js
[rolemanagementpolicieslistforscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleManagementPoliciesListForScopeSample.js
[rolemanagementpoliciesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleManagementPoliciesUpdateSample.js
[rolemanagementpolicyassignmentscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleManagementPolicyAssignmentsCreateSample.js
[rolemanagementpolicyassignmentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleManagementPolicyAssignmentsDeleteSample.js
[rolemanagementpolicyassignmentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleManagementPolicyAssignmentsGetSample.js
[rolemanagementpolicyassignmentslistforscopesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v10-beta/javascript/roleManagementPolicyAssignmentsListForScopeSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-authorization?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/authorization/arm-authorization/README.md
