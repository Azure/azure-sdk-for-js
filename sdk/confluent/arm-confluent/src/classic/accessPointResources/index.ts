// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConfluentManagementContext } from "../../api/confluentManagementContext.js";
import { list, $delete, createOrReplace, get } from "../../api/accessPointResources/operations.js";
import type {
  AccessPointResourcesListOptionalParams,
  AccessPointResourcesDeleteOptionalParams,
  AccessPointResourcesCreateOrReplaceOptionalParams,
  AccessPointResourcesGetOptionalParams,
} from "../../api/accessPointResources/options.js";
import type { AccessPointResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AccessPointResources operations. */
export interface AccessPointResourcesOperations {
  /** Lists all access points in a network gateway */
  list: (
    resourceGroupName: string,
    organizationName: string,
    environmentId: string,
    networkGatewayId: string,
    options?: AccessPointResourcesListOptionalParams,
  ) => PagedAsyncIterableIterator<AccessPointResource>;
  /** Delete confluent access point by id */
  delete: (
    resourceGroupName: string,
    organizationName: string,
    environmentId: string,
    networkGatewayId: string,
    accessPointId: string,
    options?: AccessPointResourcesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    organizationName: string,
    environmentId: string,
    networkGatewayId: string,
    accessPointId: string,
    options?: AccessPointResourcesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    organizationName: string,
    environmentId: string,
    networkGatewayId: string,
    accessPointId: string,
    options?: AccessPointResourcesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or replace a confluent access point */
  createOrReplace: (
    resourceGroupName: string,
    organizationName: string,
    environmentId: string,
    networkGatewayId: string,
    accessPointId: string,
    resource: AccessPointResource,
    options?: AccessPointResourcesCreateOrReplaceOptionalParams,
  ) => PollerLike<OperationState<AccessPointResource>, AccessPointResource>;
  /** @deprecated use createOrReplace instead */
  beginCreateOrReplace: (
    resourceGroupName: string,
    organizationName: string,
    environmentId: string,
    networkGatewayId: string,
    accessPointId: string,
    resource: AccessPointResource,
    options?: AccessPointResourcesCreateOrReplaceOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AccessPointResource>, AccessPointResource>>;
  /** @deprecated use createOrReplace instead */
  beginCreateOrReplaceAndWait: (
    resourceGroupName: string,
    organizationName: string,
    environmentId: string,
    networkGatewayId: string,
    accessPointId: string,
    resource: AccessPointResource,
    options?: AccessPointResourcesCreateOrReplaceOptionalParams,
  ) => Promise<AccessPointResource>;
  /** Get confluent access point by Id */
  get: (
    resourceGroupName: string,
    organizationName: string,
    environmentId: string,
    networkGatewayId: string,
    accessPointId: string,
    options?: AccessPointResourcesGetOptionalParams,
  ) => Promise<AccessPointResource>;
}
function _getAccessPointResources(context: ConfluentManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      organizationName: string,
      environmentId: string,
      networkGatewayId: string,
      options?: AccessPointResourcesListOptionalParams,
    ) =>
      list(context, resourceGroupName, organizationName, environmentId, networkGatewayId, options),
    delete: (
      resourceGroupName: string,
      organizationName: string,
      environmentId: string,
      networkGatewayId: string,
      accessPointId: string,
      options?: AccessPointResourcesDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        organizationName,
        environmentId,
        networkGatewayId,
        accessPointId,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      organizationName: string,
      environmentId: string,
      networkGatewayId: string,
      accessPointId: string,
      options?: AccessPointResourcesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        organizationName,
        environmentId,
        networkGatewayId,
        accessPointId,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      organizationName: string,
      environmentId: string,
      networkGatewayId: string,
      accessPointId: string,
      options?: AccessPointResourcesDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        organizationName,
        environmentId,
        networkGatewayId,
        accessPointId,
        options,
      );
    },
    createOrReplace: (
      resourceGroupName: string,
      organizationName: string,
      environmentId: string,
      networkGatewayId: string,
      accessPointId: string,
      resource: AccessPointResource,
      options?: AccessPointResourcesCreateOrReplaceOptionalParams,
    ) =>
      createOrReplace(
        context,
        resourceGroupName,
        organizationName,
        environmentId,
        networkGatewayId,
        accessPointId,
        resource,
        options,
      ),
    beginCreateOrReplace: async (
      resourceGroupName: string,
      organizationName: string,
      environmentId: string,
      networkGatewayId: string,
      accessPointId: string,
      resource: AccessPointResource,
      options?: AccessPointResourcesCreateOrReplaceOptionalParams,
    ) => {
      const poller = createOrReplace(
        context,
        resourceGroupName,
        organizationName,
        environmentId,
        networkGatewayId,
        accessPointId,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrReplaceAndWait: async (
      resourceGroupName: string,
      organizationName: string,
      environmentId: string,
      networkGatewayId: string,
      accessPointId: string,
      resource: AccessPointResource,
      options?: AccessPointResourcesCreateOrReplaceOptionalParams,
    ) => {
      return await createOrReplace(
        context,
        resourceGroupName,
        organizationName,
        environmentId,
        networkGatewayId,
        accessPointId,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      organizationName: string,
      environmentId: string,
      networkGatewayId: string,
      accessPointId: string,
      options?: AccessPointResourcesGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        organizationName,
        environmentId,
        networkGatewayId,
        accessPointId,
        options,
      ),
  };
}
export function _getAccessPointResourcesOperations(
  context: ConfluentManagementContext,
): AccessPointResourcesOperations {
  return {
    ..._getAccessPointResources(context),
  };
}
