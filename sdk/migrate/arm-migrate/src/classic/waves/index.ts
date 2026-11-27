// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MigrateContext } from "../../api/migrateContext.js";
import { refresh, $delete, listByParent, get, create } from "../../api/waves/operations.js";
import type {
  WavesRefreshOptionalParams,
  WavesDeleteOptionalParams,
  WavesListByParentOptionalParams,
  WavesGetOptionalParams,
  WavesCreateOptionalParams,
} from "../../api/waves/options.js";
import type { Wave, WaveProperties } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Waves operations. */
export interface WavesOperations {
  /** Refresh operation to update wave */
  refresh: (
    resourceGroupName: string,
    projectName: string,
    waveName: string,
    options?: WavesRefreshOptionalParams,
  ) => Promise<WaveProperties>;
  /** Delete a Wave */
  delete: (
    resourceGroupName: string,
    projectName: string,
    waveName: string,
    options?: WavesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List Wave resources by MigrateProject */
  listByParent: (
    resourceGroupName: string,
    projectName: string,
    options?: WavesListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<Wave>;
  /** Get a Wave */
  get: (
    resourceGroupName: string,
    projectName: string,
    waveName: string,
    options?: WavesGetOptionalParams,
  ) => Promise<Wave>;
  /** Create a Wave */
  create: (
    resourceGroupName: string,
    projectName: string,
    waveName: string,
    resource: Wave,
    options?: WavesCreateOptionalParams,
  ) => PollerLike<OperationState<Wave>, Wave>;
}

function _getWaves(context: MigrateContext) {
  return {
    refresh: (
      resourceGroupName: string,
      projectName: string,
      waveName: string,
      options?: WavesRefreshOptionalParams,
    ) => refresh(context, resourceGroupName, projectName, waveName, options),
    delete: (
      resourceGroupName: string,
      projectName: string,
      waveName: string,
      options?: WavesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, projectName, waveName, options),
    listByParent: (
      resourceGroupName: string,
      projectName: string,
      options?: WavesListByParentOptionalParams,
    ) => listByParent(context, resourceGroupName, projectName, options),
    get: (
      resourceGroupName: string,
      projectName: string,
      waveName: string,
      options?: WavesGetOptionalParams,
    ) => get(context, resourceGroupName, projectName, waveName, options),
    create: (
      resourceGroupName: string,
      projectName: string,
      waveName: string,
      resource: Wave,
      options?: WavesCreateOptionalParams,
    ) => create(context, resourceGroupName, projectName, waveName, resource, options),
  };
}

export function _getWavesOperations(context: MigrateContext): WavesOperations {
  return {
    ..._getWaves(context),
  };
}
