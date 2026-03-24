// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProviderHubContext } from "../../api/providerHubContext.js";
import {
  generateOperations,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/providerRegistrations/operations.js";
import type {
  ProviderRegistrationsGenerateOperationsOptionalParams,
  ProviderRegistrationsListOptionalParams,
  ProviderRegistrationsDeleteOptionalParams,
  ProviderRegistrationsCreateOrUpdateOptionalParams,
  ProviderRegistrationsGetOptionalParams,
} from "../../api/providerRegistrations/options.js";
import type {
  ProviderRegistration,
  ProviderRegistrationsGenerateOperationsResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ProviderRegistrations operations. */
export interface ProviderRegistrationsOperations {
  /** Generates the operations api for the given provider. */
  generateOperations: (
    providerNamespace: string,
    options?: ProviderRegistrationsGenerateOperationsOptionalParams,
  ) => Promise<ProviderRegistrationsGenerateOperationsResponse>;
  /** Gets the list of the provider registrations in the subscription. */
  list: (
    options?: ProviderRegistrationsListOptionalParams,
  ) => PagedAsyncIterableIterator<ProviderRegistration>;
  /** Deletes a provider registration. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
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
