// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PeeringManagementContext } from "../../api/peeringManagementContext.js";
import {
  listByPeeringService,
  $delete,
  createOrUpdate,
  get,
} from "../../api/prefixes/operations.js";
import type {
  PrefixesListByPeeringServiceOptionalParams,
  PrefixesDeleteOptionalParams,
  PrefixesCreateOrUpdateOptionalParams,
  PrefixesGetOptionalParams,
} from "../../api/prefixes/options.js";
import type { PeeringServicePrefix } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Prefixes operations. */
export interface PrefixesOperations {
  /** Lists all prefixes under the given subscription, resource group and peering service. */
  listByPeeringService: (
    resourceGroupName: string,
    peeringServiceName: string,
    options?: PrefixesListByPeeringServiceOptionalParams,
  ) => PagedAsyncIterableIterator<PeeringServicePrefix>;
  /** Deletes an existing prefix with the specified name under the given subscription, resource group and peering service. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    peeringServiceName: string,
    prefixName: string,
    options?: PrefixesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a new prefix with the specified name under the given subscription, resource group and peering service. */
  createOrUpdate: (
    resourceGroupName: string,
    peeringServiceName: string,
    prefixName: string,
    peeringServicePrefix: PeeringServicePrefix,
    options?: PrefixesCreateOrUpdateOptionalParams,
  ) => Promise<PeeringServicePrefix>;
  /** Gets an existing prefix with the specified name under the given subscription, resource group and peering service. */
  get: (
    resourceGroupName: string,
    peeringServiceName: string,
    prefixName: string,
    options?: PrefixesGetOptionalParams,
  ) => Promise<PeeringServicePrefix>;
}

function _getPrefixes(context: PeeringManagementContext) {
  return {
    listByPeeringService: (
      resourceGroupName: string,
      peeringServiceName: string,
      options?: PrefixesListByPeeringServiceOptionalParams,
    ) => listByPeeringService(context, resourceGroupName, peeringServiceName, options),
    delete: (
      resourceGroupName: string,
      peeringServiceName: string,
      prefixName: string,
      options?: PrefixesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, peeringServiceName, prefixName, options),
    createOrUpdate: (
      resourceGroupName: string,
      peeringServiceName: string,
      prefixName: string,
      peeringServicePrefix: PeeringServicePrefix,
      options?: PrefixesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        peeringServiceName,
        prefixName,
        peeringServicePrefix,
        options,
      ),
    get: (
      resourceGroupName: string,
      peeringServiceName: string,
      prefixName: string,
      options?: PrefixesGetOptionalParams,
    ) => get(context, resourceGroupName, peeringServiceName, prefixName, options),
  };
}

export function _getPrefixesOperations(context: PeeringManagementContext): PrefixesOperations {
  return {
    ..._getPrefixes(context),
  };
}
