// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ElasticSanContext } from "../../api/elasticSanContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/elasticSans/operations.js";
import type {
  ElasticSansListBySubscriptionOptionalParams,
  ElasticSansListByResourceGroupOptionalParams,
  ElasticSansDeleteOptionalParams,
  ElasticSansUpdateOptionalParams,
  ElasticSansCreateOptionalParams,
  ElasticSansGetOptionalParams,
} from "../../api/elasticSans/options.js";
import type { ElasticSan, ElasticSanUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ElasticSans operations. */
export interface ElasticSansOperations {
  /** Gets a list of ElasticSans in a subscription */
  listBySubscription: (
    options?: ElasticSansListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ElasticSan>;
  /** Gets a list of ElasticSan in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ElasticSansListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ElasticSan>;
  /** Delete a Elastic San. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    elasticSanName: string,
    options?: ElasticSansDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a Elastic San. */
  update: (
    resourceGroupName: string,
    elasticSanName: string,
    parameters: ElasticSanUpdate,
    options?: ElasticSansUpdateOptionalParams,
  ) => PollerLike<OperationState<ElasticSan>, ElasticSan>;
  /** Create ElasticSan. */
  create: (
    resourceGroupName: string,
    elasticSanName: string,
    parameters: ElasticSan,
    options?: ElasticSansCreateOptionalParams,
  ) => PollerLike<OperationState<ElasticSan>, ElasticSan>;
  /** Get a ElasticSan. */
  get: (
    resourceGroupName: string,
    elasticSanName: string,
    options?: ElasticSansGetOptionalParams,
  ) => Promise<ElasticSan>;
}

function _getElasticSans(context: ElasticSanContext) {
  return {
    listBySubscription: (options?: ElasticSansListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ElasticSansListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      elasticSanName: string,
      options?: ElasticSansDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, elasticSanName, options),
    update: (
      resourceGroupName: string,
      elasticSanName: string,
      parameters: ElasticSanUpdate,
      options?: ElasticSansUpdateOptionalParams,
    ) => update(context, resourceGroupName, elasticSanName, parameters, options),
    create: (
      resourceGroupName: string,
      elasticSanName: string,
      parameters: ElasticSan,
      options?: ElasticSansCreateOptionalParams,
    ) => create(context, resourceGroupName, elasticSanName, parameters, options),
    get: (
      resourceGroupName: string,
      elasticSanName: string,
      options?: ElasticSansGetOptionalParams,
    ) => get(context, resourceGroupName, elasticSanName, options),
  };
}

export function _getElasticSansOperations(context: ElasticSanContext): ElasticSansOperations {
  return {
    ..._getElasticSans(context),
  };
}
