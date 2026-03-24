// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  $delete,
  update,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/productWiki/operations.js";
import type {
  ProductWikiDeleteOptionalParams,
  ProductWikiUpdateOptionalParams,
  ProductWikiCreateOrUpdateOptionalParams,
  ProductWikiGetEntityTagOptionalParams,
  ProductWikiGetOptionalParams,
} from "../../api/productWiki/options.js";
import type { WikiContract, WikiUpdateContract } from "../../models/models.js";

/** Interface representing a ProductWiki operations. */
export interface ProductWikiOperations {
  /** Deletes the specified Wiki from a Product. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    productId: string,
    ifMatch: string,
    options?: ProductWikiDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the details of the Wiki for a Product specified by its identifier. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    productId: string,
    ifMatch: string,
    parameters: WikiUpdateContract,
    options?: ProductWikiUpdateOptionalParams,
  ) => Promise<WikiContract>;
  /** Creates a new Wiki for a Product or updates an existing one. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    productId: string,
    parameters: WikiContract,
    options?: ProductWikiCreateOrUpdateOptionalParams,
  ) => Promise<WikiContract>;
  /** Gets the entity state (Etag) version of the Wiki for a Product specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    productId: string,
    options?: ProductWikiGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the Wiki for a Product specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    productId: string,
    options?: ProductWikiGetOptionalParams,
  ) => Promise<WikiContract>;
}

function _getProductWiki(context: ApiManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      serviceName: string,
      productId: string,
      ifMatch: string,
      options?: ProductWikiDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, productId, ifMatch, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      productId: string,
      ifMatch: string,
      parameters: WikiUpdateContract,
      options?: ProductWikiUpdateOptionalParams,
    ) => update(context, resourceGroupName, serviceName, productId, ifMatch, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      productId: string,
      parameters: WikiContract,
      options?: ProductWikiCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serviceName, productId, parameters, options),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      productId: string,
      options?: ProductWikiGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, productId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      productId: string,
      options?: ProductWikiGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, productId, options),
  };
}

export function _getProductWikiOperations(context: ApiManagementContext): ProductWikiOperations {
  return {
    ..._getProductWiki(context),
  };
}
