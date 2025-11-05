// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IoTOperationsContext } from "../../api/ioTOperationsContext.js";
import {
  listByResourceGroup,
  $delete,
  createOrUpdate,
  get,
} from "../../api/brokerListener/operations.js";
import type {
  BrokerListenerListByResourceGroupOptionalParams,
  BrokerListenerDeleteOptionalParams,
  BrokerListenerCreateOrUpdateOptionalParams,
  BrokerListenerGetOptionalParams,
} from "../../api/brokerListener/options.js";
import type { BrokerListenerResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BrokerListener operations. */
export interface BrokerListenerOperations {
  /** List BrokerListenerResource resources by BrokerResource */
  listByResourceGroup: (
    resourceGroupName: string,
    instanceName: string,
    brokerName: string,
    options?: BrokerListenerListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<BrokerListenerResource>;
  /** Delete a BrokerListenerResource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    instanceName: string,
    brokerName: string,
    listenerName: string,
    options?: BrokerListenerDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a BrokerListenerResource */
  createOrUpdate: (
    resourceGroupName: string,
    instanceName: string,
    brokerName: string,
    listenerName: string,
    resource: BrokerListenerResource,
    options?: BrokerListenerCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<BrokerListenerResource>, BrokerListenerResource>;
  /** Get a BrokerListenerResource */
  get: (
    resourceGroupName: string,
    instanceName: string,
    brokerName: string,
    listenerName: string,
    options?: BrokerListenerGetOptionalParams,
  ) => Promise<BrokerListenerResource>;
}

function _getBrokerListener(context: IoTOperationsContext) {
  return {
    listByResourceGroup: (
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      options?: BrokerListenerListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, instanceName, brokerName, options),
    delete: (
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      listenerName: string,
      options?: BrokerListenerDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, instanceName, brokerName, listenerName, options),
    createOrUpdate: (
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      listenerName: string,
      resource: BrokerListenerResource,
      options?: BrokerListenerCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        instanceName,
        brokerName,
        listenerName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      listenerName: string,
      options?: BrokerListenerGetOptionalParams,
    ) => get(context, resourceGroupName, instanceName, brokerName, listenerName, options),
  };
}

export function _getBrokerListenerOperations(
  context: IoTOperationsContext,
): BrokerListenerOperations {
  return {
    ..._getBrokerListener(context),
  };
}
