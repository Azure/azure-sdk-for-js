// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByService,
  update,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/portalRevision/operations.js";
import type {
  PortalRevisionListByServiceOptionalParams,
  PortalRevisionUpdateOptionalParams,
  PortalRevisionCreateOrUpdateOptionalParams,
  PortalRevisionGetEntityTagOptionalParams,
  PortalRevisionGetOptionalParams,
} from "../../api/portalRevision/options.js";
import type { PortalRevisionContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PortalRevision operations. */
export interface PortalRevisionOperations {
  /** Lists developer portal's revisions. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: PortalRevisionListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<PortalRevisionContract>;
  /** Updates the description of specified portal revision or makes it current. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    portalRevisionId: string,
    ifMatch: string,
    parameters: PortalRevisionContract,
    options?: PortalRevisionUpdateOptionalParams,
  ) => PollerLike<OperationState<PortalRevisionContract>, PortalRevisionContract>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    serviceName: string,
    portalRevisionId: string,
    ifMatch: string,
    parameters: PortalRevisionContract,
    options?: PortalRevisionUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<PortalRevisionContract>, PortalRevisionContract>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    serviceName: string,
    portalRevisionId: string,
    ifMatch: string,
    parameters: PortalRevisionContract,
    options?: PortalRevisionUpdateOptionalParams,
  ) => Promise<PortalRevisionContract>;
  /** Creates a new developer portal's revision by running the portal's publishing. The `isCurrent` property indicates if the revision is publicly accessible. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    portalRevisionId: string,
    parameters: PortalRevisionContract,
    options?: PortalRevisionCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PortalRevisionContract>, PortalRevisionContract>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    portalRevisionId: string,
    parameters: PortalRevisionContract,
    options?: PortalRevisionCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<PortalRevisionContract>, PortalRevisionContract>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serviceName: string,
    portalRevisionId: string,
    parameters: PortalRevisionContract,
    options?: PortalRevisionCreateOrUpdateOptionalParams,
  ) => Promise<PortalRevisionContract>;
  /** Gets the developer portal revision specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    portalRevisionId: string,
    options?: PortalRevisionGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the developer portal's revision specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    portalRevisionId: string,
    options?: PortalRevisionGetOptionalParams,
  ) => Promise<PortalRevisionContract>;
}

function _getPortalRevision(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: PortalRevisionListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      portalRevisionId: string,
      ifMatch: string,
      parameters: PortalRevisionContract,
      options?: PortalRevisionUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        serviceName,
        portalRevisionId,
        ifMatch,
        parameters,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      serviceName: string,
      portalRevisionId: string,
      ifMatch: string,
      parameters: PortalRevisionContract,
      options?: PortalRevisionUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        serviceName,
        portalRevisionId,
        ifMatch,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      serviceName: string,
      portalRevisionId: string,
      ifMatch: string,
      parameters: PortalRevisionContract,
      options?: PortalRevisionUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        serviceName,
        portalRevisionId,
        ifMatch,
        parameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      portalRevisionId: string,
      parameters: PortalRevisionContract,
      options?: PortalRevisionCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        portalRevisionId,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serviceName: string,
      portalRevisionId: string,
      parameters: PortalRevisionContract,
      options?: PortalRevisionCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        portalRevisionId,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serviceName: string,
      portalRevisionId: string,
      parameters: PortalRevisionContract,
      options?: PortalRevisionCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        portalRevisionId,
        parameters,
        options,
      );
    },
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      portalRevisionId: string,
      options?: PortalRevisionGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, portalRevisionId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      portalRevisionId: string,
      options?: PortalRevisionGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, portalRevisionId, options),
  };
}

export function _getPortalRevisionOperations(
  context: ApiManagementContext,
): PortalRevisionOperations {
  return {
    ..._getPortalRevision(context),
  };
}
