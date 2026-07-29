// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import { list, get } from "../../api/features/operations.js";
import type {
  FeaturesListOptionalParams,
  FeaturesGetOptionalParams,
} from "../../api/features/options.js";
import type { Feature } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Features operations. */
export interface FeaturesOperations {
  /** List Features. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    featuresetName: string,
    featuresetVersion: string,
    options?: FeaturesListOptionalParams,
  ) => PagedAsyncIterableIterator<Feature>;
  /** Get feature. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    featuresetName: string,
    featuresetVersion: string,
    featureName: string,
    options?: FeaturesGetOptionalParams,
  ) => Promise<Feature>;
}

function _getFeatures(context: AzureMachineLearningServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      featuresetName: string,
      featuresetVersion: string,
      options?: FeaturesListOptionalParams,
    ) =>
      list(context, resourceGroupName, workspaceName, featuresetName, featuresetVersion, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      featuresetName: string,
      featuresetVersion: string,
      featureName: string,
      options?: FeaturesGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        workspaceName,
        featuresetName,
        featuresetVersion,
        featureName,
        options,
      ),
  };
}

export function _getFeaturesOperations(
  context: AzureMachineLearningServicesManagementContext,
): FeaturesOperations {
  return {
    ..._getFeatures(context),
  };
}
