// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProfessionalServiceContext } from "../../api/professionalServiceContext.js";
import {
  validateUpdate,
  unsubscribe,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/professionalServiceSubscriptionLevel/operations.js";
import type {
  ProfessionalServiceSubscriptionLevelValidateUpdateOptionalParams,
  ProfessionalServiceSubscriptionLevelUnsubscribeOptionalParams,
  ProfessionalServiceSubscriptionLevelListByResourceGroupOptionalParams,
  ProfessionalServiceSubscriptionLevelDeleteOptionalParams,
  ProfessionalServiceSubscriptionLevelUpdateOptionalParams,
  ProfessionalServiceSubscriptionLevelCreateOrUpdateOptionalParams,
  ProfessionalServiceSubscriptionLevelGetOptionalParams,
} from "../../api/professionalServiceSubscriptionLevel/options.js";
import type {
  ProfessionalServiceResource,
  ProfessionalServiceResourceUpdate,
  UnsubscribeOptions,
  ResourceValidationResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ProfessionalServiceSubscriptionLevel operations. */
export interface ProfessionalServiceSubscriptionLevelOperations {
  /** Validates a proposed update to an existing Professional Service resource without modifying the resource. */
  validateUpdate: (
    resourceGroupName: string,
    resourceName: string,
    body: ProfessionalServiceResourceUpdate,
    options?: ProfessionalServiceSubscriptionLevelValidateUpdateOptionalParams,
  ) => Promise<ResourceValidationResult>;
  /** Unsubscribes from a Professional Service subscription, optionally providing a reason and feedback. The resource remains in Azure but the subscription is cancelled. */
  unsubscribe: (
    resourceGroupName: string,
    resourceName: string,
    body: UnsubscribeOptions,
    options?: ProfessionalServiceSubscriptionLevelUnsubscribeOptionalParams,
  ) => PollerLike<OperationState<ProfessionalServiceResource>, ProfessionalServiceResource>;
  /** Lists all Professional Service resources within a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ProfessionalServiceSubscriptionLevelListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ProfessionalServiceResource>;
  /** Deletes a Professional Service resource. */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    options?: ProfessionalServiceSubscriptionLevelDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates mutable properties or tags on an existing Professional Service resource. */
  update: (
    resourceGroupName: string,
    resourceName: string,
    properties: ProfessionalServiceResourceUpdate,
    options?: ProfessionalServiceSubscriptionLevelUpdateOptionalParams,
  ) => PollerLike<OperationState<ProfessionalServiceResource>, ProfessionalServiceResource>;
  /** Creates or updates a Professional Service resource. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    resource: ProfessionalServiceResource,
    options?: ProfessionalServiceSubscriptionLevelCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ProfessionalServiceResource>, ProfessionalServiceResource>;
  /** Gets a Professional Service resource by its name. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    options?: ProfessionalServiceSubscriptionLevelGetOptionalParams,
  ) => Promise<ProfessionalServiceResource>;
}

function _getProfessionalServiceSubscriptionLevel(context: ProfessionalServiceContext) {
  return {
    validateUpdate: (
      resourceGroupName: string,
      resourceName: string,
      body: ProfessionalServiceResourceUpdate,
      options?: ProfessionalServiceSubscriptionLevelValidateUpdateOptionalParams,
    ) => validateUpdate(context, resourceGroupName, resourceName, body, options),
    unsubscribe: (
      resourceGroupName: string,
      resourceName: string,
      body: UnsubscribeOptions,
      options?: ProfessionalServiceSubscriptionLevelUnsubscribeOptionalParams,
    ) => unsubscribe(context, resourceGroupName, resourceName, body, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ProfessionalServiceSubscriptionLevelListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      options?: ProfessionalServiceSubscriptionLevelDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, options),
    update: (
      resourceGroupName: string,
      resourceName: string,
      properties: ProfessionalServiceResourceUpdate,
      options?: ProfessionalServiceSubscriptionLevelUpdateOptionalParams,
    ) => update(context, resourceGroupName, resourceName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      resource: ProfessionalServiceResource,
      options?: ProfessionalServiceSubscriptionLevelCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, resourceName, resource, options),
    get: (
      resourceGroupName: string,
      resourceName: string,
      options?: ProfessionalServiceSubscriptionLevelGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, options),
  };
}

export function _getProfessionalServiceSubscriptionLevelOperations(
  context: ProfessionalServiceContext,
): ProfessionalServiceSubscriptionLevelOperations {
  return {
    ..._getProfessionalServiceSubscriptionLevel(context),
  };
}
