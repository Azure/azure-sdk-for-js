// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByService,
  $delete,
  update,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/apiIssue/operations.js";
import type {
  ApiIssueListByServiceOptionalParams,
  ApiIssueDeleteOptionalParams,
  ApiIssueUpdateOptionalParams,
  ApiIssueCreateOrUpdateOptionalParams,
  ApiIssueGetEntityTagOptionalParams,
  ApiIssueGetOptionalParams,
} from "../../api/apiIssue/options.js";
import type { IssueContract, IssueUpdateContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ApiIssue operations. */
export interface ApiIssueOperations {
  /** Lists all issues associated with the specified API. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    options?: ApiIssueListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<IssueContract>;
  /** Deletes the specified Issue from an API. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    issueId: string,
    ifMatch: string,
    options?: ApiIssueDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an existing issue for an API. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    issueId: string,
    ifMatch: string,
    parameters: IssueUpdateContract,
    options?: ApiIssueUpdateOptionalParams,
  ) => Promise<IssueContract>;
  /** Creates a new Issue for an API or updates an existing one. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    issueId: string,
    parameters: IssueContract,
    options?: ApiIssueCreateOrUpdateOptionalParams,
  ) => Promise<IssueContract>;
  /** Gets the entity state (Etag) version of the Issue for an API specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    issueId: string,
    options?: ApiIssueGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the Issue for an API specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    issueId: string,
    options?: ApiIssueGetOptionalParams,
  ) => Promise<IssueContract>;
}

function _getApiIssue(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      options?: ApiIssueListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, apiId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      issueId: string,
      ifMatch: string,
      options?: ApiIssueDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, apiId, issueId, ifMatch, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      issueId: string,
      ifMatch: string,
      parameters: IssueUpdateContract,
      options?: ApiIssueUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, serviceName, apiId, issueId, ifMatch, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      issueId: string,
      parameters: IssueContract,
      options?: ApiIssueCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, serviceName, apiId, issueId, parameters, options),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      issueId: string,
      options?: ApiIssueGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, apiId, issueId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      issueId: string,
      options?: ApiIssueGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, apiId, issueId, options),
  };
}

export function _getApiIssueOperations(context: ApiManagementContext): ApiIssueOperations {
  return {
    ..._getApiIssue(context),
  };
}
