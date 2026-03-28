// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PeeringManagementContext } from "../../api/peeringManagementContext.js";
import {
  listByPeering,
  $delete,
  createOrUpdate,
  get,
} from "../../api/registeredAsns/operations.js";
import type {
  RegisteredAsnsListByPeeringOptionalParams,
  RegisteredAsnsDeleteOptionalParams,
  RegisteredAsnsCreateOrUpdateOptionalParams,
  RegisteredAsnsGetOptionalParams,
} from "../../api/registeredAsns/options.js";
import type { PeeringRegisteredAsn } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RegisteredAsns operations. */
export interface RegisteredAsnsOperations {
  /** Lists all registered ASNs under the given subscription, resource group and peering. */
  listByPeering: (
    resourceGroupName: string,
    peeringName: string,
    options?: RegisteredAsnsListByPeeringOptionalParams,
  ) => PagedAsyncIterableIterator<PeeringRegisteredAsn>;
  /** Deletes an existing registered ASN with the specified name under the given subscription, resource group and peering. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    peeringName: string,
    registeredAsnName: string,
    options?: RegisteredAsnsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a new registered ASN with the specified name under the given subscription, resource group and peering. */
  createOrUpdate: (
    resourceGroupName: string,
    peeringName: string,
    registeredAsnName: string,
    registeredAsn: PeeringRegisteredAsn,
    options?: RegisteredAsnsCreateOrUpdateOptionalParams,
  ) => Promise<PeeringRegisteredAsn>;
  /** Gets an existing registered ASN with the specified name under the given subscription, resource group and peering. */
  get: (
    resourceGroupName: string,
    peeringName: string,
    registeredAsnName: string,
    options?: RegisteredAsnsGetOptionalParams,
  ) => Promise<PeeringRegisteredAsn>;
}

function _getRegisteredAsns(context: PeeringManagementContext) {
  return {
    listByPeering: (
      resourceGroupName: string,
      peeringName: string,
      options?: RegisteredAsnsListByPeeringOptionalParams,
    ) => listByPeering(context, resourceGroupName, peeringName, options),
    delete: (
      resourceGroupName: string,
      peeringName: string,
      registeredAsnName: string,
      options?: RegisteredAsnsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, peeringName, registeredAsnName, options),
    createOrUpdate: (
      resourceGroupName: string,
      peeringName: string,
      registeredAsnName: string,
      registeredAsn: PeeringRegisteredAsn,
      options?: RegisteredAsnsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        peeringName,
        registeredAsnName,
        registeredAsn,
        options,
      ),
    get: (
      resourceGroupName: string,
      peeringName: string,
      registeredAsnName: string,
      options?: RegisteredAsnsGetOptionalParams,
    ) => get(context, resourceGroupName, peeringName, registeredAsnName, options),
  };
}

export function _getRegisteredAsnsOperations(
  context: PeeringManagementContext,
): RegisteredAsnsOperations {
  return {
    ..._getRegisteredAsns(context),
  };
}
