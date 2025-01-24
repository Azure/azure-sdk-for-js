// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ContosoClient } from "./contosoClient.js";
export { restorePoller, RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  Employee,
  EmployeeProperties,
  KnownProvisioningState,
  ProvisioningState,
  TrackedResource,
  Resource,
  SystemData,
  KnownCreatedByType,
  CreatedByType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  Operation,
  OperationDisplay,
  KnownOrigin,
  Origin,
  KnownActionType,
  ActionType,
  KnownVersions,
} from "./models/index.js";
export {
  ContosoClientOptionalParams,
  EmployeesListBySubscriptionOptionalParams,
  EmployeesListByResourceGroupOptionalParams,
  EmployeesDeleteOptionalParams,
  EmployeesUpdateOptionalParams,
  EmployeesCreateOrUpdateOptionalParams,
  EmployeesGetOptionalParams,
  OperationsListOptionalParams,
} from "./api/index.js";
export { EmployeesOperations, OperationsOperations } from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
