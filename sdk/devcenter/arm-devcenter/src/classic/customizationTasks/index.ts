// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext } from "../../api/devCenterContext.js";
import { getErrorDetails, listByCatalog, get } from "../../api/customizationTasks/operations.js";
import type {
  CustomizationTasksGetErrorDetailsOptionalParams,
  CustomizationTasksListByCatalogOptionalParams,
  CustomizationTasksGetOptionalParams,
} from "../../api/customizationTasks/options.js";
import type {
  CatalogResourceValidationErrorDetails,
  CustomizationTask,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a CustomizationTasks operations. */
export interface CustomizationTasksOperations {
  /** Gets Customization Task error details. */
  getErrorDetails: (
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    taskName: string,
    options?: CustomizationTasksGetErrorDetailsOptionalParams,
  ) => Promise<CatalogResourceValidationErrorDetails>;
  /** List Tasks in the catalog. */
  listByCatalog: (
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    options?: CustomizationTasksListByCatalogOptionalParams,
  ) => PagedAsyncIterableIterator<CustomizationTask>;
  /** Gets a Task from the catalog. */
  get: (
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    taskName: string,
    options?: CustomizationTasksGetOptionalParams,
  ) => Promise<CustomizationTask>;
}

function _getCustomizationTasks(context: DevCenterContext) {
  return {
    getErrorDetails: (
      resourceGroupName: string,
      devCenterName: string,
      catalogName: string,
      taskName: string,
      options?: CustomizationTasksGetErrorDetailsOptionalParams,
    ) => getErrorDetails(context, resourceGroupName, devCenterName, catalogName, taskName, options),
    listByCatalog: (
      resourceGroupName: string,
      devCenterName: string,
      catalogName: string,
      options?: CustomizationTasksListByCatalogOptionalParams,
    ) => listByCatalog(context, resourceGroupName, devCenterName, catalogName, options),
    get: (
      resourceGroupName: string,
      devCenterName: string,
      catalogName: string,
      taskName: string,
      options?: CustomizationTasksGetOptionalParams,
    ) => get(context, resourceGroupName, devCenterName, catalogName, taskName, options),
  };
}

export function _getCustomizationTasksOperations(
  context: DevCenterContext,
): CustomizationTasksOperations {
  return {
    ..._getCustomizationTasks(context),
  };
}
