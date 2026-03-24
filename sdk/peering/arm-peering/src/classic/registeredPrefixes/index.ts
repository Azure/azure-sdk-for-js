// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PeeringManagementContext } from "../../api/peeringManagementContext.js";
import {
  validate,
  listByPeering,
  $delete,
  createOrUpdate,
  get,
} from "../../api/registeredPrefixes/operations.js";
import type {
  RegisteredPrefixesValidateOptionalParams,
  RegisteredPrefixesListByPeeringOptionalParams,
  RegisteredPrefixesDeleteOptionalParams,
  RegisteredPrefixesCreateOrUpdateOptionalParams,
  RegisteredPrefixesGetOptionalParams,
} from "../../api/registeredPrefixes/options.js";
import type { PeeringRegisteredPrefix } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RegisteredPrefixes operations. */
export interface RegisteredPrefixesOperations {
  /** Validates an existing registered prefix with the specified name under the given subscription, resource group and peering. */
  validate: (
    resourceGroupName: string,
    peeringName: string,
    registeredPrefixName: string,
    options?: RegisteredPrefixesValidateOptionalParams,
  ) => Promise<PeeringRegisteredPrefix>;
  /** Lists all registered prefixes under the given subscription, resource group and peering. */
  listByPeering: (
    resourceGroupName: string,
    peeringName: string,
    options?: RegisteredPrefixesListByPeeringOptionalParams,
  ) => PagedAsyncIterableIterator<PeeringRegisteredPrefix>;
  /** Deletes an existing registered prefix with the specified name under the given subscription, resource group and peering. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    peeringName: string,
    registeredPrefixName: string,
    options?: RegisteredPrefixesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a new registered prefix with the specified name under the given subscription, resource group and peering. */
  createOrUpdate: (
    resourceGroupName: string,
    peeringName: string,
    registeredPrefixName: string,
    registeredPrefix: PeeringRegisteredPrefix,
    options?: RegisteredPrefixesCreateOrUpdateOptionalParams,
  ) => Promise<PeeringRegisteredPrefix>;
  /** Gets an existing registered prefix with the specified name under the given subscription, resource group and peering. */
  get: (
    resourceGroupName: string,
    peeringName: string,
    registeredPrefixName: string,
    options?: RegisteredPrefixesGetOptionalParams,
  ) => Promise<PeeringRegisteredPrefix>;
}

function _getRegisteredPrefixes(context: PeeringManagementContext) {
  return {
    validate: (
      resourceGroupName: string,
      peeringName: string,
      registeredPrefixName: string,
      options?: RegisteredPrefixesValidateOptionalParams,
    ) => validate(context, resourceGroupName, peeringName, registeredPrefixName, options),
    listByPeering: (
      resourceGroupName: string,
      peeringName: string,
      options?: RegisteredPrefixesListByPeeringOptionalParams,
    ) => listByPeering(context, resourceGroupName, peeringName, options),
    delete: (
      resourceGroupName: string,
      peeringName: string,
      registeredPrefixName: string,
      options?: RegisteredPrefixesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, peeringName, registeredPrefixName, options),
    createOrUpdate: (
      resourceGroupName: string,
      peeringName: string,
      registeredPrefixName: string,
      registeredPrefix: PeeringRegisteredPrefix,
      options?: RegisteredPrefixesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        peeringName,
        registeredPrefixName,
        registeredPrefix,
        options,
      ),
    get: (
      resourceGroupName: string,
      peeringName: string,
      registeredPrefixName: string,
      options?: RegisteredPrefixesGetOptionalParams,
    ) => get(context, resourceGroupName, peeringName, registeredPrefixName, options),
  };
}

export function _getRegisteredPrefixesOperations(
  context: PeeringManagementContext,
): RegisteredPrefixesOperations {
  return {
    ..._getRegisteredPrefixes(context),
  };
}
