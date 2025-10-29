// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedisManagementContext } from "../../api/redisManagementContext.js";
import {
  listByRedisResource,
  $delete,
  createOrUpdate,
  get,
} from "../../api/patchSchedules/operations.js";
import type {
  PatchSchedulesListByRedisResourceOptionalParams,
  PatchSchedulesDeleteOptionalParams,
  PatchSchedulesCreateOrUpdateOptionalParams,
  PatchSchedulesGetOptionalParams,
} from "../../api/patchSchedules/options.js";
import type { RedisPatchSchedule, DefaultName } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PatchSchedules operations. */
export interface PatchSchedulesOperations {
  /** Gets all patch schedules in the specified redis cache (there is only one). */
  listByRedisResource: (
    resourceGroupName: string,
    cacheName: string,
    options?: PatchSchedulesListByRedisResourceOptionalParams,
  ) => PagedAsyncIterableIterator<RedisPatchSchedule>;
  /** Deletes the patching schedule of a redis cache. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    name: string,
    defaultParam: DefaultName,
    options?: PatchSchedulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or replace the patching schedule for Redis cache. */
  createOrUpdate: (
    resourceGroupName: string,
    name: string,
    defaultParam: DefaultName,
    parameters: RedisPatchSchedule,
    options?: PatchSchedulesCreateOrUpdateOptionalParams,
  ) => Promise<RedisPatchSchedule>;
  /** Gets the patching schedule of a redis cache. */
  get: (
    resourceGroupName: string,
    name: string,
    defaultParam: DefaultName,
    options?: PatchSchedulesGetOptionalParams,
  ) => Promise<RedisPatchSchedule>;
}

function _getPatchSchedules(context: RedisManagementContext) {
  return {
    listByRedisResource: (
      resourceGroupName: string,
      cacheName: string,
      options?: PatchSchedulesListByRedisResourceOptionalParams,
    ) => listByRedisResource(context, resourceGroupName, cacheName, options),
    delete: (
      resourceGroupName: string,
      name: string,
      defaultParam: DefaultName,
      options?: PatchSchedulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, name, defaultParam, options),
    createOrUpdate: (
      resourceGroupName: string,
      name: string,
      defaultParam: DefaultName,
      parameters: RedisPatchSchedule,
      options?: PatchSchedulesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, name, defaultParam, parameters, options),
    get: (
      resourceGroupName: string,
      name: string,
      defaultParam: DefaultName,
      options?: PatchSchedulesGetOptionalParams,
    ) => get(context, resourceGroupName, name, defaultParam, options),
  };
}

export function _getPatchSchedulesOperations(
  context: RedisManagementContext,
): PatchSchedulesOperations {
  return {
    ..._getPatchSchedules(context),
  };
}
