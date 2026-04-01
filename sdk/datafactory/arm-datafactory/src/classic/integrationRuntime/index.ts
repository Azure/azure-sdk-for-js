// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataFactoryManagementContext } from "../../api/dataFactoryManagementContext.js";
import {
  disableInteractiveQuery,
  enableInteractiveQuery,
} from "../../api/integrationRuntime/operations.js";
import type {
  IntegrationRuntimeDisableInteractiveQueryOptionalParams,
  IntegrationRuntimeEnableInteractiveQueryOptionalParams,
} from "../../api/integrationRuntime/options.js";
import type {
  IntegrationRuntimeResource,
  EnableInteractiveQueryRequest,
} from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a IntegrationRuntime operations. */
export interface IntegrationRuntimeOperations {
  /** Disable interactive authoring of Managed Virtual Network integration runtime. */
  disableInteractiveQuery: (
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    options?: IntegrationRuntimeDisableInteractiveQueryOptionalParams,
  ) => PollerLike<OperationState<IntegrationRuntimeResource>, IntegrationRuntimeResource>;
  /** Enable interactive authoring of Managed Virtual Network integration runtime. */
  enableInteractiveQuery: (
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    enableInteractiveQueryRequest: EnableInteractiveQueryRequest,
    options?: IntegrationRuntimeEnableInteractiveQueryOptionalParams,
  ) => PollerLike<OperationState<IntegrationRuntimeResource>, IntegrationRuntimeResource>;
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
  };
}

export function _getIntegrationRuntimeOperations(
  context: DataFactoryManagementContext,
): IntegrationRuntimeOperations {
  return {
    ..._getIntegrationRuntime(context),
  };
}
