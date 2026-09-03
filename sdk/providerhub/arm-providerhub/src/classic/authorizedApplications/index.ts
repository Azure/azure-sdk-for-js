// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderHubContext } from "../../api/providerHubContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/authorizedApplications/operations.js";
import {
  AuthorizedApplicationsListOptionalParams,
  AuthorizedApplicationsDeleteOptionalParams,
  AuthorizedApplicationsCreateOrUpdateOptionalParams,
  AuthorizedApplicationsGetOptionalParams,
} from "../../api/authorizedApplications/options.js";
import { AuthorizedApplication } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AuthorizedApplications operations. */
export interface AuthorizedApplicationsOperations {
  /** Gets the list of the authorized applications in the provider namespace. */
  list: (
    providerNamespace: string,
    options?: AuthorizedApplicationsListOptionalParams,
  ) => PagedAsyncIterableIterator<AuthorizedApplication>;
  /** Deletes an authorized application. */
  delete: (
    providerNamespace: string,
    applicationId: string,
    options?: AuthorizedApplicationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates the authorized application. */
  createOrUpdate: (
    providerNamespace: string,
    applicationId: string,
    properties: AuthorizedApplication,
    options?: AuthorizedApplicationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AuthorizedApplication>, AuthorizedApplication>;
  /** Gets the authorized application details. */
  get: (
    providerNamespace: string,
    applicationId: string,
    options?: AuthorizedApplicationsGetOptionalParams,
  ) => Promise<AuthorizedApplication>;
}

function _getAuthorizedApplications(context: ProviderHubContext) {
  return {
    list: (providerNamespace: string, options?: AuthorizedApplicationsListOptionalParams) =>
      list(context, providerNamespace, options),
    delete: (
      providerNamespace: string,
      applicationId: string,
      options?: AuthorizedApplicationsDeleteOptionalParams,
    ) => $delete(context, providerNamespace, applicationId, options),
    createOrUpdate: (
      providerNamespace: string,
      applicationId: string,
      properties: AuthorizedApplication,
      options?: AuthorizedApplicationsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, providerNamespace, applicationId, properties, options),
    get: (
      providerNamespace: string,
      applicationId: string,
      options?: AuthorizedApplicationsGetOptionalParams,
    ) => get(context, providerNamespace, applicationId, options),
  };
}

export function _getAuthorizedApplicationsOperations(
  context: ProviderHubContext,
): AuthorizedApplicationsOperations {
  return {
    ..._getAuthorizedApplications(context),
  };
}
