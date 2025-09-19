// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext } from "../../api/microsoftElasticContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/tagRules/operations.js";
import type {
  TagRulesListOptionalParams,
  TagRulesDeleteOptionalParams,
  TagRulesCreateOrUpdateOptionalParams,
  TagRulesGetOptionalParams,
} from "../../api/tagRules/options.js";
import type { MonitoringTagRules } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a TagRules operations. */
export interface TagRulesOperations {
  /** List all tag rules for a given Elastic monitor resource, helping you manage fine-grained control over observability based on resource tags. */
  list: (
    resourceGroupName: string,
    monitorName: string,
    options?: TagRulesListOptionalParams,
  ) => PagedAsyncIterableIterator<MonitoringTagRules>;
  /** Delete a tag rule set for a given Elastic monitor resource, removing fine-grained control over observability based on resource tags. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    monitorName: string,
    ruleSetName: string,
    options?: TagRulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update a tag rule set for a given Elastic monitor resource, enabling fine-grained control over observability based on resource tags. */
  createOrUpdate: (
    resourceGroupName: string,
    monitorName: string,
    ruleSetName: string,
    options?: TagRulesCreateOrUpdateOptionalParams,
  ) => Promise<MonitoringTagRules>;
  /** Get detailed information about a tag rule set for a given Elastic monitor resource. */
  get: (
    resourceGroupName: string,
    monitorName: string,
    ruleSetName: string,
    options?: TagRulesGetOptionalParams,
  ) => Promise<MonitoringTagRules>;
}

function _getTagRules(context: MicrosoftElasticContext) {
  return {
    list: (resourceGroupName: string, monitorName: string, options?: TagRulesListOptionalParams) =>
      list(context, resourceGroupName, monitorName, options),
    delete: (
      resourceGroupName: string,
      monitorName: string,
      ruleSetName: string,
      options?: TagRulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, monitorName, ruleSetName, options),
    createOrUpdate: (
      resourceGroupName: string,
      monitorName: string,
      ruleSetName: string,
      options?: TagRulesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, monitorName, ruleSetName, options),
    get: (
      resourceGroupName: string,
      monitorName: string,
      ruleSetName: string,
      options?: TagRulesGetOptionalParams,
    ) => get(context, resourceGroupName, monitorName, ruleSetName, options),
  };
}

export function _getTagRulesOperations(context: MicrosoftElasticContext): TagRulesOperations {
  return {
    ..._getTagRules(context),
  };
}
