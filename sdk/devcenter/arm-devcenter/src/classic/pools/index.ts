// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext } from "../../api/devCenterContext.js";
import {
  runHealthChecks,
  listByProject,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/pools/operations.js";
import type {
  PoolsRunHealthChecksOptionalParams,
  PoolsListByProjectOptionalParams,
  PoolsDeleteOptionalParams,
  PoolsUpdateOptionalParams,
  PoolsCreateOrUpdateOptionalParams,
  PoolsGetOptionalParams,
} from "../../api/pools/options.js";
import type { Pool, PoolUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Pools operations. */
export interface PoolsOperations {
  /** Triggers a refresh of the pool status. */
  runHealthChecks: (
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    options?: PoolsRunHealthChecksOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use runHealthChecks instead */
  beginRunHealthChecks: (
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    options?: PoolsRunHealthChecksOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use runHealthChecks instead */
  beginRunHealthChecksAndWait: (
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    options?: PoolsRunHealthChecksOptionalParams,
  ) => Promise<void>;
  /** Lists pools for a project. */
  listByProject: (
    resourceGroupName: string,
    projectName: string,
    options?: PoolsListByProjectOptionalParams,
  ) => PagedAsyncIterableIterator<Pool>;
  /** Deletes a machine pool. */
  delete: (
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    options?: PoolsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    options?: PoolsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    options?: PoolsDeleteOptionalParams,
  ) => Promise<void>;
  /** Partially updates a machine pool. */
  update: (
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    body: PoolUpdate,
    options?: PoolsUpdateOptionalParams,
  ) => PollerLike<OperationState<Pool>, Pool>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    body: PoolUpdate,
    options?: PoolsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Pool>, Pool>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    body: PoolUpdate,
    options?: PoolsUpdateOptionalParams,
  ) => Promise<Pool>;
  /** Creates or updates a machine pool. */
  createOrUpdate: (
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    body: Pool,
    options?: PoolsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Pool>, Pool>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    body: Pool,
    options?: PoolsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Pool>, Pool>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    body: Pool,
    options?: PoolsCreateOrUpdateOptionalParams,
  ) => Promise<Pool>;
  /** Gets a machine pool. */
  get: (
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    options?: PoolsGetOptionalParams,
  ) => Promise<Pool>;
}

function _getPools(context: DevCenterContext) {
  return {
    runHealthChecks: (
      resourceGroupName: string,
      projectName: string,
      poolName: string,
      options?: PoolsRunHealthChecksOptionalParams,
    ) => runHealthChecks(context, resourceGroupName, projectName, poolName, options),
    beginRunHealthChecks: async (
      resourceGroupName: string,
      projectName: string,
      poolName: string,
      options?: PoolsRunHealthChecksOptionalParams,
    ) => {
      const poller = runHealthChecks(context, resourceGroupName, projectName, poolName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRunHealthChecksAndWait: async (
      resourceGroupName: string,
      projectName: string,
      poolName: string,
      options?: PoolsRunHealthChecksOptionalParams,
    ) => {
      return await runHealthChecks(context, resourceGroupName, projectName, poolName, options);
    },
    listByProject: (
      resourceGroupName: string,
      projectName: string,
      options?: PoolsListByProjectOptionalParams,
    ) => listByProject(context, resourceGroupName, projectName, options),
    delete: (
      resourceGroupName: string,
      projectName: string,
      poolName: string,
      options?: PoolsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, projectName, poolName, options),
    beginDelete: async (
      resourceGroupName: string,
      projectName: string,
      poolName: string,
      options?: PoolsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, projectName, poolName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      projectName: string,
      poolName: string,
      options?: PoolsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, projectName, poolName, options);
    },
    update: (
      resourceGroupName: string,
      projectName: string,
      poolName: string,
      body: PoolUpdate,
      options?: PoolsUpdateOptionalParams,
    ) => update(context, resourceGroupName, projectName, poolName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      projectName: string,
      poolName: string,
      body: PoolUpdate,
      options?: PoolsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, projectName, poolName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      projectName: string,
      poolName: string,
      body: PoolUpdate,
      options?: PoolsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, projectName, poolName, body, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      projectName: string,
      poolName: string,
      body: Pool,
      options?: PoolsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, projectName, poolName, body, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      projectName: string,
      poolName: string,
      body: Pool,
      options?: PoolsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        projectName,
        poolName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      projectName: string,
      poolName: string,
      body: Pool,
      options?: PoolsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, projectName, poolName, body, options);
    },
    get: (
      resourceGroupName: string,
      projectName: string,
      poolName: string,
      options?: PoolsGetOptionalParams,
    ) => get(context, resourceGroupName, projectName, poolName, options),
  };
}

export function _getPoolsOperations(context: DevCenterContext): PoolsOperations {
  return {
    ..._getPools(context),
  };
}
