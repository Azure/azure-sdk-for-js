// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureTrafficCollectorContext } from "../../api/azureTrafficCollectorContext.js";
import {
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/azureTrafficCollectors/operations.js";
import type {
  AzureTrafficCollectorsDeleteOptionalParams,
  AzureTrafficCollectorsUpdateTagsOptionalParams,
  AzureTrafficCollectorsCreateOrUpdateOptionalParams,
  AzureTrafficCollectorsGetOptionalParams,
} from "../../api/azureTrafficCollectors/options.js";
import type { AzureTrafficCollector, TagsObject } from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AzureTrafficCollectors operations. */
export interface AzureTrafficCollectorsOperations {
  /** Deletes a specified Azure Traffic Collector resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    azureTrafficCollectorName: string,
    options?: AzureTrafficCollectorsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    azureTrafficCollectorName: string,
    options?: AzureTrafficCollectorsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    azureTrafficCollectorName: string,
    options?: AzureTrafficCollectorsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the specified Azure Traffic Collector tags. */
  updateTags: (
    resourceGroupName: string,
    azureTrafficCollectorName: string,
    parameters: TagsObject,
    options?: AzureTrafficCollectorsUpdateTagsOptionalParams,
  ) => Promise<AzureTrafficCollector>;
  /** Creates or updates a Azure Traffic Collector resource */
  createOrUpdate: (
    resourceGroupName: string,
    azureTrafficCollectorName: string,
    parameters: AzureTrafficCollector,
    options?: AzureTrafficCollectorsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AzureTrafficCollector>, AzureTrafficCollector>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    azureTrafficCollectorName: string,
    parameters: AzureTrafficCollector,
    options?: AzureTrafficCollectorsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AzureTrafficCollector>, AzureTrafficCollector>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    azureTrafficCollectorName: string,
    parameters: AzureTrafficCollector,
    options?: AzureTrafficCollectorsCreateOrUpdateOptionalParams,
  ) => Promise<AzureTrafficCollector>;
  /** Gets the specified Azure Traffic Collector in a specified resource group */
  get: (
    resourceGroupName: string,
    azureTrafficCollectorName: string,
    options?: AzureTrafficCollectorsGetOptionalParams,
  ) => Promise<AzureTrafficCollector>;
}

function _getAzureTrafficCollectors(context: AzureTrafficCollectorContext) {
  return {
    delete: (
      resourceGroupName: string,
      azureTrafficCollectorName: string,
      options?: AzureTrafficCollectorsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, azureTrafficCollectorName, options),
    beginDelete: async (
      resourceGroupName: string,
      azureTrafficCollectorName: string,
      options?: AzureTrafficCollectorsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, azureTrafficCollectorName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      azureTrafficCollectorName: string,
      options?: AzureTrafficCollectorsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, azureTrafficCollectorName, options);
    },
    updateTags: (
      resourceGroupName: string,
      azureTrafficCollectorName: string,
      parameters: TagsObject,
      options?: AzureTrafficCollectorsUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, azureTrafficCollectorName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      azureTrafficCollectorName: string,
      parameters: AzureTrafficCollector,
      options?: AzureTrafficCollectorsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, azureTrafficCollectorName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      azureTrafficCollectorName: string,
      parameters: AzureTrafficCollector,
      options?: AzureTrafficCollectorsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        azureTrafficCollectorName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      azureTrafficCollectorName: string,
      parameters: AzureTrafficCollector,
      options?: AzureTrafficCollectorsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        azureTrafficCollectorName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      azureTrafficCollectorName: string,
      options?: AzureTrafficCollectorsGetOptionalParams,
    ) => get(context, resourceGroupName, azureTrafficCollectorName, options),
  };
}

export function _getAzureTrafficCollectorsOperations(
  context: AzureTrafficCollectorContext,
): AzureTrafficCollectorsOperations {
  return {
    ..._getAzureTrafficCollectors(context),
  };
}
