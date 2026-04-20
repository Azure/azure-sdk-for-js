// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import {
  reconcileNSP,
  listNSP,
  getNSP,
  enableReceiver,
  getTestNotificationsAtActionGroupResourceLevel,
  createNotificationsAtActionGroupResourceLevel,
  listBySubscriptionId,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/actionGroups/operations.js";
import type {
  ActionGroupsReconcileNSPOptionalParams,
  ActionGroupsListNSPOptionalParams,
  ActionGroupsGetNSPOptionalParams,
  ActionGroupsEnableReceiverOptionalParams,
  ActionGroupsGetTestNotificationsAtActionGroupResourceLevelOptionalParams,
  ActionGroupsCreateNotificationsAtActionGroupResourceLevelOptionalParams,
  ActionGroupsListBySubscriptionIdOptionalParams,
  ActionGroupsListByResourceGroupOptionalParams,
  ActionGroupsDeleteOptionalParams,
  ActionGroupsUpdateOptionalParams,
  ActionGroupsCreateOrUpdateOptionalParams,
  ActionGroupsGetOptionalParams,
} from "../../api/actionGroups/options.js";
import type {
  MicrosoftActionGroupsActionGroupResource,
  MicrosoftActionGroupsActionGroupPatchBody,
  MicrosoftActionGroupsNotificationRequestBody,
  MicrosoftActionGroupsTestNotificationDetailsResponse,
  MicrosoftActionGroupsEnableRequest,
} from "../../models/microsoft/actionGroups/models.js";
import type { NetworkSecurityPerimeterConfiguration } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ActionGroups operations. */
export interface ActionGroupsOperations {
  /** Reconciles a specified NSP configuration for specified action group. */
  reconcileNSP: (
    resourceGroupName: string,
    actionGroupName: string,
    networkSecurityPerimeterConfigurationName: string,
    options?: ActionGroupsReconcileNSPOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use reconcileNSP instead */
  beginReconcileNSP: (
    resourceGroupName: string,
    actionGroupName: string,
    networkSecurityPerimeterConfigurationName: string,
    options?: ActionGroupsReconcileNSPOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use reconcileNSP instead */
  beginReconcileNSPAndWait: (
    resourceGroupName: string,
    actionGroupName: string,
    networkSecurityPerimeterConfigurationName: string,
    options?: ActionGroupsReconcileNSPOptionalParams,
  ) => Promise<void>;
  /** Gets a list of NSP configurations for specified action group. */
  listNSP: (
    resourceGroupName: string,
    actionGroupName: string,
    options?: ActionGroupsListNSPOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkSecurityPerimeterConfiguration>;
  /** Gets a specified NSP configuration for specified action group. */
  getNSP: (
    resourceGroupName: string,
    actionGroupName: string,
    networkSecurityPerimeterConfigurationName: string,
    options?: ActionGroupsGetNSPOptionalParams,
  ) => Promise<NetworkSecurityPerimeterConfiguration>;
  /** Enable a receiver in an action group. This changes the receiver's status from Disabled to Enabled. This operation is only supported for Email or SMS receivers. */
  enableReceiver: (
    resourceGroupName: string,
    actionGroupName: string,
    enableRequest: MicrosoftActionGroupsEnableRequest,
    options?: ActionGroupsEnableReceiverOptionalParams,
  ) => Promise<void>;
  /** Get the test notifications by the notification id */
  getTestNotificationsAtActionGroupResourceLevel: (
    resourceGroupName: string,
    actionGroupName: string,
    notificationId: string,
    options?: ActionGroupsGetTestNotificationsAtActionGroupResourceLevelOptionalParams,
  ) => Promise<MicrosoftActionGroupsTestNotificationDetailsResponse>;
  /** Send test notifications to a set of provided receivers */
  createNotificationsAtActionGroupResourceLevel: (
    resourceGroupName: string,
    actionGroupName: string,
    notificationRequest: MicrosoftActionGroupsNotificationRequestBody,
    options?: ActionGroupsCreateNotificationsAtActionGroupResourceLevelOptionalParams,
  ) => PollerLike<
    OperationState<MicrosoftActionGroupsTestNotificationDetailsResponse>,
    MicrosoftActionGroupsTestNotificationDetailsResponse
  >;
  /** @deprecated use createNotificationsAtActionGroupResourceLevel instead */
  beginCreateNotificationsAtActionGroupResourceLevel: (
    resourceGroupName: string,
    actionGroupName: string,
    notificationRequest: MicrosoftActionGroupsNotificationRequestBody,
    options?: ActionGroupsCreateNotificationsAtActionGroupResourceLevelOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<MicrosoftActionGroupsTestNotificationDetailsResponse>,
      MicrosoftActionGroupsTestNotificationDetailsResponse
    >
  >;
  /** @deprecated use createNotificationsAtActionGroupResourceLevel instead */
  beginCreateNotificationsAtActionGroupResourceLevelAndWait: (
    resourceGroupName: string,
    actionGroupName: string,
    notificationRequest: MicrosoftActionGroupsNotificationRequestBody,
    options?: ActionGroupsCreateNotificationsAtActionGroupResourceLevelOptionalParams,
  ) => Promise<MicrosoftActionGroupsTestNotificationDetailsResponse>;
  /** Get a list of all action groups in a subscription. */
  listBySubscriptionId: (
    options?: ActionGroupsListBySubscriptionIdOptionalParams,
  ) => PagedAsyncIterableIterator<MicrosoftActionGroupsActionGroupResource>;
  /** Get a list of all action groups in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ActionGroupsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<MicrosoftActionGroupsActionGroupResource>;
  /** Delete an action group. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    actionGroupName: string,
    options?: ActionGroupsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an existing action group's tags. To update other fields use the CreateOrUpdate method. */
  update: (
    resourceGroupName: string,
    actionGroupName: string,
    actionGroupPatch: MicrosoftActionGroupsActionGroupPatchBody,
    options?: ActionGroupsUpdateOptionalParams,
  ) => Promise<MicrosoftActionGroupsActionGroupResource>;
  /** Create a new action group or update an existing one. */
  createOrUpdate: (
    resourceGroupName: string,
    actionGroupName: string,
    actionGroup: MicrosoftActionGroupsActionGroupResource,
    options?: ActionGroupsCreateOrUpdateOptionalParams,
  ) => Promise<MicrosoftActionGroupsActionGroupResource>;
  /** Get an action group. */
  get: (
    resourceGroupName: string,
    actionGroupName: string,
    options?: ActionGroupsGetOptionalParams,
  ) => Promise<MicrosoftActionGroupsActionGroupResource>;
}

function _getActionGroups(context: MonitorContext) {
  return {
    reconcileNSP: (
      resourceGroupName: string,
      actionGroupName: string,
      networkSecurityPerimeterConfigurationName: string,
      options?: ActionGroupsReconcileNSPOptionalParams,
    ) =>
      reconcileNSP(
        context,
        resourceGroupName,
        actionGroupName,
        networkSecurityPerimeterConfigurationName,
        options,
      ),
    beginReconcileNSP: async (
      resourceGroupName: string,
      actionGroupName: string,
      networkSecurityPerimeterConfigurationName: string,
      options?: ActionGroupsReconcileNSPOptionalParams,
    ) => {
      const poller = reconcileNSP(
        context,
        resourceGroupName,
        actionGroupName,
        networkSecurityPerimeterConfigurationName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginReconcileNSPAndWait: async (
      resourceGroupName: string,
      actionGroupName: string,
      networkSecurityPerimeterConfigurationName: string,
      options?: ActionGroupsReconcileNSPOptionalParams,
    ) => {
      return await reconcileNSP(
        context,
        resourceGroupName,
        actionGroupName,
        networkSecurityPerimeterConfigurationName,
        options,
      );
    },
    listNSP: (
      resourceGroupName: string,
      actionGroupName: string,
      options?: ActionGroupsListNSPOptionalParams,
    ) => listNSP(context, resourceGroupName, actionGroupName, options),
    getNSP: (
      resourceGroupName: string,
      actionGroupName: string,
      networkSecurityPerimeterConfigurationName: string,
      options?: ActionGroupsGetNSPOptionalParams,
    ) =>
      getNSP(
        context,
        resourceGroupName,
        actionGroupName,
        networkSecurityPerimeterConfigurationName,
        options,
      ),
    enableReceiver: (
      resourceGroupName: string,
      actionGroupName: string,
      enableRequest: MicrosoftActionGroupsEnableRequest,
      options?: ActionGroupsEnableReceiverOptionalParams,
    ) => enableReceiver(context, resourceGroupName, actionGroupName, enableRequest, options),
    getTestNotificationsAtActionGroupResourceLevel: (
      resourceGroupName: string,
      actionGroupName: string,
      notificationId: string,
      options?: ActionGroupsGetTestNotificationsAtActionGroupResourceLevelOptionalParams,
    ) =>
      getTestNotificationsAtActionGroupResourceLevel(
        context,
        resourceGroupName,
        actionGroupName,
        notificationId,
        options,
      ),
    createNotificationsAtActionGroupResourceLevel: (
      resourceGroupName: string,
      actionGroupName: string,
      notificationRequest: MicrosoftActionGroupsNotificationRequestBody,
      options?: ActionGroupsCreateNotificationsAtActionGroupResourceLevelOptionalParams,
    ) =>
      createNotificationsAtActionGroupResourceLevel(
        context,
        resourceGroupName,
        actionGroupName,
        notificationRequest,
        options,
      ),
    beginCreateNotificationsAtActionGroupResourceLevel: async (
      resourceGroupName: string,
      actionGroupName: string,
      notificationRequest: MicrosoftActionGroupsNotificationRequestBody,
      options?: ActionGroupsCreateNotificationsAtActionGroupResourceLevelOptionalParams,
    ) => {
      const poller = createNotificationsAtActionGroupResourceLevel(
        context,
        resourceGroupName,
        actionGroupName,
        notificationRequest,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateNotificationsAtActionGroupResourceLevelAndWait: async (
      resourceGroupName: string,
      actionGroupName: string,
      notificationRequest: MicrosoftActionGroupsNotificationRequestBody,
      options?: ActionGroupsCreateNotificationsAtActionGroupResourceLevelOptionalParams,
    ) => {
      return await createNotificationsAtActionGroupResourceLevel(
        context,
        resourceGroupName,
        actionGroupName,
        notificationRequest,
        options,
      );
    },
    listBySubscriptionId: (options?: ActionGroupsListBySubscriptionIdOptionalParams) =>
      listBySubscriptionId(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ActionGroupsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      actionGroupName: string,
      options?: ActionGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, actionGroupName, options),
    update: (
      resourceGroupName: string,
      actionGroupName: string,
      actionGroupPatch: MicrosoftActionGroupsActionGroupPatchBody,
      options?: ActionGroupsUpdateOptionalParams,
    ) => update(context, resourceGroupName, actionGroupName, actionGroupPatch, options),
    createOrUpdate: (
      resourceGroupName: string,
      actionGroupName: string,
      actionGroup: MicrosoftActionGroupsActionGroupResource,
      options?: ActionGroupsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, actionGroupName, actionGroup, options),
    get: (
      resourceGroupName: string,
      actionGroupName: string,
      options?: ActionGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, actionGroupName, options),
  };
}

export function _getActionGroupsOperations(context: MonitorContext): ActionGroupsOperations {
  return {
    ..._getActionGroups(context),
  };
}
