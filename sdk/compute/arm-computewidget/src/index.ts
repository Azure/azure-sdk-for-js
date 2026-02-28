// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ComputeClient } from "./computeClient.js";
export { restorePoller, RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  Operation,
  OperationDisplay,
  KnownOrigin,
  Origin,
  KnownActionType,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  TrackedResource,
  Resource,
  SystemData,
  KnownCreatedByType,
  CreatedByType,
} from "./models/index.js";
export {
  GalleryEmployee,
  GalleryEmployeeProperties,
  KnownGalleryProvisioningState,
  GalleryProvisioningState,
  GalleryEmployeeUpdate,
  GalleryEmployeeUpdateProperties,
  GalleryMoveRequest,
  GalleryMoveResponse,
} from "./models/gallery/index.js";
export { ComputeClientOptionalParams } from "./api/index.js";
export {
  EmployeesCheckExistenceOptionalParams,
  EmployeesMoveOptionalParams,
  EmployeesListBySubscriptionOptionalParams,
  EmployeesListByResourceGroupOptionalParams,
  EmployeesDeleteOptionalParams,
  EmployeesUpdateOptionalParams,
  EmployeesCreateOrUpdateOptionalParams,
  EmployeesGetOptionalParams,
} from "./api/employees/index.js";
export { OperationsListOptionalParams } from "./api/operations/index.js";
export { EmployeesOperations, OperationsOperations } from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds, AzureSupportedClouds };
