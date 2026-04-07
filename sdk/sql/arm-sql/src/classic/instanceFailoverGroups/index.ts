// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import {
  forceFailoverAllowDataLoss,
  failover,
  listByLocation,
  $delete,
  createOrUpdate,
  get,
} from "../../api/instanceFailoverGroups/operations.js";
import type {
  InstanceFailoverGroupsForceFailoverAllowDataLossOptionalParams,
  InstanceFailoverGroupsFailoverOptionalParams,
  InstanceFailoverGroupsListByLocationOptionalParams,
  InstanceFailoverGroupsDeleteOptionalParams,
  InstanceFailoverGroupsCreateOrUpdateOptionalParams,
  InstanceFailoverGroupsGetOptionalParams,
} from "../../api/instanceFailoverGroups/options.js";
import type { InstanceFailoverGroup } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a InstanceFailoverGroups operations. */
export interface InstanceFailoverGroupsOperations {
  /** Fails over from the current primary managed instance to this managed instance. This operation might result in data loss. */
  forceFailoverAllowDataLoss: (
    resourceGroupName: string,
    locationName: string,
    failoverGroupName: string,
    options?: InstanceFailoverGroupsForceFailoverAllowDataLossOptionalParams,
  ) => PollerLike<OperationState<InstanceFailoverGroup>, InstanceFailoverGroup>;
  /** @deprecated use forceFailoverAllowDataLoss instead */
  beginForceFailoverAllowDataLoss: (
    resourceGroupName: string,
    locationName: string,
    failoverGroupName: string,
    options?: InstanceFailoverGroupsForceFailoverAllowDataLossOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<InstanceFailoverGroup>, InstanceFailoverGroup>>;
  /** @deprecated use forceFailoverAllowDataLoss instead */
  beginForceFailoverAllowDataLossAndWait: (
    resourceGroupName: string,
    locationName: string,
    failoverGroupName: string,
    options?: InstanceFailoverGroupsForceFailoverAllowDataLossOptionalParams,
  ) => Promise<InstanceFailoverGroup>;
  /** Fails over from the current primary managed instance to this managed instance. */
  failover: (
    resourceGroupName: string,
    locationName: string,
    failoverGroupName: string,
    options?: InstanceFailoverGroupsFailoverOptionalParams,
  ) => PollerLike<OperationState<InstanceFailoverGroup>, InstanceFailoverGroup>;
  /** @deprecated use failover instead */
  beginFailover: (
    resourceGroupName: string,
    locationName: string,
    failoverGroupName: string,
    options?: InstanceFailoverGroupsFailoverOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<InstanceFailoverGroup>, InstanceFailoverGroup>>;
  /** @deprecated use failover instead */
  beginFailoverAndWait: (
    resourceGroupName: string,
    locationName: string,
    failoverGroupName: string,
    options?: InstanceFailoverGroupsFailoverOptionalParams,
  ) => Promise<InstanceFailoverGroup>;
  /** Lists the failover groups in a location. */
  listByLocation: (
    resourceGroupName: string,
    locationName: string,
    options?: InstanceFailoverGroupsListByLocationOptionalParams,
  ) => PagedAsyncIterableIterator<InstanceFailoverGroup>;
  /** Deletes a failover group. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    locationName: string,
    failoverGroupName: string,
    options?: InstanceFailoverGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    locationName: string,
    failoverGroupName: string,
    options?: InstanceFailoverGroupsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    locationName: string,
    failoverGroupName: string,
    options?: InstanceFailoverGroupsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a failover group. */
  createOrUpdate: (
    resourceGroupName: string,
    locationName: string,
    failoverGroupName: string,
    parameters: InstanceFailoverGroup,
    options?: InstanceFailoverGroupsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<InstanceFailoverGroup>, InstanceFailoverGroup>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    locationName: string,
    failoverGroupName: string,
    parameters: InstanceFailoverGroup,
    options?: InstanceFailoverGroupsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<InstanceFailoverGroup>, InstanceFailoverGroup>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    locationName: string,
    failoverGroupName: string,
    parameters: InstanceFailoverGroup,
    options?: InstanceFailoverGroupsCreateOrUpdateOptionalParams,
  ) => Promise<InstanceFailoverGroup>;
  /** Gets a failover group. */
  get: (
    resourceGroupName: string,
    locationName: string,
    failoverGroupName: string,
    options?: InstanceFailoverGroupsGetOptionalParams,
  ) => Promise<InstanceFailoverGroup>;
}

function _getInstanceFailoverGroups(context: SqlContext) {
  return {
    forceFailoverAllowDataLoss: (
      resourceGroupName: string,
      locationName: string,
      failoverGroupName: string,
      options?: InstanceFailoverGroupsForceFailoverAllowDataLossOptionalParams,
    ) =>
      forceFailoverAllowDataLoss(
        context,
        resourceGroupName,
        locationName,
        failoverGroupName,
        options,
      ),
    beginForceFailoverAllowDataLoss: async (
      resourceGroupName: string,
      locationName: string,
      failoverGroupName: string,
      options?: InstanceFailoverGroupsForceFailoverAllowDataLossOptionalParams,
    ) => {
      const poller = forceFailoverAllowDataLoss(
        context,
        resourceGroupName,
        locationName,
        failoverGroupName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginForceFailoverAllowDataLossAndWait: async (
      resourceGroupName: string,
      locationName: string,
      failoverGroupName: string,
      options?: InstanceFailoverGroupsForceFailoverAllowDataLossOptionalParams,
    ) => {
      return await forceFailoverAllowDataLoss(
        context,
        resourceGroupName,
        locationName,
        failoverGroupName,
        options,
      );
    },
    failover: (
      resourceGroupName: string,
      locationName: string,
      failoverGroupName: string,
      options?: InstanceFailoverGroupsFailoverOptionalParams,
    ) => failover(context, resourceGroupName, locationName, failoverGroupName, options),
    beginFailover: async (
      resourceGroupName: string,
      locationName: string,
      failoverGroupName: string,
      options?: InstanceFailoverGroupsFailoverOptionalParams,
    ) => {
      const poller = failover(context, resourceGroupName, locationName, failoverGroupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginFailoverAndWait: async (
      resourceGroupName: string,
      locationName: string,
      failoverGroupName: string,
      options?: InstanceFailoverGroupsFailoverOptionalParams,
    ) => {
      return await failover(context, resourceGroupName, locationName, failoverGroupName, options);
    },
    listByLocation: (
      resourceGroupName: string,
      locationName: string,
      options?: InstanceFailoverGroupsListByLocationOptionalParams,
    ) => listByLocation(context, resourceGroupName, locationName, options),
    delete: (
      resourceGroupName: string,
      locationName: string,
      failoverGroupName: string,
      options?: InstanceFailoverGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, locationName, failoverGroupName, options),
    beginDelete: async (
      resourceGroupName: string,
      locationName: string,
      failoverGroupName: string,
      options?: InstanceFailoverGroupsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, locationName, failoverGroupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      locationName: string,
      failoverGroupName: string,
      options?: InstanceFailoverGroupsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, locationName, failoverGroupName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      locationName: string,
      failoverGroupName: string,
      parameters: InstanceFailoverGroup,
      options?: InstanceFailoverGroupsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        locationName,
        failoverGroupName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      locationName: string,
      failoverGroupName: string,
      parameters: InstanceFailoverGroup,
      options?: InstanceFailoverGroupsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        locationName,
        failoverGroupName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      locationName: string,
      failoverGroupName: string,
      parameters: InstanceFailoverGroup,
      options?: InstanceFailoverGroupsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        locationName,
        failoverGroupName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      locationName: string,
      failoverGroupName: string,
      options?: InstanceFailoverGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, locationName, failoverGroupName, options),
  };
}

export function _getInstanceFailoverGroupsOperations(
  context: SqlContext,
): InstanceFailoverGroupsOperations {
  return {
    ..._getInstanceFailoverGroups(context),
  };
}
