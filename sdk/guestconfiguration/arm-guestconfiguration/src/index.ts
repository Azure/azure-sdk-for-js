// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { GuestConfigurationClient } from "./guestConfigurationClient.js";
export {
  Operation,
  OperationDisplay,
  OperationProperties,
  ErrorResponse,
  GuestConfigurationAssignment,
  GuestConfigurationAssignmentProperties,
  GuestConfigurationNavigation,
  KnownKind,
  Kind,
  KnownAssignmentType,
  AssignmentType,
  ConfigurationParameter,
  ConfigurationSetting,
  KnownConfigurationMode,
  ConfigurationMode,
  KnownActionAfterReboot,
  ActionAfterReboot,
  KnownComplianceStatus,
  ComplianceStatus,
  AssignmentReport,
  AssignmentInfo,
  ConfigurationInfo,
  VMInfo,
  KnownType,
  Type,
  AssignmentReportResource,
  AssignmentReportResourceComplianceReason,
  KnownProvisioningState,
  ProvisioningState,
  VmssvmInfo,
  SystemData,
  KnownCreatedByType,
  CreatedByType,
  ProxyResource,
  GuestConfigurationAssignmentReport,
  GuestConfigurationAssignmentReportProperties,
  AssignmentReportDetails,
  KnownVersions,
} from "./models/index.js";
export { GuestConfigurationClientOptionalParams } from "./api/index.js";
export {
  GuestConfigurationAssignmentReportsGetOptionalParams,
  GuestConfigurationAssignmentReportsListOptionalParams,
} from "./api/guestConfigurationAssignmentReports/index.js";
export {
  GuestConfigurationAssignmentReportsVmssGetOptionalParams,
  GuestConfigurationAssignmentReportsVmssListOptionalParams,
} from "./api/guestConfigurationAssignmentReportsVmss/index.js";
export {
  GuestConfigurationAssignmentsRGListOptionalParams,
  GuestConfigurationAssignmentsSubscriptionListOptionalParams,
  GuestConfigurationAssignmentsListOptionalParams,
  GuestConfigurationAssignmentsDeleteOptionalParams,
  GuestConfigurationAssignmentsCreateOrUpdateOptionalParams,
  GuestConfigurationAssignmentsGetOptionalParams,
} from "./api/guestConfigurationAssignments/index.js";
export {
  GuestConfigurationAssignmentsVmssListOptionalParams,
  GuestConfigurationAssignmentsVmssDeleteOptionalParams,
  GuestConfigurationAssignmentsVmssCreateOrUpdateOptionalParams,
  GuestConfigurationAssignmentsVmssGetOptionalParams,
} from "./api/guestConfigurationAssignmentsVmss/index.js";
export {
  GuestConfigurationConnectedVMwarevSphereAssignmentsListOptionalParams,
  GuestConfigurationConnectedVMwarevSphereAssignmentsDeleteOptionalParams,
  GuestConfigurationConnectedVMwarevSphereAssignmentsCreateOrUpdateOptionalParams,
  GuestConfigurationConnectedVMwarevSphereAssignmentsGetOptionalParams,
} from "./api/guestConfigurationConnectedVMwarevSphereAssignments/index.js";
export {
  GuestConfigurationConnectedVMwarevSphereAssignmentsReportsGetOptionalParams,
  GuestConfigurationConnectedVMwarevSphereAssignmentsReportsListOptionalParams,
} from "./api/guestConfigurationConnectedVMwarevSphereAssignmentsReports/index.js";
export {
  GuestConfigurationHcrpAssignmentReportsGetOptionalParams,
  GuestConfigurationHcrpAssignmentReportsListOptionalParams,
} from "./api/guestConfigurationHcrpAssignmentReports/index.js";
export {
  GuestConfigurationHcrpAssignmentsListOptionalParams,
  GuestConfigurationHcrpAssignmentsDeleteOptionalParams,
  GuestConfigurationHcrpAssignmentsCreateOrUpdateOptionalParams,
  GuestConfigurationHcrpAssignmentsGetOptionalParams,
} from "./api/guestConfigurationHcrpAssignments/index.js";
export { OperationsListOptionalParams } from "./api/operations/index.js";
export {
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
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds, AzureSupportedClouds };
