// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementContext } from "../../api/dataFactoryManagementContext.js";
import { get, refresh } from "../../api/integrationRuntimeObjectMetadata/operations.js";
import {
  IntegrationRuntimeObjectMetadataGetOptionalParams,
  IntegrationRuntimeObjectMetadataRefreshOptionalParams,
} from "../../api/integrationRuntimeObjectMetadata/options.js";
import {
  SsisObjectMetadataStatusResponse,
  SsisObjectMetadataListResponse,
} from "../../models/models.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

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
  /** @deprecated use refresh instead */
  beginRefresh: (
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    options?: IntegrationRuntimeObjectMetadataRefreshOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<SsisObjectMetadataStatusResponse>,
      SsisObjectMetadataStatusResponse
    >
  >;
  /** @deprecated use refresh instead */
  beginRefreshAndWait: (
    resourceGroupName: string,
    factoryName: string,
    integrationRuntimeName: string,
    options?: IntegrationRuntimeObjectMetadataRefreshOptionalParams,
  ) => Promise<SsisObjectMetadataStatusResponse>;
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
    beginRefresh: async (
      resourceGroupName: string,
      factoryName: string,
      integrationRuntimeName: string,
      options?: IntegrationRuntimeObjectMetadataRefreshOptionalParams,
    ) => {
      const poller = refresh(
        context,
        resourceGroupName,
        factoryName,
        integrationRuntimeName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRefreshAndWait: async (
      resourceGroupName: string,
      factoryName: string,
      integrationRuntimeName: string,
      options?: IntegrationRuntimeObjectMetadataRefreshOptionalParams,
    ) => {
      return await refresh(
        context,
        resourceGroupName,
        factoryName,
        integrationRuntimeName,
        options,
      );
    },
  };
}

export function _getIntegrationRuntimeObjectMetadataOperations(
  context: DataFactoryManagementContext,
): IntegrationRuntimeObjectMetadataOperations {
  return {
    ..._getIntegrationRuntimeObjectMetadata(context),
  };
}
