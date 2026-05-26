// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import { listReplicas, getReplica } from "../../api/containerAppsRevisionReplicas/operations.js";
import {
  ContainerAppsRevisionReplicasListReplicasOptionalParams,
  ContainerAppsRevisionReplicasGetReplicaOptionalParams,
} from "../../api/containerAppsRevisionReplicas/options.js";
import { Replica, ReplicaCollection } from "../../models/models.js";

/** Interface representing a ContainerAppsRevisionReplicas operations. */
export interface ContainerAppsRevisionReplicasOperations {
  /** List replicas for a Container App Revision. */
  listReplicas: (
    resourceGroupName: string,
    containerAppName: string,
    revisionName: string,
    options?: ContainerAppsRevisionReplicasListReplicasOptionalParams,
  ) => Promise<ReplicaCollection>;
  /** Get a replica for a Container App Revision. */
  getReplica: (
    resourceGroupName: string,
    containerAppName: string,
    revisionName: string,
    replicaName: string,
    options?: ContainerAppsRevisionReplicasGetReplicaOptionalParams,
  ) => Promise<Replica>;
}

function _getContainerAppsRevisionReplicas(context: ContainerAppsAPIContext) {
  return {
    listReplicas: (
      resourceGroupName: string,
      containerAppName: string,
      revisionName: string,
      options?: ContainerAppsRevisionReplicasListReplicasOptionalParams,
    ) => listReplicas(context, resourceGroupName, containerAppName, revisionName, options),
    getReplica: (
      resourceGroupName: string,
      containerAppName: string,
      revisionName: string,
      replicaName: string,
      options?: ContainerAppsRevisionReplicasGetReplicaOptionalParams,
    ) =>
      getReplica(context, resourceGroupName, containerAppName, revisionName, replicaName, options),
  };
}

export function _getContainerAppsRevisionReplicasOperations(
  context: ContainerAppsAPIContext,
): ContainerAppsRevisionReplicasOperations {
  return {
    ..._getContainerAppsRevisionReplicas(context),
  };
}
