// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { PlatformValidationClient } from "./platformValidationClient.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  OperationStatusResult,
  ErrorDetail,
  ErrorAdditionalInfo,
  ErrorResponse,
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
  CloudValidation,
  CloudValidationProperties,
  ProvisioningState,
  CloudValidationOverallState,
  ManagedOnBehalfOfConfiguration,
  MoboBrokerResource,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  ResourceProvisioningState,
  CloudValidationUpdate,
  CloudValidationUpdateProperties,
  ValidationExecutionPlan,
  ValidationExecutionPlanProperties,
  ValidationExecutionPlanProvisioningState,
  ValidationExecutionPlanOverallState,
  ValidationExecutionPlanUpdate,
  ValidationExecutionPlanUpdateProperties,
  ExecutionPlanRun,
  ExecutionPlanRunProperties,
  ExecutionPlanRunStatus,
  TestRunSummary,
  TestRunOverallResult,
  ExecutionPlanRunProvisioningState,
  ProxyResource,
  ValidationTestRun,
  ValidationTestRunProperties,
  ValidationTestRunStatus,
  ValidationTestRunProvisioningState,
  ValidationTestPassDetails,
  ValidationTestFailureDetails,
  ValidationTest,
  ValidationTestProperties,
  CatalogAudience,
  ValidationTestOverallState,
  ValidationTestInput,
  ValidationTestInputDefinition,
  ValidationTestInputDataType,
  ValidationTestVersion,
  ValidationTestVersionProperties,
  ValidationTestCategory,
  ValidationTestCategoryProperties,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownProvisioningState,
  KnownCloudValidationOverallState,
  KnownCreatedByType,
  KnownResourceProvisioningState,
  KnownValidationExecutionPlanProvisioningState,
  KnownValidationExecutionPlanOverallState,
  KnownExecutionPlanRunStatus,
  KnownTestRunOverallResult,
  KnownExecutionPlanRunProvisioningState,
  KnownValidationTestRunStatus,
  KnownValidationTestRunProvisioningState,
  KnownCatalogAudience,
  KnownValidationTestOverallState,
  KnownValidationTestInputDataType,
  KnownVersions,
} from "./models/index.js";
export type { PlatformValidationClientOptionalParams } from "./api/index.js";
export type {
  CloudValidationsListBySubscriptionOptionalParams,
  CloudValidationsListByResourceGroupOptionalParams,
  CloudValidationsDeleteOptionalParams,
  CloudValidationsUpdateOptionalParams,
  CloudValidationsCreateOrUpdateOptionalParams,
  CloudValidationsGetOptionalParams,
} from "./api/cloudValidations/index.js";
export type {
  ExecutionPlanRunsListByExecutionPlanOptionalParams,
  ExecutionPlanRunsDeleteOptionalParams,
  ExecutionPlanRunsCreateOrUpdateOptionalParams,
  ExecutionPlanRunsGetOptionalParams,
} from "./api/executionPlanRuns/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type { OperationStatusGetOptionalParams } from "./api/operationStatus/index.js";
export type {
  ValidationExecutionPlansListByResourceGroupOptionalParams,
  ValidationExecutionPlansDeleteOptionalParams,
  ValidationExecutionPlansUpdateOptionalParams,
  ValidationExecutionPlansCreateOrUpdateOptionalParams,
  ValidationExecutionPlansGetOptionalParams,
} from "./api/validationExecutionPlans/index.js";
export type {
  ValidationTestCategoriesListBySubscriptionOptionalParams,
  ValidationTestCategoriesGetOptionalParams,
} from "./api/validationTestCategories/index.js";
export type {
  ValidationTestRunsListByExecutionPlanRunOptionalParams,
  ValidationTestRunsDeleteOptionalParams,
  ValidationTestRunsCreateOrUpdateOptionalParams,
  ValidationTestRunsGetOptionalParams,
} from "./api/validationTestRuns/index.js";
export type {
  ValidationTestsListBySubscriptionOptionalParams,
  ValidationTestsGetOptionalParams,
} from "./api/validationTests/index.js";
export type {
  ValidationTestVersionsListOptionalParams,
  ValidationTestVersionsGetOptionalParams,
} from "./api/validationTestVersions/index.js";
export type {
  CloudValidationsOperations,
  ExecutionPlanRunsOperations,
  OperationsOperations,
  OperationStatusOperations,
  ValidationExecutionPlansOperations,
  ValidationTestCategoriesOperations,
  ValidationTestRunsOperations,
  ValidationTestsOperations,
  ValidationTestVersionsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
