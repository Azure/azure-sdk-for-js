// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listSecrets,
  regenerateSecondaryKey,
  regeneratePrimaryKey,
  list,
  $delete,
  update,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/subscription/operations.js";
import type {
  SubscriptionListSecretsOptionalParams,
  SubscriptionRegenerateSecondaryKeyOptionalParams,
  SubscriptionRegeneratePrimaryKeyOptionalParams,
  SubscriptionListOptionalParams,
  SubscriptionDeleteOptionalParams,
  SubscriptionUpdateOptionalParams,
  SubscriptionCreateOrUpdateOptionalParams,
  SubscriptionGetEntityTagOptionalParams,
  SubscriptionGetOptionalParams,
} from "../../api/subscription/options.js";
import type {
  SubscriptionContract,
  SubscriptionCreateParameters,
  SubscriptionUpdateParameters,
  SubscriptionKeysContract,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Subscription operations. */
export interface SubscriptionOperations {
  /** Gets the specified Subscription keys. */
  listSecrets: (
    resourceGroupName: string,
    serviceName: string,
    sid: string,
    options?: SubscriptionListSecretsOptionalParams,
  ) => Promise<SubscriptionKeysContract>;
  /** Regenerates secondary key of existing subscription of the API Management service instance. */
  regenerateSecondaryKey: (
    resourceGroupName: string,
    serviceName: string,
    sid: string,
    options?: SubscriptionRegenerateSecondaryKeyOptionalParams,
  ) => Promise<void>;
  /** Regenerates primary key of existing subscription of the API Management service instance. */
  regeneratePrimaryKey: (
    resourceGroupName: string,
    serviceName: string,
    sid: string,
    options?: SubscriptionRegeneratePrimaryKeyOptionalParams,
  ) => Promise<void>;
  /** Lists all subscriptions of the API Management service instance. */
  list: (
    resourceGroupName: string,
    serviceName: string,
    options?: SubscriptionListOptionalParams,
  ) => PagedAsyncIterableIterator<SubscriptionContract>;
  /** Deletes the specified subscription. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    sid: string,
    ifMatch: string,
    options?: SubscriptionDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the details of a subscription specified by its identifier. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    sid: string,
    ifMatch: string,
    parameters: SubscriptionUpdateParameters,
    options?: SubscriptionUpdateOptionalParams,
  ) => Promise<SubscriptionContract>;
  /** Creates or updates the subscription of specified user to the specified product. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    sid: string,
    parameters: SubscriptionCreateParameters,
    options?: SubscriptionCreateOrUpdateOptionalParams,
  ) => Promise<SubscriptionContract>;
  /** Gets the entity state (Etag) version of the apimanagement subscription specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    sid: string,
    options?: SubscriptionGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the specified Subscription entity. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    sid: string,
    options?: SubscriptionGetOptionalParams,
  ) => Promise<SubscriptionContract>;
}

function _getSubscription(context: ApiManagementContext) {
  return {
    listSecrets: (
      resourceGroupName: string,
      serviceName: string,
      sid: string,
      options?: SubscriptionListSecretsOptionalParams,
    ) => listSecrets(context, resourceGroupName, serviceName, sid, options),
    regenerateSecondaryKey: (
      resourceGroupName: string,
      serviceName: string,
      sid: string,
      options?: SubscriptionRegenerateSecondaryKeyOptionalParams,
    ) => regenerateSecondaryKey(context, resourceGroupName, serviceName, sid, options),
    regeneratePrimaryKey: (
      resourceGroupName: string,
      serviceName: string,
      sid: string,
      options?: SubscriptionRegeneratePrimaryKeyOptionalParams,
    ) => regeneratePrimaryKey(context, resourceGroupName, serviceName, sid, options),
    list: (
      resourceGroupName: string,
      serviceName: string,
      options?: SubscriptionListOptionalParams,
    ) => list(context, resourceGroupName, serviceName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      sid: string,
      ifMatch: string,
      options?: SubscriptionDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, sid, ifMatch, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      sid: string,
      ifMatch: string,
      parameters: SubscriptionUpdateParameters,
      options?: SubscriptionUpdateOptionalParams,
    ) => update(context, resourceGroupName, serviceName, sid, ifMatch, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      sid: string,
      parameters: SubscriptionCreateParameters,
      options?: SubscriptionCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serviceName, sid, parameters, options),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      sid: string,
      options?: SubscriptionGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, sid, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      sid: string,
      options?: SubscriptionGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, sid, options),
  };
}

export function _getSubscriptionOperations(context: ApiManagementContext): SubscriptionOperations {
  return {
    ..._getSubscription(context),
  };
}
