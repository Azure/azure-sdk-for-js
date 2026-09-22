// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import {
  backfill,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/featuresetVersions/operations.js";
import type {
  FeaturesetVersionsBackfillOptionalParams,
  FeaturesetVersionsListOptionalParams,
  FeaturesetVersionsDeleteOptionalParams,
  FeaturesetVersionsCreateOrUpdateOptionalParams,
  FeaturesetVersionsGetOptionalParams,
} from "../../api/featuresetVersions/options.js";
import type {
  FeaturesetVersion,
  FeaturesetVersionBackfillRequest,
  FeaturesetVersionBackfillResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FeaturesetVersions operations. */
export interface FeaturesetVersionsOperations {
  /** Backfill. */
  backfill: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    body: FeaturesetVersionBackfillRequest,
    options?: FeaturesetVersionsBackfillOptionalParams,
  ) => PollerLike<
    OperationState<FeaturesetVersionBackfillResponse>,
    FeaturesetVersionBackfillResponse
  >;
  /** @deprecated use backfill instead */
  beginBackfill: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    body: FeaturesetVersionBackfillRequest,
    options?: FeaturesetVersionsBackfillOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<FeaturesetVersionBackfillResponse>,
      FeaturesetVersionBackfillResponse
    >
  >;
  /** @deprecated use backfill instead */
  beginBackfillAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    body: FeaturesetVersionBackfillRequest,
    options?: FeaturesetVersionsBackfillOptionalParams,
  ) => Promise<FeaturesetVersionBackfillResponse>;
  /** List versions. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: FeaturesetVersionsListOptionalParams,
  ) => PagedAsyncIterableIterator<FeaturesetVersion>;
  /** Delete version. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    options?: FeaturesetVersionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    options?: FeaturesetVersionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    options?: FeaturesetVersionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update version. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    body: FeaturesetVersion,
    options?: FeaturesetVersionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<FeaturesetVersion>, FeaturesetVersion>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    body: FeaturesetVersion,
    options?: FeaturesetVersionsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<FeaturesetVersion>, FeaturesetVersion>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    body: FeaturesetVersion,
    options?: FeaturesetVersionsCreateOrUpdateOptionalParams,
  ) => Promise<FeaturesetVersion>;
  /** Get version. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    options?: FeaturesetVersionsGetOptionalParams,
  ) => Promise<FeaturesetVersion>;
}

function _getFeaturesetVersions(context: AzureMachineLearningServicesManagementContext) {
  return {
    backfill: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      body: FeaturesetVersionBackfillRequest,
      options?: FeaturesetVersionsBackfillOptionalParams,
    ) => backfill(context, resourceGroupName, workspaceName, name, version, body, options),
    beginBackfill: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      body: FeaturesetVersionBackfillRequest,
      options?: FeaturesetVersionsBackfillOptionalParams,
    ) => {
      const poller = backfill(
        context,
        resourceGroupName,
        workspaceName,
        name,
        version,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginBackfillAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      body: FeaturesetVersionBackfillRequest,
      options?: FeaturesetVersionsBackfillOptionalParams,
    ) => {
      return await backfill(
        context,
        resourceGroupName,
        workspaceName,
        name,
        version,
        body,
        options,
      );
    },
    list: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: FeaturesetVersionsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, name, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      options?: FeaturesetVersionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, name, version, options),
    beginDelete: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      options?: FeaturesetVersionsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, workspaceName, name, version, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      options?: FeaturesetVersionsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, workspaceName, name, version, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      body: FeaturesetVersion,
      options?: FeaturesetVersionsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, name, version, body, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      body: FeaturesetVersion,
      options?: FeaturesetVersionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        name,
        version,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      body: FeaturesetVersion,
      options?: FeaturesetVersionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        name,
        version,
        body,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      options?: FeaturesetVersionsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, name, version, options),
  };
}

export function _getFeaturesetVersionsOperations(
  context: AzureMachineLearningServicesManagementContext,
): FeaturesetVersionsOperations {
  return {
    ..._getFeaturesetVersions(context),
  };
}
