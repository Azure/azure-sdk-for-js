// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ProgramEnrollmentClient } from "./programEnrollmentClient.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  EduEnrollment,
  EduEnrollmentProperties,
  ProvisioningState,
  DomainGroup,
  DomainGroupState,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  EduEnrollmentPatch,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownProvisioningState,
  KnownDomainGroupState,
  KnownCreatedByType,
  KnownVersions,
} from "./models/index.js";
export type { ProgramEnrollmentClientOptionalParams } from "./api/index.js";
export type {
  EduEnrollmentsListBySubscriptionOptionalParams,
  EduEnrollmentsListByResourceGroupOptionalParams,
  EduEnrollmentsDeleteOptionalParams,
  EduEnrollmentsUpdateOptionalParams,
  EduEnrollmentsCreateOrUpdateOptionalParams,
  EduEnrollmentsGetOptionalParams,
} from "./api/eduEnrollments/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type { EduEnrollmentsOperations, OperationsOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
