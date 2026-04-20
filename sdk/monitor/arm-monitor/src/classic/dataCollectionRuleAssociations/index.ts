// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import {
  listByRule,
  listByResource,
  $delete,
  create,
  get,
  listByDataCollectionEndpoint,
} from "../../api/dataCollectionRuleAssociations/operations.js";
import type {
  DataCollectionRuleAssociationsListByRuleOptionalParams,
  DataCollectionRuleAssociationsListByResourceOptionalParams,
  DataCollectionRuleAssociationsDeleteOptionalParams,
  DataCollectionRuleAssociationsCreateOptionalParams,
  DataCollectionRuleAssociationsGetOptionalParams,
  DataCollectionRuleAssociationsListByDataCollectionEndpointOptionalParams,
} from "../../api/dataCollectionRuleAssociations/options.js";
import type { DataCollectionRuleAssociationProxyOnlyResource } from "../../models/microsoft/dataCollection/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DataCollectionRuleAssociations operations. */
export interface DataCollectionRuleAssociationsOperations {
  /** Lists associations for the specified data collection rule. */
  listByRule: (
    resourceGroupName: string,
    dataCollectionRuleName: string,
    options?: DataCollectionRuleAssociationsListByRuleOptionalParams,
  ) => PagedAsyncIterableIterator<DataCollectionRuleAssociationProxyOnlyResource>;
  /** Lists associations for the specified resource. */
  listByResource: (
    resourceUri: string,
    options?: DataCollectionRuleAssociationsListByResourceOptionalParams,
  ) => PagedAsyncIterableIterator<DataCollectionRuleAssociationProxyOnlyResource>;
  /** Deletes an association. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceUri: string,
    associationName: string,
    options?: DataCollectionRuleAssociationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an association. */
  create: (
    resourceUri: string,
    associationName: string,
    options?: DataCollectionRuleAssociationsCreateOptionalParams,
  ) => Promise<DataCollectionRuleAssociationProxyOnlyResource>;
  /** Returns the specified association. */
  get: (
    resourceUri: string,
    associationName: string,
    options?: DataCollectionRuleAssociationsGetOptionalParams,
  ) => Promise<DataCollectionRuleAssociationProxyOnlyResource>;
  /** Lists associations for the specified data collection endpoint. */
  listByDataCollectionEndpoint: (
    resourceGroupName: string,
    dataCollectionEndpointName: string,
    options?: DataCollectionRuleAssociationsListByDataCollectionEndpointOptionalParams,
  ) => PagedAsyncIterableIterator<DataCollectionRuleAssociationProxyOnlyResource>;
}

function _getDataCollectionRuleAssociations(context: MonitorContext) {
  return {
    listByRule: (
      resourceGroupName: string,
      dataCollectionRuleName: string,
      options?: DataCollectionRuleAssociationsListByRuleOptionalParams,
    ) => listByRule(context, resourceGroupName, dataCollectionRuleName, options),
    listByResource: (
      resourceUri: string,
      options?: DataCollectionRuleAssociationsListByResourceOptionalParams,
    ) => listByResource(context, resourceUri, options),
    delete: (
      resourceUri: string,
      associationName: string,
      options?: DataCollectionRuleAssociationsDeleteOptionalParams,
    ) => $delete(context, resourceUri, associationName, options),
    create: (
      resourceUri: string,
      associationName: string,
      options?: DataCollectionRuleAssociationsCreateOptionalParams,
    ) => create(context, resourceUri, associationName, options),
    get: (
      resourceUri: string,
      associationName: string,
      options?: DataCollectionRuleAssociationsGetOptionalParams,
    ) => get(context, resourceUri, associationName, options),
    listByDataCollectionEndpoint: (
      resourceGroupName: string,
      dataCollectionEndpointName: string,
      options?: DataCollectionRuleAssociationsListByDataCollectionEndpointOptionalParams,
    ) =>
      listByDataCollectionEndpoint(context, resourceGroupName, dataCollectionEndpointName, options),
  };
}

export function _getDataCollectionRuleAssociationsOperations(
  context: MonitorContext,
): DataCollectionRuleAssociationsOperations {
  return {
    ..._getDataCollectionRuleAssociations(context),
  };
}
