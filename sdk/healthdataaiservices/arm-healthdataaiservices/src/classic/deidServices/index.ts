// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthDataAIServicesContext } from "../../api/healthDataAIServicesContext.js";
import {
  deidServicesGet,
  deidServicesListByResourceGroup,
  deidServicesListBySubscription,
  deidServicesCreate,
  deidServicesUpdate,
  deidServicesDelete,
} from "../../api/deidServices/index.js";
import { DeidService, DeidUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  DeidServicesGetOptionalParams,
  DeidServicesListByResourceGroupOptionalParams,
  DeidServicesListBySubscriptionOptionalParams,
  DeidServicesCreateOptionalParams,
  DeidServicesUpdateOptionalParams,
  DeidServicesDeleteOptionalParams,
} from "../../api/options.js";

/** Interface representing a DeidServices operations. */
export interface DeidServicesOperations {
  /** Get a DeidService */
  get: (
    resourceGroupName: string,
    deidServiceName: string,
    options?: DeidServicesGetOptionalParams,
  ) => Promise<DeidService>;
  /** List DeidService resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: DeidServicesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<DeidService>;
  /** List DeidService resources by subscription ID */
  listBySubscription: (
    options?: DeidServicesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<DeidService>;
  /** Create a DeidService */
  create: (
    resourceGroupName: string,
    deidServiceName: string,
    resource: DeidService,
    options?: DeidServicesCreateOptionalParams,
  ) => PollerLike<OperationState<DeidService>, DeidService>;
  /** Update a DeidService */
  update: (
    resourceGroupName: string,
    deidServiceName: string,
    properties: DeidUpdate,
    options?: DeidServicesUpdateOptionalParams,
  ) => PollerLike<OperationState<DeidService>, DeidService>;
  /** Delete a DeidService */
  delete: (
    resourceGroupName: string,
    deidServiceName: string,
    options?: DeidServicesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
}

export function getDeidServices(
  context: HealthDataAIServicesContext,
  subscriptionId: string,
) {
  return {
    get: (
      resourceGroupName: string,
      deidServiceName: string,
      options?: DeidServicesGetOptionalParams,
    ) =>
      deidServicesGet(
        context,
        subscriptionId,
        resourceGroupName,
        deidServiceName,
        options,
      ),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: DeidServicesListByResourceGroupOptionalParams,
    ) =>
      deidServicesListByResourceGroup(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    listBySubscription: (
      options?: DeidServicesListBySubscriptionOptionalParams,
    ) => deidServicesListBySubscription(context, subscriptionId, options),
    create: (
      resourceGroupName: string,
      deidServiceName: string,
      resource: DeidService,
      options?: DeidServicesCreateOptionalParams,
    ) =>
      deidServicesCreate(
        context,
        subscriptionId,
        resourceGroupName,
        deidServiceName,
        resource,
        options,
      ),
    update: (
      resourceGroupName: string,
      deidServiceName: string,
      properties: DeidUpdate,
      options?: DeidServicesUpdateOptionalParams,
    ) =>
      deidServicesUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        deidServiceName,
        properties,
        options,
      ),
    delete: (
      resourceGroupName: string,
      deidServiceName: string,
      options?: DeidServicesDeleteOptionalParams,
    ) =>
      deidServicesDelete(
        context,
        subscriptionId,
        resourceGroupName,
        deidServiceName,
        options,
      ),
  };
}

export function getDeidServicesOperations(
  context: HealthDataAIServicesContext,
  subscriptionId: string,
): DeidServicesOperations {
  return {
    ...getDeidServices(context, subscriptionId),
  };
}
