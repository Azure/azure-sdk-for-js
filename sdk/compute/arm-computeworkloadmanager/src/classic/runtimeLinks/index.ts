// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WorkloadManagerContext } from "../../api/workloadManagerContext.js";
import {
  listByWorkloadSpace,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/runtimeLinks/operations.js";
import type {
  RuntimeLinksListByWorkloadSpaceOptionalParams,
  RuntimeLinksDeleteOptionalParams,
  RuntimeLinksUpdateOptionalParams,
  RuntimeLinksCreateOrUpdateOptionalParams,
  RuntimeLinksGetOptionalParams,
} from "../../api/runtimeLinks/options.js";
import type { RuntimeLink, RuntimeLinkUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RuntimeLinks operations. */
export interface RuntimeLinksOperations {
  /** Lists runtime links in a workload space. */
  listByWorkloadSpace: (
    resourceGroupName: string,
    spaceName: string,
    options?: RuntimeLinksListByWorkloadSpaceOptionalParams,
  ) => PagedAsyncIterableIterator<RuntimeLink>;
  /** Deletes a runtime link without deleting its runtime bindings. */
  delete: (
    resourceGroupName: string,
    spaceName: string,
    linkName: string,
    options?: RuntimeLinksDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates mutable runtime link properties. */
  update: (
    resourceGroupName: string,
    spaceName: string,
    linkName: string,
    properties: RuntimeLinkUpdate,
    options?: RuntimeLinksUpdateOptionalParams,
  ) => PollerLike<OperationState<RuntimeLink>, RuntimeLink>;
  /** Creates or replaces a runtime link. */
  createOrUpdate: (
    resourceGroupName: string,
    spaceName: string,
    linkName: string,
    resource: RuntimeLink,
    options?: RuntimeLinksCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<RuntimeLink>, RuntimeLink>;
  /** Gets a runtime link. */
  get: (
    resourceGroupName: string,
    spaceName: string,
    linkName: string,
    options?: RuntimeLinksGetOptionalParams,
  ) => Promise<RuntimeLink>;
}

function _getRuntimeLinks(context: WorkloadManagerContext) {
  return {
    listByWorkloadSpace: (
      resourceGroupName: string,
      spaceName: string,
      options?: RuntimeLinksListByWorkloadSpaceOptionalParams,
    ) => listByWorkloadSpace(context, resourceGroupName, spaceName, options),
    delete: (
      resourceGroupName: string,
      spaceName: string,
      linkName: string,
      options?: RuntimeLinksDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, spaceName, linkName, options),
    update: (
      resourceGroupName: string,
      spaceName: string,
      linkName: string,
      properties: RuntimeLinkUpdate,
      options?: RuntimeLinksUpdateOptionalParams,
    ) => update(context, resourceGroupName, spaceName, linkName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      spaceName: string,
      linkName: string,
      resource: RuntimeLink,
      options?: RuntimeLinksCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, spaceName, linkName, resource, options),
    get: (
      resourceGroupName: string,
      spaceName: string,
      linkName: string,
      options?: RuntimeLinksGetOptionalParams,
    ) => get(context, resourceGroupName, spaceName, linkName, options),
  };
}

export function _getRuntimeLinksOperations(
  context: WorkloadManagerContext,
): RuntimeLinksOperations {
  return {
    ..._getRuntimeLinks(context),
  };
}
