// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByClientApplications,
  $delete,
  create,
  get,
} from "../../api/clientApplicationProductLink/operations.js";
import type {
  ClientApplicationProductLinkListByClientApplicationsOptionalParams,
  ClientApplicationProductLinkDeleteOptionalParams,
  ClientApplicationProductLinkCreateOptionalParams,
  ClientApplicationProductLinkGetOptionalParams,
} from "../../api/clientApplicationProductLink/options.js";
import type { ClientApplicationProductLinkContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ClientApplicationProductLink operations. */
export interface ClientApplicationProductLinkOperations {
  /** Lists a collection of product links associated with the specified client application. */
  listByClientApplications: (
    resourceGroupName: string,
    serviceName: string,
    clientApplicationId: string,
    options?: ClientApplicationProductLinkListByClientApplicationsOptionalParams,
  ) => PagedAsyncIterableIterator<ClientApplicationProductLinkContract>;
  /** Deletes the specified Product from the specified client application. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    clientApplicationId: string,
    clientApplicationProductLinkId: string,
    options?: ClientApplicationProductLinkDeleteOptionalParams,
  ) => Promise<void>;
  /** Adds an Product to the specified Client Application via link. */
  create: (
    resourceGroupName: string,
    serviceName: string,
    clientApplicationId: string,
    clientApplicationProductLinkId: string,
    parameters: ClientApplicationProductLinkContract,
    options?: ClientApplicationProductLinkCreateOptionalParams,
  ) => Promise<ClientApplicationProductLinkContract>;
  /** Gets the product link for the client application. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    clientApplicationId: string,
    clientApplicationProductLinkId: string,
    options?: ClientApplicationProductLinkGetOptionalParams,
  ) => Promise<ClientApplicationProductLinkContract>;
}

function _getClientApplicationProductLink(context: ApiManagementContext) {
  return {
    listByClientApplications: (
      resourceGroupName: string,
      serviceName: string,
      clientApplicationId: string,
      options?: ClientApplicationProductLinkListByClientApplicationsOptionalParams,
    ) =>
      listByClientApplications(
        context,
        resourceGroupName,
        serviceName,
        clientApplicationId,
        options,
      ),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      clientApplicationId: string,
      clientApplicationProductLinkId: string,
      options?: ClientApplicationProductLinkDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        serviceName,
        clientApplicationId,
        clientApplicationProductLinkId,
        options,
      ),
    create: (
      resourceGroupName: string,
      serviceName: string,
      clientApplicationId: string,
      clientApplicationProductLinkId: string,
      parameters: ClientApplicationProductLinkContract,
      options?: ClientApplicationProductLinkCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        serviceName,
        clientApplicationId,
        clientApplicationProductLinkId,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      serviceName: string,
      clientApplicationId: string,
      clientApplicationProductLinkId: string,
      options?: ClientApplicationProductLinkGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        serviceName,
        clientApplicationId,
        clientApplicationProductLinkId,
        options,
      ),
  };
}

export function _getClientApplicationProductLinkOperations(
  context: ApiManagementContext,
): ClientApplicationProductLinkOperations {
  return {
    ..._getClientApplicationProductLink(context),
  };
}
