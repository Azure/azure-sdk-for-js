// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DevCenterListProjectsParameters,
  DevCenterGetProjectParameters,
  DevCenterListApprovalsParameters,
  DevCenterGetProjectAbilitiesParameters,
  OperationStatusesGetParameters,
  DevBoxesListPoolsParameters,
  DevBoxesGetPoolParameters,
  DevBoxesAlignPoolParameters,
  DevBoxesListAllDevBoxesParameters,
  DevBoxesListAllDevBoxesByUserParameters,
  DevBoxesListSchedulesByPoolParameters,
  DevBoxesGetScheduleByPoolParameters,
  DevBoxesListSchedulesByProjectParameters,
  DevBoxesListDevBoxesByUserParameters,
  DevBoxesGetDevBoxByUserParameters,
  DevBoxesCreateDevBoxParameters,
  DevBoxesDeleteDevBoxParameters,
  DevBoxesApproveDevBoxParameters,
  DevBoxesStartDevBoxParameters,
  DevBoxesStopDevBoxParameters,
  DevBoxesRestartDevBoxParameters,
  DevBoxesAlignDevBoxParameters,
  DevBoxesRepairDevBoxParameters,
  DevBoxesSetActiveHoursParameters,
  DevBoxesListCustomizationGroupsParameters,
  DevBoxesGetCustomizationGroupParameters,
  DevBoxesCreateCustomizationGroupParameters,
  DevBoxesGetCustomizationTaskLogParameters,
  DevBoxesListCustomizationTaskDefinitionsByProjectParameters,
  DevBoxesGetCustomizationTaskDefinitionsParameters,
  DevBoxesValidateCustomizationTasksActionParameters,
  DevBoxesGetRemoteConnectionParameters,
  DevBoxesListActionsParameters,
  DevBoxesGetActionParameters,
  DevBoxesSkipActionParameters,
  DevBoxesDelayActionParameters,
  DevBoxesDelayActionsParameters,
  DevBoxesListOperationsParameters,
  DevBoxesGetOperationParameters,
  DevBoxesGetImagingTaskLogParameters,
  DevBoxesListSnapshotsParameters,
  DevBoxesGetSnapshotParameters,
  DevBoxesRestoreSnapshotParameters,
  DevBoxesCaptureSnapshotParameters,
  DevBoxesListDevBoxAddonsParameters,
  DevBoxesGetDevBoxAddonParameters,
  DevBoxesCreateOrReplaceDevBoxAddOnParameters,
  DevBoxesDeleteDevBoxAddOnParameters,
  DevBoxesEnableDevBoxAddOnParameters,
  DevBoxesDisableDevBoxAddOnParameters,
  EnvironmentsListEnvironmentsParameters,
  EnvironmentsListEnvironmentsByUserParameters,
  EnvironmentsGetEnvironmentByUserParameters,
  EnvironmentsCreateOrReplaceEnvironmentParameters,
  EnvironmentsPatchEnvironmentParameters,
  EnvironmentsDeleteEnvironmentParameters,
  EnvironmentsGetOutputsParameters,
  EnvironmentsListOperationsParameters,
  EnvironmentsGetOperationParameters,
  EnvironmentsGetLogsByOperationParameters,
  EnvironmentsListActionsParameters,
  EnvironmentsGetActionParameters,
  EnvironmentsSkipActionParameters,
  EnvironmentsDelayActionParameters,
  EnvironmentsListCatalogsByProjectParameters,
  EnvironmentsGetCatalogParameters,
  EnvironmentsListEnvironmentDefinitionsByProjectParameters,
  EnvironmentsListEnvironmentDefinitionsByCatalogParameters,
  EnvironmentsGetEnvironmentDefinitionParameters,
  EnvironmentsListEnvironmentTypesParameters,
  EnvironmentsGetEnvironmentTypesParameters,
  EnvironmentsGetEnvironmentTypeAbilitiesParameters,
} from "./parameters.js";
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
  DevBoxesCreateDevBoxDefaultResponse,
  DevBoxesDeleteDevBox202Response,
  DevBoxesDeleteDevBox204Response,
  DevBoxesDeleteDevBoxDefaultResponse,
  DevBoxesApproveDevBox202Response,
  DevBoxesApproveDevBoxDefaultResponse,
  DevBoxesStartDevBox202Response,
  DevBoxesStartDevBoxDefaultResponse,
  DevBoxesStopDevBox202Response,
  DevBoxesStopDevBoxDefaultResponse,
  DevBoxesRestartDevBox202Response,
  DevBoxesRestartDevBoxDefaultResponse,
  DevBoxesAlignDevBox202Response,
  DevBoxesAlignDevBoxDefaultResponse,
  DevBoxesRepairDevBox202Response,
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
  DevBoxesRestoreSnapshotDefaultResponse,
  DevBoxesCaptureSnapshot202Response,
  DevBoxesCaptureSnapshotDefaultResponse,
  DevBoxesListDevBoxAddons200Response,
  DevBoxesListDevBoxAddonsDefaultResponse,
  DevBoxesGetDevBoxAddon200Response,
  DevBoxesGetDevBoxAddonDefaultResponse,
  DevBoxesCreateOrReplaceDevBoxAddOn200Response,
  DevBoxesCreateOrReplaceDevBoxAddOn201Response,
  DevBoxesCreateOrReplaceDevBoxAddOnDefaultResponse,
  DevBoxesDeleteDevBoxAddOn202Response,
  DevBoxesDeleteDevBoxAddOn204Response,
  DevBoxesDeleteDevBoxAddOnDefaultResponse,
  DevBoxesEnableDevBoxAddOn202Response,
  DevBoxesEnableDevBoxAddOnDefaultResponse,
  DevBoxesDisableDevBoxAddOn202Response,
  DevBoxesDisableDevBoxAddOnDefaultResponse,
  EnvironmentsListEnvironments200Response,
  EnvironmentsListEnvironmentsDefaultResponse,
  EnvironmentsListEnvironmentsByUser200Response,
  EnvironmentsListEnvironmentsByUserDefaultResponse,
  EnvironmentsGetEnvironmentByUser200Response,
  EnvironmentsGetEnvironmentByUserDefaultResponse,
  EnvironmentsCreateOrReplaceEnvironment201Response,
  EnvironmentsCreateOrReplaceEnvironmentDefaultResponse,
  EnvironmentsPatchEnvironment200Response,
  EnvironmentsPatchEnvironmentDefaultResponse,
  EnvironmentsDeleteEnvironment202Response,
  EnvironmentsDeleteEnvironment204Response,
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
import type { Client, StreamableMethod } from "@azure-rest/core-client";

export interface DevCenterListProjects {
  /** Lists all projects. */
  get(
    options?: DevCenterListProjectsParameters,
  ): StreamableMethod<
    DevCenterListProjects200Response | DevCenterListProjectsDefaultResponse
  >;
}

export interface DevCenterGetProject {
  /** Gets a project. */
  get(
    options?: DevCenterGetProjectParameters,
  ): StreamableMethod<
    DevCenterGetProject200Response | DevCenterGetProjectDefaultResponse
  >;
}

export interface DevCenterListApprovals {
  /** Gets a list of Dev Box creations that are pending approval. */
  get(
    options?: DevCenterListApprovalsParameters,
  ): StreamableMethod<
    DevCenterListApprovals200Response | DevCenterListApprovalsDefaultResponse
  >;
}

export interface DevCenterGetProjectAbilities {
  /** Gets the signed-in user's permitted abilities in a project. */
  get(
    options?: DevCenterGetProjectAbilitiesParameters,
  ): StreamableMethod<
    | DevCenterGetProjectAbilities200Response
    | DevCenterGetProjectAbilitiesDefaultResponse
  >;
}

export interface OperationStatusesGet {
  /** Get the status of an operation. */
  get(
    options?: OperationStatusesGetParameters,
  ): StreamableMethod<
    OperationStatusesGet200Response | OperationStatusesGetDefaultResponse
  >;
}

export interface DevBoxesListPools {
  /** Lists available pools. */
  get(
    options?: DevBoxesListPoolsParameters,
  ): StreamableMethod<
    DevBoxesListPools200Response | DevBoxesListPoolsDefaultResponse
  >;
}

export interface DevBoxesGetPool {
  /** Gets a pool. */
  get(
    options?: DevBoxesGetPoolParameters,
  ): StreamableMethod<
    DevBoxesGetPool200Response | DevBoxesGetPoolDefaultResponse
  >;
}

export interface DevBoxesAlignPool {
  /** Aligns all Dev Boxes in the pool with the current configuration. */
  post(
    options: DevBoxesAlignPoolParameters,
  ): StreamableMethod<
    DevBoxesAlignPool202Response | DevBoxesAlignPoolDefaultResponse
  >;
}

export interface DevBoxesListAllDevBoxes {
  /** Lists Dev Boxes that the caller has access to in the DevCenter. */
  get(
    options?: DevBoxesListAllDevBoxesParameters,
  ): StreamableMethod<
    DevBoxesListAllDevBoxes200Response | DevBoxesListAllDevBoxesDefaultResponse
  >;
}

export interface DevBoxesListAllDevBoxesByUser {
  /** Lists Dev Boxes in the Dev Center for a particular user. */
  get(
    options?: DevBoxesListAllDevBoxesByUserParameters,
  ): StreamableMethod<
    | DevBoxesListAllDevBoxesByUser200Response
    | DevBoxesListAllDevBoxesByUserDefaultResponse
  >;
}

export interface DevBoxesListSchedulesByPool {
  /** Lists all schedules within a pool that are configured by your project administrator. */
  get(
    options?: DevBoxesListSchedulesByPoolParameters,
  ): StreamableMethod<
    | DevBoxesListSchedulesByPool200Response
    | DevBoxesListSchedulesByPoolDefaultResponse
  >;
}

export interface DevBoxesGetScheduleByPool {
  /** Gets a schedule. */
  get(
    options?: DevBoxesGetScheduleByPoolParameters,
  ): StreamableMethod<
    | DevBoxesGetScheduleByPool200Response
    | DevBoxesGetScheduleByPoolDefaultResponse
  >;
}

export interface DevBoxesListSchedulesByProject {
  /** Lists all schedules within a project that are configured by your project administrator. */
  get(
    options?: DevBoxesListSchedulesByProjectParameters,
  ): StreamableMethod<
    | DevBoxesListSchedulesByProject200Response
    | DevBoxesListSchedulesByProjectDefaultResponse
  >;
}

export interface DevBoxesListDevBoxesByUser {
  /** Lists Dev Boxes in the project for a particular user. */
  get(
    options?: DevBoxesListDevBoxesByUserParameters,
  ): StreamableMethod<
    | DevBoxesListDevBoxesByUser200Response
    | DevBoxesListDevBoxesByUserDefaultResponse
  >;
}

export interface DevBoxesGetDevBoxByUser {
  /** Gets a Dev Box. */
  get(
    options?: DevBoxesGetDevBoxByUserParameters,
  ): StreamableMethod<
    DevBoxesGetDevBoxByUser200Response | DevBoxesGetDevBoxByUserDefaultResponse
  >;
  /** Creates or replaces a Dev Box. */
  put(
    options: DevBoxesCreateDevBoxParameters,
  ): StreamableMethod<
    | DevBoxesCreateDevBox200Response
    | DevBoxesCreateDevBox201Response
    | DevBoxesCreateDevBoxDefaultResponse
  >;
  /** Deletes a Dev Box. */
  delete(
    options?: DevBoxesDeleteDevBoxParameters,
  ): StreamableMethod<
    | DevBoxesDeleteDevBox202Response
    | DevBoxesDeleteDevBox204Response
    | DevBoxesDeleteDevBoxDefaultResponse
  >;
}

export interface DevBoxesApproveDevBox {
  /** Approves the creation of a Dev Box. */
  post(
    options?: DevBoxesApproveDevBoxParameters,
  ): StreamableMethod<
    DevBoxesApproveDevBox202Response | DevBoxesApproveDevBoxDefaultResponse
  >;
}

export interface DevBoxesStartDevBox {
  /** Starts a Dev Box. */
  post(
    options?: DevBoxesStartDevBoxParameters,
  ): StreamableMethod<
    DevBoxesStartDevBox202Response | DevBoxesStartDevBoxDefaultResponse
  >;
}

export interface DevBoxesStopDevBox {
  /** Stops a Dev Box. */
  post(
    options?: DevBoxesStopDevBoxParameters,
  ): StreamableMethod<
    DevBoxesStopDevBox202Response | DevBoxesStopDevBoxDefaultResponse
  >;
}

export interface DevBoxesRestartDevBox {
  /** Restarts a Dev Box. */
  post(
    options?: DevBoxesRestartDevBoxParameters,
  ): StreamableMethod<
    DevBoxesRestartDevBox202Response | DevBoxesRestartDevBoxDefaultResponse
  >;
}

export interface DevBoxesAlignDevBox {
  /** Aligns a Dev Box to the pools current pool configuration. */
  post(
    options: DevBoxesAlignDevBoxParameters,
  ): StreamableMethod<
    DevBoxesAlignDevBox202Response | DevBoxesAlignDevBoxDefaultResponse
  >;
}

export interface DevBoxesRepairDevBox {
  /** Attempts automated repair steps to resolve common problems on a Dev Box. The Dev Box may restart during this operation. */
  post(
    options?: DevBoxesRepairDevBoxParameters,
  ): StreamableMethod<
    DevBoxesRepairDevBox202Response | DevBoxesRepairDevBoxDefaultResponse
  >;
}

export interface DevBoxesSetActiveHours {
  /** Lets a user set their own active hours for their Dev Box, overriding the defaults set at the pool level. */
  post(
    options: DevBoxesSetActiveHoursParameters,
  ): StreamableMethod<
    DevBoxesSetActiveHours200Response | DevBoxesSetActiveHoursDefaultResponse
  >;
}

export interface DevBoxesListCustomizationGroups {
  /**
   *   Lists customization groups on the Dev Box. Listed customization groups exclude
   *   task information unless specified via the include parameter.
   */
  get(
    options?: DevBoxesListCustomizationGroupsParameters,
  ): StreamableMethod<
    | DevBoxesListCustomizationGroups200Response
    | DevBoxesListCustomizationGroupsDefaultResponse
  >;
}

export interface DevBoxesGetCustomizationGroup {
  /**   Gets a customization group. */
  get(
    options?: DevBoxesGetCustomizationGroupParameters,
  ): StreamableMethod<
    | DevBoxesGetCustomizationGroup200Response
    | DevBoxesGetCustomizationGroupDefaultResponse
  >;
  /** Applies customizations to the Dev Box. */
  put(
    options: DevBoxesCreateCustomizationGroupParameters,
  ): StreamableMethod<
    | DevBoxesCreateCustomizationGroup200Response
    | DevBoxesCreateCustomizationGroupDefaultResponse
  >;
}

export interface DevBoxesGetCustomizationTaskLog {
  /** Gets the log for a customization task. */
  get(
    options?: DevBoxesGetCustomizationTaskLogParameters,
  ): StreamableMethod<
    | DevBoxesGetCustomizationTaskLog200Response
    | DevBoxesGetCustomizationTaskLogDefaultResponse
  >;
}

export interface DevBoxesListCustomizationTaskDefinitionsByProject {
  /** Lists all customization tasks available to the project. */
  get(
    options?: DevBoxesListCustomizationTaskDefinitionsByProjectParameters,
  ): StreamableMethod<
    | DevBoxesListCustomizationTaskDefinitionsByProject200Response
    | DevBoxesListCustomizationTaskDefinitionsByProjectDefaultResponse
  >;
}

export interface DevBoxesGetCustomizationTaskDefinitions {
  /** Gets a customization task. */
  get(
    options?: DevBoxesGetCustomizationTaskDefinitionsParameters,
  ): StreamableMethod<
    | DevBoxesGetCustomizationTaskDefinitions200Response
    | DevBoxesGetCustomizationTaskDefinitionsDefaultResponse
  >;
}

export interface DevBoxesValidateCustomizationTasksAction {
  /** Validates a list of customization tasks. */
  post(
    options: DevBoxesValidateCustomizationTasksActionParameters,
  ): StreamableMethod<
    | DevBoxesValidateCustomizationTasksAction202Response
    | DevBoxesValidateCustomizationTasksActionDefaultResponse
  >;
}

export interface DevBoxesGetRemoteConnection {
  /** Gets RDP Connection info. */
  get(
    options?: DevBoxesGetRemoteConnectionParameters,
  ): StreamableMethod<
    | DevBoxesGetRemoteConnection200Response
    | DevBoxesGetRemoteConnectionDefaultResponse
  >;
}

export interface DevBoxesListActions {
  /** Lists actions on a Dev Box. */
  get(
    options?: DevBoxesListActionsParameters,
  ): StreamableMethod<
    DevBoxesListActions200Response | DevBoxesListActionsDefaultResponse
  >;
}

export interface DevBoxesGetAction {
  /** Gets an action. */
  get(
    options?: DevBoxesGetActionParameters,
  ): StreamableMethod<
    DevBoxesGetAction200Response | DevBoxesGetActionDefaultResponse
  >;
}

export interface DevBoxesSkipAction {
  /** Skips an occurrence of an action. */
  post(
    options?: DevBoxesSkipActionParameters,
  ): StreamableMethod<
    DevBoxesSkipAction204Response | DevBoxesSkipActionDefaultResponse
  >;
}

export interface DevBoxesDelayAction {
  /** Delays the occurrence of an action. */
  post(
    options: DevBoxesDelayActionParameters,
  ): StreamableMethod<
    DevBoxesDelayAction200Response | DevBoxesDelayActionDefaultResponse
  >;
}

export interface DevBoxesDelayActions {
  /** Delays all actions. */
  post(
    options: DevBoxesDelayActionsParameters,
  ): StreamableMethod<
    DevBoxesDelayActions200Response | DevBoxesDelayActionsDefaultResponse
  >;
}

export interface DevBoxesListOperations {
  /** Lists operations on the Dev Box which have occurred within the past 90 days. */
  get(
    options?: DevBoxesListOperationsParameters,
  ): StreamableMethod<
    DevBoxesListOperations200Response | DevBoxesListOperationsDefaultResponse
  >;
}

export interface DevBoxesGetOperation {
  /** Gets an operation on a Dev Box. */
  get(
    options?: DevBoxesGetOperationParameters,
  ): StreamableMethod<
    DevBoxesGetOperation200Response | DevBoxesGetOperationDefaultResponse
  >;
}

export interface DevBoxesGetImagingTaskLog {
  /** Gets the log for an imaging build task. */
  get(
    options?: DevBoxesGetImagingTaskLogParameters,
  ): StreamableMethod<
    | DevBoxesGetImagingTaskLog200Response
    | DevBoxesGetImagingTaskLogDefaultResponse
  >;
}

export interface DevBoxesListSnapshots {
  /** Lists snapshots for this Dev Box. */
  get(
    options?: DevBoxesListSnapshotsParameters,
  ): StreamableMethod<
    DevBoxesListSnapshots200Response | DevBoxesListSnapshotsDefaultResponse
  >;
}

export interface DevBoxesGetSnapshot {
  /** Gets a snapshot by snapshot id. */
  get(
    options?: DevBoxesGetSnapshotParameters,
  ): StreamableMethod<
    DevBoxesGetSnapshot200Response | DevBoxesGetSnapshotDefaultResponse
  >;
}

export interface DevBoxesRestoreSnapshot {
  /** Restores a Dev Box to a specified snapshot. */
  post(
    options: DevBoxesRestoreSnapshotParameters,
  ): StreamableMethod<
    DevBoxesRestoreSnapshot202Response | DevBoxesRestoreSnapshotDefaultResponse
  >;
}

export interface DevBoxesCaptureSnapshot {
  /**
   * Captures a manual snapshot of the Dev Box.
   * Upon completion, a snapshotId will be generated.
   * To retrieve all snapshots and their corresponding IDs, use the list snapshots endpoint.
   */
  post(
    options?: DevBoxesCaptureSnapshotParameters,
  ): StreamableMethod<
    DevBoxesCaptureSnapshot202Response | DevBoxesCaptureSnapshotDefaultResponse
  >;
}

export interface DevBoxesListDevBoxAddons {
  /** Lists addons for this Dev Box. */
  get(
    options?: DevBoxesListDevBoxAddonsParameters,
  ): StreamableMethod<
    | DevBoxesListDevBoxAddons200Response
    | DevBoxesListDevBoxAddonsDefaultResponse
  >;
}

export interface DevBoxesGetDevBoxAddon {
  /** Gets a Dev Box addon by Dev Box addon id. */
  get(
    options?: DevBoxesGetDevBoxAddonParameters,
  ): StreamableMethod<
    DevBoxesGetDevBoxAddon200Response | DevBoxesGetDevBoxAddonDefaultResponse
  >;
  /** Creates a Dev Box addon. */
  put(
    options: DevBoxesCreateOrReplaceDevBoxAddOnParameters,
  ): StreamableMethod<
    | DevBoxesCreateOrReplaceDevBoxAddOn200Response
    | DevBoxesCreateOrReplaceDevBoxAddOn201Response
    | DevBoxesCreateOrReplaceDevBoxAddOnDefaultResponse
  >;
  /** Deletes a Dev Box addon. */
  delete(
    options?: DevBoxesDeleteDevBoxAddOnParameters,
  ): StreamableMethod<
    | DevBoxesDeleteDevBoxAddOn202Response
    | DevBoxesDeleteDevBoxAddOn204Response
    | DevBoxesDeleteDevBoxAddOnDefaultResponse
  >;
}

export interface DevBoxesEnableDevBoxAddOn {
  /** Enable a Dev Box addon. */
  post(
    options?: DevBoxesEnableDevBoxAddOnParameters,
  ): StreamableMethod<
    | DevBoxesEnableDevBoxAddOn202Response
    | DevBoxesEnableDevBoxAddOnDefaultResponse
  >;
}

export interface DevBoxesDisableDevBoxAddOn {
  /** Disable a Dev Box addon. */
  post(
    options?: DevBoxesDisableDevBoxAddOnParameters,
  ): StreamableMethod<
    | DevBoxesDisableDevBoxAddOn202Response
    | DevBoxesDisableDevBoxAddOnDefaultResponse
  >;
}

export interface EnvironmentsListEnvironments {
  /** Lists the environments for a project. */
  get(
    options?: EnvironmentsListEnvironmentsParameters,
  ): StreamableMethod<
    | EnvironmentsListEnvironments200Response
    | EnvironmentsListEnvironmentsDefaultResponse
  >;
}

export interface EnvironmentsListEnvironmentsByUser {
  /** Lists the environments for a project and user. */
  get(
    options?: EnvironmentsListEnvironmentsByUserParameters,
  ): StreamableMethod<
    | EnvironmentsListEnvironmentsByUser200Response
    | EnvironmentsListEnvironmentsByUserDefaultResponse
  >;
}

export interface EnvironmentsGetEnvironmentByUser {
  /** Gets an environment. */
  get(
    options?: EnvironmentsGetEnvironmentByUserParameters,
  ): StreamableMethod<
    | EnvironmentsGetEnvironmentByUser200Response
    | EnvironmentsGetEnvironmentByUserDefaultResponse
  >;
  /** Creates or updates an environment. */
  put(
    options: EnvironmentsCreateOrReplaceEnvironmentParameters,
  ): StreamableMethod<
    | EnvironmentsCreateOrReplaceEnvironment201Response
    | EnvironmentsCreateOrReplaceEnvironmentDefaultResponse
  >;
  /** Partially updates an environment. */
  patch(
    options: EnvironmentsPatchEnvironmentParameters,
  ): StreamableMethod<
    | EnvironmentsPatchEnvironment200Response
    | EnvironmentsPatchEnvironmentDefaultResponse
  >;
  /** Deletes an environment and all its associated resources */
  delete(
    options?: EnvironmentsDeleteEnvironmentParameters,
  ): StreamableMethod<
    | EnvironmentsDeleteEnvironment202Response
    | EnvironmentsDeleteEnvironment204Response
    | EnvironmentsDeleteEnvironmentDefaultResponse
  >;
}

export interface EnvironmentsGetOutputs {
  /** Gets Outputs from the environment. */
  get(
    options?: EnvironmentsGetOutputsParameters,
  ): StreamableMethod<
    EnvironmentsGetOutputs200Response | EnvironmentsGetOutputsDefaultResponse
  >;
}

export interface EnvironmentsListOperations {
  /** Lists operations on the environment which have occurred within the past 90 days */
  get(
    options?: EnvironmentsListOperationsParameters,
  ): StreamableMethod<
    | EnvironmentsListOperations200Response
    | EnvironmentsListOperationsDefaultResponse
  >;
}

export interface EnvironmentsGetOperation {
  /** Gets an environment action result. */
  get(
    options?: EnvironmentsGetOperationParameters,
  ): StreamableMethod<
    | EnvironmentsGetOperation200Response
    | EnvironmentsGetOperationDefaultResponse
  >;
}

export interface EnvironmentsGetLogsByOperation {
  /** Gets the logs for an operation on an environment. */
  get(
    options?: EnvironmentsGetLogsByOperationParameters,
  ): StreamableMethod<
    | EnvironmentsGetLogsByOperation200Response
    | EnvironmentsGetLogsByOperationDefaultResponse
  >;
}

export interface EnvironmentsListActions {
  /** Get all scheduled actions for a user within an environment. */
  get(
    options?: EnvironmentsListActionsParameters,
  ): StreamableMethod<
    EnvironmentsListActions200Response | EnvironmentsListActionsDefaultResponse
  >;
}

export interface EnvironmentsGetAction {
  /** Retrieve a specific environment action. */
  get(
    options?: EnvironmentsGetActionParameters,
  ): StreamableMethod<
    EnvironmentsGetAction200Response | EnvironmentsGetActionDefaultResponse
  >;
}

export interface EnvironmentsSkipAction {
  /** Skips an occurrence of an action. */
  post(
    options?: EnvironmentsSkipActionParameters,
  ): StreamableMethod<
    EnvironmentsSkipAction204Response | EnvironmentsSkipActionDefaultResponse
  >;
}

export interface EnvironmentsDelayAction {
  /** Delays the occurrence of an action. */
  post(
    options: EnvironmentsDelayActionParameters,
  ): StreamableMethod<
    EnvironmentsDelayAction200Response | EnvironmentsDelayActionDefaultResponse
  >;
}

export interface EnvironmentsListCatalogsByProject {
  /** Lists all of the catalogs available for a project. */
  get(
    options?: EnvironmentsListCatalogsByProjectParameters,
  ): StreamableMethod<
    | EnvironmentsListCatalogsByProject200Response
    | EnvironmentsListCatalogsByProjectDefaultResponse
  >;
}

export interface EnvironmentsGetCatalog {
  /** Gets the specified catalog within the project. */
  get(
    options?: EnvironmentsGetCatalogParameters,
  ): StreamableMethod<
    EnvironmentsGetCatalog200Response | EnvironmentsGetCatalogDefaultResponse
  >;
}

export interface EnvironmentsListEnvironmentDefinitionsByProject {
  /** Lists all environment definitions available for a project. */
  get(
    options?: EnvironmentsListEnvironmentDefinitionsByProjectParameters,
  ): StreamableMethod<
    | EnvironmentsListEnvironmentDefinitionsByProject200Response
    | EnvironmentsListEnvironmentDefinitionsByProjectDefaultResponse
  >;
}

export interface EnvironmentsListEnvironmentDefinitionsByCatalog {
  /** Lists all environment definitions available within a catalog. */
  get(
    options?: EnvironmentsListEnvironmentDefinitionsByCatalogParameters,
  ): StreamableMethod<
    | EnvironmentsListEnvironmentDefinitionsByCatalog200Response
    | EnvironmentsListEnvironmentDefinitionsByCatalogDefaultResponse
  >;
}

export interface EnvironmentsGetEnvironmentDefinition {
  /** Get an environment definition from a catalog. */
  get(
    options?: EnvironmentsGetEnvironmentDefinitionParameters,
  ): StreamableMethod<
    | EnvironmentsGetEnvironmentDefinition200Response
    | EnvironmentsGetEnvironmentDefinitionDefaultResponse
  >;
}

export interface EnvironmentsListEnvironmentTypes {
  /** Lists all environment types configured for a project. */
  get(
    options?: EnvironmentsListEnvironmentTypesParameters,
  ): StreamableMethod<
    | EnvironmentsListEnvironmentTypes200Response
    | EnvironmentsListEnvironmentTypesDefaultResponse
  >;
}

export interface EnvironmentsGetEnvironmentTypes {
  /** Get an environment type configured for a project. */
  get(
    options?: EnvironmentsGetEnvironmentTypesParameters,
  ): StreamableMethod<
    | EnvironmentsGetEnvironmentTypes200Response
    | EnvironmentsGetEnvironmentTypesDefaultResponse
  >;
}

export interface EnvironmentsGetEnvironmentTypeAbilities {
  /** Gets the signed-in user's permitted abilities in an environment type. */
  get(
    options?: EnvironmentsGetEnvironmentTypeAbilitiesParameters,
  ): StreamableMethod<
    | EnvironmentsGetEnvironmentTypeAbilities200Response
    | EnvironmentsGetEnvironmentTypeAbilitiesDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/projects' has methods for the following verbs: get */
  (path: "/projects"): DevCenterListProjects;
  /** Resource for '/projects/\{projectName\}' has methods for the following verbs: get */
  (path: "/projects/{projectName}", projectName: string): DevCenterGetProject;
  /** Resource for '/projects/\{projectName\}/approvals' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/approvals",
    projectName: string,
  ): DevCenterListApprovals;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/abilities' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/users/{userId}/abilities",
    projectName: string,
    userId: string,
  ): DevCenterGetProjectAbilities;
  /** Resource for '/projects/\{projectName\}/operationstatuses/\{operationId\}' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/operationstatuses/{operationId}",
    projectName: string,
    operationId: string,
  ): OperationStatusesGet;
  /** Resource for '/projects/\{projectName\}/pools' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/pools",
    projectName: string,
  ): DevBoxesListPools;
  /** Resource for '/projects/\{projectName\}/pools/\{poolName\}' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/pools/{poolName}",
    projectName: string,
    poolName: string,
  ): DevBoxesGetPool;
  /** Resource for '/projects/\{projectName\}/pools/\{poolName\}:align' has methods for the following verbs: post */
  (
    path: "/projects/{projectName}/pools/{poolName}:align",
    projectName: string,
    poolName: string,
  ): DevBoxesAlignPool;
  /** Resource for '/devboxes' has methods for the following verbs: get */
  (path: "/devboxes"): DevBoxesListAllDevBoxes;
  /** Resource for '/users/\{userId\}/devboxes' has methods for the following verbs: get */
  (
    path: "/users/{userId}/devboxes",
    userId: string,
  ): DevBoxesListAllDevBoxesByUser;
  /** Resource for '/projects/\{projectName\}/pools/\{poolName\}/schedules' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/pools/{poolName}/schedules",
    projectName: string,
    poolName: string,
  ): DevBoxesListSchedulesByPool;
  /** Resource for '/projects/\{projectName\}/pools/\{poolName\}/schedules/\{scheduleName\}' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/pools/{poolName}/schedules/{scheduleName}",
    projectName: string,
    poolName: string,
    scheduleName: string,
  ): DevBoxesGetScheduleByPool;
  /** Resource for '/projects/\{projectName\}/schedules' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/schedules",
    projectName: string,
  ): DevBoxesListSchedulesByProject;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes",
    projectName: string,
    userId: string,
  ): DevBoxesListDevBoxesByUser;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}' has methods for the following verbs: get, put, delete */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}",
    projectName: string,
    userId: string,
    devBoxName: string,
  ): DevBoxesGetDevBoxByUser;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}:approve' has methods for the following verbs: post */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}:approve",
    projectName: string,
    userId: string,
    devBoxName: string,
  ): DevBoxesApproveDevBox;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}:start' has methods for the following verbs: post */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}:start",
    projectName: string,
    userId: string,
    devBoxName: string,
  ): DevBoxesStartDevBox;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}:stop' has methods for the following verbs: post */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}:stop",
    projectName: string,
    userId: string,
    devBoxName: string,
  ): DevBoxesStopDevBox;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}:restart' has methods for the following verbs: post */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}:restart",
    projectName: string,
    userId: string,
    devBoxName: string,
  ): DevBoxesRestartDevBox;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}:align' has methods for the following verbs: post */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}:align",
    projectName: string,
    userId: string,
    devBoxName: string,
  ): DevBoxesAlignDevBox;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}:repair' has methods for the following verbs: post */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}:repair",
    projectName: string,
    userId: string,
    devBoxName: string,
  ): DevBoxesRepairDevBox;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}:setActiveHours' has methods for the following verbs: post */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}:setActiveHours",
    projectName: string,
    userId: string,
    devBoxName: string,
  ): DevBoxesSetActiveHours;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}/customizationGroups' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/customizationGroups",
    projectName: string,
    userId: string,
    devBoxName: string,
  ): DevBoxesListCustomizationGroups;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}/customizationGroups/\{customizationGroupName\}' has methods for the following verbs: get, put */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/customizationGroups/{customizationGroupName}",
    projectName: string,
    userId: string,
    devBoxName: string,
    customizationGroupName: string,
  ): DevBoxesGetCustomizationGroup;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}/customizationGroups/\{customizationGroupName\}/logs/\{customizationTaskId\}' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/customizationGroups/{customizationGroupName}/logs/{customizationTaskId}",
    projectName: string,
    userId: string,
    devBoxName: string,
    customizationGroupName: string,
    customizationTaskId: string,
  ): DevBoxesGetCustomizationTaskLog;
  /** Resource for '/projects/\{projectName\}/customizationTasks' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/customizationTasks",
    projectName: string,
  ): DevBoxesListCustomizationTaskDefinitionsByProject;
  /** Resource for '/projects/\{projectName\}/catalogs/\{catalogName\}/customizationTasks/\{taskName\}' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/catalogs/{catalogName}/customizationTasks/{taskName}",
    projectName: string,
    catalogName: string,
    taskName: string,
  ): DevBoxesGetCustomizationTaskDefinitions;
  /** Resource for '/projects/\{projectName\}/customizationTasks:validateGroup' has methods for the following verbs: post */
  (
    path: "/projects/{projectName}/customizationTasks:validateGroup",
    projectName: string,
  ): DevBoxesValidateCustomizationTasksAction;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}/remoteConnection' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/remoteConnection",
    projectName: string,
    userId: string,
    devBoxName: string,
  ): DevBoxesGetRemoteConnection;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}/actions' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions",
    projectName: string,
    userId: string,
    devBoxName: string,
  ): DevBoxesListActions;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}/actions/\{actionName\}' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions/{actionName}",
    projectName: string,
    userId: string,
    devBoxName: string,
    actionName: string,
  ): DevBoxesGetAction;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}/actions/\{actionName\}:skip' has methods for the following verbs: post */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions/{actionName}:skip",
    projectName: string,
    userId: string,
    devBoxName: string,
    actionName: string,
  ): DevBoxesSkipAction;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}/actions/\{actionName\}:delay' has methods for the following verbs: post */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions/{actionName}:delay",
    projectName: string,
    userId: string,
    devBoxName: string,
    actionName: string,
  ): DevBoxesDelayAction;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}/actions:delay' has methods for the following verbs: post */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions:delay",
    projectName: string,
    userId: string,
    devBoxName: string,
  ): DevBoxesDelayActions;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}/operations' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/operations",
    projectName: string,
    userId: string,
    devBoxName: string,
  ): DevBoxesListOperations;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}/operations/\{operationId\}' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/operations/{operationId}",
    projectName: string,
    userId: string,
    devBoxName: string,
    operationId: string,
  ): DevBoxesGetOperation;
  /** Resource for '/projects/\{projectName\}/imageBuildLogs/\{imageBuildLogId\}' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/imageBuildLogs/{imageBuildLogId}",
    projectName: string,
    imageBuildLogId: string,
  ): DevBoxesGetImagingTaskLog;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}/snapshots' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/snapshots",
    projectName: string,
    userId: string,
    devBoxName: string,
  ): DevBoxesListSnapshots;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}/snapshots/\{snapshotId\}' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/snapshots/{snapshotId}",
    projectName: string,
    userId: string,
    devBoxName: string,
    snapshotId: string,
  ): DevBoxesGetSnapshot;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}:restoreSnapshot' has methods for the following verbs: post */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}:restoreSnapshot",
    projectName: string,
    userId: string,
    devBoxName: string,
  ): DevBoxesRestoreSnapshot;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}:captureSnapshot' has methods for the following verbs: post */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}:captureSnapshot",
    projectName: string,
    userId: string,
    devBoxName: string,
  ): DevBoxesCaptureSnapshot;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}/addons' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/addons",
    projectName: string,
    userId: string,
    devBoxName: string,
  ): DevBoxesListDevBoxAddons;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}/addons/\{addOnName\}' has methods for the following verbs: get, put, delete */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/addons/{addOnName}",
    projectName: string,
    userId: string,
    devBoxName: string,
    addOnName: string,
  ): DevBoxesGetDevBoxAddon;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}/addons/\{addOnName\}:enable' has methods for the following verbs: post */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/addons/{addOnName}:enable",
    projectName: string,
    userId: string,
    devBoxName: string,
    addOnName: string,
  ): DevBoxesEnableDevBoxAddOn;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/devboxes/\{devBoxName\}/addons/\{addOnName\}:disable' has methods for the following verbs: post */
  (
    path: "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/addons/{addOnName}:disable",
    projectName: string,
    userId: string,
    devBoxName: string,
    addOnName: string,
  ): DevBoxesDisableDevBoxAddOn;
  /** Resource for '/projects/\{projectName\}/environments' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/environments",
    projectName: string,
  ): EnvironmentsListEnvironments;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/environments' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/users/{userId}/environments",
    projectName: string,
    userId: string,
  ): EnvironmentsListEnvironmentsByUser;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/environments/\{environmentName\}' has methods for the following verbs: get, put, patch, delete */
  (
    path: "/projects/{projectName}/users/{userId}/environments/{environmentName}",
    projectName: string,
    userId: string,
    environmentName: string,
  ): EnvironmentsGetEnvironmentByUser;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/environments/\{environmentName\}/outputs' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/users/{userId}/environments/{environmentName}/outputs",
    projectName: string,
    userId: string,
    environmentName: string,
  ): EnvironmentsGetOutputs;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/environments/\{environmentName\}/operations' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/users/{userId}/environments/{environmentName}/operations",
    projectName: string,
    userId: string,
    environmentName: string,
  ): EnvironmentsListOperations;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/environments/\{environmentName\}/operations/\{operationId\}' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/users/{userId}/environments/{environmentName}/operations/{operationId}",
    projectName: string,
    userId: string,
    environmentName: string,
    operationId: string,
  ): EnvironmentsGetOperation;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/environments/\{environmentName\}/operations/\{operationId\}/logs' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/users/{userId}/environments/{environmentName}/operations/{operationId}/logs",
    projectName: string,
    userId: string,
    environmentName: string,
    operationId: string,
  ): EnvironmentsGetLogsByOperation;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/environments/\{environmentName\}/actions' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/users/{userId}/environments/{environmentName}/actions",
    projectName: string,
    userId: string,
    environmentName: string,
  ): EnvironmentsListActions;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/environments/\{environmentName\}/actions/\{actionName\}' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/users/{userId}/environments/{environmentName}/actions/{actionName}",
    projectName: string,
    userId: string,
    environmentName: string,
    actionName: string,
  ): EnvironmentsGetAction;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/environments/\{environmentName\}/actions/\{actionName\}:skip' has methods for the following verbs: post */
  (
    path: "/projects/{projectName}/users/{userId}/environments/{environmentName}/actions/{actionName}:skip",
    projectName: string,
    userId: string,
    environmentName: string,
    actionName: string,
  ): EnvironmentsSkipAction;
  /** Resource for '/projects/\{projectName\}/users/\{userId\}/environments/\{environmentName\}/actions/\{actionName\}:delay' has methods for the following verbs: post */
  (
    path: "/projects/{projectName}/users/{userId}/environments/{environmentName}/actions/{actionName}:delay",
    projectName: string,
    userId: string,
    environmentName: string,
    actionName: string,
  ): EnvironmentsDelayAction;
  /** Resource for '/projects/\{projectName\}/catalogs' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/catalogs",
    projectName: string,
  ): EnvironmentsListCatalogsByProject;
  /** Resource for '/projects/\{projectName\}/catalogs/\{catalogName\}' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/catalogs/{catalogName}",
    projectName: string,
    catalogName: string,
  ): EnvironmentsGetCatalog;
  /** Resource for '/projects/\{projectName\}/environmentDefinitions' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/environmentDefinitions",
    projectName: string,
  ): EnvironmentsListEnvironmentDefinitionsByProject;
  /** Resource for '/projects/\{projectName\}/catalogs/\{catalogName\}/environmentDefinitions' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/catalogs/{catalogName}/environmentDefinitions",
    projectName: string,
    catalogName: string,
  ): EnvironmentsListEnvironmentDefinitionsByCatalog;
  /** Resource for '/projects/\{projectName\}/catalogs/\{catalogName\}/environmentDefinitions/\{definitionName\}' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/catalogs/{catalogName}/environmentDefinitions/{definitionName}",
    projectName: string,
    catalogName: string,
    definitionName: string,
  ): EnvironmentsGetEnvironmentDefinition;
  /** Resource for '/projects/\{projectName\}/environmentTypes' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/environmentTypes",
    projectName: string,
  ): EnvironmentsListEnvironmentTypes;
  /** Resource for '/projects/\{projectName\}/environmentTypes/\{environmentTypeName\}' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/environmentTypes/{environmentTypeName}",
    projectName: string,
    environmentTypeName: string,
  ): EnvironmentsGetEnvironmentTypes;
  /** Resource for '/projects/\{projectName\}/environmentTypes/\{environmentTypeName\}/users/\{userId\}/abilities' has methods for the following verbs: get */
  (
    path: "/projects/{projectName}/environmentTypes/{environmentTypeName}/users/{userId}/abilities",
    projectName: string,
    environmentTypeName: string,
    userId: string,
  ): EnvironmentsGetEnvironmentTypeAbilities;
}

export type AzureDeveloperDevCenterClient = Client & {
  path: Routes;
};
