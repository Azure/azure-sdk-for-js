// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listSecrets,
  listByService,
  $delete,
  update,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/openIdConnectProvider/operations.js";
import type {
  OpenIdConnectProviderListSecretsOptionalParams,
  OpenIdConnectProviderListByServiceOptionalParams,
  OpenIdConnectProviderDeleteOptionalParams,
  OpenIdConnectProviderUpdateOptionalParams,
  OpenIdConnectProviderCreateOrUpdateOptionalParams,
  OpenIdConnectProviderGetEntityTagOptionalParams,
  OpenIdConnectProviderGetOptionalParams,
} from "../../api/openIdConnectProvider/options.js";
import type {
  ClientSecretContract,
  OpenidConnectProviderContract,
  OpenidConnectProviderUpdateContract,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a OpenIdConnectProvider operations. */
export interface OpenIdConnectProviderOperations {
  /** Gets the client secret details of the OpenID Connect Provider. */
  listSecrets: (
    resourceGroupName: string,
    serviceName: string,
    opid: string,
    options?: OpenIdConnectProviderListSecretsOptionalParams,
  ) => Promise<ClientSecretContract>;
  /** Lists of all the OpenId Connect Providers. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: OpenIdConnectProviderListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<OpenidConnectProviderContract>;
  /** Deletes specific OpenID Connect Provider of the API Management service instance. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    opid: string,
    ifMatch: string,
    options?: OpenIdConnectProviderDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the specific OpenID Connect Provider. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    opid: string,
    ifMatch: string,
    parameters: OpenidConnectProviderUpdateContract,
    options?: OpenIdConnectProviderUpdateOptionalParams,
  ) => Promise<OpenidConnectProviderContract>;
  /** Creates or updates the OpenID Connect Provider. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    opid: string,
    parameters: OpenidConnectProviderContract,
    options?: OpenIdConnectProviderCreateOrUpdateOptionalParams,
  ) => Promise<OpenidConnectProviderContract>;
  /** Gets the entity state (Etag) version of the openIdConnectProvider specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    opid: string,
    options?: OpenIdConnectProviderGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets specific OpenID Connect Provider without secrets. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    opid: string,
    options?: OpenIdConnectProviderGetOptionalParams,
  ) => Promise<OpenidConnectProviderContract>;
}

function _getOpenIdConnectProvider(context: ApiManagementContext) {
  return {
    listSecrets: (
      resourceGroupName: string,
      serviceName: string,
      opid: string,
      options?: OpenIdConnectProviderListSecretsOptionalParams,
    ) => listSecrets(context, resourceGroupName, serviceName, opid, options),
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: OpenIdConnectProviderListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      opid: string,
      ifMatch: string,
      options?: OpenIdConnectProviderDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, opid, ifMatch, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      opid: string,
      ifMatch: string,
      parameters: OpenidConnectProviderUpdateContract,
      options?: OpenIdConnectProviderUpdateOptionalParams,
    ) => update(context, resourceGroupName, serviceName, opid, ifMatch, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      opid: string,
      parameters: OpenidConnectProviderContract,
      options?: OpenIdConnectProviderCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serviceName, opid, parameters, options),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      opid: string,
      options?: OpenIdConnectProviderGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, opid, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      opid: string,
      options?: OpenIdConnectProviderGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, opid, options),
  };
}

export function _getOpenIdConnectProviderOperations(
  context: ApiManagementContext,
): OpenIdConnectProviderOperations {
  return {
    ..._getOpenIdConnectProvider(context),
  };
}
