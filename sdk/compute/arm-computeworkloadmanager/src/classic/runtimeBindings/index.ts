// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WorkloadManagerContext } from "../../api/workloadManagerContext.js";
import {
  listByWorkloadSpace,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/runtimeBindings/operations.js";
import type {
  RuntimeBindingsListByWorkloadSpaceOptionalParams,
  RuntimeBindingsDeleteOptionalParams,
  RuntimeBindingsUpdateOptionalParams,
  RuntimeBindingsCreateOrUpdateOptionalParams,
  RuntimeBindingsGetOptionalParams,
} from "../../api/runtimeBindings/options.js";
import type { RuntimeBinding, RuntimeBindingUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RuntimeBindings operations. */
export interface RuntimeBindingsOperations {
  /** Lists runtime bindings in a workload space. */
  listByWorkloadSpace: (
    resourceGroupName: string,
    spaceName: string,
    options?: RuntimeBindingsListByWorkloadSpaceOptionalParams,
  ) => PagedAsyncIterableIterator<RuntimeBinding>;
  /** Deletes a runtime binding without deleting customer-owned referenced resources. */
  delete: (
    resourceGroupName: string,
    spaceName: string,
    bindingName: string,
    options?: RuntimeBindingsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates mutable runtime binding properties. */
  update: (
    resourceGroupName: string,
    spaceName: string,
    bindingName: string,
    properties: RuntimeBindingUpdate,
    options?: RuntimeBindingsUpdateOptionalParams,
  ) => PollerLike<OperationState<RuntimeBinding>, RuntimeBinding>;
  /** Creates or replaces a runtime binding. */
  createOrUpdate: (
    resourceGroupName: string,
    spaceName: string,
    bindingName: string,
    resource: RuntimeBinding,
    options?: RuntimeBindingsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<RuntimeBinding>, RuntimeBinding>;
  /** Gets a runtime binding. */
  get: (
    resourceGroupName: string,
    spaceName: string,
    bindingName: string,
    options?: RuntimeBindingsGetOptionalParams,
  ) => Promise<RuntimeBinding>;
}

function _getRuntimeBindings(context: WorkloadManagerContext) {
  return {
    listByWorkloadSpace: (
      resourceGroupName: string,
      spaceName: string,
      options?: RuntimeBindingsListByWorkloadSpaceOptionalParams,
    ) => listByWorkloadSpace(context, resourceGroupName, spaceName, options),
    delete: (
      resourceGroupName: string,
      spaceName: string,
      bindingName: string,
      options?: RuntimeBindingsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, spaceName, bindingName, options),
    update: (
      resourceGroupName: string,
      spaceName: string,
      bindingName: string,
      properties: RuntimeBindingUpdate,
      options?: RuntimeBindingsUpdateOptionalParams,
    ) => update(context, resourceGroupName, spaceName, bindingName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      spaceName: string,
      bindingName: string,
      resource: RuntimeBinding,
      options?: RuntimeBindingsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, spaceName, bindingName, resource, options),
    get: (
      resourceGroupName: string,
      spaceName: string,
      bindingName: string,
      options?: RuntimeBindingsGetOptionalParams,
    ) => get(context, resourceGroupName, spaceName, bindingName, options),
  };
}

export function _getRuntimeBindingsOperations(
  context: WorkloadManagerContext,
): RuntimeBindingsOperations {
  return {
    ..._getRuntimeBindings(context),
  };
}
