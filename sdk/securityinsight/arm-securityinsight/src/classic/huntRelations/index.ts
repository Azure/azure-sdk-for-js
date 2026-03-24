// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/huntRelations/operations.js";
import type {
  HuntRelationsListOptionalParams,
  HuntRelationsDeleteOptionalParams,
  HuntRelationsCreateOrUpdateOptionalParams,
  HuntRelationsGetOptionalParams,
} from "../../api/huntRelations/options.js";
import type { HuntRelation } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a HuntRelations operations. */
export interface HuntRelationsOperations {
  /** Gets all hunt relations */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    huntId: string,
    options?: HuntRelationsListOptionalParams,
  ) => PagedAsyncIterableIterator<HuntRelation>;
  /** Delete a hunt relation. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    huntId: string,
    huntRelationId: string,
    options?: HuntRelationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a hunt relation. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    huntId: string,
    huntRelationId: string,
    huntRelation: HuntRelation,
    options?: HuntRelationsCreateOrUpdateOptionalParams,
  ) => Promise<HuntRelation>;
  /** Gets a hunt relation */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    huntId: string,
    huntRelationId: string,
    options?: HuntRelationsGetOptionalParams,
  ) => Promise<HuntRelation>;
}

function _getHuntRelations(context: SecurityInsightsContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      huntId: string,
      options?: HuntRelationsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, huntId, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      huntId: string,
      huntRelationId: string,
      options?: HuntRelationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, huntId, huntRelationId, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      huntId: string,
      huntRelationId: string,
      huntRelation: HuntRelation,
      options?: HuntRelationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        huntId,
        huntRelationId,
        huntRelation,
        options,
      ),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      huntId: string,
      huntRelationId: string,
      options?: HuntRelationsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, huntId, huntRelationId, options),
  };
}

export function _getHuntRelationsOperations(
  context: SecurityInsightsContext,
): HuntRelationsOperations {
  return {
    ..._getHuntRelations(context),
  };
}
