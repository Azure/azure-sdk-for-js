// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConfluentManagementContext } from "../../api/confluentManagementContext.js";
import {
  listByMonitor,
  $delete,
  createOrUpdate,
  get,
} from "../../api/monitorTagRules/operations.js";
import type {
  MonitorTagRulesListByMonitorOptionalParams,
  MonitorTagRulesDeleteOptionalParams,
  MonitorTagRulesCreateOrUpdateOptionalParams,
  MonitorTagRulesGetOptionalParams,
} from "../../api/monitorTagRules/options.js";
import type { MonitorTagRule } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a MonitorTagRules operations. */
export interface MonitorTagRulesOperations {
  /** Lists the rule sets configured for a Confluent monitor. */
  listByMonitor: (
    resourceGroupName: string,
    organizationName: string,
    monitorName: string,
    options?: MonitorTagRulesListByMonitorOptionalParams,
  ) => PagedAsyncIterableIterator<MonitorTagRule>;
  /** Deletes a named rule set from a Confluent monitor. */
  delete: (
    resourceGroupName: string,
    organizationName: string,
    monitorName: string,
    ruleSetName: string,
    options?: MonitorTagRulesDeleteOptionalParams,
  ) => Promise<void>;
  /**
   * Creates or fully replaces a named rule set that specifies which Azure logs
   * are sent through a Confluent monitor.
   */
  createOrUpdate: (
    resourceGroupName: string,
    organizationName: string,
    monitorName: string,
    ruleSetName: string,
    resource: MonitorTagRule,
    options?: MonitorTagRulesCreateOrUpdateOptionalParams,
  ) => Promise<MonitorTagRule>;
  /** Gets a named rule set for a Confluent monitor. */
  get: (
    resourceGroupName: string,
    organizationName: string,
    monitorName: string,
    ruleSetName: string,
    options?: MonitorTagRulesGetOptionalParams,
  ) => Promise<MonitorTagRule>;
}

function _getMonitorTagRules(context: ConfluentManagementContext) {
  return {
    listByMonitor: (
      resourceGroupName: string,
      organizationName: string,
      monitorName: string,
      options?: MonitorTagRulesListByMonitorOptionalParams,
    ) => listByMonitor(context, resourceGroupName, organizationName, monitorName, options),
    delete: (
      resourceGroupName: string,
      organizationName: string,
      monitorName: string,
      ruleSetName: string,
      options?: MonitorTagRulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, organizationName, monitorName, ruleSetName, options),
    createOrUpdate: (
      resourceGroupName: string,
      organizationName: string,
      monitorName: string,
      ruleSetName: string,
      resource: MonitorTagRule,
      options?: MonitorTagRulesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        organizationName,
        monitorName,
        ruleSetName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      organizationName: string,
      monitorName: string,
      ruleSetName: string,
      options?: MonitorTagRulesGetOptionalParams,
    ) => get(context, resourceGroupName, organizationName, monitorName, ruleSetName, options),
  };
}

export function _getMonitorTagRulesOperations(
  context: ConfluentManagementContext,
): MonitorTagRulesOperations {
  return {
    ..._getMonitorTagRules(context),
  };
}
