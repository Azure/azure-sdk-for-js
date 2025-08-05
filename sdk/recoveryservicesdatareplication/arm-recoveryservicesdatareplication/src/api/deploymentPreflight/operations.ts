// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  DeploymentPreflightModel,
  deploymentPreflightModelSerializer,
  deploymentPreflightModelDeserializer,
} from "../../models/models.js";
import { DeploymentPreflightPostOptionalParams } from "./options.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _postSend(
  context: Client,
  resourceGroupName: string,
  deploymentId: string,
  options: DeploymentPreflightPostOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/deployments/{deploymentId}/preflight{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deploymentId: deploymentId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: !options["body"] ? options["body"] : deploymentPreflightModelSerializer(options["body"]),
  });
}

export async function _postDeserialize(
  result: PathUncheckedResponse,
): Promise<DeploymentPreflightModel> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return deploymentPreflightModelDeserializer(result.body);
}

/** Performs resource deployment preflight validation. */
export async function post(
  context: Client,
  resourceGroupName: string,
  deploymentId: string,
  options: DeploymentPreflightPostOptionalParams = { requestOptions: {} },
): Promise<DeploymentPreflightModel> {
  const result = await _postSend(context, resourceGroupName, deploymentId, options);
  return _postDeserialize(result);
}
