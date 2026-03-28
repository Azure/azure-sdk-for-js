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
} from "../../api/workspaceSubscription/operations.js";
import type {
  WorkspaceSubscriptionListSecretsOptionalParams,
  WorkspaceSubscriptionRegenerateSecondaryKeyOptionalParams,
  WorkspaceSubscriptionRegeneratePrimaryKeyOptionalParams,
  WorkspaceSubscriptionListOptionalParams,
  WorkspaceSubscriptionDeleteOptionalParams,
  WorkspaceSubscriptionUpdateOptionalParams,
  WorkspaceSubscriptionCreateOrUpdateOptionalParams,
  WorkspaceSubscriptionGetEntityTagOptionalParams,
  WorkspaceSubscriptionGetOptionalParams,
} from "../../api/workspaceSubscription/options.js";
import type {
  SubscriptionContract,
  SubscriptionCreateParameters,
  SubscriptionUpdateParameters,
  SubscriptionKeysContract,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkspaceSubscription operations. */
export interface WorkspaceSubscriptionOperations {
  /** Gets the specified Subscription keys. */
  listSecrets: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    sid: string,
    options?: WorkspaceSubscriptionListSecretsOptionalParams,
  ) => Promise<SubscriptionKeysContract>;
  /** Regenerates secondary key of existing subscription of the workspace in an API Management service instance. */
  regenerateSecondaryKey: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    sid: string,
    options?: WorkspaceSubscriptionRegenerateSecondaryKeyOptionalParams,
  ) => Promise<void>;
  /** Regenerates primary key of existing subscription of the workspace in an API Management service instance. */
  regeneratePrimaryKey: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    sid: string,
    options?: WorkspaceSubscriptionRegeneratePrimaryKeyOptionalParams,
  ) => Promise<void>;
  /** Lists all subscriptions of the workspace in an API Management service instance. */
  list: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    options?: WorkspaceSubscriptionListOptionalParams,
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
    workspaceId: string,
    sid: string,
    ifMatch: string,
    options?: WorkspaceSubscriptionDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the details of a subscription specified by its identifier. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    sid: string,
    ifMatch: string,
    parameters: SubscriptionUpdateParameters,
    options?: WorkspaceSubscriptionUpdateOptionalParams,
  ) => Promise<SubscriptionContract>;
  /** Creates or updates the subscription of specified user to the specified product. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    sid: string,
    parameters: SubscriptionCreateParameters,
    options?: WorkspaceSubscriptionCreateOrUpdateOptionalParams,
  ) => Promise<SubscriptionContract>;
  /** Gets the entity state (Etag) version of the apimanagement subscription specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    sid: string,
    options?: WorkspaceSubscriptionGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the specified Subscription entity. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    sid: string,
    options?: WorkspaceSubscriptionGetOptionalParams,
  ) => Promise<SubscriptionContract>;
}

function _getWorkspaceSubscription(context: ApiManagementContext) {
  return {
    listSecrets: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      sid: string,
      options?: WorkspaceSubscriptionListSecretsOptionalParams,
    ) => listSecrets(context, resourceGroupName, serviceName, workspaceId, sid, options),
    regenerateSecondaryKey: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      sid: string,
      options?: WorkspaceSubscriptionRegenerateSecondaryKeyOptionalParams,
    ) => regenerateSecondaryKey(context, resourceGroupName, serviceName, workspaceId, sid, options),
    regeneratePrimaryKey: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      sid: string,
      options?: WorkspaceSubscriptionRegeneratePrimaryKeyOptionalParams,
    ) => regeneratePrimaryKey(context, resourceGroupName, serviceName, workspaceId, sid, options),
    list: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      options?: WorkspaceSubscriptionListOptionalParams,
    ) => list(context, resourceGroupName, serviceName, workspaceId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      sid: string,
      ifMatch: string,
      options?: WorkspaceSubscriptionDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, workspaceId, sid, ifMatch, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      sid: string,
      ifMatch: string,
      parameters: SubscriptionUpdateParameters,
      options?: WorkspaceSubscriptionUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        sid,
        ifMatch,
        parameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      sid: string,
      parameters: SubscriptionCreateParameters,
      options?: WorkspaceSubscriptionCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        sid,
        parameters,
        options,
      ),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      sid: string,
      options?: WorkspaceSubscriptionGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, workspaceId, sid, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      sid: string,
      options?: WorkspaceSubscriptionGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, workspaceId, sid, options),
  };
}

export function _getWorkspaceSubscriptionOperations(
  context: ApiManagementContext,
): WorkspaceSubscriptionOperations {
  return {
    ..._getWorkspaceSubscription(context),
  };
}
