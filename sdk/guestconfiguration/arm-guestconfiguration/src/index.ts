// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { GuestConfigurationClient } from "./guestConfigurationClient.js";
export type {
  Operation,
  OperationDisplay,
  OperationProperties,
  ErrorResponse,
  GuestConfigurationAssignment,
  GuestConfigurationAssignmentProperties,
  GuestConfigurationNavigation,
  Kind,
  AssignmentType,
  ConfigurationParameter,
  ConfigurationSetting,
  ConfigurationMode,
  ActionAfterReboot,
  ComplianceStatus,
  AssignmentReport,
  AssignmentInfo,
  ConfigurationInfo,
  VMInfo,
  Type,
  AssignmentReportResource,
  AssignmentReportResourceComplianceReason,
  ProvisioningState,
  VmssvmInfo,
  SystemData,
  CreatedByType,
  ProxyResource,
  GuestConfigurationAssignmentReportList,
  GuestConfigurationAssignmentReport,
  GuestConfigurationAssignmentReportProperties,
  AssignmentReportDetails,
} from "./models/index.js";
export {
  KnownKind,
  KnownAssignmentType,
  KnownConfigurationMode,
  KnownActionAfterReboot,
  KnownComplianceStatus,
  KnownType,
  KnownProvisioningState,
  KnownCreatedByType,
  KnownVersions,
} from "./models/index.js";
export type { GuestConfigurationClientOptionalParams } from "./api/index.js";
export type {
  GuestConfigurationAssignmentReportsGetOptionalParams,
  GuestConfigurationAssignmentReportsListOptionalParams,
} from "./api/guestConfigurationAssignmentReports/index.js";
export type {
  GuestConfigurationAssignmentReportsVmssGetOptionalParams,
  GuestConfigurationAssignmentReportsVmssListOptionalParams,
} from "./api/guestConfigurationAssignmentReportsVmss/index.js";
export type {
  GuestConfigurationAssignmentsListRGListOptionalParams,
  GuestConfigurationAssignmentsListSubscriptionListOptionalParams,
  GuestConfigurationAssignmentsListOptionalParams,
  GuestConfigurationAssignmentsDeleteOptionalParams,
  GuestConfigurationAssignmentsCreateOrUpdateOptionalParams,
  GuestConfigurationAssignmentsGetOptionalParams,
} from "./api/guestConfigurationAssignments/index.js";
export type {
  GuestConfigurationAssignmentsVmssListOptionalParams,
  GuestConfigurationAssignmentsVmssDeleteOptionalParams,
  GuestConfigurationAssignmentsVmssCreateOrUpdateOptionalParams,
  GuestConfigurationAssignmentsVmssGetOptionalParams,
} from "./api/guestConfigurationAssignmentsVmss/index.js";
export type {
  GuestConfigurationConnectedVMwarevSphereAssignmentsListOptionalParams,
  GuestConfigurationConnectedVMwarevSphereAssignmentsDeleteOptionalParams,
  GuestConfigurationConnectedVMwarevSphereAssignmentsCreateOrUpdateOptionalParams,
  GuestConfigurationConnectedVMwarevSphereAssignmentsGetOptionalParams,
} from "./api/guestConfigurationConnectedVMwarevSphereAssignments/index.js";
export type {
  GuestConfigurationConnectedVMwarevSphereAssignmentsReportsGetOptionalParams,
  GuestConfigurationConnectedVMwarevSphereAssignmentsReportsListOptionalParams,
} from "./api/guestConfigurationConnectedVMwarevSphereAssignmentsReports/index.js";
export type {
  GuestConfigurationHcrpAssignmentReportsGetOptionalParams,
  GuestConfigurationHcrpAssignmentReportsListOptionalParams,
} from "./api/guestConfigurationHcrpAssignmentReports/index.js";
export type {
  GuestConfigurationHcrpAssignmentsListOptionalParams,
  GuestConfigurationHcrpAssignmentsDeleteOptionalParams,
  GuestConfigurationHcrpAssignmentsCreateOrUpdateOptionalParams,
  GuestConfigurationHcrpAssignmentsGetOptionalParams,
} from "./api/guestConfigurationHcrpAssignments/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  GuestConfigurationAssignmentReportsOperations,
  GuestConfigurationAssignmentReportsVmssOperations,
  GuestConfigurationAssignmentsOperations,
  GuestConfigurationAssignmentsVmssOperations,
  GuestConfigurationConnectedVMwarevSphereAssignmentsOperations,
  GuestConfigurationConnectedVMwarevSphereAssignmentsReportsOperations,
  GuestConfigurationHcrpAssignmentReportsOperations,
  GuestConfigurationHcrpAssignmentsOperations,
  OperationsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
