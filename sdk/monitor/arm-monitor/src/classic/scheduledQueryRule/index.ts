// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import { reconcileNSP, listNSP, getNSP } from "../../api/scheduledQueryRule/operations.js";
import type {
  ScheduledQueryRuleReconcileNSPOptionalParams,
  ScheduledQueryRuleListNSPOptionalParams,
  ScheduledQueryRuleGetNSPOptionalParams,
} from "../../api/scheduledQueryRule/options.js";
import type { NetworkSecurityPerimeterConfiguration } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ScheduledQueryRule operations. */
export interface ScheduledQueryRuleOperations {
  /** Reconcile network security perimeter configuration for ScheduledQueryRule resource. */
  reconcileNSP: (
    resourceGroupName: string,
    ruleName: string,
    networkSecurityPerimeterConfigurationName: string,
    options?: ScheduledQueryRuleReconcileNSPOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use reconcileNSP instead */
  beginReconcileNSP: (
    resourceGroupName: string,
    ruleName: string,
    networkSecurityPerimeterConfigurationName: string,
    options?: ScheduledQueryRuleReconcileNSPOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use reconcileNSP instead */
  beginReconcileNSPAndWait: (
    resourceGroupName: string,
    ruleName: string,
    networkSecurityPerimeterConfigurationName: string,
    options?: ScheduledQueryRuleReconcileNSPOptionalParams,
  ) => Promise<void>;
  /** Gets a list of NSP configurations for specified scheduled query rule. */
  listNSP: (
    resourceGroupName: string,
    ruleName: string,
    options?: ScheduledQueryRuleListNSPOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkSecurityPerimeterConfiguration>;
  /** Gets a network security perimeter configuration. */
  getNSP: (
    resourceGroupName: string,
    ruleName: string,
    networkSecurityPerimeterConfigurationName: string,
    options?: ScheduledQueryRuleGetNSPOptionalParams,
  ) => Promise<NetworkSecurityPerimeterConfiguration>;
}

function _getScheduledQueryRule(context: MonitorContext) {
  return {
    reconcileNSP: (
      resourceGroupName: string,
      ruleName: string,
      networkSecurityPerimeterConfigurationName: string,
      options?: ScheduledQueryRuleReconcileNSPOptionalParams,
    ) =>
      reconcileNSP(
        context,
        resourceGroupName,
        ruleName,
        networkSecurityPerimeterConfigurationName,
        options,
      ),
    beginReconcileNSP: async (
      resourceGroupName: string,
      ruleName: string,
      networkSecurityPerimeterConfigurationName: string,
      options?: ScheduledQueryRuleReconcileNSPOptionalParams,
    ) => {
      const poller = reconcileNSP(
        context,
        resourceGroupName,
        ruleName,
        networkSecurityPerimeterConfigurationName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginReconcileNSPAndWait: async (
      resourceGroupName: string,
      ruleName: string,
      networkSecurityPerimeterConfigurationName: string,
      options?: ScheduledQueryRuleReconcileNSPOptionalParams,
    ) => {
      return await reconcileNSP(
        context,
        resourceGroupName,
        ruleName,
        networkSecurityPerimeterConfigurationName,
        options,
      );
    },
    listNSP: (
      resourceGroupName: string,
      ruleName: string,
      options?: ScheduledQueryRuleListNSPOptionalParams,
    ) => listNSP(context, resourceGroupName, ruleName, options),
    getNSP: (
      resourceGroupName: string,
      ruleName: string,
      networkSecurityPerimeterConfigurationName: string,
      options?: ScheduledQueryRuleGetNSPOptionalParams,
    ) =>
      getNSP(
        context,
        resourceGroupName,
        ruleName,
        networkSecurityPerimeterConfigurationName,
        options,
      ),
  };
}

export function _getScheduledQueryRuleOperations(
  context: MonitorContext,
): ScheduledQueryRuleOperations {
  return {
    ..._getScheduledQueryRule(context),
  };
}
