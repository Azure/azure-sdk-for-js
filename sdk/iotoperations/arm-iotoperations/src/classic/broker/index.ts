// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTOperationsContext } from "../../api/ioTOperationsContext.js";
import {
  brokerGet,
  brokerCreateOrUpdate,
  brokerDelete,
  brokerListByResourceGroup,
} from "../../api/broker/index.js";
import { BrokerResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  BrokerGetOptionalParams,
  BrokerCreateOrUpdateOptionalParams,
  BrokerDeleteOptionalParams,
  BrokerListByResourceGroupOptionalParams,
} from "../../api/options.js";

/** Interface representing a Broker operations. */
export interface BrokerOperations {
  /** Get a BrokerResource */
  get: (
    resourceGroupName: string,
    instanceName: string,
    brokerName: string,
    options?: BrokerGetOptionalParams,
  ) => Promise<BrokerResource>;
  /** Create a BrokerResource */
  createOrUpdate: (
    resourceGroupName: string,
    instanceName: string,
    brokerName: string,
    resource: BrokerResource,
    options?: BrokerCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<BrokerResource>, BrokerResource>;
  /** Delete a BrokerResource */
  delete: (
    resourceGroupName: string,
    instanceName: string,
    brokerName: string,
    options?: BrokerDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List BrokerResource resources by InstanceResource */
  listByResourceGroup: (
    resourceGroupName: string,
    instanceName: string,
    options?: BrokerListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<BrokerResource>;
}

export function getBroker(
  context: IoTOperationsContext,
  subscriptionId: string,
) {
  return {
    get: (
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      options?: BrokerGetOptionalParams,
    ) =>
      brokerGet(
        context,
        subscriptionId,
        resourceGroupName,
        instanceName,
        brokerName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      resource: BrokerResource,
      options?: BrokerCreateOrUpdateOptionalParams,
    ) =>
      brokerCreateOrUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        instanceName,
        brokerName,
        resource,
        options,
      ),
    delete: (
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      options?: BrokerDeleteOptionalParams,
    ) =>
      brokerDelete(
        context,
        subscriptionId,
        resourceGroupName,
        instanceName,
        brokerName,
        options,
      ),
    listByResourceGroup: (
      resourceGroupName: string,
      instanceName: string,
      options?: BrokerListByResourceGroupOptionalParams,
    ) =>
      brokerListByResourceGroup(
        context,
        subscriptionId,
        resourceGroupName,
        instanceName,
        options,
      ),
  };
}

export function getBrokerOperations(
  context: IoTOperationsContext,
  subscriptionId: string,
): BrokerOperations {
  return {
    ...getBroker(context, subscriptionId),
  };
}
