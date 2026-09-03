// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderHubContext } from "../../api/providerHubContext.js";
import {
  $delete,
  createOrUpdate,
  listByProviderRegistration,
  list,
} from "../../api/operations/operations.js";
import {
  OperationsDeleteOptionalParams,
  OperationsCreateOrUpdateOptionalParams,
  OperationsListByProviderRegistrationOptionalParams,
  OperationsListOptionalParams,
} from "../../api/operations/options.js";
import { OperationsDefinition, OperationsPutContent } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** Deletes an operation. */
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
  ) => Promise<OperationsDefinition[]>;
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
