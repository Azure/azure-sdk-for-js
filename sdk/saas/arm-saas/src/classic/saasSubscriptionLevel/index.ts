// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SaaSContext } from "../../api/saaSContext.js";
import {
  validateUpdate,
  unsubscribe,
  listAccessToken,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/saasSubscriptionLevel/operations.js";
import type {
  SaasSubscriptionLevelValidateUpdateOptionalParams,
  SaasSubscriptionLevelUnsubscribeOptionalParams,
  SaasSubscriptionLevelListAccessTokenOptionalParams,
  SaasSubscriptionLevelListByResourceGroupOptionalParams,
  SaasSubscriptionLevelDeleteOptionalParams,
  SaasSubscriptionLevelUpdateOptionalParams,
  SaasSubscriptionLevelCreateOrUpdateOptionalParams,
  SaasSubscriptionLevelGetOptionalParams,
} from "../../api/saasSubscriptionLevel/options.js";
import type {
  SaasResource,
  SaasResourceUpdate,
  AccessTokenResult,
  UnsubscribeOptions,
  ResourceValidationResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SaasSubscriptionLevel operations. */
export interface SaasSubscriptionLevelOperations {
  /** Validates a proposed update to an existing SaaS resource without modifying the resource. */
  validateUpdate: (
    resourceGroupName: string,
    resourceName: string,
    body: SaasResourceUpdate,
    options?: SaasSubscriptionLevelValidateUpdateOptionalParams,
  ) => Promise<ResourceValidationResult>;
  /** Unsubscribes from a SaaS subscription, optionally providing a reason and feedback. The resource remains in Azure but the subscription is cancelled. */
  unsubscribe: (
    resourceGroupName: string,
    resourceName: string,
    body: UnsubscribeOptions,
    options?: SaasSubscriptionLevelUnsubscribeOptionalParams,
  ) => PollerLike<OperationState<SaasResource>, SaasResource>;
  /** Generates a publisher access token for a SaaS resource. */
  listAccessToken: (
    resourceGroupName: string,
    resourceName: string,
    options?: SaasSubscriptionLevelListAccessTokenOptionalParams,
  ) => Promise<AccessTokenResult>;
  /** Lists all SaaS resources within a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: SaasSubscriptionLevelListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<SaasResource>;
  /** Deletes a SaaS resource. */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    options?: SaasSubscriptionLevelDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates mutable properties or tags on an existing SaaS resource. */
  update: (
    resourceGroupName: string,
    resourceName: string,
    properties: SaasResourceUpdate,
    options?: SaasSubscriptionLevelUpdateOptionalParams,
  ) => PollerLike<OperationState<SaasResource>, SaasResource>;
  /** Creates or updates a SaaS resource. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    resource: SaasResource,
    options?: SaasSubscriptionLevelCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SaasResource>, SaasResource>;
  /** Gets a SaaS resource by its name. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    options?: SaasSubscriptionLevelGetOptionalParams,
  ) => Promise<SaasResource>;
}

function _getSaasSubscriptionLevel(context: SaaSContext) {
  return {
    validateUpdate: (
      resourceGroupName: string,
      resourceName: string,
      body: SaasResourceUpdate,
      options?: SaasSubscriptionLevelValidateUpdateOptionalParams,
    ) => validateUpdate(context, resourceGroupName, resourceName, body, options),
    unsubscribe: (
      resourceGroupName: string,
      resourceName: string,
      body: UnsubscribeOptions,
      options?: SaasSubscriptionLevelUnsubscribeOptionalParams,
    ) => unsubscribe(context, resourceGroupName, resourceName, body, options),
    listAccessToken: (
      resourceGroupName: string,
      resourceName: string,
      options?: SaasSubscriptionLevelListAccessTokenOptionalParams,
    ) => listAccessToken(context, resourceGroupName, resourceName, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: SaasSubscriptionLevelListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      options?: SaasSubscriptionLevelDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, options),
    update: (
      resourceGroupName: string,
      resourceName: string,
      properties: SaasResourceUpdate,
      options?: SaasSubscriptionLevelUpdateOptionalParams,
    ) => update(context, resourceGroupName, resourceName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      resource: SaasResource,
      options?: SaasSubscriptionLevelCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, resourceName, resource, options),
    get: (
      resourceGroupName: string,
      resourceName: string,
      options?: SaasSubscriptionLevelGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, options),
  };
}

export function _getSaasSubscriptionLevelOperations(
  context: SaaSContext,
): SaasSubscriptionLevelOperations {
  return {
    ..._getSaasSubscriptionLevel(context),
  };
}
