// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  $delete,
  update,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/apiWiki/operations.js";
import type {
  ApiWikiDeleteOptionalParams,
  ApiWikiUpdateOptionalParams,
  ApiWikiCreateOrUpdateOptionalParams,
  ApiWikiGetEntityTagOptionalParams,
  ApiWikiGetOptionalParams,
} from "../../api/apiWiki/options.js";
import type { WikiContract, WikiUpdateContract } from "../../models/models.js";

/** Interface representing a ApiWiki operations. */
export interface ApiWikiOperations {
  /** Deletes the specified Wiki from an API. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    ifMatch: string,
    options?: ApiWikiDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the details of the Wiki for an API specified by its identifier. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    ifMatch: string,
    parameters: WikiUpdateContract,
    options?: ApiWikiUpdateOptionalParams,
  ) => Promise<WikiContract>;
  /** Creates a new Wiki for an API or updates an existing one. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    parameters: WikiContract,
    options?: ApiWikiCreateOrUpdateOptionalParams,
  ) => Promise<WikiContract>;
  /** Gets the entity state (Etag) version of the Wiki for an API specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    options?: ApiWikiGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the Wiki for an API specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    options?: ApiWikiGetOptionalParams,
  ) => Promise<WikiContract>;
}

function _getApiWiki(context: ApiManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      ifMatch: string,
      options?: ApiWikiDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, apiId, ifMatch, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      ifMatch: string,
      parameters: WikiUpdateContract,
      options?: ApiWikiUpdateOptionalParams,
    ) => update(context, resourceGroupName, serviceName, apiId, ifMatch, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      parameters: WikiContract,
      options?: ApiWikiCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serviceName, apiId, parameters, options),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      options?: ApiWikiGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, apiId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      options?: ApiWikiGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, apiId, options),
  };
}

export function _getApiWikiOperations(context: ApiManagementContext): ApiWikiOperations {
  return {
    ..._getApiWiki(context),
  };
}
