// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataFactoryManagementContext } from "../../api/dataFactoryManagementContext.js";
import { get, refresh } from "../../api/integrationRuntimeObjectMetadata/operations.js";
import type {
  IntegrationRuntimeObjectMetadataGetOptionalParams,
  IntegrationRuntimeObjectMetadataRefreshOptionalParams,
} from "../../api/integrationRuntimeObjectMetadata/options.js";
import type {
  SsisObjectMetadataStatusResponse,
  SsisObjectMetadataListResponse,
} from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a IntegrationRuntimeObjectMetadata operations. */
export interface IntegrationRuntimeObjectMetadataOperations {
  /** Get a SSIS integration runtime object metadata by specified path. The return is pageable metadata list. */
  get: (
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    options?: IntegrationRuntimeObjectMetadataGetOptionalParams,
  ) => Promise<SsisObjectMetadataListResponse>;
  /** Refresh a SSIS integration runtime object metadata. */
  refresh: (
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    options?: IntegrationRuntimeObjectMetadataRefreshOptionalParams,
  ) => PollerLike<
    OperationState<SsisObjectMetadataStatusResponse>,
    SsisObjectMetadataStatusResponse
  >;
}

function _getIntegrationRuntimeObjectMetadata(context: DataFactoryManagementContext) {
  return {
    get: (
      resourceGroupName: string,
      factoryName: string,
      integrationRuntimeName: string,
      options?: IntegrationRuntimeObjectMetadataGetOptionalParams,
    ) => get(context, resourceGroupName, factoryName, integrationRuntimeName, options),
    refresh: (
      resourceGroupName: string,
      factoryName: string,
      integrationRuntimeName: string,
      options?: IntegrationRuntimeObjectMetadataRefreshOptionalParams,
    ) => refresh(context, resourceGroupName, factoryName, integrationRuntimeName, options),
  };
}

export function _getIntegrationRuntimeObjectMetadataOperations(
  context: DataFactoryManagementContext,
): IntegrationRuntimeObjectMetadataOperations {
  return {
    ..._getIntegrationRuntimeObjectMetadata(context),
  };
}
