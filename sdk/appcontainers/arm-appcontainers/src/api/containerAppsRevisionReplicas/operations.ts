// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext as Client } from "../index.js";
import {
  defaultErrorResponseDeserializer,
  Replica,
  replicaDeserializer,
  ReplicaCollection,
  replicaCollectionDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ContainerAppsRevisionReplicasListReplicasOptionalParams,
  ContainerAppsRevisionReplicasGetReplicaOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listReplicasSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  revisionName: string,
  options: ContainerAppsRevisionReplicasListReplicasOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/revisions/{revisionName}/replicas{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      revisionName: revisionName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listReplicasDeserialize(
  result: PathUncheckedResponse,
): Promise<ReplicaCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return replicaCollectionDeserializer(result.body);
}

/** List replicas for a Container App Revision. */
export async function listReplicas(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  revisionName: string,
  options: ContainerAppsRevisionReplicasListReplicasOptionalParams = { requestOptions: {} },
): Promise<ReplicaCollection> {
  const result = await _listReplicasSend(
    context,
    resourceGroupName,
    containerAppName,
    revisionName,
    options,
  );
  return _listReplicasDeserialize(result);
}

export function _getReplicaSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  revisionName: string,
  replicaName: string,
  options: ContainerAppsRevisionReplicasGetReplicaOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/revisions/{revisionName}/replicas/{replicaName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      revisionName: revisionName,
      replicaName: replicaName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getReplicaDeserialize(result: PathUncheckedResponse): Promise<Replica> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return replicaDeserializer(result.body);
}

/** Get a replica for a Container App Revision. */
export async function getReplica(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  revisionName: string,
  replicaName: string,
  options: ContainerAppsRevisionReplicasGetReplicaOptionalParams = { requestOptions: {} },
): Promise<Replica> {
  const result = await _getReplicaSend(
    context,
    resourceGroupName,
    containerAppName,
    revisionName,
    replicaName,
    options,
  );
  return _getReplicaDeserialize(result);
}
