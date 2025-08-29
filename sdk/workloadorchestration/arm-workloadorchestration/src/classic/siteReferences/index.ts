// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementContext } from "../../api/workloadOrchestrationManagementContext.js";
import {
  listByContext,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/siteReferences/operations.js";
import {
  SiteReferencesListByContextOptionalParams,
  SiteReferencesDeleteOptionalParams,
  SiteReferencesUpdateOptionalParams,
  SiteReferencesCreateOrUpdateOptionalParams,
  SiteReferencesGetOptionalParams,
} from "../../api/siteReferences/options.js";
import { SiteReference } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SiteReferences operations. */
export interface SiteReferencesOperations {
  /** List Site Reference Resources */
  listByContext: (
    resourceGroupName: string,
    contextName: string,
    options?: SiteReferencesListByContextOptionalParams,
  ) => PagedAsyncIterableIterator<SiteReference>;
  /** Get Site Reference Resource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    contextName: string,
    siteReferenceName: string,
    options?: SiteReferencesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Get Site Reference Resource */
  update: (
    resourceGroupName: string,
    contextName: string,
    siteReferenceName: string,
    properties: SiteReference,
    options?: SiteReferencesUpdateOptionalParams,
  ) => PollerLike<OperationState<SiteReference>, SiteReference>;
  /** Get Site Reference Resource */
  createOrUpdate: (
    resourceGroupName: string,
    contextName: string,
    siteReferenceName: string,
    resource: SiteReference,
    options?: SiteReferencesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SiteReference>, SiteReference>;
  /** Get Site Reference Resource */
  get: (
    resourceGroupName: string,
    contextName: string,
    siteReferenceName: string,
    options?: SiteReferencesGetOptionalParams,
  ) => Promise<SiteReference>;
}

function _getSiteReferences(context: WorkloadOrchestrationManagementContext) {
  return {
    listByContext: (
      resourceGroupName: string,
      contextName: string,
      options?: SiteReferencesListByContextOptionalParams,
    ) => listByContext(context, resourceGroupName, contextName, options),
    delete: (
      resourceGroupName: string,
      contextName: string,
      siteReferenceName: string,
      options?: SiteReferencesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, contextName, siteReferenceName, options),
    update: (
      resourceGroupName: string,
      contextName: string,
      siteReferenceName: string,
      properties: SiteReference,
      options?: SiteReferencesUpdateOptionalParams,
    ) => update(context, resourceGroupName, contextName, siteReferenceName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      contextName: string,
      siteReferenceName: string,
      resource: SiteReference,
      options?: SiteReferencesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, contextName, siteReferenceName, resource, options),
    get: (
      resourceGroupName: string,
      contextName: string,
      siteReferenceName: string,
      options?: SiteReferencesGetOptionalParams,
    ) => get(context, resourceGroupName, contextName, siteReferenceName, options),
  };
}

export function _getSiteReferencesOperations(
  context: WorkloadOrchestrationManagementContext,
): SiteReferencesOperations {
  return {
    ..._getSiteReferences(context),
  };
}
