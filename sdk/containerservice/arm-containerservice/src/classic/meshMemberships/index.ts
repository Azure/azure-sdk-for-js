// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext } from "../../api/containerServiceContext.js";
import {
  listByManagedCluster,
  $delete,
  createOrUpdate,
  get,
} from "../../api/meshMemberships/operations.js";
import type {
  MeshMembershipsListByManagedClusterOptionalParams,
  MeshMembershipsDeleteOptionalParams,
  MeshMembershipsCreateOrUpdateOptionalParams,
  MeshMembershipsGetOptionalParams,
} from "../../api/meshMemberships/options.js";
import type { MeshMembership } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a MeshMemberships operations. */
export interface MeshMembershipsOperations {
  /** Lists mesh memberships in a managed cluster. */
  listByManagedCluster: (
    resourceGroupName: string,
    resourceName: string,
    options?: MeshMembershipsListByManagedClusterOptionalParams,
  ) => PagedAsyncIterableIterator<MeshMembership>;
  /** Deletes the mesh membership of a managed cluster. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    meshMembershipName: string,
    options?: MeshMembershipsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    resourceName: string,
    meshMembershipName: string,
    options?: MeshMembershipsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    resourceName: string,
    meshMembershipName: string,
    options?: MeshMembershipsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates the mesh membership of a managed cluster. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    meshMembershipName: string,
    parameters: MeshMembership,
    options?: MeshMembershipsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<MeshMembership>, MeshMembership>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    meshMembershipName: string,
    parameters: MeshMembership,
    options?: MeshMembershipsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<MeshMembership>, MeshMembership>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    meshMembershipName: string,
    parameters: MeshMembership,
    options?: MeshMembershipsCreateOrUpdateOptionalParams,
  ) => Promise<MeshMembership>;
  /** Gets the mesh membership of a managed cluster. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    meshMembershipName: string,
    options?: MeshMembershipsGetOptionalParams,
  ) => Promise<MeshMembership>;
}

function _getMeshMemberships(context: ContainerServiceContext) {
  return {
    listByManagedCluster: (
      resourceGroupName: string,
      resourceName: string,
      options?: MeshMembershipsListByManagedClusterOptionalParams,
    ) => listByManagedCluster(context, resourceGroupName, resourceName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      meshMembershipName: string,
      options?: MeshMembershipsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, meshMembershipName, options),
    beginDelete: async (
      resourceGroupName: string,
      resourceName: string,
      meshMembershipName: string,
      options?: MeshMembershipsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, resourceName, meshMembershipName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      meshMembershipName: string,
      options?: MeshMembershipsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, resourceName, meshMembershipName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      meshMembershipName: string,
      parameters: MeshMembership,
      options?: MeshMembershipsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        meshMembershipName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      resourceName: string,
      meshMembershipName: string,
      parameters: MeshMembership,
      options?: MeshMembershipsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        meshMembershipName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      meshMembershipName: string,
      parameters: MeshMembership,
      options?: MeshMembershipsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        meshMembershipName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      resourceName: string,
      meshMembershipName: string,
      options?: MeshMembershipsGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, meshMembershipName, options),
  };
}

export function _getMeshMembershipsOperations(
  context: ContainerServiceContext,
): MeshMembershipsOperations {
  return {
    ..._getMeshMemberships(context),
  };
}
