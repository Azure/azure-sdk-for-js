// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import {
  queryIndicators,
  createIndicator,
  replaceTags,
  appendTags,
  $delete,
  create,
  get,
} from "../../api/threatIntelligenceIndicator/operations.js";
import type {
  ThreatIntelligenceIndicatorQueryIndicatorsOptionalParams,
  ThreatIntelligenceIndicatorCreateIndicatorOptionalParams,
  ThreatIntelligenceIndicatorReplaceTagsOptionalParams,
  ThreatIntelligenceIndicatorAppendTagsOptionalParams,
  ThreatIntelligenceIndicatorDeleteOptionalParams,
  ThreatIntelligenceIndicatorCreateOptionalParams,
  ThreatIntelligenceIndicatorGetOptionalParams,
} from "../../api/threatIntelligenceIndicator/options.js";
import type {
  ThreatIntelligenceInformationUnion,
  ThreatIntelligenceIndicatorModel,
  ThreatIntelligenceAppendTags,
  ThreatIntelligenceFilteringCriteria,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ThreatIntelligenceIndicator operations. */
export interface ThreatIntelligenceIndicatorOperations {
  /** Query threat intelligence indicators as per filtering criteria. */
  queryIndicators: (
    resourceGroupName: string,
    workspaceName: string,
    threatIntelligenceFilteringCriteria: ThreatIntelligenceFilteringCriteria,
    options?: ThreatIntelligenceIndicatorQueryIndicatorsOptionalParams,
  ) => PagedAsyncIterableIterator<ThreatIntelligenceInformationUnion>;
  /** Create a new threat intelligence indicator. */
  createIndicator: (
    resourceGroupName: string,
    workspaceName: string,
    threatIntelligenceProperties: ThreatIntelligenceIndicatorModel,
    options?: ThreatIntelligenceIndicatorCreateIndicatorOptionalParams,
  ) => Promise<ThreatIntelligenceInformationUnion>;
  /** Replace tags added to a threat intelligence indicator. */
  replaceTags: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    threatIntelligenceReplaceTags: ThreatIntelligenceIndicatorModel,
    options?: ThreatIntelligenceIndicatorReplaceTagsOptionalParams,
  ) => Promise<ThreatIntelligenceInformationUnion>;
  /** Append tags to a threat intelligence indicator. */
  appendTags: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    threatIntelligenceAppendTags: ThreatIntelligenceAppendTags,
    options?: ThreatIntelligenceIndicatorAppendTagsOptionalParams,
  ) => Promise<void>;
  /** Delete a threat intelligence indicator. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: ThreatIntelligenceIndicatorDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a threat Intelligence indicator. */
  create: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    threatIntelligenceProperties: ThreatIntelligenceIndicatorModel,
    options?: ThreatIntelligenceIndicatorCreateOptionalParams,
  ) => Promise<ThreatIntelligenceInformationUnion>;
  /** View a threat intelligence indicator by name. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: ThreatIntelligenceIndicatorGetOptionalParams,
  ) => Promise<ThreatIntelligenceInformationUnion>;
}

function _getThreatIntelligenceIndicator(context: SecurityInsightsContext) {
  return {
    queryIndicators: (
      resourceGroupName: string,
      workspaceName: string,
      threatIntelligenceFilteringCriteria: ThreatIntelligenceFilteringCriteria,
      options?: ThreatIntelligenceIndicatorQueryIndicatorsOptionalParams,
    ) =>
      queryIndicators(
        context,
        resourceGroupName,
        workspaceName,
        threatIntelligenceFilteringCriteria,
        options,
      ),
    createIndicator: (
      resourceGroupName: string,
      workspaceName: string,
      threatIntelligenceProperties: ThreatIntelligenceIndicatorModel,
      options?: ThreatIntelligenceIndicatorCreateIndicatorOptionalParams,
    ) =>
      createIndicator(
        context,
        resourceGroupName,
        workspaceName,
        threatIntelligenceProperties,
        options,
      ),
    replaceTags: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      threatIntelligenceReplaceTags: ThreatIntelligenceIndicatorModel,
      options?: ThreatIntelligenceIndicatorReplaceTagsOptionalParams,
    ) =>
      replaceTags(
        context,
        resourceGroupName,
        workspaceName,
        name,
        threatIntelligenceReplaceTags,
        options,
      ),
    appendTags: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      threatIntelligenceAppendTags: ThreatIntelligenceAppendTags,
      options?: ThreatIntelligenceIndicatorAppendTagsOptionalParams,
    ) =>
      appendTags(
        context,
        resourceGroupName,
        workspaceName,
        name,
        threatIntelligenceAppendTags,
        options,
      ),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: ThreatIntelligenceIndicatorDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, name, options),
    create: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      threatIntelligenceProperties: ThreatIntelligenceIndicatorModel,
      options?: ThreatIntelligenceIndicatorCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        workspaceName,
        name,
        threatIntelligenceProperties,
        options,
      ),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: ThreatIntelligenceIndicatorGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, name, options),
  };
}

export function _getThreatIntelligenceIndicatorOperations(
  context: SecurityInsightsContext,
): ThreatIntelligenceIndicatorOperations {
  return {
    ..._getThreatIntelligenceIndicator(context),
  };
}
