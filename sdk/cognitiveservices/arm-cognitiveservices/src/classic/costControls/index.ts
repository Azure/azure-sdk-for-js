// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import { list, $delete, update, createOrUpdate, get } from "../../api/costControls/operations.js";
import type {
  CostControlsListOptionalParams,
  CostControlsDeleteOptionalParams,
  CostControlsUpdateOptionalParams,
  CostControlsCreateOrUpdateOptionalParams,
  CostControlsGetOptionalParams,
} from "../../api/costControls/options.js";
import type { CostControl, CostControlPatch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a CostControls operations. */
export interface CostControlsOperations {
  /** Lists the cost controls owned by an account. */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: CostControlsListOptionalParams,
  ) => PagedAsyncIterableIterator<CostControl>;
  /** Deletes a cost control. */
  delete: (
    resourceGroupName: string,
    accountName: string,
    costControlName: string,
    options?: CostControlsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates selected properties of a cost control. */
  update: (
    resourceGroupName: string,
    accountName: string,
    costControlName: string,
    properties: CostControlPatch,
    options?: CostControlsUpdateOptionalParams,
  ) => Promise<CostControl>;
  /** Creates or replaces a cost control. */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    costControlName: string,
    resource: CostControl,
    options?: CostControlsCreateOrUpdateOptionalParams,
  ) => Promise<CostControl>;
  /** Gets a cost control. */
  get: (
    resourceGroupName: string,
    accountName: string,
    costControlName: string,
    options?: CostControlsGetOptionalParams,
  ) => Promise<CostControl>;
}

function _getCostControls(context: CognitiveServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: CostControlsListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      costControlName: string,
      options?: CostControlsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, costControlName, options),
    update: (
      resourceGroupName: string,
      accountName: string,
      costControlName: string,
      properties: CostControlPatch,
      options?: CostControlsUpdateOptionalParams,
    ) => update(context, resourceGroupName, accountName, costControlName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      costControlName: string,
      resource: CostControl,
      options?: CostControlsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, accountName, costControlName, resource, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      costControlName: string,
      options?: CostControlsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, costControlName, options),
  };
}

export function _getCostControlsOperations(
  context: CognitiveServicesManagementContext,
): CostControlsOperations {
  return {
    ..._getCostControls(context),
  };
}
