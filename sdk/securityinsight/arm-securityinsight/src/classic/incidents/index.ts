// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import {
  listEntities,
  listBookmarks,
  listAlerts,
  runPlaybook,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/incidents/operations.js";
import type {
  IncidentsListEntitiesOptionalParams,
  IncidentsListBookmarksOptionalParams,
  IncidentsListAlertsOptionalParams,
  IncidentsRunPlaybookOptionalParams,
  IncidentsListOptionalParams,
  IncidentsDeleteOptionalParams,
  IncidentsCreateOrUpdateOptionalParams,
  IncidentsGetOptionalParams,
} from "../../api/incidents/options.js";
import type {
  Incident,
  IncidentAlertList,
  IncidentBookmarkList,
  IncidentEntitiesResponse,
  IncidentsRunPlaybookResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Incidents operations. */
export interface IncidentsOperations {
  /** Gets all entities for an incident. */
  listEntities: (
    resourceGroupName: string,
    workspaceName: string,
    incidentId: string,
    options?: IncidentsListEntitiesOptionalParams,
  ) => Promise<IncidentEntitiesResponse>;
  /** Gets all bookmarks for an incident. */
  listBookmarks: (
    resourceGroupName: string,
    workspaceName: string,
    incidentId: string,
    options?: IncidentsListBookmarksOptionalParams,
  ) => Promise<IncidentBookmarkList>;
  /** Gets all alerts for an incident. */
  listAlerts: (
    resourceGroupName: string,
    workspaceName: string,
    incidentId: string,
    options?: IncidentsListAlertsOptionalParams,
  ) => Promise<IncidentAlertList>;
  /** Triggers playbook on a specific incident */
  runPlaybook: (
    resourceGroupName: string,
    workspaceName: string,
    incidentIdentifier: string,
    options?: IncidentsRunPlaybookOptionalParams,
  ) => Promise<IncidentsRunPlaybookResponse>;
  /** Gets all incidents. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: IncidentsListOptionalParams,
  ) => PagedAsyncIterableIterator<Incident>;
  /** Deletes a given incident. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    incidentId: string,
    options?: IncidentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an incident. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    incidentId: string,
    incident: Incident,
    options?: IncidentsCreateOrUpdateOptionalParams,
  ) => Promise<Incident>;
  /** Gets a given incident. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    incidentId: string,
    options?: IncidentsGetOptionalParams,
  ) => Promise<Incident>;
}

function _getIncidents(context: SecurityInsightsContext) {
  return {
    listEntities: (
      resourceGroupName: string,
      workspaceName: string,
      incidentId: string,
      options?: IncidentsListEntitiesOptionalParams,
    ) => listEntities(context, resourceGroupName, workspaceName, incidentId, options),
    listBookmarks: (
      resourceGroupName: string,
      workspaceName: string,
      incidentId: string,
      options?: IncidentsListBookmarksOptionalParams,
    ) => listBookmarks(context, resourceGroupName, workspaceName, incidentId, options),
    listAlerts: (
      resourceGroupName: string,
      workspaceName: string,
      incidentId: string,
      options?: IncidentsListAlertsOptionalParams,
    ) => listAlerts(context, resourceGroupName, workspaceName, incidentId, options),
    runPlaybook: (
      resourceGroupName: string,
      workspaceName: string,
      incidentIdentifier: string,
      options?: IncidentsRunPlaybookOptionalParams,
    ) => runPlaybook(context, resourceGroupName, workspaceName, incidentIdentifier, options),
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: IncidentsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      incidentId: string,
      options?: IncidentsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, incidentId, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      incidentId: string,
      incident: Incident,
      options?: IncidentsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, incidentId, incident, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      incidentId: string,
      options?: IncidentsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, incidentId, options),
  };
}

export function _getIncidentsOperations(context: SecurityInsightsContext): IncidentsOperations {
  return {
    ..._getIncidents(context),
  };
}
