// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  dispatch,
  listRuns,
  $delete,
  list,
  disable,
  enable,
  get,
  createOrUpdate,
} from "../../../api/beta/routines/operations.js";
import {
  BetaRoutinesDispatchOptionalParams,
  BetaRoutinesListRunsOptionalParams,
  BetaRoutinesDeleteOptionalParams,
  BetaRoutinesListOptionalParams,
  BetaRoutinesDisableOptionalParams,
  BetaRoutinesEnableOptionalParams,
  BetaRoutinesGetOptionalParams,
  BetaRoutinesCreateOrUpdateOptionalParams,
} from "../../../api/beta/routines/options.js";
import { Routine, RoutineRun, DispatchRoutineResponse } from "../../../models/models.js";
import { PagedAsyncIterableIterator } from "../../../static-helpers/pagingHelpers.js";

/** Interface representing a BetaRoutines operations. */
export interface BetaRoutinesOperations {
  /** Queues an asynchronous dispatch for the specified routine. */
  dispatch: (
    routineName: string,
    options?: BetaRoutinesDispatchOptionalParams,
  ) => Promise<DispatchRoutineResponse>;
  /** Returns prior runs recorded for the specified routine. */
  listRuns: (
    routineName: string,
    options?: BetaRoutinesListRunsOptionalParams,
  ) => PagedAsyncIterableIterator<RoutineRun>;
  /** Deletes the specified routine. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (routineName: string, options?: BetaRoutinesDeleteOptionalParams) => Promise<void>;
  /** Returns the routines available in the current project. */
  list: (options?: BetaRoutinesListOptionalParams) => PagedAsyncIterableIterator<Routine>;
  /** Disables the specified routine so it no longer runs. */
  disable: (routineName: string, options?: BetaRoutinesDisableOptionalParams) => Promise<Routine>;
  /** Enables the specified routine so it can be dispatched. */
  enable: (routineName: string, options?: BetaRoutinesEnableOptionalParams) => Promise<Routine>;
  /** Retrieves the specified routine and its current configuration. */
  get: (routineName: string, options?: BetaRoutinesGetOptionalParams) => Promise<Routine>;
  /** Creates a new routine or replaces an existing routine with the supplied definition. */
  createOrUpdate: (
    routineName: string,
    options?: BetaRoutinesCreateOrUpdateOptionalParams,
  ) => Promise<Routine>;
}

function _getBetaRoutines(context: AIProjectContext) {
  return {
    dispatch: (routineName: string, options?: BetaRoutinesDispatchOptionalParams) =>
      dispatch(context, routineName, options),
    listRuns: (routineName: string, options?: BetaRoutinesListRunsOptionalParams) =>
      listRuns(context, routineName, options),
    delete: (routineName: string, options?: BetaRoutinesDeleteOptionalParams) =>
      $delete(context, routineName, options),
    list: (options?: BetaRoutinesListOptionalParams) => list(context, options),
    disable: (routineName: string, options?: BetaRoutinesDisableOptionalParams) =>
      disable(context, routineName, options),
    enable: (routineName: string, options?: BetaRoutinesEnableOptionalParams) =>
      enable(context, routineName, options),
    get: (routineName: string, options?: BetaRoutinesGetOptionalParams) =>
      get(context, routineName, options),
    createOrUpdate: (routineName: string, options?: BetaRoutinesCreateOrUpdateOptionalParams) =>
      createOrUpdate(context, routineName, options),
  };
}

export function _getBetaRoutinesOperations(context: AIProjectContext): BetaRoutinesOperations {
  return {
    ..._getBetaRoutines(context),
  };
}
