// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ElasticSanContext } from "../../api/elasticSanContext.js";
import { listByElasticSan } from "../../api/privateLinkResources/operations.js";
import type { PrivateLinkResourcesListByElasticSanOptionalParams } from "../../api/privateLinkResources/options.js";
import type { PrivateLinkResourceListResult } from "../../models/models.js";

/** Interface representing a PrivateLinkResources operations. */
export interface PrivateLinkResourcesOperations {
  /** Gets the private link resources that need to be created for a elastic San. */
  listByElasticSan: (
    resourceGroupName: string,
    elasticSanName: string,
    options?: PrivateLinkResourcesListByElasticSanOptionalParams,
  ) => Promise<PrivateLinkResourceListResult>;
}

function _getPrivateLinkResources(context: ElasticSanContext) {
  return {
    listByElasticSan: (
      resourceGroupName: string,
      elasticSanName: string,
      options?: PrivateLinkResourcesListByElasticSanOptionalParams,
    ) => listByElasticSan(context, resourceGroupName, elasticSanName, options),
  };
}

export function _getPrivateLinkResourcesOperations(
  context: ElasticSanContext,
): PrivateLinkResourcesOperations {
  return {
    ..._getPrivateLinkResources(context),
  };
}
