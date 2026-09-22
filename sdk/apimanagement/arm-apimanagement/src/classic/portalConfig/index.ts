// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByService,
  update,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/portalConfig/operations.js";
import type {
  PortalConfigListByServiceOptionalParams,
  PortalConfigUpdateOptionalParams,
  PortalConfigCreateOrUpdateOptionalParams,
  PortalConfigGetEntityTagOptionalParams,
  PortalConfigGetOptionalParams,
} from "../../api/portalConfig/options.js";
import type { PortalConfigContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PortalConfig operations. */
export interface PortalConfigOperations {
  /** Lists the developer portal configurations. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: PortalConfigListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<PortalConfigContract>;
  /** Update the developer portal configuration. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    portalConfigId: string,
    ifMatch: string,
    parameters: PortalConfigContract,
    options?: PortalConfigUpdateOptionalParams,
  ) => Promise<PortalConfigContract>;
  /** Create or update the developer portal configuration. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    portalConfigId: string,
    ifMatch: string,
    parameters: PortalConfigContract,
    options?: PortalConfigCreateOrUpdateOptionalParams,
  ) => Promise<PortalConfigContract>;
  /** Gets the entity state (Etag) version of the developer portal configuration. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    portalConfigId: string,
    options?: PortalConfigGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Get the developer portal configuration. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    portalConfigId: string,
    options?: PortalConfigGetOptionalParams,
  ) => Promise<PortalConfigContract>;
}

function _getPortalConfig(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: PortalConfigListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      portalConfigId: string,
      ifMatch: string,
      parameters: PortalConfigContract,
      options?: PortalConfigUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, serviceName, portalConfigId, ifMatch, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      portalConfigId: string,
      ifMatch: string,
      parameters: PortalConfigContract,
      options?: PortalConfigCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        portalConfigId,
        ifMatch,
        parameters,
        options,
      ),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      portalConfigId: string,
      options?: PortalConfigGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, portalConfigId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      portalConfigId: string,
      options?: PortalConfigGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, portalConfigId, options),
  };
}

export function _getPortalConfigOperations(context: ApiManagementContext): PortalConfigOperations {
  return {
    ..._getPortalConfig(context),
  };
}
