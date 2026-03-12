// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CloudHealthContext } from "../../api/cloudHealthContext.js";
import { HealthModel, HealthModelUpdate } from "../../models/models.js";
import {
  HealthModelsListBySubscriptionOptionalParams,
  HealthModelsListByResourceGroupOptionalParams,
  HealthModelsDeleteOptionalParams,
  HealthModelsUpdateOptionalParams,
  HealthModelsCreateOptionalParams,
  HealthModelsGetOptionalParams,
} from "../../api/healthModels/options.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/healthModels/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a HealthModels operations. */
export interface HealthModelsOperations {
  /** List HealthModel resources by subscription ID */
  listBySubscription: (
    options?: HealthModelsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<HealthModel>;
  /** List HealthModel resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: HealthModelsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<HealthModel>;
  /** Delete a HealthModel */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    healthModelName: string,
    options?: HealthModelsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a HealthModel */
  update: (
    resourceGroupName: string,
    healthModelName: string,
    properties: HealthModelUpdate,
    options?: HealthModelsUpdateOptionalParams,
  ) => PollerLike<OperationState<HealthModel>, HealthModel>;
  /** Create a HealthModel */
  create: (
    resourceGroupName: string,
    healthModelName: string,
    resource: HealthModel,
    options?: HealthModelsCreateOptionalParams,
  ) => PollerLike<OperationState<HealthModel>, HealthModel>;
  /** Get a HealthModel */
  get: (
    resourceGroupName: string,
    healthModelName: string,
    options?: HealthModelsGetOptionalParams,
  ) => Promise<HealthModel>;
}

function _getHealthModels(context: CloudHealthContext) {
  return {
    listBySubscription: (options?: HealthModelsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: HealthModelsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      healthModelName: string,
      options?: HealthModelsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, healthModelName, options),
    update: (
      resourceGroupName: string,
      healthModelName: string,
      properties: HealthModelUpdate,
      options?: HealthModelsUpdateOptionalParams,
    ) => update(context, resourceGroupName, healthModelName, properties, options),
    create: (
      resourceGroupName: string,
      healthModelName: string,
      resource: HealthModel,
      options?: HealthModelsCreateOptionalParams,
    ) => create(context, resourceGroupName, healthModelName, resource, options),
    get: (
      resourceGroupName: string,
      healthModelName: string,
      options?: HealthModelsGetOptionalParams,
    ) => get(context, resourceGroupName, healthModelName, options),
  };
}

export function _getHealthModelsOperations(context: CloudHealthContext): HealthModelsOperations {
  return {
    ..._getHealthModels(context),
  };
}
