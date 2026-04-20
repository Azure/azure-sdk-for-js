// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/dataCollectionRules/operations.js";
import type {
  DataCollectionRulesListBySubscriptionOptionalParams,
  DataCollectionRulesListByResourceGroupOptionalParams,
  DataCollectionRulesDeleteOptionalParams,
  DataCollectionRulesUpdateOptionalParams,
  DataCollectionRulesCreateOptionalParams,
  DataCollectionRulesGetOptionalParams,
} from "../../api/dataCollectionRules/options.js";
import type { DataCollectionRuleResource } from "../../models/microsoft/dataCollection/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DataCollectionRules operations. */
export interface DataCollectionRulesOperations {
  /** Lists all data collection rules in the specified subscription. */
  listBySubscription: (
    options?: DataCollectionRulesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<DataCollectionRuleResource>;
  /** Lists all data collection rules in the specified resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: DataCollectionRulesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<DataCollectionRuleResource>;
  /** Deletes a data collection rule. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    dataCollectionRuleName: string,
    options?: DataCollectionRulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates part of a data collection rule. */
  update: (
    resourceGroupName: string,
    dataCollectionRuleName: string,
    options?: DataCollectionRulesUpdateOptionalParams,
  ) => Promise<DataCollectionRuleResource>;
  /** Creates or updates a data collection rule. */
  create: (
    resourceGroupName: string,
    dataCollectionRuleName: string,
    options?: DataCollectionRulesCreateOptionalParams,
  ) => Promise<DataCollectionRuleResource>;
  /** Returns the specified data collection rule. */
  get: (
    resourceGroupName: string,
    dataCollectionRuleName: string,
    options?: DataCollectionRulesGetOptionalParams,
  ) => Promise<DataCollectionRuleResource>;
}

function _getDataCollectionRules(context: MonitorContext) {
  return {
    listBySubscription: (options?: DataCollectionRulesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: DataCollectionRulesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      dataCollectionRuleName: string,
      options?: DataCollectionRulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, dataCollectionRuleName, options),
    update: (
      resourceGroupName: string,
      dataCollectionRuleName: string,
      options?: DataCollectionRulesUpdateOptionalParams,
    ) => update(context, resourceGroupName, dataCollectionRuleName, options),
    create: (
      resourceGroupName: string,
      dataCollectionRuleName: string,
      options?: DataCollectionRulesCreateOptionalParams,
    ) => create(context, resourceGroupName, dataCollectionRuleName, options),
    get: (
      resourceGroupName: string,
      dataCollectionRuleName: string,
      options?: DataCollectionRulesGetOptionalParams,
    ) => get(context, resourceGroupName, dataCollectionRuleName, options),
  };
}

export function _getDataCollectionRulesOperations(
  context: MonitorContext,
): DataCollectionRulesOperations {
  return {
    ..._getDataCollectionRules(context),
  };
}
