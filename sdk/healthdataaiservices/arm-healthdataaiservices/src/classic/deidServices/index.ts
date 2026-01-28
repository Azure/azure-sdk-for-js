// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthDataAIServicesContext } from "../../api/healthDataAIServicesContext.js";
import {
  $delete,
  update,
  create,
  listBySubscription,
  listByResourceGroup,
  get,
} from "../../api/deidServices/operations.js";
import {
  DeidServicesDeleteOptionalParams,
  DeidServicesUpdateOptionalParams,
  DeidServicesCreateOptionalParams,
  DeidServicesListBySubscriptionOptionalParams,
  DeidServicesListByResourceGroupOptionalParams,
  DeidServicesGetOptionalParams,
} from "../../api/deidServices/options.js";
import { DeidService, DeidUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DeidServices operations. */
export interface DeidServicesOperations {
  /** Delete a DeidService */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    deidServiceName: string,
    options?: DeidServicesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a DeidService */
  update: (
    resourceGroupName: string,
    deidServiceName: string,
    properties: DeidUpdate,
    options?: DeidServicesUpdateOptionalParams,
  ) => PollerLike<OperationState<DeidService>, DeidService>;
  /** Create a DeidService */
  create: (
    resourceGroupName: string,
    deidServiceName: string,
    resource: DeidService,
    options?: DeidServicesCreateOptionalParams,
  ) => PollerLike<OperationState<DeidService>, DeidService>;
  /** List DeidService resources by subscription ID */
  listBySubscription: (
    options?: DeidServicesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<DeidService>;
  /** List DeidService resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: DeidServicesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<DeidService>;
  /** Get a DeidService */
  get: (
    resourceGroupName: string,
    deidServiceName: string,
    options?: DeidServicesGetOptionalParams,
  ) => Promise<DeidService>;
}

function _getDeidServices(context: HealthDataAIServicesContext) {
  return {
    delete: (
      resourceGroupName: string,
      deidServiceName: string,
      options?: DeidServicesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, deidServiceName, options),
    update: (
      resourceGroupName: string,
      deidServiceName: string,
      properties: DeidUpdate,
      options?: DeidServicesUpdateOptionalParams,
    ) => update(context, resourceGroupName, deidServiceName, properties, options),
    create: (
      resourceGroupName: string,
      deidServiceName: string,
      resource: DeidService,
      options?: DeidServicesCreateOptionalParams,
    ) => create(context, resourceGroupName, deidServiceName, resource, options),
    listBySubscription: (options?: DeidServicesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: DeidServicesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    get: (
      resourceGroupName: string,
      deidServiceName: string,
      options?: DeidServicesGetOptionalParams,
    ) => get(context, resourceGroupName, deidServiceName, options),
  };
}

export function _getDeidServicesOperations(
  context: HealthDataAIServicesContext,
): DeidServicesOperations {
  return {
    ..._getDeidServices(context),
  };
}
