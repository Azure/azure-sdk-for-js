// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkSecurityManagementContext } from "../../api/networkSecurityManagementContext.js";
import {
  listByParent,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/clusterAssociations/operations.js";
import type {
  ClusterAssociationsListByParentOptionalParams,
  ClusterAssociationsDeleteOptionalParams,
  ClusterAssociationsUpdateOptionalParams,
  ClusterAssociationsCreateOrUpdateOptionalParams,
  ClusterAssociationsGetOptionalParams,
} from "../../api/clusterAssociations/options.js";
import type {
  ClusterAssociation,
  ClusterAssociationUpdate,
} from "../../models/microsoft/networkSecurity/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ClusterAssociations operations. */
export interface ClusterAssociationsOperations {
  /** List ClusterAssociation resources by AgentFabric */
  listByParent: (
    resourceGroupName: string,
    agentFabricName: string,
    options?: ClusterAssociationsListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<ClusterAssociation>;
  /**
   * Deletes the association. Idempotent: returns `202 Accepted` when completion is
   * asynchronous, and `204 No Content` when it completes synchronously or the
   * association is already absent.
   *
   * For an association enrolling an ACI SandboxGroup (`clusterResourceId` of type
   * `Microsoft.ContainerInstance/sandboxGroups`), the service returns
   * `409 ClusterAssociationNotEmpty` while any Member still references the
   * SandboxGroup. All such Members must be deleted before the association can be
   * removed.
   *
   * ```json
   * {
   *   "error": {
   *     "code": "ClusterAssociationNotEmpty",
   *     "message": "The ClusterAssociation cannot be deleted because one or more members still reference it.",
   *     "target": "properties.clusterResourceId"
   *   }
   * }
   * ```
   */
  delete: (
    resourceGroupName: string,
    agentFabricName: string,
    clusterAssociationName: string,
    options?: ClusterAssociationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a ClusterAssociation */
  update: (
    resourceGroupName: string,
    agentFabricName: string,
    clusterAssociationName: string,
    properties: ClusterAssociationUpdate,
    options?: ClusterAssociationsUpdateOptionalParams,
  ) => PollerLike<OperationState<ClusterAssociation>, ClusterAssociation>;
  /** Create a ClusterAssociation */
  createOrUpdate: (
    resourceGroupName: string,
    agentFabricName: string,
    clusterAssociationName: string,
    resource: ClusterAssociation,
    options?: ClusterAssociationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ClusterAssociation>, ClusterAssociation>;
  /** Get a ClusterAssociation */
  get: (
    resourceGroupName: string,
    agentFabricName: string,
    clusterAssociationName: string,
    options?: ClusterAssociationsGetOptionalParams,
  ) => Promise<ClusterAssociation>;
}

function _getClusterAssociations(context: NetworkSecurityManagementContext) {
  return {
    listByParent: (
      resourceGroupName: string,
      agentFabricName: string,
      options?: ClusterAssociationsListByParentOptionalParams,
    ) => listByParent(context, resourceGroupName, agentFabricName, options),
    delete: (
      resourceGroupName: string,
      agentFabricName: string,
      clusterAssociationName: string,
      options?: ClusterAssociationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, agentFabricName, clusterAssociationName, options),
    update: (
      resourceGroupName: string,
      agentFabricName: string,
      clusterAssociationName: string,
      properties: ClusterAssociationUpdate,
      options?: ClusterAssociationsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        agentFabricName,
        clusterAssociationName,
        properties,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      agentFabricName: string,
      clusterAssociationName: string,
      resource: ClusterAssociation,
      options?: ClusterAssociationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        agentFabricName,
        clusterAssociationName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      agentFabricName: string,
      clusterAssociationName: string,
      options?: ClusterAssociationsGetOptionalParams,
    ) => get(context, resourceGroupName, agentFabricName, clusterAssociationName, options),
  };
}

export function _getClusterAssociationsOperations(
  context: NetworkSecurityManagementContext,
): ClusterAssociationsOperations {
  return {
    ..._getClusterAssociations(context),
  };
}
