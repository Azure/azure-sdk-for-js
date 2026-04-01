// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataFactoryManagementContext } from "../../api/dataFactoryManagementContext.js";
import {
  getIpAddress,
  update,
  $delete,
  get,
} from "../../api/integrationRuntimeNodes/operations.js";
import type {
  IntegrationRuntimeNodesGetIpAddressOptionalParams,
  IntegrationRuntimeNodesUpdateOptionalParams,
  IntegrationRuntimeNodesDeleteOptionalParams,
  IntegrationRuntimeNodesGetOptionalParams,
} from "../../api/integrationRuntimeNodes/options.js";
import type {
  SelfHostedIntegrationRuntimeNode,
  UpdateIntegrationRuntimeNodeRequest,
  IntegrationRuntimeNodeIpAddress,
} from "../../models/models.js";

/** Interface representing a IntegrationRuntimeNodes operations. */
export interface IntegrationRuntimeNodesOperations {
  /** Get the IP address of self-hosted integration runtime node. */
  getIpAddress: (
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    nodeName: string,
    options?: IntegrationRuntimeNodesGetIpAddressOptionalParams,
  ) => Promise<IntegrationRuntimeNodeIpAddress>;
  /** Updates a self-hosted integration runtime node. */
  update: (
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    nodeName: string,
    updateIntegrationRuntimeNodeRequest: UpdateIntegrationRuntimeNodeRequest,
    options?: IntegrationRuntimeNodesUpdateOptionalParams,
  ) => Promise<SelfHostedIntegrationRuntimeNode>;
  /** Deletes a self-hosted integration runtime node. */
  /**
   *  @fixme Delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    nodeName: string,
    options?: IntegrationRuntimeNodesDeleteOptionalParams,
  ) => Promise<void>;
  /** Gets a self-hosted integration runtime node. */
  get: (
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    nodeName: string,
    options?: IntegrationRuntimeNodesGetOptionalParams,
  ) => Promise<SelfHostedIntegrationRuntimeNode>;
}

function _getIntegrationRuntimeNodes(context: DataFactoryManagementContext) {
  return {
    getIpAddress: (
      resourceGroupName: string,
      factoryName: string,
      integrationRuntimeName: string,
      nodeName: string,
      options?: IntegrationRuntimeNodesGetIpAddressOptionalParams,
    ) =>
      getIpAddress(
        context,
        resourceGroupName,
        factoryName,
        integrationRuntimeName,
        nodeName,
        options,
      ),
    update: (
      resourceGroupName: string,
      factoryName: string,
      integrationRuntimeName: string,
      nodeName: string,
      updateIntegrationRuntimeNodeRequest: UpdateIntegrationRuntimeNodeRequest,
      options?: IntegrationRuntimeNodesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        factoryName,
        integrationRuntimeName,
        nodeName,
        updateIntegrationRuntimeNodeRequest,
        options,
      ),
    delete: (
      resourceGroupName: string,
      factoryName: string,
      integrationRuntimeName: string,
      nodeName: string,
      options?: IntegrationRuntimeNodesDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, factoryName, integrationRuntimeName, nodeName, options),
    get: (
      resourceGroupName: string,
      factoryName: string,
      integrationRuntimeName: string,
      nodeName: string,
      options?: IntegrationRuntimeNodesGetOptionalParams,
    ) => get(context, resourceGroupName, factoryName, integrationRuntimeName, nodeName, options),
  };
}

export function _getIntegrationRuntimeNodesOperations(
  context: DataFactoryManagementContext,
): IntegrationRuntimeNodesOperations {
  return {
    ..._getIntegrationRuntimeNodes(context),
  };
}
