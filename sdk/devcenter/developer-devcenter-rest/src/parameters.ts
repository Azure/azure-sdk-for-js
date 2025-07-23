// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RequestParameters } from "@azure-rest/core-client";
import type {
  PoolAlignBody,
  DevBox,
  UserActiveHoursConfiguration,
  ListCustomizationGroupsIncludeProperty,
  CustomizationGroup,
  CustomizationTaskList,
  DevBoxAddOn,
  Environment,
  EnvironmentPatchProperties,
} from "./models.js";

export type DevCenterListProjectsParameters = RequestParameters;
export type DevCenterGetProjectParameters = RequestParameters;

/** This is the wrapper object for the parameter `select` with explode set to true and style set to form. */
export interface DevCenterListApprovalsSelectQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

export interface DevCenterListApprovalsQueryParamProperties {
  /** The number of result items to return. */
  top?: number;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
  /** Select the specified fields to be included in the response. */
  select?: DevCenterListApprovalsSelectQueryParam;
}

export interface DevCenterListApprovalsQueryParam {
  queryParameters?: DevCenterListApprovalsQueryParamProperties;
}

export type DevCenterListApprovalsParameters =
  DevCenterListApprovalsQueryParam & RequestParameters;
export type DevCenterGetProjectAbilitiesParameters = RequestParameters;
export type OperationStatusesGetParameters = RequestParameters;
export type DevBoxesListPoolsParameters = RequestParameters;
export type DevBoxesGetPoolParameters = RequestParameters;

export interface DevBoxesAlignPoolBodyParam {
  body: PoolAlignBody;
}

export type DevBoxesAlignPoolParameters = DevBoxesAlignPoolBodyParam &
  RequestParameters;
export type DevBoxesListAllDevBoxesParameters = RequestParameters;
export type DevBoxesListAllDevBoxesByUserParameters = RequestParameters;
export type DevBoxesListSchedulesByPoolParameters = RequestParameters;
export type DevBoxesGetScheduleByPoolParameters = RequestParameters;
export type DevBoxesListSchedulesByProjectParameters = RequestParameters;
export type DevBoxesListDevBoxesByUserParameters = RequestParameters;
export type DevBoxesGetDevBoxByUserParameters = RequestParameters;

export interface DevBoxesCreateDevBoxBodyParam {
  /** Represents the body request of a Dev Box creation. Dev Box Pool name is required. Optionally set the owner of the Dev Box as local administrator */
  body: DevBox;
}

export type DevBoxesCreateDevBoxParameters = DevBoxesCreateDevBoxBodyParam &
  RequestParameters;
export type DevBoxesDeleteDevBoxParameters = RequestParameters;
export type DevBoxesApproveDevBoxParameters = RequestParameters;
export type DevBoxesStartDevBoxParameters = RequestParameters;

export interface DevBoxesStopDevBoxQueryParamProperties {
  /** Optional parameter to hibernate the dev box. */
  hibernate?: boolean;
}

export interface DevBoxesStopDevBoxQueryParam {
  queryParameters?: DevBoxesStopDevBoxQueryParamProperties;
}

export type DevBoxesStopDevBoxParameters = DevBoxesStopDevBoxQueryParam &
  RequestParameters;
export type DevBoxesRestartDevBoxParameters = RequestParameters;

export interface DevBoxesAlignDevBoxBodyParam {
  body: PoolAlignBody;
}

export type DevBoxesAlignDevBoxParameters = DevBoxesAlignDevBoxBodyParam &
  RequestParameters;
export type DevBoxesRepairDevBoxParameters = RequestParameters;

export interface DevBoxesSetActiveHoursBodyParam {
  /** Manual user set active hours configuration. */
  body: UserActiveHoursConfiguration;
}

export type DevBoxesSetActiveHoursParameters = DevBoxesSetActiveHoursBodyParam &
  RequestParameters;

export interface DevBoxesListCustomizationGroupsQueryParamProperties {
  /**
   * Optional query parameter to specify what properties should be included in the response.
   *
   * Possible values: "tasks"
   */
  include?: ListCustomizationGroupsIncludeProperty;
}

export interface DevBoxesListCustomizationGroupsQueryParam {
  queryParameters?: DevBoxesListCustomizationGroupsQueryParamProperties;
}

export type DevBoxesListCustomizationGroupsParameters =
  DevBoxesListCustomizationGroupsQueryParam & RequestParameters;
export type DevBoxesGetCustomizationGroupParameters = RequestParameters;

export interface DevBoxesCreateCustomizationGroupBodyParam {
  /** Represents the body request of a Dev Box creation. Dev Box Pool name is required. Optionally set the owner of the Dev Box as local administrator */
  body: CustomizationGroup;
}

export type DevBoxesCreateCustomizationGroupParameters =
  DevBoxesCreateCustomizationGroupBodyParam & RequestParameters;
export type DevBoxesGetCustomizationTaskLogParameters = RequestParameters;
export type DevBoxesListCustomizationTaskDefinitionsByProjectParameters =
  RequestParameters;
export type DevBoxesGetCustomizationTaskDefinitionsParameters =
  RequestParameters;

export interface DevBoxesValidateCustomizationTasksActionBodyParam {
  /** Customization tasks to validate. */
  body: CustomizationTaskList;
}

export type DevBoxesValidateCustomizationTasksActionParameters =
  DevBoxesValidateCustomizationTasksActionBodyParam & RequestParameters;
export type DevBoxesGetRemoteConnectionParameters = RequestParameters;
export type DevBoxesListActionsParameters = RequestParameters;
export type DevBoxesGetActionParameters = RequestParameters;
export type DevBoxesSkipActionParameters = RequestParameters;

export interface DevBoxesDelayActionQueryParamProperties {
  /** The time to delay the Dev Box action or actions until, in RFC3339 format. */
  until: Date | string;
}

export interface DevBoxesDelayActionQueryParam {
  queryParameters: DevBoxesDelayActionQueryParamProperties;
}

export type DevBoxesDelayActionParameters = DevBoxesDelayActionQueryParam &
  RequestParameters;

export interface DevBoxesDelayActionsQueryParamProperties {
  /** The time to delay the Dev Box action or actions until, in RFC3339 format. */
  until: Date | string;
}

export interface DevBoxesDelayActionsQueryParam {
  queryParameters: DevBoxesDelayActionsQueryParamProperties;
}

export type DevBoxesDelayActionsParameters = DevBoxesDelayActionsQueryParam &
  RequestParameters;
export type DevBoxesListOperationsParameters = RequestParameters;
export type DevBoxesGetOperationParameters = RequestParameters;
export type DevBoxesGetImagingTaskLogParameters = RequestParameters;
export type DevBoxesListSnapshotsParameters = RequestParameters;
export type DevBoxesGetSnapshotParameters = RequestParameters;

export interface DevBoxesRestoreSnapshotQueryParamProperties {
  /** Required parameter that specifies the snapshot id to use for the restore operation. */
  snapshotId: string;
}

export interface DevBoxesRestoreSnapshotQueryParam {
  queryParameters: DevBoxesRestoreSnapshotQueryParamProperties;
}

export type DevBoxesRestoreSnapshotParameters =
  DevBoxesRestoreSnapshotQueryParam & RequestParameters;
export type DevBoxesCaptureSnapshotParameters = RequestParameters;
export type DevBoxesListDevBoxAddonsParameters = RequestParameters;
export type DevBoxesGetDevBoxAddonParameters = RequestParameters;

export interface DevBoxesCreateOrReplaceDevBoxAddOnBodyParam {
  /** Represents the body request of a Dev Box addon creation. */
  body: DevBoxAddOn;
}

export type DevBoxesCreateOrReplaceDevBoxAddOnParameters =
  DevBoxesCreateOrReplaceDevBoxAddOnBodyParam & RequestParameters;
export type DevBoxesDeleteDevBoxAddOnParameters = RequestParameters;
export type DevBoxesEnableDevBoxAddOnParameters = RequestParameters;
export type DevBoxesDisableDevBoxAddOnParameters = RequestParameters;
export type EnvironmentsListEnvironmentsParameters = RequestParameters;
export type EnvironmentsListEnvironmentsByUserParameters = RequestParameters;
export type EnvironmentsGetEnvironmentByUserParameters = RequestParameters;

export interface EnvironmentsCreateOrReplaceEnvironmentBodyParam {
  /** Represents an environment. */
  body: Environment;
}

export type EnvironmentsCreateOrReplaceEnvironmentParameters =
  EnvironmentsCreateOrReplaceEnvironmentBodyParam & RequestParameters;
/** Represents an environment. */
export type EnvironmentPatchPropertiesResourceMergeAndPatch =
  Partial<EnvironmentPatchProperties>;

export interface EnvironmentsPatchEnvironmentBodyParam {
  /** Represents an environment. */
  body: EnvironmentPatchPropertiesResourceMergeAndPatch;
}

export interface EnvironmentsPatchEnvironmentMediaTypesParam {
  /** Set consumer to JSON merge patch. */
  contentType: "application/merge-patch+json";
}

export type EnvironmentsPatchEnvironmentParameters =
  EnvironmentsPatchEnvironmentMediaTypesParam &
    EnvironmentsPatchEnvironmentBodyParam &
    RequestParameters;

export interface EnvironmentsDeleteEnvironmentQueryParamProperties {
  /** The query option to force environment deletion even if the environment definition does not exist. This is a best-effort delete, and anything custom that forces resource creation beyond the associated resource group may not be deleted. */
  force?: boolean;
}

export interface EnvironmentsDeleteEnvironmentQueryParam {
  queryParameters?: EnvironmentsDeleteEnvironmentQueryParamProperties;
}

export type EnvironmentsDeleteEnvironmentParameters =
  EnvironmentsDeleteEnvironmentQueryParam & RequestParameters;
export type EnvironmentsGetOutputsParameters = RequestParameters;
export type EnvironmentsListOperationsParameters = RequestParameters;
export type EnvironmentsGetOperationParameters = RequestParameters;
export type EnvironmentsGetLogsByOperationParameters = RequestParameters;
export type EnvironmentsListActionsParameters = RequestParameters;
export type EnvironmentsGetActionParameters = RequestParameters;
export type EnvironmentsSkipActionParameters = RequestParameters;

export interface EnvironmentsDelayActionQueryParamProperties {
  /** The time to delay the Environment action until, in RFC3339 format. */
  until: Date | string;
}

export interface EnvironmentsDelayActionQueryParam {
  queryParameters: EnvironmentsDelayActionQueryParamProperties;
}

export type EnvironmentsDelayActionParameters =
  EnvironmentsDelayActionQueryParam & RequestParameters;
export type EnvironmentsListCatalogsByProjectParameters = RequestParameters;
export type EnvironmentsGetCatalogParameters = RequestParameters;
export type EnvironmentsListEnvironmentDefinitionsByProjectParameters =
  RequestParameters;
export type EnvironmentsListEnvironmentDefinitionsByCatalogParameters =
  RequestParameters;
export type EnvironmentsGetEnvironmentDefinitionParameters = RequestParameters;
export type EnvironmentsListEnvironmentTypesParameters = RequestParameters;
export type EnvironmentsGetEnvironmentTypesParameters = RequestParameters;

export interface EnvironmentsGetEnvironmentTypeAbilitiesQueryParamProperties {
  /** The maximum number of resources to return from the operation. Example: 'top=10'. */
  top?: number;
}

export interface EnvironmentsGetEnvironmentTypeAbilitiesQueryParam {
  queryParameters?: EnvironmentsGetEnvironmentTypeAbilitiesQueryParamProperties;
}

export type EnvironmentsGetEnvironmentTypeAbilitiesParameters =
  EnvironmentsGetEnvironmentTypeAbilitiesQueryParam & RequestParameters;
