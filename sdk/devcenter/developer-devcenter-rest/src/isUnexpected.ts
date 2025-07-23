// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DevCenterListProjects200Response,
  DevCenterListProjectsDefaultResponse,
  DevCenterGetProject200Response,
  DevCenterGetProjectDefaultResponse,
  DevCenterListApprovals200Response,
  DevCenterListApprovalsDefaultResponse,
  DevCenterGetProjectAbilities200Response,
  DevCenterGetProjectAbilitiesDefaultResponse,
  OperationStatusesGet200Response,
  OperationStatusesGetDefaultResponse,
  DevBoxesListPools200Response,
  DevBoxesListPoolsDefaultResponse,
  DevBoxesGetPool200Response,
  DevBoxesGetPoolDefaultResponse,
  DevBoxesAlignPool202Response,
  DevBoxesAlignPoolLogicalResponse,
  DevBoxesAlignPoolDefaultResponse,
  DevBoxesListAllDevBoxes200Response,
  DevBoxesListAllDevBoxesDefaultResponse,
  DevBoxesListAllDevBoxesByUser200Response,
  DevBoxesListAllDevBoxesByUserDefaultResponse,
  DevBoxesListSchedulesByPool200Response,
  DevBoxesListSchedulesByPoolDefaultResponse,
  DevBoxesGetScheduleByPool200Response,
  DevBoxesGetScheduleByPoolDefaultResponse,
  DevBoxesListSchedulesByProject200Response,
  DevBoxesListSchedulesByProjectDefaultResponse,
  DevBoxesListDevBoxesByUser200Response,
  DevBoxesListDevBoxesByUserDefaultResponse,
  DevBoxesGetDevBoxByUser200Response,
  DevBoxesGetDevBoxByUserDefaultResponse,
  DevBoxesCreateDevBox200Response,
  DevBoxesCreateDevBox201Response,
  DevBoxesCreateDevBoxLogicalResponse,
  DevBoxesCreateDevBoxDefaultResponse,
  DevBoxesDeleteDevBox202Response,
  DevBoxesDeleteDevBox204Response,
  DevBoxesDeleteDevBoxLogicalResponse,
  DevBoxesDeleteDevBoxDefaultResponse,
  DevBoxesApproveDevBox202Response,
  DevBoxesApproveDevBoxLogicalResponse,
  DevBoxesApproveDevBoxDefaultResponse,
  DevBoxesStartDevBox202Response,
  DevBoxesStartDevBoxLogicalResponse,
  DevBoxesStartDevBoxDefaultResponse,
  DevBoxesStopDevBox202Response,
  DevBoxesStopDevBoxLogicalResponse,
  DevBoxesStopDevBoxDefaultResponse,
  DevBoxesRestartDevBox202Response,
  DevBoxesRestartDevBoxLogicalResponse,
  DevBoxesRestartDevBoxDefaultResponse,
  DevBoxesAlignDevBox202Response,
  DevBoxesAlignDevBoxLogicalResponse,
  DevBoxesAlignDevBoxDefaultResponse,
  DevBoxesRepairDevBox202Response,
  DevBoxesRepairDevBoxLogicalResponse,
  DevBoxesRepairDevBoxDefaultResponse,
  DevBoxesSetActiveHours200Response,
  DevBoxesSetActiveHoursDefaultResponse,
  DevBoxesListCustomizationGroups200Response,
  DevBoxesListCustomizationGroupsDefaultResponse,
  DevBoxesGetCustomizationGroup200Response,
  DevBoxesGetCustomizationGroupDefaultResponse,
  DevBoxesCreateCustomizationGroup200Response,
  DevBoxesCreateCustomizationGroupDefaultResponse,
  DevBoxesGetCustomizationTaskLog200Response,
  DevBoxesGetCustomizationTaskLogDefaultResponse,
  DevBoxesListCustomizationTaskDefinitionsByProject200Response,
  DevBoxesListCustomizationTaskDefinitionsByProjectDefaultResponse,
  DevBoxesGetCustomizationTaskDefinitions200Response,
  DevBoxesGetCustomizationTaskDefinitionsDefaultResponse,
  DevBoxesValidateCustomizationTasksAction202Response,
  DevBoxesValidateCustomizationTasksActionLogicalResponse,
  DevBoxesValidateCustomizationTasksActionDefaultResponse,
  DevBoxesGetRemoteConnection200Response,
  DevBoxesGetRemoteConnectionDefaultResponse,
  DevBoxesListActions200Response,
  DevBoxesListActionsDefaultResponse,
  DevBoxesGetAction200Response,
  DevBoxesGetActionDefaultResponse,
  DevBoxesSkipAction204Response,
  DevBoxesSkipActionDefaultResponse,
  DevBoxesDelayAction200Response,
  DevBoxesDelayActionDefaultResponse,
  DevBoxesDelayActions200Response,
  DevBoxesDelayActionsDefaultResponse,
  DevBoxesListOperations200Response,
  DevBoxesListOperationsDefaultResponse,
  DevBoxesGetOperation200Response,
  DevBoxesGetOperationDefaultResponse,
  DevBoxesGetImagingTaskLog200Response,
  DevBoxesGetImagingTaskLogDefaultResponse,
  DevBoxesListSnapshots200Response,
  DevBoxesListSnapshotsDefaultResponse,
  DevBoxesGetSnapshot200Response,
  DevBoxesGetSnapshotDefaultResponse,
  DevBoxesRestoreSnapshot202Response,
  DevBoxesRestoreSnapshotLogicalResponse,
  DevBoxesRestoreSnapshotDefaultResponse,
  DevBoxesCaptureSnapshot202Response,
  DevBoxesCaptureSnapshotLogicalResponse,
  DevBoxesCaptureSnapshotDefaultResponse,
  DevBoxesListDevBoxAddons200Response,
  DevBoxesListDevBoxAddonsDefaultResponse,
  DevBoxesGetDevBoxAddon200Response,
  DevBoxesGetDevBoxAddonDefaultResponse,
  DevBoxesCreateOrReplaceDevBoxAddOn200Response,
  DevBoxesCreateOrReplaceDevBoxAddOn201Response,
  DevBoxesCreateOrReplaceDevBoxAddOnLogicalResponse,
  DevBoxesCreateOrReplaceDevBoxAddOnDefaultResponse,
  DevBoxesDeleteDevBoxAddOn202Response,
  DevBoxesDeleteDevBoxAddOn204Response,
  DevBoxesDeleteDevBoxAddOnLogicalResponse,
  DevBoxesDeleteDevBoxAddOnDefaultResponse,
  DevBoxesEnableDevBoxAddOn202Response,
  DevBoxesEnableDevBoxAddOnLogicalResponse,
  DevBoxesEnableDevBoxAddOnDefaultResponse,
  DevBoxesDisableDevBoxAddOn202Response,
  DevBoxesDisableDevBoxAddOnLogicalResponse,
  DevBoxesDisableDevBoxAddOnDefaultResponse,
  EnvironmentsListEnvironments200Response,
  EnvironmentsListEnvironmentsDefaultResponse,
  EnvironmentsListEnvironmentsByUser200Response,
  EnvironmentsListEnvironmentsByUserDefaultResponse,
  EnvironmentsGetEnvironmentByUser200Response,
  EnvironmentsGetEnvironmentByUserDefaultResponse,
  EnvironmentsCreateOrReplaceEnvironment201Response,
  EnvironmentsCreateOrReplaceEnvironmentLogicalResponse,
  EnvironmentsCreateOrReplaceEnvironmentDefaultResponse,
  EnvironmentsPatchEnvironment200Response,
  EnvironmentsPatchEnvironmentDefaultResponse,
  EnvironmentsDeleteEnvironment202Response,
  EnvironmentsDeleteEnvironment204Response,
  EnvironmentsDeleteEnvironmentLogicalResponse,
  EnvironmentsDeleteEnvironmentDefaultResponse,
  EnvironmentsGetOutputs200Response,
  EnvironmentsGetOutputsDefaultResponse,
  EnvironmentsListOperations200Response,
  EnvironmentsListOperationsDefaultResponse,
  EnvironmentsGetOperation200Response,
  EnvironmentsGetOperationDefaultResponse,
  EnvironmentsGetLogsByOperation200Response,
  EnvironmentsGetLogsByOperationDefaultResponse,
  EnvironmentsListActions200Response,
  EnvironmentsListActionsDefaultResponse,
  EnvironmentsGetAction200Response,
  EnvironmentsGetActionDefaultResponse,
  EnvironmentsSkipAction204Response,
  EnvironmentsSkipActionDefaultResponse,
  EnvironmentsDelayAction200Response,
  EnvironmentsDelayActionDefaultResponse,
  EnvironmentsListCatalogsByProject200Response,
  EnvironmentsListCatalogsByProjectDefaultResponse,
  EnvironmentsGetCatalog200Response,
  EnvironmentsGetCatalogDefaultResponse,
  EnvironmentsListEnvironmentDefinitionsByProject200Response,
  EnvironmentsListEnvironmentDefinitionsByProjectDefaultResponse,
  EnvironmentsListEnvironmentDefinitionsByCatalog200Response,
  EnvironmentsListEnvironmentDefinitionsByCatalogDefaultResponse,
  EnvironmentsGetEnvironmentDefinition200Response,
  EnvironmentsGetEnvironmentDefinitionDefaultResponse,
  EnvironmentsListEnvironmentTypes200Response,
  EnvironmentsListEnvironmentTypesDefaultResponse,
  EnvironmentsGetEnvironmentTypes200Response,
  EnvironmentsGetEnvironmentTypesDefaultResponse,
  EnvironmentsGetEnvironmentTypeAbilities200Response,
  EnvironmentsGetEnvironmentTypeAbilitiesDefaultResponse,
} from "./responses.js";

const responseMap: Record<string, string[]> = {
  "GET /projects": ["200"],
  "GET /projects/{projectName}": ["200"],
  "GET /projects/{projectName}/approvals": ["200"],
  "GET /projects/{projectName}/users/{userId}/abilities": ["200"],
  "GET /projects/{projectName}/operationstatuses/{operationId}": ["200"],
  "GET /projects/{projectName}/pools": ["200"],
  "GET /projects/{projectName}/pools/{poolName}": ["200"],
  "GET /projects/{projectName}/pools/{poolName}:align": ["200", "202"],
  "POST /projects/{projectName}/pools/{poolName}:align": ["202"],
  "GET /devboxes": ["200"],
  "GET /users/{userId}/devboxes": ["200"],
  "GET /projects/{projectName}/pools/{poolName}/schedules": ["200"],
  "GET /projects/{projectName}/pools/{poolName}/schedules/{scheduleName}": [
    "200",
  ],
  "GET /projects/{projectName}/schedules": ["200"],
  "GET /projects/{projectName}/users/{userId}/devboxes": ["200"],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}": ["200"],
  "PUT /projects/{projectName}/users/{userId}/devboxes/{devBoxName}": [
    "200",
    "201",
  ],
  "DELETE /projects/{projectName}/users/{userId}/devboxes/{devBoxName}": [
    "202",
    "204",
  ],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}:approve": [
    "200",
    "202",
  ],
  "POST /projects/{projectName}/users/{userId}/devboxes/{devBoxName}:approve": [
    "202",
  ],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}:start": [
    "200",
    "202",
  ],
  "POST /projects/{projectName}/users/{userId}/devboxes/{devBoxName}:start": [
    "202",
  ],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}:stop": [
    "200",
    "202",
  ],
  "POST /projects/{projectName}/users/{userId}/devboxes/{devBoxName}:stop": [
    "202",
  ],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}:restart": [
    "200",
    "202",
  ],
  "POST /projects/{projectName}/users/{userId}/devboxes/{devBoxName}:restart": [
    "202",
  ],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}:align": [
    "200",
    "202",
  ],
  "POST /projects/{projectName}/users/{userId}/devboxes/{devBoxName}:align": [
    "202",
  ],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}:repair": [
    "200",
    "202",
  ],
  "POST /projects/{projectName}/users/{userId}/devboxes/{devBoxName}:repair": [
    "202",
  ],
  "POST /projects/{projectName}/users/{userId}/devboxes/{devBoxName}:setActiveHours":
    ["200"],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/customizationGroups":
    ["200"],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/customizationGroups/{customizationGroupName}":
    ["200"],
  "PUT /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/customizationGroups/{customizationGroupName}":
    ["200"],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/customizationGroups/{customizationGroupName}/logs/{customizationTaskId}":
    ["200"],
  "GET /projects/{projectName}/customizationTasks": ["200"],
  "GET /projects/{projectName}/catalogs/{catalogName}/customizationTasks/{taskName}":
    ["200"],
  "GET /projects/{projectName}/customizationTasks:validateGroup": [
    "200",
    "202",
  ],
  "POST /projects/{projectName}/customizationTasks:validateGroup": ["202"],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/remoteConnection":
    ["200"],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions": [
    "200",
  ],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions/{actionName}":
    ["200"],
  "POST /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions/{actionName}:skip":
    ["204"],
  "POST /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions/{actionName}:delay":
    ["200"],
  "POST /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions:delay":
    ["200"],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/operations":
    ["200"],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/operations/{operationId}":
    ["200"],
  "GET /projects/{projectName}/imageBuildLogs/{imageBuildLogId}": ["200"],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/snapshots":
    ["200"],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/snapshots/{snapshotId}":
    ["200"],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}:restoreSnapshot":
    ["200", "202"],
  "POST /projects/{projectName}/users/{userId}/devboxes/{devBoxName}:restoreSnapshot":
    ["202"],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}:captureSnapshot":
    ["200", "202"],
  "POST /projects/{projectName}/users/{userId}/devboxes/{devBoxName}:captureSnapshot":
    ["202"],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/addons": [
    "200",
  ],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/addons/{addOnName}":
    ["200"],
  "PUT /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/addons/{addOnName}":
    ["200", "201"],
  "DELETE /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/addons/{addOnName}":
    ["202", "204"],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/addons/{addOnName}:enable":
    ["200", "202"],
  "POST /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/addons/{addOnName}:enable":
    ["202"],
  "GET /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/addons/{addOnName}:disable":
    ["200", "202"],
  "POST /projects/{projectName}/users/{userId}/devboxes/{devBoxName}/addons/{addOnName}:disable":
    ["202"],
  "GET /projects/{projectName}/environments": ["200"],
  "GET /projects/{projectName}/users/{userId}/environments": ["200"],
  "GET /projects/{projectName}/users/{userId}/environments/{environmentName}": [
    "200",
  ],
  "PUT /projects/{projectName}/users/{userId}/environments/{environmentName}": [
    "201",
  ],
  "PATCH /projects/{projectName}/users/{userId}/environments/{environmentName}":
    ["200"],
  "DELETE /projects/{projectName}/users/{userId}/environments/{environmentName}":
    ["202", "204"],
  "GET /projects/{projectName}/users/{userId}/environments/{environmentName}/outputs":
    ["200"],
  "GET /projects/{projectName}/users/{userId}/environments/{environmentName}/operations":
    ["200"],
  "GET /projects/{projectName}/users/{userId}/environments/{environmentName}/operations/{operationId}":
    ["200"],
  "GET /projects/{projectName}/users/{userId}/environments/{environmentName}/operations/{operationId}/logs":
    ["200"],
  "GET /projects/{projectName}/users/{userId}/environments/{environmentName}/actions":
    ["200"],
  "GET /projects/{projectName}/users/{userId}/environments/{environmentName}/actions/{actionName}":
    ["200"],
  "POST /projects/{projectName}/users/{userId}/environments/{environmentName}/actions/{actionName}:skip":
    ["204"],
  "POST /projects/{projectName}/users/{userId}/environments/{environmentName}/actions/{actionName}:delay":
    ["200"],
  "GET /projects/{projectName}/catalogs": ["200"],
  "GET /projects/{projectName}/catalogs/{catalogName}": ["200"],
  "GET /projects/{projectName}/environmentDefinitions": ["200"],
  "GET /projects/{projectName}/catalogs/{catalogName}/environmentDefinitions": [
    "200",
  ],
  "GET /projects/{projectName}/catalogs/{catalogName}/environmentDefinitions/{definitionName}":
    ["200"],
  "GET /projects/{projectName}/environmentTypes": ["200"],
  "GET /projects/{projectName}/environmentTypes/{environmentTypeName}": ["200"],
  "GET /projects/{projectName}/environmentTypes/{environmentTypeName}/users/{userId}/abilities":
    ["200"],
};

export function isUnexpected(
  response:
    | DevCenterListProjects200Response
    | DevCenterListProjectsDefaultResponse,
): response is DevCenterListProjectsDefaultResponse;
export function isUnexpected(
  response: DevCenterGetProject200Response | DevCenterGetProjectDefaultResponse,
): response is DevCenterGetProjectDefaultResponse;
export function isUnexpected(
  response:
    | DevCenterListApprovals200Response
    | DevCenterListApprovalsDefaultResponse,
): response is DevCenterListApprovalsDefaultResponse;
export function isUnexpected(
  response:
    | DevCenterGetProjectAbilities200Response
    | DevCenterGetProjectAbilitiesDefaultResponse,
): response is DevCenterGetProjectAbilitiesDefaultResponse;
export function isUnexpected(
  response:
    | OperationStatusesGet200Response
    | OperationStatusesGetDefaultResponse,
): response is OperationStatusesGetDefaultResponse;
export function isUnexpected(
  response: DevBoxesListPools200Response | DevBoxesListPoolsDefaultResponse,
): response is DevBoxesListPoolsDefaultResponse;
export function isUnexpected(
  response: DevBoxesGetPool200Response | DevBoxesGetPoolDefaultResponse,
): response is DevBoxesGetPoolDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesAlignPool202Response
    | DevBoxesAlignPoolLogicalResponse
    | DevBoxesAlignPoolDefaultResponse,
): response is DevBoxesAlignPoolDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesListAllDevBoxes200Response
    | DevBoxesListAllDevBoxesDefaultResponse,
): response is DevBoxesListAllDevBoxesDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesListAllDevBoxesByUser200Response
    | DevBoxesListAllDevBoxesByUserDefaultResponse,
): response is DevBoxesListAllDevBoxesByUserDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesListSchedulesByPool200Response
    | DevBoxesListSchedulesByPoolDefaultResponse,
): response is DevBoxesListSchedulesByPoolDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesGetScheduleByPool200Response
    | DevBoxesGetScheduleByPoolDefaultResponse,
): response is DevBoxesGetScheduleByPoolDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesListSchedulesByProject200Response
    | DevBoxesListSchedulesByProjectDefaultResponse,
): response is DevBoxesListSchedulesByProjectDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesListDevBoxesByUser200Response
    | DevBoxesListDevBoxesByUserDefaultResponse,
): response is DevBoxesListDevBoxesByUserDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesGetDevBoxByUser200Response
    | DevBoxesGetDevBoxByUserDefaultResponse,
): response is DevBoxesGetDevBoxByUserDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesCreateDevBox200Response
    | DevBoxesCreateDevBox201Response
    | DevBoxesCreateDevBoxLogicalResponse
    | DevBoxesCreateDevBoxDefaultResponse,
): response is DevBoxesCreateDevBoxDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesDeleteDevBox202Response
    | DevBoxesDeleteDevBox204Response
    | DevBoxesDeleteDevBoxLogicalResponse
    | DevBoxesDeleteDevBoxDefaultResponse,
): response is DevBoxesDeleteDevBoxDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesApproveDevBox202Response
    | DevBoxesApproveDevBoxLogicalResponse
    | DevBoxesApproveDevBoxDefaultResponse,
): response is DevBoxesApproveDevBoxDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesStartDevBox202Response
    | DevBoxesStartDevBoxLogicalResponse
    | DevBoxesStartDevBoxDefaultResponse,
): response is DevBoxesStartDevBoxDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesStopDevBox202Response
    | DevBoxesStopDevBoxLogicalResponse
    | DevBoxesStopDevBoxDefaultResponse,
): response is DevBoxesStopDevBoxDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesRestartDevBox202Response
    | DevBoxesRestartDevBoxLogicalResponse
    | DevBoxesRestartDevBoxDefaultResponse,
): response is DevBoxesRestartDevBoxDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesAlignDevBox202Response
    | DevBoxesAlignDevBoxLogicalResponse
    | DevBoxesAlignDevBoxDefaultResponse,
): response is DevBoxesAlignDevBoxDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesRepairDevBox202Response
    | DevBoxesRepairDevBoxLogicalResponse
    | DevBoxesRepairDevBoxDefaultResponse,
): response is DevBoxesRepairDevBoxDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesSetActiveHours200Response
    | DevBoxesSetActiveHoursDefaultResponse,
): response is DevBoxesSetActiveHoursDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesListCustomizationGroups200Response
    | DevBoxesListCustomizationGroupsDefaultResponse,
): response is DevBoxesListCustomizationGroupsDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesGetCustomizationGroup200Response
    | DevBoxesGetCustomizationGroupDefaultResponse,
): response is DevBoxesGetCustomizationGroupDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesCreateCustomizationGroup200Response
    | DevBoxesCreateCustomizationGroupDefaultResponse,
): response is DevBoxesCreateCustomizationGroupDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesGetCustomizationTaskLog200Response
    | DevBoxesGetCustomizationTaskLogDefaultResponse,
): response is DevBoxesGetCustomizationTaskLogDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesListCustomizationTaskDefinitionsByProject200Response
    | DevBoxesListCustomizationTaskDefinitionsByProjectDefaultResponse,
): response is DevBoxesListCustomizationTaskDefinitionsByProjectDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesGetCustomizationTaskDefinitions200Response
    | DevBoxesGetCustomizationTaskDefinitionsDefaultResponse,
): response is DevBoxesGetCustomizationTaskDefinitionsDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesValidateCustomizationTasksAction202Response
    | DevBoxesValidateCustomizationTasksActionLogicalResponse
    | DevBoxesValidateCustomizationTasksActionDefaultResponse,
): response is DevBoxesValidateCustomizationTasksActionDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesGetRemoteConnection200Response
    | DevBoxesGetRemoteConnectionDefaultResponse,
): response is DevBoxesGetRemoteConnectionDefaultResponse;
export function isUnexpected(
  response: DevBoxesListActions200Response | DevBoxesListActionsDefaultResponse,
): response is DevBoxesListActionsDefaultResponse;
export function isUnexpected(
  response: DevBoxesGetAction200Response | DevBoxesGetActionDefaultResponse,
): response is DevBoxesGetActionDefaultResponse;
export function isUnexpected(
  response: DevBoxesSkipAction204Response | DevBoxesSkipActionDefaultResponse,
): response is DevBoxesSkipActionDefaultResponse;
export function isUnexpected(
  response: DevBoxesDelayAction200Response | DevBoxesDelayActionDefaultResponse,
): response is DevBoxesDelayActionDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesDelayActions200Response
    | DevBoxesDelayActionsDefaultResponse,
): response is DevBoxesDelayActionsDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesListOperations200Response
    | DevBoxesListOperationsDefaultResponse,
): response is DevBoxesListOperationsDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesGetOperation200Response
    | DevBoxesGetOperationDefaultResponse,
): response is DevBoxesGetOperationDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesGetImagingTaskLog200Response
    | DevBoxesGetImagingTaskLogDefaultResponse,
): response is DevBoxesGetImagingTaskLogDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesListSnapshots200Response
    | DevBoxesListSnapshotsDefaultResponse,
): response is DevBoxesListSnapshotsDefaultResponse;
export function isUnexpected(
  response: DevBoxesGetSnapshot200Response | DevBoxesGetSnapshotDefaultResponse,
): response is DevBoxesGetSnapshotDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesRestoreSnapshot202Response
    | DevBoxesRestoreSnapshotLogicalResponse
    | DevBoxesRestoreSnapshotDefaultResponse,
): response is DevBoxesRestoreSnapshotDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesCaptureSnapshot202Response
    | DevBoxesCaptureSnapshotLogicalResponse
    | DevBoxesCaptureSnapshotDefaultResponse,
): response is DevBoxesCaptureSnapshotDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesListDevBoxAddons200Response
    | DevBoxesListDevBoxAddonsDefaultResponse,
): response is DevBoxesListDevBoxAddonsDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesGetDevBoxAddon200Response
    | DevBoxesGetDevBoxAddonDefaultResponse,
): response is DevBoxesGetDevBoxAddonDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesCreateOrReplaceDevBoxAddOn200Response
    | DevBoxesCreateOrReplaceDevBoxAddOn201Response
    | DevBoxesCreateOrReplaceDevBoxAddOnLogicalResponse
    | DevBoxesCreateOrReplaceDevBoxAddOnDefaultResponse,
): response is DevBoxesCreateOrReplaceDevBoxAddOnDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesDeleteDevBoxAddOn202Response
    | DevBoxesDeleteDevBoxAddOn204Response
    | DevBoxesDeleteDevBoxAddOnLogicalResponse
    | DevBoxesDeleteDevBoxAddOnDefaultResponse,
): response is DevBoxesDeleteDevBoxAddOnDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesEnableDevBoxAddOn202Response
    | DevBoxesEnableDevBoxAddOnLogicalResponse
    | DevBoxesEnableDevBoxAddOnDefaultResponse,
): response is DevBoxesEnableDevBoxAddOnDefaultResponse;
export function isUnexpected(
  response:
    | DevBoxesDisableDevBoxAddOn202Response
    | DevBoxesDisableDevBoxAddOnLogicalResponse
    | DevBoxesDisableDevBoxAddOnDefaultResponse,
): response is DevBoxesDisableDevBoxAddOnDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsListEnvironments200Response
    | EnvironmentsListEnvironmentsDefaultResponse,
): response is EnvironmentsListEnvironmentsDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsListEnvironmentsByUser200Response
    | EnvironmentsListEnvironmentsByUserDefaultResponse,
): response is EnvironmentsListEnvironmentsByUserDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsGetEnvironmentByUser200Response
    | EnvironmentsGetEnvironmentByUserDefaultResponse,
): response is EnvironmentsGetEnvironmentByUserDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsCreateOrReplaceEnvironment201Response
    | EnvironmentsCreateOrReplaceEnvironmentLogicalResponse
    | EnvironmentsCreateOrReplaceEnvironmentDefaultResponse,
): response is EnvironmentsCreateOrReplaceEnvironmentDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsPatchEnvironment200Response
    | EnvironmentsPatchEnvironmentDefaultResponse,
): response is EnvironmentsPatchEnvironmentDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsDeleteEnvironment202Response
    | EnvironmentsDeleteEnvironment204Response
    | EnvironmentsDeleteEnvironmentLogicalResponse
    | EnvironmentsDeleteEnvironmentDefaultResponse,
): response is EnvironmentsDeleteEnvironmentDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsGetOutputs200Response
    | EnvironmentsGetOutputsDefaultResponse,
): response is EnvironmentsGetOutputsDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsListOperations200Response
    | EnvironmentsListOperationsDefaultResponse,
): response is EnvironmentsListOperationsDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsGetOperation200Response
    | EnvironmentsGetOperationDefaultResponse,
): response is EnvironmentsGetOperationDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsGetLogsByOperation200Response
    | EnvironmentsGetLogsByOperationDefaultResponse,
): response is EnvironmentsGetLogsByOperationDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsListActions200Response
    | EnvironmentsListActionsDefaultResponse,
): response is EnvironmentsListActionsDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsGetAction200Response
    | EnvironmentsGetActionDefaultResponse,
): response is EnvironmentsGetActionDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsSkipAction204Response
    | EnvironmentsSkipActionDefaultResponse,
): response is EnvironmentsSkipActionDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsDelayAction200Response
    | EnvironmentsDelayActionDefaultResponse,
): response is EnvironmentsDelayActionDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsListCatalogsByProject200Response
    | EnvironmentsListCatalogsByProjectDefaultResponse,
): response is EnvironmentsListCatalogsByProjectDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsGetCatalog200Response
    | EnvironmentsGetCatalogDefaultResponse,
): response is EnvironmentsGetCatalogDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsListEnvironmentDefinitionsByProject200Response
    | EnvironmentsListEnvironmentDefinitionsByProjectDefaultResponse,
): response is EnvironmentsListEnvironmentDefinitionsByProjectDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsListEnvironmentDefinitionsByCatalog200Response
    | EnvironmentsListEnvironmentDefinitionsByCatalogDefaultResponse,
): response is EnvironmentsListEnvironmentDefinitionsByCatalogDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsGetEnvironmentDefinition200Response
    | EnvironmentsGetEnvironmentDefinitionDefaultResponse,
): response is EnvironmentsGetEnvironmentDefinitionDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsListEnvironmentTypes200Response
    | EnvironmentsListEnvironmentTypesDefaultResponse,
): response is EnvironmentsListEnvironmentTypesDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsGetEnvironmentTypes200Response
    | EnvironmentsGetEnvironmentTypesDefaultResponse,
): response is EnvironmentsGetEnvironmentTypesDefaultResponse;
export function isUnexpected(
  response:
    | EnvironmentsGetEnvironmentTypeAbilities200Response
    | EnvironmentsGetEnvironmentTypeAbilitiesDefaultResponse,
): response is EnvironmentsGetEnvironmentTypeAbilitiesDefaultResponse;
export function isUnexpected(
  response:
    | DevCenterListProjects200Response
    | DevCenterListProjectsDefaultResponse
    | DevCenterGetProject200Response
    | DevCenterGetProjectDefaultResponse
    | DevCenterListApprovals200Response
    | DevCenterListApprovalsDefaultResponse
    | DevCenterGetProjectAbilities200Response
    | DevCenterGetProjectAbilitiesDefaultResponse
    | OperationStatusesGet200Response
    | OperationStatusesGetDefaultResponse
    | DevBoxesListPools200Response
    | DevBoxesListPoolsDefaultResponse
    | DevBoxesGetPool200Response
    | DevBoxesGetPoolDefaultResponse
    | DevBoxesAlignPool202Response
    | DevBoxesAlignPoolLogicalResponse
    | DevBoxesAlignPoolDefaultResponse
    | DevBoxesListAllDevBoxes200Response
    | DevBoxesListAllDevBoxesDefaultResponse
    | DevBoxesListAllDevBoxesByUser200Response
    | DevBoxesListAllDevBoxesByUserDefaultResponse
    | DevBoxesListSchedulesByPool200Response
    | DevBoxesListSchedulesByPoolDefaultResponse
    | DevBoxesGetScheduleByPool200Response
    | DevBoxesGetScheduleByPoolDefaultResponse
    | DevBoxesListSchedulesByProject200Response
    | DevBoxesListSchedulesByProjectDefaultResponse
    | DevBoxesListDevBoxesByUser200Response
    | DevBoxesListDevBoxesByUserDefaultResponse
    | DevBoxesGetDevBoxByUser200Response
    | DevBoxesGetDevBoxByUserDefaultResponse
    | DevBoxesCreateDevBox200Response
    | DevBoxesCreateDevBox201Response
    | DevBoxesCreateDevBoxLogicalResponse
    | DevBoxesCreateDevBoxDefaultResponse
    | DevBoxesDeleteDevBox202Response
    | DevBoxesDeleteDevBox204Response
    | DevBoxesDeleteDevBoxLogicalResponse
    | DevBoxesDeleteDevBoxDefaultResponse
    | DevBoxesApproveDevBox202Response
    | DevBoxesApproveDevBoxLogicalResponse
    | DevBoxesApproveDevBoxDefaultResponse
    | DevBoxesStartDevBox202Response
    | DevBoxesStartDevBoxLogicalResponse
    | DevBoxesStartDevBoxDefaultResponse
    | DevBoxesStopDevBox202Response
    | DevBoxesStopDevBoxLogicalResponse
    | DevBoxesStopDevBoxDefaultResponse
    | DevBoxesRestartDevBox202Response
    | DevBoxesRestartDevBoxLogicalResponse
    | DevBoxesRestartDevBoxDefaultResponse
    | DevBoxesAlignDevBox202Response
    | DevBoxesAlignDevBoxLogicalResponse
    | DevBoxesAlignDevBoxDefaultResponse
    | DevBoxesRepairDevBox202Response
    | DevBoxesRepairDevBoxLogicalResponse
    | DevBoxesRepairDevBoxDefaultResponse
    | DevBoxesSetActiveHours200Response
    | DevBoxesSetActiveHoursDefaultResponse
    | DevBoxesListCustomizationGroups200Response
    | DevBoxesListCustomizationGroupsDefaultResponse
    | DevBoxesGetCustomizationGroup200Response
    | DevBoxesGetCustomizationGroupDefaultResponse
    | DevBoxesCreateCustomizationGroup200Response
    | DevBoxesCreateCustomizationGroupDefaultResponse
    | DevBoxesGetCustomizationTaskLog200Response
    | DevBoxesGetCustomizationTaskLogDefaultResponse
    | DevBoxesListCustomizationTaskDefinitionsByProject200Response
    | DevBoxesListCustomizationTaskDefinitionsByProjectDefaultResponse
    | DevBoxesGetCustomizationTaskDefinitions200Response
    | DevBoxesGetCustomizationTaskDefinitionsDefaultResponse
    | DevBoxesValidateCustomizationTasksAction202Response
    | DevBoxesValidateCustomizationTasksActionLogicalResponse
    | DevBoxesValidateCustomizationTasksActionDefaultResponse
    | DevBoxesGetRemoteConnection200Response
    | DevBoxesGetRemoteConnectionDefaultResponse
    | DevBoxesListActions200Response
    | DevBoxesListActionsDefaultResponse
    | DevBoxesGetAction200Response
    | DevBoxesGetActionDefaultResponse
    | DevBoxesSkipAction204Response
    | DevBoxesSkipActionDefaultResponse
    | DevBoxesDelayAction200Response
    | DevBoxesDelayActionDefaultResponse
    | DevBoxesDelayActions200Response
    | DevBoxesDelayActionsDefaultResponse
    | DevBoxesListOperations200Response
    | DevBoxesListOperationsDefaultResponse
    | DevBoxesGetOperation200Response
    | DevBoxesGetOperationDefaultResponse
    | DevBoxesGetImagingTaskLog200Response
    | DevBoxesGetImagingTaskLogDefaultResponse
    | DevBoxesListSnapshots200Response
    | DevBoxesListSnapshotsDefaultResponse
    | DevBoxesGetSnapshot200Response
    | DevBoxesGetSnapshotDefaultResponse
    | DevBoxesRestoreSnapshot202Response
    | DevBoxesRestoreSnapshotLogicalResponse
    | DevBoxesRestoreSnapshotDefaultResponse
    | DevBoxesCaptureSnapshot202Response
    | DevBoxesCaptureSnapshotLogicalResponse
    | DevBoxesCaptureSnapshotDefaultResponse
    | DevBoxesListDevBoxAddons200Response
    | DevBoxesListDevBoxAddonsDefaultResponse
    | DevBoxesGetDevBoxAddon200Response
    | DevBoxesGetDevBoxAddonDefaultResponse
    | DevBoxesCreateOrReplaceDevBoxAddOn200Response
    | DevBoxesCreateOrReplaceDevBoxAddOn201Response
    | DevBoxesCreateOrReplaceDevBoxAddOnLogicalResponse
    | DevBoxesCreateOrReplaceDevBoxAddOnDefaultResponse
    | DevBoxesDeleteDevBoxAddOn202Response
    | DevBoxesDeleteDevBoxAddOn204Response
    | DevBoxesDeleteDevBoxAddOnLogicalResponse
    | DevBoxesDeleteDevBoxAddOnDefaultResponse
    | DevBoxesEnableDevBoxAddOn202Response
    | DevBoxesEnableDevBoxAddOnLogicalResponse
    | DevBoxesEnableDevBoxAddOnDefaultResponse
    | DevBoxesDisableDevBoxAddOn202Response
    | DevBoxesDisableDevBoxAddOnLogicalResponse
    | DevBoxesDisableDevBoxAddOnDefaultResponse
    | EnvironmentsListEnvironments200Response
    | EnvironmentsListEnvironmentsDefaultResponse
    | EnvironmentsListEnvironmentsByUser200Response
    | EnvironmentsListEnvironmentsByUserDefaultResponse
    | EnvironmentsGetEnvironmentByUser200Response
    | EnvironmentsGetEnvironmentByUserDefaultResponse
    | EnvironmentsCreateOrReplaceEnvironment201Response
    | EnvironmentsCreateOrReplaceEnvironmentLogicalResponse
    | EnvironmentsCreateOrReplaceEnvironmentDefaultResponse
    | EnvironmentsPatchEnvironment200Response
    | EnvironmentsPatchEnvironmentDefaultResponse
    | EnvironmentsDeleteEnvironment202Response
    | EnvironmentsDeleteEnvironment204Response
    | EnvironmentsDeleteEnvironmentLogicalResponse
    | EnvironmentsDeleteEnvironmentDefaultResponse
    | EnvironmentsGetOutputs200Response
    | EnvironmentsGetOutputsDefaultResponse
    | EnvironmentsListOperations200Response
    | EnvironmentsListOperationsDefaultResponse
    | EnvironmentsGetOperation200Response
    | EnvironmentsGetOperationDefaultResponse
    | EnvironmentsGetLogsByOperation200Response
    | EnvironmentsGetLogsByOperationDefaultResponse
    | EnvironmentsListActions200Response
    | EnvironmentsListActionsDefaultResponse
    | EnvironmentsGetAction200Response
    | EnvironmentsGetActionDefaultResponse
    | EnvironmentsSkipAction204Response
    | EnvironmentsSkipActionDefaultResponse
    | EnvironmentsDelayAction200Response
    | EnvironmentsDelayActionDefaultResponse
    | EnvironmentsListCatalogsByProject200Response
    | EnvironmentsListCatalogsByProjectDefaultResponse
    | EnvironmentsGetCatalog200Response
    | EnvironmentsGetCatalogDefaultResponse
    | EnvironmentsListEnvironmentDefinitionsByProject200Response
    | EnvironmentsListEnvironmentDefinitionsByProjectDefaultResponse
    | EnvironmentsListEnvironmentDefinitionsByCatalog200Response
    | EnvironmentsListEnvironmentDefinitionsByCatalogDefaultResponse
    | EnvironmentsGetEnvironmentDefinition200Response
    | EnvironmentsGetEnvironmentDefinitionDefaultResponse
    | EnvironmentsListEnvironmentTypes200Response
    | EnvironmentsListEnvironmentTypesDefaultResponse
    | EnvironmentsGetEnvironmentTypes200Response
    | EnvironmentsGetEnvironmentTypesDefaultResponse
    | EnvironmentsGetEnvironmentTypeAbilities200Response
    | EnvironmentsGetEnvironmentTypeAbilitiesDefaultResponse,
): response is
  | DevCenterListProjectsDefaultResponse
  | DevCenterGetProjectDefaultResponse
  | DevCenterListApprovalsDefaultResponse
  | DevCenterGetProjectAbilitiesDefaultResponse
  | OperationStatusesGetDefaultResponse
  | DevBoxesListPoolsDefaultResponse
  | DevBoxesGetPoolDefaultResponse
  | DevBoxesAlignPoolDefaultResponse
  | DevBoxesListAllDevBoxesDefaultResponse
  | DevBoxesListAllDevBoxesByUserDefaultResponse
  | DevBoxesListSchedulesByPoolDefaultResponse
  | DevBoxesGetScheduleByPoolDefaultResponse
  | DevBoxesListSchedulesByProjectDefaultResponse
  | DevBoxesListDevBoxesByUserDefaultResponse
  | DevBoxesGetDevBoxByUserDefaultResponse
  | DevBoxesCreateDevBoxDefaultResponse
  | DevBoxesDeleteDevBoxDefaultResponse
  | DevBoxesApproveDevBoxDefaultResponse
  | DevBoxesStartDevBoxDefaultResponse
  | DevBoxesStopDevBoxDefaultResponse
  | DevBoxesRestartDevBoxDefaultResponse
  | DevBoxesAlignDevBoxDefaultResponse
  | DevBoxesRepairDevBoxDefaultResponse
  | DevBoxesSetActiveHoursDefaultResponse
  | DevBoxesListCustomizationGroupsDefaultResponse
  | DevBoxesGetCustomizationGroupDefaultResponse
  | DevBoxesCreateCustomizationGroupDefaultResponse
  | DevBoxesGetCustomizationTaskLogDefaultResponse
  | DevBoxesListCustomizationTaskDefinitionsByProjectDefaultResponse
  | DevBoxesGetCustomizationTaskDefinitionsDefaultResponse
  | DevBoxesValidateCustomizationTasksActionDefaultResponse
  | DevBoxesGetRemoteConnectionDefaultResponse
  | DevBoxesListActionsDefaultResponse
  | DevBoxesGetActionDefaultResponse
  | DevBoxesSkipActionDefaultResponse
  | DevBoxesDelayActionDefaultResponse
  | DevBoxesDelayActionsDefaultResponse
  | DevBoxesListOperationsDefaultResponse
  | DevBoxesGetOperationDefaultResponse
  | DevBoxesGetImagingTaskLogDefaultResponse
  | DevBoxesListSnapshotsDefaultResponse
  | DevBoxesGetSnapshotDefaultResponse
  | DevBoxesRestoreSnapshotDefaultResponse
  | DevBoxesCaptureSnapshotDefaultResponse
  | DevBoxesListDevBoxAddonsDefaultResponse
  | DevBoxesGetDevBoxAddonDefaultResponse
  | DevBoxesCreateOrReplaceDevBoxAddOnDefaultResponse
  | DevBoxesDeleteDevBoxAddOnDefaultResponse
  | DevBoxesEnableDevBoxAddOnDefaultResponse
  | DevBoxesDisableDevBoxAddOnDefaultResponse
  | EnvironmentsListEnvironmentsDefaultResponse
  | EnvironmentsListEnvironmentsByUserDefaultResponse
  | EnvironmentsGetEnvironmentByUserDefaultResponse
  | EnvironmentsCreateOrReplaceEnvironmentDefaultResponse
  | EnvironmentsPatchEnvironmentDefaultResponse
  | EnvironmentsDeleteEnvironmentDefaultResponse
  | EnvironmentsGetOutputsDefaultResponse
  | EnvironmentsListOperationsDefaultResponse
  | EnvironmentsGetOperationDefaultResponse
  | EnvironmentsGetLogsByOperationDefaultResponse
  | EnvironmentsListActionsDefaultResponse
  | EnvironmentsGetActionDefaultResponse
  | EnvironmentsSkipActionDefaultResponse
  | EnvironmentsDelayActionDefaultResponse
  | EnvironmentsListCatalogsByProjectDefaultResponse
  | EnvironmentsGetCatalogDefaultResponse
  | EnvironmentsListEnvironmentDefinitionsByProjectDefaultResponse
  | EnvironmentsListEnvironmentDefinitionsByCatalogDefaultResponse
  | EnvironmentsGetEnvironmentDefinitionDefaultResponse
  | EnvironmentsListEnvironmentTypesDefaultResponse
  | EnvironmentsGetEnvironmentTypesDefaultResponse
  | EnvironmentsGetEnvironmentTypeAbilitiesDefaultResponse {
  const lroOriginal = response.headers["x-ms-original-url"];
  const url = new URL(lroOriginal ?? response.request.url);
  const method = response.request.method;
  let pathDetails = responseMap[`${method} ${url.pathname}`];
  if (!pathDetails) {
    pathDetails = getParametrizedPathSuccess(method, url.pathname);
  }
  return !pathDetails.includes(response.status);
}

function getParametrizedPathSuccess(method: string, path: string): string[] {
  const pathParts = path.split("/");

  // Traverse list to match the longest candidate
  // matchedLen: the length of candidate path
  // matchedValue: the matched status code array
  let matchedLen = -1,
    matchedValue: string[] = [];

  // Iterate the responseMap to find a match
  for (const [key, value] of Object.entries(responseMap)) {
    // Extracting the path from the map key which is in format
    // GET /path/foo
    if (!key.startsWith(method)) {
      continue;
    }
    const candidatePath = getPathFromMapKey(key);
    // Get each part of the url path
    const candidateParts = candidatePath.split("/");

    // track if we have found a match to return the values found.
    let found = true;
    for (
      let i = candidateParts.length - 1, j = pathParts.length - 1;
      i >= 1 && j >= 1;
      i--, j--
    ) {
      if (
        candidateParts[i]?.startsWith("{") &&
        candidateParts[i]?.indexOf("}") !== -1
      ) {
        const start = candidateParts[i]!.indexOf("}") + 1,
          end = candidateParts[i]?.length;
        // If the current part of the candidate is a "template" part
        // Try to use the suffix of pattern to match the path
        // {guid} ==> $
        // {guid}:export ==> :export$
        const isMatched = new RegExp(
          `${candidateParts[i]?.slice(start, end)}`,
        ).test(pathParts[j] || "");

        if (!isMatched) {
          found = false;
          break;
        }
        continue;
      }

      // If the candidate part is not a template and
      // the parts don't match mark the candidate as not found
      // to move on with the next candidate path.
      if (candidateParts[i] !== pathParts[j]) {
        found = false;
        break;
      }
    }

    // We finished evaluating the current candidate parts
    // Update the matched value if and only if we found the longer pattern
    if (found && candidatePath.length > matchedLen) {
      matchedLen = candidatePath.length;
      matchedValue = value;
    }
  }

  return matchedValue;
}

function getPathFromMapKey(mapKey: string): string {
  const pathStart = mapKey.indexOf("/");
  return mapKey.slice(pathStart);
}
