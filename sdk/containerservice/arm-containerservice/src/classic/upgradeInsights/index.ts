// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext } from "../../api/containerServiceContext.js";
import { generate, list, get } from "../../api/upgradeInsights/operations.js";
import type {
  UpgradeInsightsGenerateOptionalParams,
  UpgradeInsightsListOptionalParams,
  UpgradeInsightsGetOptionalParams,
} from "../../api/upgradeInsights/options.js";
import type { UpgradeInsight, GenerateUpgradeInsightsContentUnion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a UpgradeInsights operations. */
export interface UpgradeInsightsOperations {
  /**
   * Generates (or refreshes) an upgrade readiness evaluation for the managed cluster.
   * The requested scope and target version(s) are supplied in the request body; the
   * server runs the readiness checks — the control plane Kubernetes version upgrade, a
   * single agent pool Kubernetes version upgrade, a single agent pool node OS image
   * upgrade, or the combined control plane and agent pools upgrade — persists the result
   * as an UpgradeInsight resource with a server-generated name, and returns that
   * resource. The response body is identical to a subsequent GET of the resource.
   */
  generate: (
    resourceGroupName: string,
    resourceName: string,
    body: GenerateUpgradeInsightsContentUnion,
    options?: UpgradeInsightsGenerateOptionalParams,
  ) => Promise<UpgradeInsight>;
  /**
   * Lists the stored upgrade insights for the specified managed cluster, one entry per
   * scope that has been generated and not yet expired. This is a read-only operation and
   * does not regenerate any evaluation.
   */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: UpgradeInsightsListOptionalParams,
  ) => PagedAsyncIterableIterator<UpgradeInsight>;
  /**
   * Gets a stored upgrade insight for the managed cluster by its server-generated name.
   * This is a read-only operation: it returns the most recently generated readiness
   * evaluation for that scope from the data store, including the detected
   * upgrade-blocking issues and contextual upgrade information. It does not regenerate
   * the evaluation. If no non-expired evaluation exists for the name, it returns 404.
   */
  get: (
    resourceGroupName: string,
    resourceName: string,
    upgradeInsightName: string,
    options?: UpgradeInsightsGetOptionalParams,
  ) => Promise<UpgradeInsight>;
}

function _getUpgradeInsights(context: ContainerServiceContext) {
  return {
    generate: (
      resourceGroupName: string,
      resourceName: string,
      body: GenerateUpgradeInsightsContentUnion,
      options?: UpgradeInsightsGenerateOptionalParams,
    ) => generate(context, resourceGroupName, resourceName, body, options),
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: UpgradeInsightsListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    get: (
      resourceGroupName: string,
      resourceName: string,
      upgradeInsightName: string,
      options?: UpgradeInsightsGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, upgradeInsightName, options),
  };
}

export function _getUpgradeInsightsOperations(
  context: ContainerServiceContext,
): UpgradeInsightsOperations {
  return {
    ..._getUpgradeInsights(context),
  };
}
