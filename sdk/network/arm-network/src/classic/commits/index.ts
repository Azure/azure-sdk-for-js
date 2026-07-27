// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/commits/operations.js";
import type {
  CommitsListOptionalParams,
  CommitsDeleteOptionalParams,
  CommitsCreateOrUpdateOptionalParams,
  CommitsGetOptionalParams,
} from "../../api/commits/options.js";
import type { Commit } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Commits operations. */
export interface CommitsOperations {
  /** Lists all commits for the specified network manager. */
  list: (
    resourceGroupName: string,
    networkManagerName: string,
    options?: CommitsListOptionalParams,
  ) => PagedAsyncIterableIterator<Commit>;
  /** Deletes a commit. */
  delete: (
    resourceGroupName: string,
    networkManagerName: string,
    commitName: string,
    options?: CommitsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkManagerName: string,
    commitName: string,
    options?: CommitsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkManagerName: string,
    commitName: string,
    options?: CommitsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a commit. */
  createOrUpdate: (
    resourceGroupName: string,
    networkManagerName: string,
    commitName: string,
    resource: Commit,
    options?: CommitsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Commit>, Commit>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    networkManagerName: string,
    commitName: string,
    resource: Commit,
    options?: CommitsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Commit>, Commit>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    networkManagerName: string,
    commitName: string,
    resource: Commit,
    options?: CommitsCreateOrUpdateOptionalParams,
  ) => Promise<Commit>;
  /** Gets the specified commit. */
  get: (
    resourceGroupName: string,
    networkManagerName: string,
    commitName: string,
    options?: CommitsGetOptionalParams,
  ) => Promise<Commit>;
}

function _getCommits(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      networkManagerName: string,
      options?: CommitsListOptionalParams,
    ) => list(context, resourceGroupName, networkManagerName, options),
    delete: (
      resourceGroupName: string,
      networkManagerName: string,
      commitName: string,
      options?: CommitsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkManagerName, commitName, options),
    beginDelete: async (
      resourceGroupName: string,
      networkManagerName: string,
      commitName: string,
      options?: CommitsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, networkManagerName, commitName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkManagerName: string,
      commitName: string,
      options?: CommitsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, networkManagerName, commitName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      networkManagerName: string,
      commitName: string,
      resource: Commit,
      options?: CommitsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, networkManagerName, commitName, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      networkManagerName: string,
      commitName: string,
      resource: Commit,
      options?: CommitsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        networkManagerName,
        commitName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      networkManagerName: string,
      commitName: string,
      resource: Commit,
      options?: CommitsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        networkManagerName,
        commitName,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      networkManagerName: string,
      commitName: string,
      options?: CommitsGetOptionalParams,
    ) => get(context, resourceGroupName, networkManagerName, commitName, options),
  };
}

export function _getCommitsOperations(context: NetworkManagementContext): CommitsOperations {
  return {
    ..._getCommits(context),
  };
}
