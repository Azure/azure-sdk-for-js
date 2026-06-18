// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTOperationsContext } from "../../api/ioTOperationsContext.js";
import {
  listByResourceGroup,
  $delete,
  createOrUpdate,
  get,
} from "../../api/brokerAuthentication/operations.js";
import {
  BrokerAuthenticationListByResourceGroupOptionalParams,
  BrokerAuthenticationDeleteOptionalParams,
  BrokerAuthenticationCreateOrUpdateOptionalParams,
  BrokerAuthenticationGetOptionalParams,
} from "../../api/brokerAuthentication/options.js";
import { BrokerAuthenticationResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BrokerAuthentication operations. */
export interface BrokerAuthenticationOperations {
  /** List BrokerAuthenticationResource resources by BrokerResource */
  listByResourceGroup: (
    resourceGroupName: string,
    instanceName: string,
    brokerName: string,
    options?: BrokerAuthenticationListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<BrokerAuthenticationResource>;
  /** Delete a BrokerAuthenticationResource */
  delete: (
    resourceGroupName: string,
    instanceName: string,
    brokerName: string,
    authenticationName: string,
    options?: BrokerAuthenticationDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a BrokerAuthenticationResource */
  createOrUpdate: (
    resourceGroupName: string,
    instanceName: string,
    brokerName: string,
    authenticationName: string,
    resource: BrokerAuthenticationResource,
    options?: BrokerAuthenticationCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<BrokerAuthenticationResource>, BrokerAuthenticationResource>;
  /** Get a BrokerAuthenticationResource */
  get: (
    resourceGroupName: string,
    instanceName: string,
    brokerName: string,
    authenticationName: string,
    options?: BrokerAuthenticationGetOptionalParams,
  ) => Promise<BrokerAuthenticationResource>;
}

function _getBrokerAuthentication(context: IoTOperationsContext) {
  return {
    listByResourceGroup: (
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      options?: BrokerAuthenticationListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, instanceName, brokerName, options),
    delete: (
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      authenticationName: string,
      options?: BrokerAuthenticationDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, instanceName, brokerName, authenticationName, options),
    createOrUpdate: (
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      authenticationName: string,
      resource: BrokerAuthenticationResource,
      options?: BrokerAuthenticationCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        instanceName,
        brokerName,
        authenticationName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      authenticationName: string,
      options?: BrokerAuthenticationGetOptionalParams,
    ) => get(context, resourceGroupName, instanceName, brokerName, authenticationName, options),
  };
}

export function _getBrokerAuthenticationOperations(
  context: IoTOperationsContext,
): BrokerAuthenticationOperations {
  return {
    ..._getBrokerAuthentication(context),
  };
}
