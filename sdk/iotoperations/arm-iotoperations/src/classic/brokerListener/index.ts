// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTOperationsContext } from "../../api/ioTOperationsContext.js";
import { BrokerListenerResource } from "../../models/models.js";
import {
  BrokerListenerListByResourceGroupOptionalParams,
  BrokerListenerDeleteOptionalParams,
  BrokerListenerCreateOrUpdateOptionalParams,
  BrokerListenerGetOptionalParams,
} from "../../api/brokerListener/options.js";
import {
  listByResourceGroup,
  $delete,
  createOrUpdate,
  get,
} from "../../api/brokerListener/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BrokerListener operations. */
export interface BrokerListenerOperations {
  /** List BrokerListenerResource resources by BrokerResource */
  listByResourceGroup: (
    apiVersion: string,
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
    apiVersion: string,
    resourceGroupName: string,
    instanceName: string,
    brokerName: string,
    listenerName: string,
    options?: BrokerListenerDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a BrokerListenerResource */
  createOrUpdate: (
    apiVersion: string,
    resourceGroupName: string,
    instanceName: string,
    brokerName: string,
    listenerName: string,
    resource: BrokerListenerResource,
    options?: BrokerListenerCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<BrokerListenerResource>, BrokerListenerResource>;
  /** Get a BrokerListenerResource */
  get: (
    apiVersion: string,
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
      apiVersion: string,
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      options?: BrokerListenerListByResourceGroupOptionalParams,
    ) =>
      listByResourceGroup(
        context,
        apiVersion,
        resourceGroupName,
        instanceName,
        brokerName,
        options,
      ),
    delete: (
      apiVersion: string,
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      listenerName: string,
      options?: BrokerListenerDeleteOptionalParams,
    ) =>
      $delete(
        context,
        apiVersion,
        resourceGroupName,
        instanceName,
        brokerName,
        listenerName,
        options,
      ),
    createOrUpdate: (
      apiVersion: string,
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      listenerName: string,
      resource: BrokerListenerResource,
      options?: BrokerListenerCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        apiVersion,
        resourceGroupName,
        instanceName,
        brokerName,
        listenerName,
        resource,
        options,
      ),
    get: (
      apiVersion: string,
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      listenerName: string,
      options?: BrokerListenerGetOptionalParams,
    ) =>
      get(context, apiVersion, resourceGroupName, instanceName, brokerName, listenerName, options),
  };
}

export function _getBrokerListenerOperations(
  context: IoTOperationsContext,
): BrokerListenerOperations {
  return {
    ..._getBrokerListener(context),
  };
}
