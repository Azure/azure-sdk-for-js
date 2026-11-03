// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementContext } from "../../api/dataFactoryManagementContext.js";
import {
  disableInteractiveQuery,
  enableInteractiveQuery,
} from "../../api/integrationRuntime/operations.js";
import {
  IntegrationRuntimeDisableInteractiveQueryOptionalParams,
  IntegrationRuntimeEnableInteractiveQueryOptionalParams,
} from "../../api/integrationRuntime/options.js";
import { IntegrationRuntimeResource, EnableInteractiveQueryRequest } from "../../models/models.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a IntegrationRuntime operations. */
export interface IntegrationRuntimeOperations {
  /** Disable interactive authoring of Managed Virtual Network integration runtime. */
  disableInteractiveQuery: (
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    options?: IntegrationRuntimeDisableInteractiveQueryOptionalParams,
  ) => PollerLike<OperationState<IntegrationRuntimeResource>, IntegrationRuntimeResource>;
  /** @deprecated use disableInteractiveQuery instead */
  beginDisableInteractiveQuery: (
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    options?: IntegrationRuntimeDisableInteractiveQueryOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<IntegrationRuntimeResource>, IntegrationRuntimeResource>
  >;
  /** @deprecated use disableInteractiveQuery instead */
  beginDisableInteractiveQueryAndWait: (
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    options?: IntegrationRuntimeDisableInteractiveQueryOptionalParams,
  ) => Promise<IntegrationRuntimeResource>;
  /** Enable interactive authoring of Managed Virtual Network integration runtime. */
  enableInteractiveQuery: (
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    enableInteractiveQueryRequest: EnableInteractiveQueryRequest,
    options?: IntegrationRuntimeEnableInteractiveQueryOptionalParams,
  ) => PollerLike<OperationState<IntegrationRuntimeResource>, IntegrationRuntimeResource>;
  /** @deprecated use enableInteractiveQuery instead */
  beginEnableInteractiveQuery: (
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    enableInteractiveQueryRequest: EnableInteractiveQueryRequest,
    options?: IntegrationRuntimeEnableInteractiveQueryOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<IntegrationRuntimeResource>, IntegrationRuntimeResource>
  >;
  /** @deprecated use enableInteractiveQuery instead */
  beginEnableInteractiveQueryAndWait: (
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    enableInteractiveQueryRequest: EnableInteractiveQueryRequest,
    options?: IntegrationRuntimeEnableInteractiveQueryOptionalParams,
  ) => Promise<IntegrationRuntimeResource>;
}

function _getIntegrationRuntime(context: DataFactoryManagementContext) {
  return {
    disableInteractiveQuery: (
      resourceGroupName: string,
      factoryName: string,
      integrationRuntimeName: string,
      options?: IntegrationRuntimeDisableInteractiveQueryOptionalParams,
    ) =>
      disableInteractiveQuery(
        context,
        resourceGroupName,
        factoryName,
        integrationRuntimeName,
        options,
      ),
    beginDisableInteractiveQuery: async (
      resourceGroupName: string,
      factoryName: string,
      integrationRuntimeName: string,
      options?: IntegrationRuntimeDisableInteractiveQueryOptionalParams,
    ) => {
      const poller = disableInteractiveQuery(
        context,
        resourceGroupName,
        factoryName,
        integrationRuntimeName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDisableInteractiveQueryAndWait: async (
      resourceGroupName: string,
      factoryName: string,
      integrationRuntimeName: string,
      options?: IntegrationRuntimeDisableInteractiveQueryOptionalParams,
    ) => {
      return await disableInteractiveQuery(
        context,
        resourceGroupName,
        factoryName,
        integrationRuntimeName,
        options,
      );
    },
    enableInteractiveQuery: (
      resourceGroupName: string,
      factoryName: string,
      integrationRuntimeName: string,
      enableInteractiveQueryRequest: EnableInteractiveQueryRequest,
      options?: IntegrationRuntimeEnableInteractiveQueryOptionalParams,
    ) =>
      enableInteractiveQuery(
        context,
        resourceGroupName,
        factoryName,
        integrationRuntimeName,
        enableInteractiveQueryRequest,
        options,
      ),
    beginEnableInteractiveQuery: async (
      resourceGroupName: string,
      factoryName: string,
      integrationRuntimeName: string,
      enableInteractiveQueryRequest: EnableInteractiveQueryRequest,
      options?: IntegrationRuntimeEnableInteractiveQueryOptionalParams,
    ) => {
      const poller = enableInteractiveQuery(
        context,
        resourceGroupName,
        factoryName,
        integrationRuntimeName,
        enableInteractiveQueryRequest,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginEnableInteractiveQueryAndWait: async (
      resourceGroupName: string,
      factoryName: string,
      integrationRuntimeName: string,
      enableInteractiveQueryRequest: EnableInteractiveQueryRequest,
      options?: IntegrationRuntimeEnableInteractiveQueryOptionalParams,
    ) => {
      return await enableInteractiveQuery(
        context,
        resourceGroupName,
        factoryName,
        integrationRuntimeName,
        enableInteractiveQueryRequest,
        options,
      );
    },
  };
}

export function _getIntegrationRuntimeOperations(
  context: DataFactoryManagementContext,
): IntegrationRuntimeOperations {
  return {
    ..._getIntegrationRuntime(context),
  };
}
