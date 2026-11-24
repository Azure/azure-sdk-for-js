// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/raiBindings/operations.js";
import type {
  RaiBindingsListOptionalParams,
  RaiBindingsDeleteOptionalParams,
  RaiBindingsCreateOrUpdateOptionalParams,
  RaiBindingsGetOptionalParams,
} from "../../api/raiBindings/options.js";
import type { RaiBinding } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RaiBindings operations. */
export interface RaiBindingsOperations {
  /** Lists RAI bindings on an account. */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: RaiBindingsListOptionalParams,
  ) => PagedAsyncIterableIterator<RaiBinding>;
  /** Deletes one RAI binding. */
  delete: (
    resourceGroupName: string,
    accountName: string,
    raiBindingName: string,
    options?: RaiBindingsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or replaces one RAI binding. */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    raiBindingName: string,
    raiBinding: RaiBinding,
    options?: RaiBindingsCreateOrUpdateOptionalParams,
  ) => Promise<RaiBinding>;
  /** Gets one RAI binding. */
  get: (
    resourceGroupName: string,
    accountName: string,
    raiBindingName: string,
    options?: RaiBindingsGetOptionalParams,
  ) => Promise<RaiBinding>;
}

function _getRaiBindings(context: CognitiveServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: RaiBindingsListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      raiBindingName: string,
      options?: RaiBindingsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, raiBindingName, options),
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      raiBindingName: string,
      raiBinding: RaiBinding,
      options?: RaiBindingsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, accountName, raiBindingName, raiBinding, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      raiBindingName: string,
      options?: RaiBindingsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, raiBindingName, options),
  };
}

export function _getRaiBindingsOperations(
  context: CognitiveServicesManagementContext,
): RaiBindingsOperations {
  return {
    ..._getRaiBindings(context),
  };
}
