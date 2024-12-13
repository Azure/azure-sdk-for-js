// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTOperationsContext } from "../../api/ioTOperationsContext.js";
import {
  brokerListenerGet,
  brokerListenerCreateOrUpdate,
  brokerListenerDelete,
  brokerListenerListByResourceGroup,
} from "../../api/brokerListener/index.js";
import { BrokerListenerResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  BrokerListenerGetOptionalParams,
  BrokerListenerCreateOrUpdateOptionalParams,
  BrokerListenerDeleteOptionalParams,
  BrokerListenerListByResourceGroupOptionalParams,
} from "../../api/options.js";

/** Interface representing a BrokerListener operations. */
export interface BrokerListenerOperations {
  /** Get a BrokerListenerResource */
  get: (
    resourceGroupName: string,
    instanceName: string,
    brokerName: string,
    listenerName: string,
    options?: BrokerListenerGetOptionalParams,
  ) => Promise<BrokerListenerResource>;
  /** Create a BrokerListenerResource */
  createOrUpdate: (
    resourceGroupName: string,
    instanceName: string,
    brokerName: string,
    listenerName: string,
    resource: BrokerListenerResource,
    options?: BrokerListenerCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<BrokerListenerResource>,
    BrokerListenerResource
  >;
  /** Delete a BrokerListenerResource */
  delete: (
    resourceGroupName: string,
    instanceName: string,
    brokerName: string,
    listenerName: string,
    options?: BrokerListenerDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List BrokerListenerResource resources by BrokerResource */
  listByResourceGroup: (
    resourceGroupName: string,
    instanceName: string,
    brokerName: string,
    options?: BrokerListenerListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<BrokerListenerResource>;
}

export function getBrokerListener(
  context: IoTOperationsContext,
  subscriptionId: string,
) {
  return {
    get: (
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      listenerName: string,
      options?: BrokerListenerGetOptionalParams,
    ) =>
      brokerListenerGet(
        context,
        subscriptionId,
        resourceGroupName,
        instanceName,
        brokerName,
        listenerName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      listenerName: string,
      resource: BrokerListenerResource,
      options?: BrokerListenerCreateOrUpdateOptionalParams,
    ) =>
      brokerListenerCreateOrUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        instanceName,
        brokerName,
        listenerName,
        resource,
        options,
      ),
    delete: (
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      listenerName: string,
      options?: BrokerListenerDeleteOptionalParams,
    ) =>
      brokerListenerDelete(
        context,
        subscriptionId,
        resourceGroupName,
        instanceName,
        brokerName,
        listenerName,
        options,
      ),
    listByResourceGroup: (
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      options?: BrokerListenerListByResourceGroupOptionalParams,
    ) =>
      brokerListenerListByResourceGroup(
        context,
        subscriptionId,
        resourceGroupName,
        instanceName,
        brokerName,
        options,
      ),
  };
}

export function getBrokerListenerOperations(
  context: IoTOperationsContext,
  subscriptionId: string,
): BrokerListenerOperations {
  return {
    ...getBrokerListener(context, subscriptionId),
  };
}
