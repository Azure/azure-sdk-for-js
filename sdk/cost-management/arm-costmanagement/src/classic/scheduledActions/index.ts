// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CostManagementContext } from "../../api/costManagementContext.js";
import {
  checkNameAvailabilityByScope,
  checkNameAvailability,
  runByScope,
  listByScope,
  deleteByScope,
  createOrUpdateByScope,
  getByScope,
  run,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/scheduledActions/operations.js";
import type {
  ScheduledActionsCheckNameAvailabilityByScopeOptionalParams,
  ScheduledActionsCheckNameAvailabilityOptionalParams,
  ScheduledActionsRunByScopeOptionalParams,
  ScheduledActionsListByScopeOptionalParams,
  ScheduledActionsDeleteByScopeOptionalParams,
  ScheduledActionsCreateOrUpdateByScopeOptionalParams,
  ScheduledActionsGetByScopeOptionalParams,
  ScheduledActionsRunOptionalParams,
  ScheduledActionsListOptionalParams,
  ScheduledActionsDeleteOptionalParams,
  ScheduledActionsCreateOrUpdateOptionalParams,
  ScheduledActionsGetOptionalParams,
} from "../../api/scheduledActions/options.js";
import type {
  ScheduledAction,
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ScheduledActions operations. */
export interface ScheduledActionsOperations {
  /** Checks availability and correctness of the name for a scheduled action within the given scope. */
  checkNameAvailabilityByScope: (
    scope: string,
    checkNameAvailabilityRequest: CheckNameAvailabilityRequest,
    options?: ScheduledActionsCheckNameAvailabilityByScopeOptionalParams,
  ) => Promise<CheckNameAvailabilityResponse>;
  /** Checks availability and correctness of the name for a scheduled action. */
  checkNameAvailability: (
    checkNameAvailabilityRequest: CheckNameAvailabilityRequest,
    options?: ScheduledActionsCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityResponse>;
  /** Runs a shared scheduled action within the given scope. */
  runByScope: (
    scope: string,
    name: string,
    options?: ScheduledActionsRunByScopeOptionalParams,
  ) => Promise<void>;
  /** List all shared scheduled actions within the given scope. */
  listByScope: (
    scope: string,
    options?: ScheduledActionsListByScopeOptionalParams,
  ) => PagedAsyncIterableIterator<ScheduledAction>;
  /** Delete a scheduled action within the given scope. */
  deleteByScope: (
    scope: string,
    name: string,
    options?: ScheduledActionsDeleteByScopeOptionalParams,
  ) => Promise<void>;
  /** Create or update a shared scheduled action within the given scope. */
  createOrUpdateByScope: (
    scope: string,
    name: string,
    scheduledAction: ScheduledAction,
    options?: ScheduledActionsCreateOrUpdateByScopeOptionalParams,
  ) => Promise<ScheduledAction>;
  /** Get the shared scheduled action from the given scope by name. */
  getByScope: (
    scope: string,
    name: string,
    options?: ScheduledActionsGetByScopeOptionalParams,
  ) => Promise<ScheduledAction>;
  /** Processes a private scheduled action. */
  run: (name: string, options?: ScheduledActionsRunOptionalParams) => Promise<void>;
  /** List all private scheduled actions. */
  list: (
    options?: ScheduledActionsListOptionalParams,
  ) => PagedAsyncIterableIterator<ScheduledAction>;
  /** Delete a private scheduled action. */
  delete: (name: string, options?: ScheduledActionsDeleteOptionalParams) => Promise<void>;
  /** Create or update a private scheduled action. */
  createOrUpdate: (
    name: string,
    scheduledAction: ScheduledAction,
    options?: ScheduledActionsCreateOrUpdateOptionalParams,
  ) => Promise<ScheduledAction>;
  /** Get the private scheduled action by name. */
  get: (name: string, options?: ScheduledActionsGetOptionalParams) => Promise<ScheduledAction>;
}

function _getScheduledActions(context: CostManagementContext) {
  return {
    checkNameAvailabilityByScope: (
      scope: string,
      checkNameAvailabilityRequest: CheckNameAvailabilityRequest,
      options?: ScheduledActionsCheckNameAvailabilityByScopeOptionalParams,
    ) => checkNameAvailabilityByScope(context, scope, checkNameAvailabilityRequest, options),
    checkNameAvailability: (
      checkNameAvailabilityRequest: CheckNameAvailabilityRequest,
      options?: ScheduledActionsCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, checkNameAvailabilityRequest, options),
    runByScope: (scope: string, name: string, options?: ScheduledActionsRunByScopeOptionalParams) =>
      runByScope(context, scope, name, options),
    listByScope: (scope: string, options?: ScheduledActionsListByScopeOptionalParams) =>
      listByScope(context, scope, options),
    deleteByScope: (
      scope: string,
      name: string,
      options?: ScheduledActionsDeleteByScopeOptionalParams,
    ) => deleteByScope(context, scope, name, options),
    createOrUpdateByScope: (
      scope: string,
      name: string,
      scheduledAction: ScheduledAction,
      options?: ScheduledActionsCreateOrUpdateByScopeOptionalParams,
    ) => createOrUpdateByScope(context, scope, name, scheduledAction, options),
    getByScope: (scope: string, name: string, options?: ScheduledActionsGetByScopeOptionalParams) =>
      getByScope(context, scope, name, options),
    run: (name: string, options?: ScheduledActionsRunOptionalParams) => run(context, name, options),
    list: (options?: ScheduledActionsListOptionalParams) => list(context, options),
    delete: (name: string, options?: ScheduledActionsDeleteOptionalParams) =>
      $delete(context, name, options),
    createOrUpdate: (
      name: string,
      scheduledAction: ScheduledAction,
      options?: ScheduledActionsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, name, scheduledAction, options),
    get: (name: string, options?: ScheduledActionsGetOptionalParams) => get(context, name, options),
  };
}

export function _getScheduledActionsOperations(
  context: CostManagementContext,
): ScheduledActionsOperations {
  return {
    ..._getScheduledActions(context),
  };
}
