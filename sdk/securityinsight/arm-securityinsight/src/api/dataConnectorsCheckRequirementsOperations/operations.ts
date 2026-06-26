// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsightsContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  dataConnectorsCheckRequirementsUnionSerializer,
  DataConnectorsCheckRequirementsUnion,
  DataConnectorRequirementsState,
  dataConnectorRequirementsStateDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { DataConnectorsCheckRequirementsOperationsPostOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _postSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  dataConnectorsCheckRequirements: DataConnectorsCheckRequirementsUnion,
  options: DataConnectorsCheckRequirementsOperationsPostOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/dataConnectorsCheckRequirements{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: dataConnectorsCheckRequirementsUnionSerializer(dataConnectorsCheckRequirements),
    });
}

export async function _postDeserialize(
  result: PathUncheckedResponse,
): Promise<DataConnectorRequirementsState> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return dataConnectorRequirementsStateDeserializer(result.body);
}

/** Get requirements state for a data connector type. */
export async function post(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  dataConnectorsCheckRequirements: DataConnectorsCheckRequirementsUnion,
  options: DataConnectorsCheckRequirementsOperationsPostOptionalParams = { requestOptions: {} },
): Promise<DataConnectorRequirementsState> {
  const result = await _postSend(
    context,
    resourceGroupName,
    workspaceName,
    dataConnectorsCheckRequirements,
    options,
  );
  return _postDeserialize(result);
}
