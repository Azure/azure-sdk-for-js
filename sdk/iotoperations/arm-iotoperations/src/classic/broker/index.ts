// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IoTOperationsContext } from "../../api/ioTOperationsContext.js";
import { listByResourceGroup, $delete, createOrUpdate, get } from "../../api/broker/operations.js";
import type {
  BrokerListByResourceGroupOptionalParams,
  BrokerDeleteOptionalParams,
  BrokerCreateOrUpdateOptionalParams,
  BrokerGetOptionalParams,
} from "../../api/broker/options.js";
import type { BrokerResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Broker operations. */
export interface BrokerOperations {
  /** List BrokerResource resources by InstanceResource */
  listByResourceGroup: (
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
    resourceGroupName: string,
    instanceName: string,
    brokerName: string,
    options?: BrokerDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a BrokerResource */
  createOrUpdate: (
    resourceGroupName: string,
    instanceName: string,
    brokerName: string,
    resource: BrokerResource,
    options?: BrokerCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<BrokerResource>, BrokerResource>;
  /** Get a BrokerResource */
  get: (
    resourceGroupName: string,
    instanceName: string,
    brokerName: string,
    options?: BrokerGetOptionalParams,
  ) => Promise<BrokerResource>;
}

function _getBroker(context: IoTOperationsContext) {
  return {
    listByResourceGroup: (
      resourceGroupName: string,
      instanceName: string,
      options?: BrokerListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, instanceName, options),
    delete: (
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      options?: BrokerDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, instanceName, brokerName, options),
    createOrUpdate: (
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      resource: BrokerResource,
      options?: BrokerCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, instanceName, brokerName, resource, options),
    get: (
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      options?: BrokerGetOptionalParams,
    ) => get(context, resourceGroupName, instanceName, brokerName, options),
  };
}

export function _getBrokerOperations(context: IoTOperationsContext): BrokerOperations {
  return {
    ..._getBroker(context),
  };
}
