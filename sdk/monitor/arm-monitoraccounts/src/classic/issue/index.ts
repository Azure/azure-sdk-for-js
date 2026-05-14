// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorContext } from "../../api/monitorContext.js";
import {
  setBackgroundVisualization,
  fetchBackgroundVisualization,
  addOrUpdateResources,
  listResources,
  addOrUpdateAlerts,
  listAlerts,
  fetchInvestigationResult,
  addInvestigationResult,
  list,
  $delete,
  get,
  update,
  create,
} from "../../api/issue/operations.js";
import {
  IssueSetBackgroundVisualizationOptionalParams,
  IssueFetchBackgroundVisualizationOptionalParams,
  IssueAddOrUpdateResourcesOptionalParams,
  IssueListResourcesOptionalParams,
  IssueAddOrUpdateAlertsOptionalParams,
  IssueListAlertsOptionalParams,
  IssueFetchInvestigationResultOptionalParams,
  IssueAddInvestigationResultOptionalParams,
  IssueListOptionalParams,
  IssueDeleteOptionalParams,
  IssueGetOptionalParams,
  IssueUpdateOptionalParams,
  IssueCreateOptionalParams,
} from "../../api/issue/options.js";
import {
  IssueResourceCreate,
  IssueResource,
  IssueResourceUpdate,
  InvestigationResult,
  FetchInvestigationResultParameters,
  ListParameter,
  PagedRelatedAlert,
  RelatedAlertsCreate,
  RelatedAlerts,
  PagedRelatedResource,
  RelatedResourcesCreate,
  RelatedResources,
  BackgroundVisualization,
  BackgroundVisualizationCreate,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Issue operations. */
export interface IssueOperations {
  /** Set the background visualization for the issue */
  setBackgroundVisualization: (
    resourceGroupName: string,
    azureMonitorWorkspaceName: string,
    issueName: string,
    body: BackgroundVisualizationCreate,
    options?: IssueSetBackgroundVisualizationOptionalParams,
  ) => Promise<void>;
  /** Fetch the background visualization of the issue */
  fetchBackgroundVisualization: (
    resourceGroupName: string,
    azureMonitorWorkspaceName: string,
    issueName: string,
    options?: IssueFetchBackgroundVisualizationOptionalParams,
  ) => Promise<BackgroundVisualization>;
  /** Add or update resources in the issue */
  addOrUpdateResources: (
    resourceGroupName: string,
    azureMonitorWorkspaceName: string,
    issueName: string,
    body: RelatedResourcesCreate,
    options?: IssueAddOrUpdateResourcesOptionalParams,
  ) => Promise<RelatedResources>;
  /** List all resources in the issue - this method uses pagination to return all resources */
  listResources: (
    resourceGroupName: string,
    azureMonitorWorkspaceName: string,
    issueName: string,
    body: ListParameter,
    options?: IssueListResourcesOptionalParams,
  ) => Promise<PagedRelatedResource>;
  /** Add or update alerts in the issue */
  addOrUpdateAlerts: (
    resourceGroupName: string,
    azureMonitorWorkspaceName: string,
    issueName: string,
    body: RelatedAlertsCreate,
    options?: IssueAddOrUpdateAlertsOptionalParams,
  ) => Promise<RelatedAlerts>;
  /** List all alerts in the issue - this method uses pagination to return all alerts */
  listAlerts: (
    resourceGroupName: string,
    azureMonitorWorkspaceName: string,
    issueName: string,
    body: ListParameter,
    options?: IssueListAlertsOptionalParams,
  ) => Promise<PagedRelatedAlert>;
  /** Fetch investigation result */
  fetchInvestigationResult: (
    resourceGroupName: string,
    azureMonitorWorkspaceName: string,
    issueName: string,
    body: FetchInvestigationResultParameters,
    options?: IssueFetchInvestigationResultOptionalParams,
  ) => Promise<InvestigationResult>;
  /** Adds investigation result */
  addInvestigationResult: (
    resourceGroupName: string,
    azureMonitorWorkspaceName: string,
    issueName: string,
    body: InvestigationResult,
    options?: IssueAddInvestigationResultOptionalParams,
  ) => Promise<InvestigationResult>;
  /** List all issues under the parent */
  list: (
    resourceGroupName: string,
    azureMonitorWorkspaceName: string,
    options?: IssueListOptionalParams,
  ) => PagedAsyncIterableIterator<IssueResource>;
  /** Delete an issue */
  delete: (
    resourceGroupName: string,
    azureMonitorWorkspaceName: string,
    issueName: string,
    options?: IssueDeleteOptionalParams,
  ) => Promise<void>;
  /** Get issue properties */
  get: (
    resourceGroupName: string,
    azureMonitorWorkspaceName: string,
    issueName: string,
    options?: IssueGetOptionalParams,
  ) => Promise<IssueResource>;
  /** Update an issue */
  update: (
    resourceGroupName: string,
    azureMonitorWorkspaceName: string,
    issueName: string,
    properties: IssueResourceUpdate,
    options?: IssueUpdateOptionalParams,
  ) => Promise<IssueResource>;
  /** Create a new issue or updates an existing one */
  create: (
    resourceGroupName: string,
    azureMonitorWorkspaceName: string,
    issueName: string,
    resource: IssueResourceCreate,
    options?: IssueCreateOptionalParams,
  ) => Promise<IssueResource>;
}

function _getIssue(context: MonitorContext) {
  return {
    setBackgroundVisualization: (
      resourceGroupName: string,
      azureMonitorWorkspaceName: string,
      issueName: string,
      body: BackgroundVisualizationCreate,
      options?: IssueSetBackgroundVisualizationOptionalParams,
    ) =>
      setBackgroundVisualization(
        context,
        resourceGroupName,
        azureMonitorWorkspaceName,
        issueName,
        body,
        options,
      ),
    fetchBackgroundVisualization: (
      resourceGroupName: string,
      azureMonitorWorkspaceName: string,
      issueName: string,
      options?: IssueFetchBackgroundVisualizationOptionalParams,
    ) =>
      fetchBackgroundVisualization(
        context,
        resourceGroupName,
        azureMonitorWorkspaceName,
        issueName,
        options,
      ),
    addOrUpdateResources: (
      resourceGroupName: string,
      azureMonitorWorkspaceName: string,
      issueName: string,
      body: RelatedResourcesCreate,
      options?: IssueAddOrUpdateResourcesOptionalParams,
    ) =>
      addOrUpdateResources(
        context,
        resourceGroupName,
        azureMonitorWorkspaceName,
        issueName,
        body,
        options,
      ),
    listResources: (
      resourceGroupName: string,
      azureMonitorWorkspaceName: string,
      issueName: string,
      body: ListParameter,
      options?: IssueListResourcesOptionalParams,
    ) =>
      listResources(
        context,
        resourceGroupName,
        azureMonitorWorkspaceName,
        issueName,
        body,
        options,
      ),
    addOrUpdateAlerts: (
      resourceGroupName: string,
      azureMonitorWorkspaceName: string,
      issueName: string,
      body: RelatedAlertsCreate,
      options?: IssueAddOrUpdateAlertsOptionalParams,
    ) =>
      addOrUpdateAlerts(
        context,
        resourceGroupName,
        azureMonitorWorkspaceName,
        issueName,
        body,
        options,
      ),
    listAlerts: (
      resourceGroupName: string,
      azureMonitorWorkspaceName: string,
      issueName: string,
      body: ListParameter,
      options?: IssueListAlertsOptionalParams,
    ) =>
      listAlerts(context, resourceGroupName, azureMonitorWorkspaceName, issueName, body, options),
    fetchInvestigationResult: (
      resourceGroupName: string,
      azureMonitorWorkspaceName: string,
      issueName: string,
      body: FetchInvestigationResultParameters,
      options?: IssueFetchInvestigationResultOptionalParams,
    ) =>
      fetchInvestigationResult(
        context,
        resourceGroupName,
        azureMonitorWorkspaceName,
        issueName,
        body,
        options,
      ),
    addInvestigationResult: (
      resourceGroupName: string,
      azureMonitorWorkspaceName: string,
      issueName: string,
      body: InvestigationResult,
      options?: IssueAddInvestigationResultOptionalParams,
    ) =>
      addInvestigationResult(
        context,
        resourceGroupName,
        azureMonitorWorkspaceName,
        issueName,
        body,
        options,
      ),
    list: (
      resourceGroupName: string,
      azureMonitorWorkspaceName: string,
      options?: IssueListOptionalParams,
    ) => list(context, resourceGroupName, azureMonitorWorkspaceName, options),
    delete: (
      resourceGroupName: string,
      azureMonitorWorkspaceName: string,
      issueName: string,
      options?: IssueDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, azureMonitorWorkspaceName, issueName, options),
    get: (
      resourceGroupName: string,
      azureMonitorWorkspaceName: string,
      issueName: string,
      options?: IssueGetOptionalParams,
    ) => get(context, resourceGroupName, azureMonitorWorkspaceName, issueName, options),
    update: (
      resourceGroupName: string,
      azureMonitorWorkspaceName: string,
      issueName: string,
      properties: IssueResourceUpdate,
      options?: IssueUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, azureMonitorWorkspaceName, issueName, properties, options),
    create: (
      resourceGroupName: string,
      azureMonitorWorkspaceName: string,
      issueName: string,
      resource: IssueResourceCreate,
      options?: IssueCreateOptionalParams,
    ) =>
      create(context, resourceGroupName, azureMonitorWorkspaceName, issueName, resource, options),
  };
}

export function _getIssueOperations(context: MonitorContext): IssueOperations {
  return {
    ..._getIssue(context),
  };
}
