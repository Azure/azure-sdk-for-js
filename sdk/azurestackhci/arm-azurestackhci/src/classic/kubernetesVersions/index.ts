// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import { listBySubscriptionLocationResource } from "../../api/kubernetesVersions/operations.js";
import { KubernetesVersionsListBySubscriptionLocationResourceOptionalParams } from "../../api/kubernetesVersions/options.js";
import { KubernetesVersion } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a KubernetesVersions operations. */
export interface KubernetesVersionsOperations {
  /** List all kubernetes versions. */
  listBySubscriptionLocationResource: (
    location: string,
    options?: KubernetesVersionsListBySubscriptionLocationResourceOptionalParams,
  ) => PagedAsyncIterableIterator<KubernetesVersion>;
}

function _getKubernetesVersions(context: AzureStackHCIContext) {
  return {
    listBySubscriptionLocationResource: (
      location: string,
      options?: KubernetesVersionsListBySubscriptionLocationResourceOptionalParams,
    ) => listBySubscriptionLocationResource(context, location, options),
  };
}

export function _getKubernetesVersionsOperations(
  context: AzureStackHCIContext,
): KubernetesVersionsOperations {
  return {
    ..._getKubernetesVersions(context),
  };
}
