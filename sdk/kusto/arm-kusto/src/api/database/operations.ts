// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KustoManagementContext as Client } from "../index.js";
import type {
  DatabaseInviteFollowerRequest,
  DatabaseInviteFollowerResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  databaseInviteFollowerRequestSerializer,
  databaseInviteFollowerResultDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { DatabaseInviteFollowerOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _inviteFollowerSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  parameters: DatabaseInviteFollowerRequest,
  options: DatabaseInviteFollowerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/inviteFollower{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: databaseInviteFollowerRequestSerializer(parameters),
  });
}

export async function _inviteFollowerDeserialize(
  result: PathUncheckedResponse,
): Promise<DatabaseInviteFollowerResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return databaseInviteFollowerResultDeserializer(result.body);
}

/** Generates an invitation token that allows attaching a follower database to this database. */
export async function inviteFollower(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  parameters: DatabaseInviteFollowerRequest,
  options: DatabaseInviteFollowerOptionalParams = { requestOptions: {} },
): Promise<DatabaseInviteFollowerResult> {
  const result = await _inviteFollowerSend(
    context,
    resourceGroupName,
    clusterName,
    databaseName,
    parameters,
    options,
  );
  return _inviteFollowerDeserialize(result);
}
