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
import type {
  BetaRoutinesDispatchOptionalParams,
  BetaRoutinesListRunsOptionalParams,
  BetaRoutinesDeleteOptionalParams,
  BetaRoutinesListOptionalParams,
  BetaRoutinesDisableOptionalParams,
  BetaRoutinesEnableOptionalParams,
  BetaRoutinesGetOptionalParams,
  BetaRoutinesCreateOrUpdateOptionalParams,
} from "../../../api/beta/routines/options.js";
import {
  RoutineTriggerUnion,
  RoutineActionUnion,
  Routine,
  RoutineRun,
  DispatchRoutineResponse,
} from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";

/** Interface representing a BetaRoutines operations. */
export interface BetaRoutinesOperations {
  /** Queue an asynchronous routine dispatch. */
  dispatch: (
    routineName: string,
    options?: BetaRoutinesDispatchOptionalParams,
  ) => Promise<DispatchRoutineResponse>;
  /** List prior runs for a routine. */
  listRuns: (
    routineName: string,
    options?: BetaRoutinesListRunsOptionalParams,
  ) => PagedAsyncIterableIterator<RoutineRun>;
  /** Delete a routine. */
  delete: (routineName: string, options?: BetaRoutinesDeleteOptionalParams) => Promise<void>;
  /** List routines. */
  list: (options?: BetaRoutinesListOptionalParams) => PagedAsyncIterableIterator<Routine>;
  /** Disable a routine. */
  disable: (routineName: string, options?: BetaRoutinesDisableOptionalParams) => Promise<Routine>;
  /** Enable a routine. */
  enable: (routineName: string, options?: BetaRoutinesEnableOptionalParams) => Promise<Routine>;
  /** Retrieve a routine. */
  get: (routineName: string, options?: BetaRoutinesGetOptionalParams) => Promise<Routine>;
  /** Create or update a routine. */
  createOrUpdate: (
    routineName: string,
    triggers: Record<string, RoutineTriggerUnion>,
    action: RoutineActionUnion,
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
    createOrUpdate: (
      routineName: string,
      triggers: Record<string, RoutineTriggerUnion>,
      action: RoutineActionUnion,
      options?: BetaRoutinesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, routineName, triggers, action, options),
  };
}

export function _getBetaRoutinesOperations(context: AIProjectContext): BetaRoutinesOperations {
  return {
    ..._getBetaRoutines(context),
  };
}
