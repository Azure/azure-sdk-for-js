// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PeeringManagementContext } from "../../api/peeringManagementContext.js";
import {
  initializeConnectionMonitor,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/peeringServices/operations.js";
import type {
  PeeringServicesInitializeConnectionMonitorOptionalParams,
  PeeringServicesListBySubscriptionOptionalParams,
  PeeringServicesListByResourceGroupOptionalParams,
  PeeringServicesDeleteOptionalParams,
  PeeringServicesUpdateOptionalParams,
  PeeringServicesCreateOrUpdateOptionalParams,
  PeeringServicesGetOptionalParams,
} from "../../api/peeringServices/options.js";
import type { ResourceTags, PeeringService } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PeeringServices operations. */
export interface PeeringServicesOperations {
  /** Initialize Peering Service for Connection Monitor functionality */
  initializeConnectionMonitor: (
    options?: PeeringServicesInitializeConnectionMonitorOptionalParams,
  ) => Promise<void>;
  /** Lists all of the peerings under the given subscription. */
  listBySubscription: (
    options?: PeeringServicesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<PeeringService>;
  /** Lists all of the peering services under the given subscription and resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: PeeringServicesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<PeeringService>;
  /** Deletes an existing peering service with the specified name under the given subscription and resource group. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    peeringServiceName: string,
    options?: PeeringServicesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates tags for a peering service with the specified name under the given subscription and resource group. */
  update: (
    resourceGroupName: string,
    peeringServiceName: string,
    tags: ResourceTags,
    options?: PeeringServicesUpdateOptionalParams,
  ) => Promise<PeeringService>;
  /** Creates a new peering service or updates an existing peering with the specified name under the given subscription and resource group. */
  createOrUpdate: (
    resourceGroupName: string,
    peeringServiceName: string,
    peeringService: PeeringService,
    options?: PeeringServicesCreateOrUpdateOptionalParams,
  ) => Promise<PeeringService>;
  /** Gets an existing peering service with the specified name under the given subscription and resource group. */
  get: (
    resourceGroupName: string,
    peeringServiceName: string,
    options?: PeeringServicesGetOptionalParams,
  ) => Promise<PeeringService>;
}

function _getPeeringServices(context: PeeringManagementContext) {
  return {
    initializeConnectionMonitor: (
      options?: PeeringServicesInitializeConnectionMonitorOptionalParams,
    ) => initializeConnectionMonitor(context, options),
    listBySubscription: (options?: PeeringServicesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: PeeringServicesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      peeringServiceName: string,
      options?: PeeringServicesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, peeringServiceName, options),
    update: (
      resourceGroupName: string,
      peeringServiceName: string,
      tags: ResourceTags,
      options?: PeeringServicesUpdateOptionalParams,
    ) => update(context, resourceGroupName, peeringServiceName, tags, options),
    createOrUpdate: (
      resourceGroupName: string,
      peeringServiceName: string,
      peeringService: PeeringService,
      options?: PeeringServicesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, peeringServiceName, peeringService, options),
    get: (
      resourceGroupName: string,
      peeringServiceName: string,
      options?: PeeringServicesGetOptionalParams,
    ) => get(context, resourceGroupName, peeringServiceName, options),
  };
}

export function _getPeeringServicesOperations(
  context: PeeringManagementContext,
): PeeringServicesOperations {
  return {
    ..._getPeeringServices(context),
  };
}
