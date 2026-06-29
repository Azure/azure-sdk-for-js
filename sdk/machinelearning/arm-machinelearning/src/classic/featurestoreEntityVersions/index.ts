// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/featurestoreEntityVersions/operations.js";
import type {
  FeaturestoreEntityVersionsListOptionalParams,
  FeaturestoreEntityVersionsDeleteOptionalParams,
  FeaturestoreEntityVersionsCreateOrUpdateOptionalParams,
  FeaturestoreEntityVersionsGetOptionalParams,
} from "../../api/featurestoreEntityVersions/options.js";
import type { FeaturestoreEntityVersion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FeaturestoreEntityVersions operations. */
export interface FeaturestoreEntityVersionsOperations {
  /** List versions. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: FeaturestoreEntityVersionsListOptionalParams,
  ) => PagedAsyncIterableIterator<FeaturestoreEntityVersion>;
  /** Delete version. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    options?: FeaturestoreEntityVersionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    options?: FeaturestoreEntityVersionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    options?: FeaturestoreEntityVersionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update version. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    body: FeaturestoreEntityVersion,
    options?: FeaturestoreEntityVersionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<FeaturestoreEntityVersion>, FeaturestoreEntityVersion>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    body: FeaturestoreEntityVersion,
    options?: FeaturestoreEntityVersionsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<FeaturestoreEntityVersion>, FeaturestoreEntityVersion>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    body: FeaturestoreEntityVersion,
    options?: FeaturestoreEntityVersionsCreateOrUpdateOptionalParams,
  ) => Promise<FeaturestoreEntityVersion>;
  /** Get version. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    options?: FeaturestoreEntityVersionsGetOptionalParams,
  ) => Promise<FeaturestoreEntityVersion>;
}

function _getFeaturestoreEntityVersions(context: AzureMachineLearningServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: FeaturestoreEntityVersionsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, name, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      options?: FeaturestoreEntityVersionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, name, version, options),
    beginDelete: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      options?: FeaturestoreEntityVersionsDeleteOptionalParams,
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
      options?: FeaturestoreEntityVersionsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, workspaceName, name, version, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      body: FeaturestoreEntityVersion,
      options?: FeaturestoreEntityVersionsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, name, version, body, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      body: FeaturestoreEntityVersion,
      options?: FeaturestoreEntityVersionsCreateOrUpdateOptionalParams,
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
      body: FeaturestoreEntityVersion,
      options?: FeaturestoreEntityVersionsCreateOrUpdateOptionalParams,
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
      options?: FeaturestoreEntityVersionsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, name, version, options),
  };
}

export function _getFeaturestoreEntityVersionsOperations(
  context: AzureMachineLearningServicesManagementContext,
): FeaturestoreEntityVersionsOperations {
  return {
    ..._getFeaturestoreEntityVersions(context),
  };
}
