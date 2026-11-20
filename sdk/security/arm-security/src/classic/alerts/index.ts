// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import {
  simulate,
  listByResourceGroup,
  list,
  updateResourceGroupLevelStateToInProgress,
  updateResourceGroupLevelStateToActivate,
  updateResourceGroupLevelStateToDismiss,
  updateResourceGroupLevelStateToResolve,
  listResourceGroupLevelByRegion,
  getResourceGroupLevel,
  updateSubscriptionLevelStateToInProgress,
  updateSubscriptionLevelStateToActivate,
  updateSubscriptionLevelStateToResolve,
  updateSubscriptionLevelStateToDismiss,
  listSubscriptionLevelByRegion,
  getSubscriptionLevel,
} from "../../api/alerts/operations.js";
import type {
  AlertsSimulateOptionalParams,
  AlertsListByResourceGroupOptionalParams,
  AlertsListOptionalParams,
  AlertsUpdateResourceGroupLevelStateToInProgressOptionalParams,
  AlertsUpdateResourceGroupLevelStateToActivateOptionalParams,
  AlertsUpdateResourceGroupLevelStateToDismissOptionalParams,
  AlertsUpdateResourceGroupLevelStateToResolveOptionalParams,
  AlertsListResourceGroupLevelByRegionOptionalParams,
  AlertsGetResourceGroupLevelOptionalParams,
  AlertsUpdateSubscriptionLevelStateToInProgressOptionalParams,
  AlertsUpdateSubscriptionLevelStateToActivateOptionalParams,
  AlertsUpdateSubscriptionLevelStateToResolveOptionalParams,
  AlertsUpdateSubscriptionLevelStateToDismissOptionalParams,
  AlertsListSubscriptionLevelByRegionOptionalParams,
  AlertsGetSubscriptionLevelOptionalParams,
} from "../../api/alerts/options.js";
import type { Alert, AlertSimulatorRequestBody } from "../../models/alertsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Alerts operations. */
export interface AlertsOperations {
  /** Simulate security alerts */
  simulate: (
    ascLocation: string,
    alertSimulatorRequestBody: AlertSimulatorRequestBody,
    options?: AlertsSimulateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use simulate instead */
  beginSimulate: (
    ascLocation: string,
    alertSimulatorRequestBody: AlertSimulatorRequestBody,
    options?: AlertsSimulateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use simulate instead */
  beginSimulateAndWait: (
    ascLocation: string,
    alertSimulatorRequestBody: AlertSimulatorRequestBody,
    options?: AlertsSimulateOptionalParams,
  ) => Promise<void>;
  /** List all the alerts that are associated with the resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AlertsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Alert>;
  /** List all the alerts that are associated with the subscription */
  list: (options?: AlertsListOptionalParams) => PagedAsyncIterableIterator<Alert>;
  /** Update the alert's state */
  updateResourceGroupLevelStateToInProgress: (
    resourceGroupName: string,
    ascLocation: string,
    alertName: string,
    options?: AlertsUpdateResourceGroupLevelStateToInProgressOptionalParams,
  ) => Promise<void>;
  /** Update the alert's state */
  updateResourceGroupLevelStateToActivate: (
    resourceGroupName: string,
    ascLocation: string,
    alertName: string,
    options?: AlertsUpdateResourceGroupLevelStateToActivateOptionalParams,
  ) => Promise<void>;
  /** Update the alert's state */
  updateResourceGroupLevelStateToDismiss: (
    resourceGroupName: string,
    ascLocation: string,
    alertName: string,
    options?: AlertsUpdateResourceGroupLevelStateToDismissOptionalParams,
  ) => Promise<void>;
  /** Update the alert's state */
  updateResourceGroupLevelStateToResolve: (
    resourceGroupName: string,
    ascLocation: string,
    alertName: string,
    options?: AlertsUpdateResourceGroupLevelStateToResolveOptionalParams,
  ) => Promise<void>;
  /** List all the alerts that are associated with the resource group that are stored in a specific location */
  listResourceGroupLevelByRegion: (
    resourceGroupName: string,
    ascLocation: string,
    options?: AlertsListResourceGroupLevelByRegionOptionalParams,
  ) => PagedAsyncIterableIterator<Alert>;
  /** Get an alert that is associated a resource group or a resource in a resource group */
  getResourceGroupLevel: (
    resourceGroupName: string,
    ascLocation: string,
    alertName: string,
    options?: AlertsGetResourceGroupLevelOptionalParams,
  ) => Promise<Alert>;
  /** Update the alert's state */
  updateSubscriptionLevelStateToInProgress: (
    ascLocation: string,
    alertName: string,
    options?: AlertsUpdateSubscriptionLevelStateToInProgressOptionalParams,
  ) => Promise<void>;
  /** Update the alert's state */
  updateSubscriptionLevelStateToActivate: (
    ascLocation: string,
    alertName: string,
    options?: AlertsUpdateSubscriptionLevelStateToActivateOptionalParams,
  ) => Promise<void>;
  /** Update the alert's state */
  updateSubscriptionLevelStateToResolve: (
    ascLocation: string,
    alertName: string,
    options?: AlertsUpdateSubscriptionLevelStateToResolveOptionalParams,
  ) => Promise<void>;
  /** Update the alert's state */
  updateSubscriptionLevelStateToDismiss: (
    ascLocation: string,
    alertName: string,
    options?: AlertsUpdateSubscriptionLevelStateToDismissOptionalParams,
  ) => Promise<void>;
  /** List all the alerts that are associated with the subscription that are stored in a specific location */
  listSubscriptionLevelByRegion: (
    ascLocation: string,
    options?: AlertsListSubscriptionLevelByRegionOptionalParams,
  ) => PagedAsyncIterableIterator<Alert>;
  /** Get an alert that is associated with a subscription */
  getSubscriptionLevel: (
    ascLocation: string,
    alertName: string,
    options?: AlertsGetSubscriptionLevelOptionalParams,
  ) => Promise<Alert>;
}

function _getAlerts(context: SecurityCenterContext) {
  return {
    simulate: (
      ascLocation: string,
      alertSimulatorRequestBody: AlertSimulatorRequestBody,
      options?: AlertsSimulateOptionalParams,
    ) => simulate(context, ascLocation, alertSimulatorRequestBody, options),
    beginSimulate: async (
      ascLocation: string,
      alertSimulatorRequestBody: AlertSimulatorRequestBody,
      options?: AlertsSimulateOptionalParams,
    ) => {
      const poller = simulate(context, ascLocation, alertSimulatorRequestBody, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginSimulateAndWait: async (
      ascLocation: string,
      alertSimulatorRequestBody: AlertSimulatorRequestBody,
      options?: AlertsSimulateOptionalParams,
    ) => {
      return await simulate(context, ascLocation, alertSimulatorRequestBody, options);
    },
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AlertsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    list: (options?: AlertsListOptionalParams) => list(context, options),
    updateResourceGroupLevelStateToInProgress: (
      resourceGroupName: string,
      ascLocation: string,
      alertName: string,
      options?: AlertsUpdateResourceGroupLevelStateToInProgressOptionalParams,
    ) =>
      updateResourceGroupLevelStateToInProgress(
        context,
        resourceGroupName,
        ascLocation,
        alertName,
        options,
      ),
    updateResourceGroupLevelStateToActivate: (
      resourceGroupName: string,
      ascLocation: string,
      alertName: string,
      options?: AlertsUpdateResourceGroupLevelStateToActivateOptionalParams,
    ) =>
      updateResourceGroupLevelStateToActivate(
        context,
        resourceGroupName,
        ascLocation,
        alertName,
        options,
      ),
    updateResourceGroupLevelStateToDismiss: (
      resourceGroupName: string,
      ascLocation: string,
      alertName: string,
      options?: AlertsUpdateResourceGroupLevelStateToDismissOptionalParams,
    ) =>
      updateResourceGroupLevelStateToDismiss(
        context,
        resourceGroupName,
        ascLocation,
        alertName,
        options,
      ),
    updateResourceGroupLevelStateToResolve: (
      resourceGroupName: string,
      ascLocation: string,
      alertName: string,
      options?: AlertsUpdateResourceGroupLevelStateToResolveOptionalParams,
    ) =>
      updateResourceGroupLevelStateToResolve(
        context,
        resourceGroupName,
        ascLocation,
        alertName,
        options,
      ),
    listResourceGroupLevelByRegion: (
      resourceGroupName: string,
      ascLocation: string,
      options?: AlertsListResourceGroupLevelByRegionOptionalParams,
    ) => listResourceGroupLevelByRegion(context, resourceGroupName, ascLocation, options),
    getResourceGroupLevel: (
      resourceGroupName: string,
      ascLocation: string,
      alertName: string,
      options?: AlertsGetResourceGroupLevelOptionalParams,
    ) => getResourceGroupLevel(context, resourceGroupName, ascLocation, alertName, options),
    updateSubscriptionLevelStateToInProgress: (
      ascLocation: string,
      alertName: string,
      options?: AlertsUpdateSubscriptionLevelStateToInProgressOptionalParams,
    ) => updateSubscriptionLevelStateToInProgress(context, ascLocation, alertName, options),
    updateSubscriptionLevelStateToActivate: (
      ascLocation: string,
      alertName: string,
      options?: AlertsUpdateSubscriptionLevelStateToActivateOptionalParams,
    ) => updateSubscriptionLevelStateToActivate(context, ascLocation, alertName, options),
    updateSubscriptionLevelStateToResolve: (
      ascLocation: string,
      alertName: string,
      options?: AlertsUpdateSubscriptionLevelStateToResolveOptionalParams,
    ) => updateSubscriptionLevelStateToResolve(context, ascLocation, alertName, options),
    updateSubscriptionLevelStateToDismiss: (
      ascLocation: string,
      alertName: string,
      options?: AlertsUpdateSubscriptionLevelStateToDismissOptionalParams,
    ) => updateSubscriptionLevelStateToDismiss(context, ascLocation, alertName, options),
    listSubscriptionLevelByRegion: (
      ascLocation: string,
      options?: AlertsListSubscriptionLevelByRegionOptionalParams,
    ) => listSubscriptionLevelByRegion(context, ascLocation, options),
    getSubscriptionLevel: (
      ascLocation: string,
      alertName: string,
      options?: AlertsGetSubscriptionLevelOptionalParams,
    ) => getSubscriptionLevel(context, ascLocation, alertName, options),
  };
}

export function _getAlertsOperations(context: SecurityCenterContext): AlertsOperations {
  return {
    ..._getAlerts(context),
  };
}
