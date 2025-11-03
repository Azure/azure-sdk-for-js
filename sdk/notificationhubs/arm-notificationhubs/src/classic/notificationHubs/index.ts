// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NotificationHubsManagementContext } from "../../api/notificationHubsManagementContext.js";
import {
  regenerateKeys,
  listKeys,
  listAuthorizationRules,
  deleteAuthorizationRule,
  createOrUpdateAuthorizationRule,
  getAuthorizationRule,
  checkNotificationHubAvailability,
  getPnsCredentials,
  debugSend,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/notificationHubs/operations.js";
import type {
  NotificationHubsRegenerateKeysOptionalParams,
  NotificationHubsListKeysOptionalParams,
  NotificationHubsListAuthorizationRulesOptionalParams,
  NotificationHubsDeleteAuthorizationRuleOptionalParams,
  NotificationHubsCreateOrUpdateAuthorizationRuleOptionalParams,
  NotificationHubsGetAuthorizationRuleOptionalParams,
  NotificationHubsCheckNotificationHubAvailabilityOptionalParams,
  NotificationHubsGetPnsCredentialsOptionalParams,
  NotificationHubsDebugSendOptionalParams,
  NotificationHubsListOptionalParams,
  NotificationHubsDeleteOptionalParams,
  NotificationHubsUpdateOptionalParams,
  NotificationHubsCreateOrUpdateOptionalParams,
  NotificationHubsGetOptionalParams,
} from "../../api/notificationHubs/options.js";
import type {
  SharedAccessAuthorizationRuleResource,
  ResourceListKeys,
  PolicyKeyResource,
  PnsCredentialsResource,
  CheckAvailabilityParameters,
  CheckAvailabilityResult,
  NotificationHubResource,
  NotificationHubPatchParameters,
  DebugSendResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a NotificationHubs operations. */
export interface NotificationHubsOperations {
  /** Regenerates the Primary/Secondary Keys to the NotificationHub Authorization Rule */
  regenerateKeys: (
    resourceGroupName: string,
    namespaceName: string,
    notificationHubName: string,
    authorizationRuleName: string,
    parameters: PolicyKeyResource,
    options?: NotificationHubsRegenerateKeysOptionalParams,
  ) => Promise<ResourceListKeys>;
  /** Gets the Primary and Secondary ConnectionStrings to the NotificationHub */
  listKeys: (
    resourceGroupName: string,
    namespaceName: string,
    notificationHubName: string,
    authorizationRuleName: string,
    options?: NotificationHubsListKeysOptionalParams,
  ) => Promise<ResourceListKeys>;
  /** Gets the authorization rules for a NotificationHub. */
  listAuthorizationRules: (
    resourceGroupName: string,
    namespaceName: string,
    notificationHubName: string,
    options?: NotificationHubsListAuthorizationRulesOptionalParams,
  ) => PagedAsyncIterableIterator<SharedAccessAuthorizationRuleResource>;
  /** Deletes a notificationHub authorization rule */
  deleteAuthorizationRule: (
    resourceGroupName: string,
    namespaceName: string,
    notificationHubName: string,
    authorizationRuleName: string,
    options?: NotificationHubsDeleteAuthorizationRuleOptionalParams,
  ) => Promise<void>;
  /** Creates/Updates an authorization rule for a NotificationHub */
  createOrUpdateAuthorizationRule: (
    resourceGroupName: string,
    namespaceName: string,
    notificationHubName: string,
    authorizationRuleName: string,
    parameters: SharedAccessAuthorizationRuleResource,
    options?: NotificationHubsCreateOrUpdateAuthorizationRuleOptionalParams,
  ) => Promise<SharedAccessAuthorizationRuleResource>;
  /** Gets an authorization rule for a NotificationHub by name. */
  getAuthorizationRule: (
    resourceGroupName: string,
    namespaceName: string,
    notificationHubName: string,
    authorizationRuleName: string,
    options?: NotificationHubsGetAuthorizationRuleOptionalParams,
  ) => Promise<SharedAccessAuthorizationRuleResource>;
  /** Checks the availability of the given notificationHub in a namespace. */
  checkNotificationHubAvailability: (
    resourceGroupName: string,
    namespaceName: string,
    parameters: CheckAvailabilityParameters,
    options?: NotificationHubsCheckNotificationHubAvailabilityOptionalParams,
  ) => Promise<CheckAvailabilityResult>;
  /** Lists the PNS Credentials associated with a notification hub. */
  getPnsCredentials: (
    resourceGroupName: string,
    namespaceName: string,
    notificationHubName: string,
    options?: NotificationHubsGetPnsCredentialsOptionalParams,
  ) => Promise<PnsCredentialsResource>;
  /** Test send a push notification. */
  debugSend: (
    resourceGroupName: string,
    namespaceName: string,
    notificationHubName: string,
    options?: NotificationHubsDebugSendOptionalParams,
  ) => Promise<DebugSendResponse>;
  /** Lists the notification hubs associated with a namespace. */
  list: (
    resourceGroupName: string,
    namespaceName: string,
    options?: NotificationHubsListOptionalParams,
  ) => PagedAsyncIterableIterator<NotificationHubResource>;
  /** Deletes a notification hub associated with a namespace. */
  /**
   *  @fixme Delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    namespaceName: string,
    notificationHubName: string,
    options?: NotificationHubsDeleteOptionalParams,
  ) => Promise<void>;
  /** Patch a NotificationHub in a namespace. */
  update: (
    resourceGroupName: string,
    namespaceName: string,
    notificationHubName: string,
    parameters: NotificationHubPatchParameters,
    options?: NotificationHubsUpdateOptionalParams,
  ) => Promise<NotificationHubResource>;
  /** Creates/Update a NotificationHub in a namespace. */
  createOrUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    notificationHubName: string,
    parameters: NotificationHubResource,
    options?: NotificationHubsCreateOrUpdateOptionalParams,
  ) => Promise<NotificationHubResource>;
  /** Gets the notification hub. */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    notificationHubName: string,
    options?: NotificationHubsGetOptionalParams,
  ) => Promise<NotificationHubResource>;
}

function _getNotificationHubs(context: NotificationHubsManagementContext) {
  return {
    regenerateKeys: (
      resourceGroupName: string,
      namespaceName: string,
      notificationHubName: string,
      authorizationRuleName: string,
      parameters: PolicyKeyResource,
      options?: NotificationHubsRegenerateKeysOptionalParams,
    ) =>
      regenerateKeys(
        context,
        resourceGroupName,
        namespaceName,
        notificationHubName,
        authorizationRuleName,
        parameters,
        options,
      ),
    listKeys: (
      resourceGroupName: string,
      namespaceName: string,
      notificationHubName: string,
      authorizationRuleName: string,
      options?: NotificationHubsListKeysOptionalParams,
    ) =>
      listKeys(
        context,
        resourceGroupName,
        namespaceName,
        notificationHubName,
        authorizationRuleName,
        options,
      ),
    listAuthorizationRules: (
      resourceGroupName: string,
      namespaceName: string,
      notificationHubName: string,
      options?: NotificationHubsListAuthorizationRulesOptionalParams,
    ) =>
      listAuthorizationRules(
        context,
        resourceGroupName,
        namespaceName,
        notificationHubName,
        options,
      ),
    deleteAuthorizationRule: (
      resourceGroupName: string,
      namespaceName: string,
      notificationHubName: string,
      authorizationRuleName: string,
      options?: NotificationHubsDeleteAuthorizationRuleOptionalParams,
    ) =>
      deleteAuthorizationRule(
        context,
        resourceGroupName,
        namespaceName,
        notificationHubName,
        authorizationRuleName,
        options,
      ),
    createOrUpdateAuthorizationRule: (
      resourceGroupName: string,
      namespaceName: string,
      notificationHubName: string,
      authorizationRuleName: string,
      parameters: SharedAccessAuthorizationRuleResource,
      options?: NotificationHubsCreateOrUpdateAuthorizationRuleOptionalParams,
    ) =>
      createOrUpdateAuthorizationRule(
        context,
        resourceGroupName,
        namespaceName,
        notificationHubName,
        authorizationRuleName,
        parameters,
        options,
      ),
    getAuthorizationRule: (
      resourceGroupName: string,
      namespaceName: string,
      notificationHubName: string,
      authorizationRuleName: string,
      options?: NotificationHubsGetAuthorizationRuleOptionalParams,
    ) =>
      getAuthorizationRule(
        context,
        resourceGroupName,
        namespaceName,
        notificationHubName,
        authorizationRuleName,
        options,
      ),
    checkNotificationHubAvailability: (
      resourceGroupName: string,
      namespaceName: string,
      parameters: CheckAvailabilityParameters,
      options?: NotificationHubsCheckNotificationHubAvailabilityOptionalParams,
    ) =>
      checkNotificationHubAvailability(
        context,
        resourceGroupName,
        namespaceName,
        parameters,
        options,
      ),
    getPnsCredentials: (
      resourceGroupName: string,
      namespaceName: string,
      notificationHubName: string,
      options?: NotificationHubsGetPnsCredentialsOptionalParams,
    ) => getPnsCredentials(context, resourceGroupName, namespaceName, notificationHubName, options),
    debugSend: (
      resourceGroupName: string,
      namespaceName: string,
      notificationHubName: string,
      options?: NotificationHubsDebugSendOptionalParams,
    ) => debugSend(context, resourceGroupName, namespaceName, notificationHubName, options),
    list: (
      resourceGroupName: string,
      namespaceName: string,
      options?: NotificationHubsListOptionalParams,
    ) => list(context, resourceGroupName, namespaceName, options),
    delete: (
      resourceGroupName: string,
      namespaceName: string,
      notificationHubName: string,
      options?: NotificationHubsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, namespaceName, notificationHubName, options),
    update: (
      resourceGroupName: string,
      namespaceName: string,
      notificationHubName: string,
      parameters: NotificationHubPatchParameters,
      options?: NotificationHubsUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, namespaceName, notificationHubName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      namespaceName: string,
      notificationHubName: string,
      parameters: NotificationHubResource,
      options?: NotificationHubsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        namespaceName,
        notificationHubName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      namespaceName: string,
      notificationHubName: string,
      options?: NotificationHubsGetOptionalParams,
    ) => get(context, resourceGroupName, namespaceName, notificationHubName, options),
  };
}

export function _getNotificationHubsOperations(
  context: NotificationHubsManagementContext,
): NotificationHubsOperations {
  return {
    ..._getNotificationHubs(context),
  };
}
