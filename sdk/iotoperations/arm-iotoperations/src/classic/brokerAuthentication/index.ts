// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTOperationsContext } from "../../api/ioTOperationsContext.js";
import {
  brokerAuthenticationGet,
  brokerAuthenticationCreateOrUpdate,
  brokerAuthenticationDelete,
  brokerAuthenticationListByResourceGroup,
} from "../../api/brokerAuthentication/index.js";
import { BrokerAuthenticationResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  BrokerAuthenticationGetOptionalParams,
  BrokerAuthenticationCreateOrUpdateOptionalParams,
  BrokerAuthenticationDeleteOptionalParams,
  BrokerAuthenticationListByResourceGroupOptionalParams,
} from "../../api/options.js";

/** Interface representing a BrokerAuthentication operations. */
export interface BrokerAuthenticationOperations {
  /** Get a BrokerAuthenticationResource */
  get: (
    resourceGroupName: string,
    instanceName: string,
    brokerName: string,
    authenticationName: string,
    options?: BrokerAuthenticationGetOptionalParams,
  ) => Promise<BrokerAuthenticationResource>;
  /** Create a BrokerAuthenticationResource */
  createOrUpdate: (
    resourceGroupName: string,
    instanceName: string,
    brokerName: string,
    authenticationName: string,
    resource: BrokerAuthenticationResource,
    options?: BrokerAuthenticationCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<BrokerAuthenticationResource>,
    BrokerAuthenticationResource
  >;
  /** Delete a BrokerAuthenticationResource */
  delete: (
    resourceGroupName: string,
    instanceName: string,
    brokerName: string,
    authenticationName: string,
    options?: BrokerAuthenticationDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List BrokerAuthenticationResource resources by BrokerResource */
  listByResourceGroup: (
    resourceGroupName: string,
    instanceName: string,
    brokerName: string,
    options?: BrokerAuthenticationListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<BrokerAuthenticationResource>;
}

export function getBrokerAuthentication(
  context: IoTOperationsContext,
  subscriptionId: string,
) {
  return {
    get: (
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      authenticationName: string,
      options?: BrokerAuthenticationGetOptionalParams,
    ) =>
      brokerAuthenticationGet(
        context,
        subscriptionId,
        resourceGroupName,
        instanceName,
        brokerName,
        authenticationName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      authenticationName: string,
      resource: BrokerAuthenticationResource,
      options?: BrokerAuthenticationCreateOrUpdateOptionalParams,
    ) =>
      brokerAuthenticationCreateOrUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        instanceName,
        brokerName,
        authenticationName,
        resource,
        options,
      ),
    delete: (
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      authenticationName: string,
      options?: BrokerAuthenticationDeleteOptionalParams,
    ) =>
      brokerAuthenticationDelete(
        context,
        subscriptionId,
        resourceGroupName,
        instanceName,
        brokerName,
        authenticationName,
        options,
      ),
    listByResourceGroup: (
      resourceGroupName: string,
      instanceName: string,
      brokerName: string,
      options?: BrokerAuthenticationListByResourceGroupOptionalParams,
    ) =>
      brokerAuthenticationListByResourceGroup(
        context,
        subscriptionId,
        resourceGroupName,
        instanceName,
        brokerName,
        options,
      ),
  };
}

export function getBrokerAuthenticationOperations(
  context: IoTOperationsContext,
  subscriptionId: string,
): BrokerAuthenticationOperations {
  return {
    ...getBrokerAuthentication(context, subscriptionId),
  };
}
