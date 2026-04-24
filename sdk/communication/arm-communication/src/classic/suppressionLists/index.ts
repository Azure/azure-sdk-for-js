// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CommunicationServiceManagementContext } from "../../api/communicationServiceManagementContext.js";
import {
  listByDomain,
  $delete,
  createOrUpdate,
  get,
} from "../../api/suppressionLists/operations.js";
import type {
  SuppressionListsListByDomainOptionalParams,
  SuppressionListsDeleteOptionalParams,
  SuppressionListsCreateOrUpdateOptionalParams,
  SuppressionListsGetOptionalParams,
} from "../../api/suppressionLists/options.js";
import type { SuppressionListResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SuppressionLists operations. */
export interface SuppressionListsOperations {
  /** List all suppression lists for a domains resource. */
  listByDomain: (
    resourceGroupName: string,
    emailServiceName: string,
    domainName: string,
    options?: SuppressionListsListByDomainOptionalParams,
  ) => PagedAsyncIterableIterator<SuppressionListResource>;
  /** Delete a SuppressionList. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    emailServiceName: string,
    domainName: string,
    suppressionListName: string,
    options?: SuppressionListsDeleteOptionalParams,
  ) => Promise<void>;
  /** Add a new SuppressionList resource under the parent Domains resource or update an existing SuppressionList resource. */
  createOrUpdate: (
    resourceGroupName: string,
    emailServiceName: string,
    domainName: string,
    suppressionListName: string,
    parameters: SuppressionListResource,
    options?: SuppressionListsCreateOrUpdateOptionalParams,
  ) => Promise<SuppressionListResource>;
  /** Get a SuppressionList resource. */
  get: (
    resourceGroupName: string,
    emailServiceName: string,
    domainName: string,
    suppressionListName: string,
    options?: SuppressionListsGetOptionalParams,
  ) => Promise<SuppressionListResource>;
}

function _getSuppressionLists(context: CommunicationServiceManagementContext) {
  return {
    listByDomain: (
      resourceGroupName: string,
      emailServiceName: string,
      domainName: string,
      options?: SuppressionListsListByDomainOptionalParams,
    ) => listByDomain(context, resourceGroupName, emailServiceName, domainName, options),
    delete: (
      resourceGroupName: string,
      emailServiceName: string,
      domainName: string,
      suppressionListName: string,
      options?: SuppressionListsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        emailServiceName,
        domainName,
        suppressionListName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      emailServiceName: string,
      domainName: string,
      suppressionListName: string,
      parameters: SuppressionListResource,
      options?: SuppressionListsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        emailServiceName,
        domainName,
        suppressionListName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      emailServiceName: string,
      domainName: string,
      suppressionListName: string,
      options?: SuppressionListsGetOptionalParams,
    ) =>
      get(context, resourceGroupName, emailServiceName, domainName, suppressionListName, options),
  };
}

export function _getSuppressionListsOperations(
  context: CommunicationServiceManagementContext,
): SuppressionListsOperations {
  return {
    ..._getSuppressionLists(context),
  };
}
