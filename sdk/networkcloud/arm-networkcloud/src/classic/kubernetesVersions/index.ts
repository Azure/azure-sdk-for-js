// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudContext } from "../../api/networkCloudContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/kubernetesVersions/operations.js";
import {
  KubernetesVersionsListBySubscriptionOptionalParams,
  KubernetesVersionsListByResourceGroupOptionalParams,
  KubernetesVersionsDeleteOptionalParams,
  KubernetesVersionsUpdateOptionalParams,
  KubernetesVersionsCreateOrUpdateOptionalParams,
  KubernetesVersionsGetOptionalParams,
} from "../../api/kubernetesVersions/options.js";
import { OperationStatusResult, KubernetesVersion } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a KubernetesVersions operations. */
export interface KubernetesVersionsOperations {
  /** Get a list of Kubernetes version resources in the provided subscription. */
  listBySubscription: (
    options?: KubernetesVersionsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<KubernetesVersion>;
  /** Get a list of Kubernetes version resources in the provided resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: KubernetesVersionsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<KubernetesVersion>;
  /** Delete the specified Kubernetes version resource. */
  delete: (
    resourceGroupName: string,
    kubernetesVersionName: string,
    options?: KubernetesVersionsDeleteOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    kubernetesVersionName: string,
    options?: KubernetesVersionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    kubernetesVersionName: string,
    options?: KubernetesVersionsDeleteOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Update tags associated with the Kubernetes version resource. No other properties are supported for update. */
  update: (
    resourceGroupName: string,
    kubernetesVersionName: string,
    options?: KubernetesVersionsUpdateOptionalParams,
  ) => PollerLike<OperationState<KubernetesVersion>, KubernetesVersion>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    kubernetesVersionName: string,
    options?: KubernetesVersionsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<KubernetesVersion>, KubernetesVersion>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    kubernetesVersionName: string,
    options?: KubernetesVersionsUpdateOptionalParams,
  ) => Promise<KubernetesVersion>;
  /** Create the Kubernetes version resource or update its tags. This resource is system managed and should only be created with the name "default". */
  createOrUpdate: (
    resourceGroupName: string,
    kubernetesVersionName: string,
    kubernetesVersionParameters: KubernetesVersion,
    options?: KubernetesVersionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<KubernetesVersion>, KubernetesVersion>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    kubernetesVersionName: string,
    kubernetesVersionParameters: KubernetesVersion,
    options?: KubernetesVersionsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<KubernetesVersion>, KubernetesVersion>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    kubernetesVersionName: string,
    kubernetesVersionParameters: KubernetesVersion,
    options?: KubernetesVersionsCreateOrUpdateOptionalParams,
  ) => Promise<KubernetesVersion>;
  /** Retrieve the Kubernetes version resource that describes the available Kubernetes versions for deployment. */
  get: (
    resourceGroupName: string,
    kubernetesVersionName: string,
    options?: KubernetesVersionsGetOptionalParams,
  ) => Promise<KubernetesVersion>;
}

function _getKubernetesVersions(context: NetworkCloudContext) {
  return {
    listBySubscription: (options?: KubernetesVersionsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: KubernetesVersionsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      kubernetesVersionName: string,
      options?: KubernetesVersionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, kubernetesVersionName, options),
    beginDelete: async (
      resourceGroupName: string,
      kubernetesVersionName: string,
      options?: KubernetesVersionsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, kubernetesVersionName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      kubernetesVersionName: string,
      options?: KubernetesVersionsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, kubernetesVersionName, options);
    },
    update: (
      resourceGroupName: string,
      kubernetesVersionName: string,
      options?: KubernetesVersionsUpdateOptionalParams,
    ) => update(context, resourceGroupName, kubernetesVersionName, options),
    beginUpdate: async (
      resourceGroupName: string,
      kubernetesVersionName: string,
      options?: KubernetesVersionsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, kubernetesVersionName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      kubernetesVersionName: string,
      options?: KubernetesVersionsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, kubernetesVersionName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      kubernetesVersionName: string,
      kubernetesVersionParameters: KubernetesVersion,
      options?: KubernetesVersionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        kubernetesVersionName,
        kubernetesVersionParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      kubernetesVersionName: string,
      kubernetesVersionParameters: KubernetesVersion,
      options?: KubernetesVersionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        kubernetesVersionName,
        kubernetesVersionParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      kubernetesVersionName: string,
      kubernetesVersionParameters: KubernetesVersion,
      options?: KubernetesVersionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        kubernetesVersionName,
        kubernetesVersionParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      kubernetesVersionName: string,
      options?: KubernetesVersionsGetOptionalParams,
    ) => get(context, resourceGroupName, kubernetesVersionName, options),
  };
}

export function _getKubernetesVersionsOperations(
  context: NetworkCloudContext,
): KubernetesVersionsOperations {
  return {
    ..._getKubernetesVersions(context),
  };
}
