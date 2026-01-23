// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagedOpsContext } from "../../api/managedOpsContext.js";
import { $delete, update, list, createOrUpdate, get } from "../../api/managedOps/operations.js";
import type {
  ManagedOpsDeleteOptionalParams,
  ManagedOpsUpdateOptionalParams,
  ManagedOpsListOptionalParams,
  ManagedOpsCreateOrUpdateOptionalParams,
  ManagedOpsGetOptionalParams,
} from "../../api/managedOps/options.js";
import type { ManagedOp, ManagedOpUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ManagedOps operations. */
export interface ManagedOpsOperations {
  /** Deletes the ManagedOps instance. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    managedOpsName: string,
    options?: ManagedOpsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates the ManagedOps instance with the supplied fields. */
  update: (
    managedOpsName: string,
    properties: ManagedOpUpdate,
    options?: ManagedOpsUpdateOptionalParams,
  ) => PollerLike<OperationState<ManagedOp>, ManagedOp>;
  /** List all ManagedOps instances in the subscription. */
  list: (options?: ManagedOpsListOptionalParams) => PagedAsyncIterableIterator<ManagedOp>;
  /** Creates or updates the ManagedOps instance. */
  createOrUpdate: (
    managedOpsName: string,
    resource: ManagedOp,
    options?: ManagedOpsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ManagedOp>, ManagedOp>;
  /** Gets the information of the ManagedOps instance. */
  get: (managedOpsName: string, options?: ManagedOpsGetOptionalParams) => Promise<ManagedOp>;
}

function _getManagedOps(context: ManagedOpsContext) {
  return {
    delete: (managedOpsName: string, options?: ManagedOpsDeleteOptionalParams) =>
      $delete(context, managedOpsName, options),
    update: (
      managedOpsName: string,
      properties: ManagedOpUpdate,
      options?: ManagedOpsUpdateOptionalParams,
    ) => update(context, managedOpsName, properties, options),
    list: (options?: ManagedOpsListOptionalParams) => list(context, options),
    createOrUpdate: (
      managedOpsName: string,
      resource: ManagedOp,
      options?: ManagedOpsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, managedOpsName, resource, options),
    get: (managedOpsName: string, options?: ManagedOpsGetOptionalParams) =>
      get(context, managedOpsName, options),
  };
}

export function _getManagedOpsOperations(context: ManagedOpsContext): ManagedOpsOperations {
  return {
    ..._getManagedOps(context),
  };
}
