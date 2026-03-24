// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/incidentComments/operations.js";
import type {
  IncidentCommentsListOptionalParams,
  IncidentCommentsDeleteOptionalParams,
  IncidentCommentsCreateOrUpdateOptionalParams,
  IncidentCommentsGetOptionalParams,
} from "../../api/incidentComments/options.js";
import type { IncidentComment } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a IncidentComments operations. */
export interface IncidentCommentsOperations {
  /** Gets all comments for a given incident. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    incidentId: string,
    options?: IncidentCommentsListOptionalParams,
  ) => PagedAsyncIterableIterator<IncidentComment>;
  /** Deletes a comment for a given incident. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    incidentId: string,
    incidentCommentId: string,
    options?: IncidentCommentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a comment for a given incident. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    incidentId: string,
    incidentCommentId: string,
    incidentComment: IncidentComment,
    options?: IncidentCommentsCreateOrUpdateOptionalParams,
  ) => Promise<IncidentComment>;
  /** Gets an incident comment. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    incidentId: string,
    incidentCommentId: string,
    options?: IncidentCommentsGetOptionalParams,
  ) => Promise<IncidentComment>;
}

function _getIncidentComments(context: SecurityInsightsContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      incidentId: string,
      options?: IncidentCommentsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, incidentId, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      incidentId: string,
      incidentCommentId: string,
      options?: IncidentCommentsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, incidentId, incidentCommentId, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      incidentId: string,
      incidentCommentId: string,
      incidentComment: IncidentComment,
      options?: IncidentCommentsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        incidentId,
        incidentCommentId,
        incidentComment,
        options,
      ),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      incidentId: string,
      incidentCommentId: string,
      options?: IncidentCommentsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, incidentId, incidentCommentId, options),
  };
}

export function _getIncidentCommentsOperations(
  context: SecurityInsightsContext,
): IncidentCommentsOperations {
  return {
    ..._getIncidentComments(context),
  };
}
