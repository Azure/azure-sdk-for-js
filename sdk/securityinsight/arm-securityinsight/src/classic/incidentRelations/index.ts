// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/incidentRelations/operations.js";
import type {
  IncidentRelationsListOptionalParams,
  IncidentRelationsDeleteOptionalParams,
  IncidentRelationsCreateOrUpdateOptionalParams,
  IncidentRelationsGetOptionalParams,
} from "../../api/incidentRelations/options.js";
import type { Relation } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a IncidentRelations operations. */
export interface IncidentRelationsOperations {
  /** Gets all relations for a given incident. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    incidentId: string,
    options?: IncidentRelationsListOptionalParams,
  ) => PagedAsyncIterableIterator<Relation>;
  /** Deletes a relation for a given incident. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    incidentId: string,
    relationName: string,
    options?: IncidentRelationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates the incident relation. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    incidentId: string,
    relationName: string,
    relation: Relation,
    options?: IncidentRelationsCreateOrUpdateOptionalParams,
  ) => Promise<Relation>;
  /** Gets a relation for a given incident. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    incidentId: string,
    relationName: string,
    options?: IncidentRelationsGetOptionalParams,
  ) => Promise<Relation>;
}

function _getIncidentRelations(context: SecurityInsightsContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      incidentId: string,
      options?: IncidentRelationsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, incidentId, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      incidentId: string,
      relationName: string,
      options?: IncidentRelationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, incidentId, relationName, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      incidentId: string,
      relationName: string,
      relation: Relation,
      options?: IncidentRelationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        incidentId,
        relationName,
        relation,
        options,
      ),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      incidentId: string,
      relationName: string,
      options?: IncidentRelationsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, incidentId, relationName, options),
  };
}

export function _getIncidentRelationsOperations(
  context: SecurityInsightsContext,
): IncidentRelationsOperations {
  return {
    ..._getIncidentRelations(context),
  };
}
