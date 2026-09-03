// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderHubContext } from "../../api/providerHubContext.js";
import {
  generateOperations,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/providerRegistrations/operations.js";
import {
  ProviderRegistrationsGenerateOperationsOptionalParams,
  ProviderRegistrationsListOptionalParams,
  ProviderRegistrationsDeleteOptionalParams,
  ProviderRegistrationsCreateOrUpdateOptionalParams,
  ProviderRegistrationsGetOptionalParams,
} from "../../api/providerRegistrations/options.js";
import { OperationsDefinition, ProviderRegistration } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ProviderRegistrations operations. */
export interface ProviderRegistrationsOperations {
  /** Generates the operations api for the given provider. */
  generateOperations: (
    providerNamespace: string,
    options?: ProviderRegistrationsGenerateOperationsOptionalParams,
  ) => Promise<OperationsDefinition[]>;
  /** Gets the list of the provider registrations in the subscription. */
  list: (
    options?: ProviderRegistrationsListOptionalParams,
  ) => PagedAsyncIterableIterator<ProviderRegistration>;
  /** Deletes a provider registration. */
  delete: (
    providerNamespace: string,
    options?: ProviderRegistrationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates the provider registration. */
  createOrUpdate: (
    providerNamespace: string,
    properties: ProviderRegistration,
    options?: ProviderRegistrationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ProviderRegistration>, ProviderRegistration>;
  /** Gets the provider registration details. */
  get: (
    providerNamespace: string,
    options?: ProviderRegistrationsGetOptionalParams,
  ) => Promise<ProviderRegistration>;
}

function _getProviderRegistrations(context: ProviderHubContext) {
  return {
    generateOperations: (
      providerNamespace: string,
      options?: ProviderRegistrationsGenerateOperationsOptionalParams,
    ) => generateOperations(context, providerNamespace, options),
    list: (options?: ProviderRegistrationsListOptionalParams) => list(context, options),
    delete: (providerNamespace: string, options?: ProviderRegistrationsDeleteOptionalParams) =>
      $delete(context, providerNamespace, options),
    createOrUpdate: (
      providerNamespace: string,
      properties: ProviderRegistration,
      options?: ProviderRegistrationsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, providerNamespace, properties, options),
    get: (providerNamespace: string, options?: ProviderRegistrationsGetOptionalParams) =>
      get(context, providerNamespace, options),
  };
}

export function _getProviderRegistrationsOperations(
  context: ProviderHubContext,
): ProviderRegistrationsOperations {
  return {
    ..._getProviderRegistrations(context),
  };
}
