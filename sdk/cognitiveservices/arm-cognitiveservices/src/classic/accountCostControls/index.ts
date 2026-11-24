// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  checkExistence,
  get,
} from "../../api/accountCostControls/operations.js";
import type {
  AccountCostControlsListOptionalParams,
  AccountCostControlsDeleteOptionalParams,
  AccountCostControlsUpdateOptionalParams,
  AccountCostControlsCreateOrUpdateOptionalParams,
  AccountCostControlsCheckExistenceOptionalParams,
  AccountCostControlsGetOptionalParams,
} from "../../api/accountCostControls/options.js";
import type { AccountCostControl, CostControlPatch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AccountCostControls operations. */
export interface AccountCostControlsOperations {
  /** Lists account-owned cost controls. */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: AccountCostControlsListOptionalParams,
  ) => PagedAsyncIterableIterator<AccountCostControl>;
  /** Deletes an account-owned cost control. */
  delete: (
    resourceGroupName: string,
    accountName: string,
    costControlName: string,
    options?: AccountCostControlsDeleteOptionalParams,
  ) => Promise<void>;
  /**
   * Updates an account-owned cost control. Omitting properties preserves all existing cost control properties; setting properties to null or an empty object ({}) clears them all.
   * A non-empty properties object updates selected fields, preserving omitted fields; a successful update that leaves the cost control unchanged retains its entity tag.
   * The complete merged result may contain at most one notification, including disabled notifications, and one Block action.
   * Exceeding either limit returns HTTP 400 without changing the stored definition.
   */
  update: (
    resourceGroupName: string,
    accountName: string,
    costControlName: string,
    properties: CostControlPatch,
    options?: AccountCostControlsUpdateOptionalParams,
  ) => Promise<AccountCostControl>;
  /**
   * Creates or replaces an account-owned cost control.
   * The definition may contain at most one notification, including disabled notifications, and one Block action.
   * Exceeding either limit returns HTTP 400 without persisting the request.
   */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    costControlName: string,
    resource: AccountCostControl,
    options?: AccountCostControlsCreateOrUpdateOptionalParams,
  ) => Promise<AccountCostControl>;
  /** Checks whether an account-owned cost control exists without returning its body. */
  checkExistence: (
    resourceGroupName: string,
    accountName: string,
    costControlName: string,
    options?: AccountCostControlsCheckExistenceOptionalParams,
  ) => Promise<void>;
  /** Gets an account-owned cost control and its representation entity tag. */
  get: (
    resourceGroupName: string,
    accountName: string,
    costControlName: string,
    options?: AccountCostControlsGetOptionalParams,
  ) => Promise<AccountCostControl>;
}

function _getAccountCostControls(context: CognitiveServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: AccountCostControlsListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      costControlName: string,
      options?: AccountCostControlsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, costControlName, options),
    update: (
      resourceGroupName: string,
      accountName: string,
      costControlName: string,
      properties: CostControlPatch,
      options?: AccountCostControlsUpdateOptionalParams,
    ) => update(context, resourceGroupName, accountName, costControlName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      costControlName: string,
      resource: AccountCostControl,
      options?: AccountCostControlsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, accountName, costControlName, resource, options),
    checkExistence: (
      resourceGroupName: string,
      accountName: string,
      costControlName: string,
      options?: AccountCostControlsCheckExistenceOptionalParams,
    ) => checkExistence(context, resourceGroupName, accountName, costControlName, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      costControlName: string,
      options?: AccountCostControlsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, costControlName, options),
  };
}

export function _getAccountCostControlsOperations(
  context: CognitiveServicesManagementContext,
): AccountCostControlsOperations {
  return {
    ..._getAccountCostControls(context),
  };
}
