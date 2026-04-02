// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  generateLOA,
  list,
  listByResourceGroup,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/expressRoutePorts/operations.js";
import type {
  ExpressRoutePortsGenerateLOAOptionalParams,
  ExpressRoutePortsListOptionalParams,
  ExpressRoutePortsListByResourceGroupOptionalParams,
  ExpressRoutePortsDeleteOptionalParams,
  ExpressRoutePortsUpdateTagsOptionalParams,
  ExpressRoutePortsCreateOrUpdateOptionalParams,
  ExpressRoutePortsGetOptionalParams,
} from "../../api/expressRoutePorts/options.js";
import type {
  TagsObject,
  ExpressRoutePort,
  GenerateExpressRoutePortsLOARequest,
  GenerateExpressRoutePortsLOAResult,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ExpressRoutePorts operations. */
export interface ExpressRoutePortsOperations {
  /** Generate a letter of authorization for the requested ExpressRoutePort resource. */
  generateLOA: (
    resourceGroupName: string,
    expressRoutePortName: string,
    request: GenerateExpressRoutePortsLOARequest,
    options?: ExpressRoutePortsGenerateLOAOptionalParams,
  ) => Promise<GenerateExpressRoutePortsLOAResult>;
  /** List all the ExpressRoutePort resources in the specified subscription. */
  list: (
    options?: ExpressRoutePortsListOptionalParams,
  ) => PagedAsyncIterableIterator<ExpressRoutePort>;
  /** List all the ExpressRoutePort resources in the specified resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ExpressRoutePortsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ExpressRoutePort>;
  /** Deletes the specified ExpressRoutePort resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    expressRoutePortName: string,
    options?: ExpressRoutePortsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    expressRoutePortName: string,
    options?: ExpressRoutePortsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    expressRoutePortName: string,
    options?: ExpressRoutePortsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update ExpressRoutePort tags. */
  updateTags: (
    resourceGroupName: string,
    expressRoutePortName: string,
    parameters: TagsObject,
    options?: ExpressRoutePortsUpdateTagsOptionalParams,
  ) => Promise<ExpressRoutePort>;
  /** Creates or updates the specified ExpressRoutePort resource. */
  createOrUpdate: (
    resourceGroupName: string,
    expressRoutePortName: string,
    parameters: ExpressRoutePort,
    options?: ExpressRoutePortsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ExpressRoutePort>, ExpressRoutePort>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    expressRoutePortName: string,
    parameters: ExpressRoutePort,
    options?: ExpressRoutePortsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ExpressRoutePort>, ExpressRoutePort>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    expressRoutePortName: string,
    parameters: ExpressRoutePort,
    options?: ExpressRoutePortsCreateOrUpdateOptionalParams,
  ) => Promise<ExpressRoutePort>;
  /** Retrieves the requested ExpressRoutePort resource. */
  get: (
    resourceGroupName: string,
    expressRoutePortName: string,
    options?: ExpressRoutePortsGetOptionalParams,
  ) => Promise<ExpressRoutePort>;
}

function _getExpressRoutePorts(context: NetworkManagementContext) {
  return {
    generateLOA: (
      resourceGroupName: string,
      expressRoutePortName: string,
      request: GenerateExpressRoutePortsLOARequest,
      options?: ExpressRoutePortsGenerateLOAOptionalParams,
    ) => generateLOA(context, resourceGroupName, expressRoutePortName, request, options),
    list: (options?: ExpressRoutePortsListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ExpressRoutePortsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      expressRoutePortName: string,
      options?: ExpressRoutePortsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, expressRoutePortName, options),
    beginDelete: async (
      resourceGroupName: string,
      expressRoutePortName: string,
      options?: ExpressRoutePortsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, expressRoutePortName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      expressRoutePortName: string,
      options?: ExpressRoutePortsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, expressRoutePortName, options);
    },
    updateTags: (
      resourceGroupName: string,
      expressRoutePortName: string,
      parameters: TagsObject,
      options?: ExpressRoutePortsUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, expressRoutePortName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      expressRoutePortName: string,
      parameters: ExpressRoutePort,
      options?: ExpressRoutePortsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, expressRoutePortName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      expressRoutePortName: string,
      parameters: ExpressRoutePort,
      options?: ExpressRoutePortsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        expressRoutePortName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      expressRoutePortName: string,
      parameters: ExpressRoutePort,
      options?: ExpressRoutePortsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        expressRoutePortName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      expressRoutePortName: string,
      options?: ExpressRoutePortsGetOptionalParams,
    ) => get(context, resourceGroupName, expressRoutePortName, options),
  };
}

export function _getExpressRoutePortsOperations(
  context: NetworkManagementContext,
): ExpressRoutePortsOperations {
  return {
    ..._getExpressRoutePorts(context),
  };
}
