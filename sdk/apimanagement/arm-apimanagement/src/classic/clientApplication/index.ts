// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listSecrets,
  listByService,
  $delete,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/clientApplication/operations.js";
import type {
  ClientApplicationListSecretsOptionalParams,
  ClientApplicationListByServiceOptionalParams,
  ClientApplicationDeleteOptionalParams,
  ClientApplicationCreateOrUpdateOptionalParams,
  ClientApplicationGetEntityTagOptionalParams,
  ClientApplicationGetOptionalParams,
} from "../../api/clientApplication/options.js";
import type {
  ClientApplicationContract,
  ClientApplicationSecretsContract,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ClientApplication operations. */
export interface ClientApplicationOperations {
  /** Retrived client application secrets. */
  listSecrets: (
    resourceGroupName: string,
    serviceName: string,
    clientApplicationId: string,
    options?: ClientApplicationListSecretsOptionalParams,
  ) => Promise<ClientApplicationSecretsContract>;
  /** Lists a collection of client applications in the specified service instance. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: ClientApplicationListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<ClientApplicationContract>;
  /** Delete client application. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    clientApplicationId: string,
    options?: ClientApplicationDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or Updates a client application. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    clientApplicationId: string,
    parameters: ClientApplicationContract,
    options?: ClientApplicationCreateOrUpdateOptionalParams,
  ) => Promise<ClientApplicationContract>;
  /** Gets the entity state (Etag) version of the product specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    clientApplicationId: string,
    options?: ClientApplicationGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the client application specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    clientApplicationId: string,
    options?: ClientApplicationGetOptionalParams,
  ) => Promise<ClientApplicationContract>;
}

function _getClientApplication(context: ApiManagementContext) {
  return {
    listSecrets: (
      resourceGroupName: string,
      serviceName: string,
      clientApplicationId: string,
      options?: ClientApplicationListSecretsOptionalParams,
    ) => listSecrets(context, resourceGroupName, serviceName, clientApplicationId, options),
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: ClientApplicationListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      clientApplicationId: string,
      options?: ClientApplicationDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, clientApplicationId, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      clientApplicationId: string,
      parameters: ClientApplicationContract,
      options?: ClientApplicationCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        clientApplicationId,
        parameters,
        options,
      ),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      clientApplicationId: string,
      options?: ClientApplicationGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, clientApplicationId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      clientApplicationId: string,
      options?: ClientApplicationGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, clientApplicationId, options),
  };
}

export function _getClientApplicationOperations(
  context: ApiManagementContext,
): ClientApplicationOperations {
  return {
    ..._getClientApplication(context),
  };
}
