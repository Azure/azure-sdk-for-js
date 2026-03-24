// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProviderHubContext } from "../../api/providerHubContext.js";
import {
  $delete,
  createOrUpdate,
  listByProviderRegistration,
  list,
} from "../../api/operations/operations.js";
import type {
  OperationsDeleteOptionalParams,
  OperationsCreateOrUpdateOptionalParams,
  OperationsListByProviderRegistrationOptionalParams,
  OperationsListOptionalParams,
} from "../../api/operations/options.js";
import type {
  OperationsDefinition,
  OperationsPutContent,
  OperationsListByProviderRegistrationResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** Deletes an operation. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (providerNamespace: string, options?: OperationsDeleteOptionalParams) => Promise<void>;
  /** Creates or updates the operation supported by the given provider. */
  createOrUpdate: (
    providerNamespace: string,
    operationsPutContent: OperationsPutContent,
    options?: OperationsCreateOrUpdateOptionalParams,
  ) => Promise<OperationsPutContent>;
  /** Gets the operations supported by the given provider. */
  listByProviderRegistration: (
    providerNamespace: string,
    options?: OperationsListByProviderRegistrationOptionalParams,
  ) => Promise<OperationsListByProviderRegistrationResponse>;
  /** List the operations for the provider */
  list: (
    options?: OperationsListOptionalParams,
  ) => PagedAsyncIterableIterator<OperationsDefinition>;
}

function _getOperations(context: ProviderHubContext) {
  return {
    delete: (providerNamespace: string, options?: OperationsDeleteOptionalParams) =>
      $delete(context, providerNamespace, options),
    createOrUpdate: (
      providerNamespace: string,
      operationsPutContent: OperationsPutContent,
      options?: OperationsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, providerNamespace, operationsPutContent, options),
    listByProviderRegistration: (
      providerNamespace: string,
      options?: OperationsListByProviderRegistrationOptionalParams,
    ) => listByProviderRegistration(context, providerNamespace, options),
    list: (options?: OperationsListOptionalParams) => list(context, options),
  };
}

export function _getOperationsOperations(context: ProviderHubContext): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
