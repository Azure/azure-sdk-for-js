// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTOperationsContext } from "../../api/ioTOperationsContext.js";
import { BrokerResource } from "../../models/models.js";
import {
  BrokerListByResourceGroupOptionalParams,
  BrokerDeleteOptionalParams,
  BrokerCreateOrUpdateOptionalParams,
  BrokerGetOptionalParams,
} from "../../api/broker/options.js";
import { listByResourceGroup, $delete, createOrUpdate, get } from "../../api/broker/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Broker operations. */
export interface BrokerOperations {
  /** List BrokerResource resources by InstanceResource */
  listByResourceGroup: (
    apiVersion: string,
    resourceGroupName: string,
    instanceName: string,
    options?: BrokerListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<BrokerResource>;
  /** Delete a BrokerResource */
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
    options?: BrokerDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a BrokerResource */
  createOrUpdate: (
    apiVersion: string,
    resourceGroupName: string,
    instanceName: string,
    brokerName: string,
    resource: BrokerResource,
    options?: BrokerCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<BrokerResource>, BrokerResource>;
  /** Get a BrokerResource */
  get: (
    apiVersion: string,
    resourceGroupName: string,
    instanceName: string,
    brokerName: string,
    options?: BrokerGetOptionalParams,
  ) => Promise<BrokerResource>;
}

function _getBroker(context: IoTOperationsContext) {
  return {
    listByResourceGroup: (
      apiVersion: string,
      resourceGroupName: string,
      instanceName: string,
      options?: BrokerListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, apiVersion, resourceGroupName, instanceName, options),
    delete: (
      apiVersion: string,
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      options?: BrokerDeleteOptionalParams,
    ) => $delete(context, apiVersion, resourceGroupName, instanceName, brokerName, options),
    createOrUpdate: (
      apiVersion: string,
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      resource: BrokerResource,
      options?: BrokerCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        apiVersion,
        resourceGroupName,
        instanceName,
        brokerName,
        resource,
        options,
      ),
    get: (
      apiVersion: string,
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      options?: BrokerGetOptionalParams,
    ) => get(context, apiVersion, resourceGroupName, instanceName, brokerName, options),
  };
}

export function _getBrokerOperations(context: IoTOperationsContext): BrokerOperations {
  return {
    ..._getBroker(context),
  };
}
