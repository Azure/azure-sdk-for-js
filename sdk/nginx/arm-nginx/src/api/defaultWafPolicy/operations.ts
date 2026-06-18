// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NginxManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  NginxDeploymentDefaultWafPolicyListResponse,
  nginxDeploymentDefaultWafPolicyListResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { DefaultWafPolicyListOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  options: DefaultWafPolicyListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Nginx.NginxPlus/nginxDeployments/{deploymentName}/listDefaultWafPolicies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<NginxDeploymentDefaultWafPolicyListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return nginxDeploymentDefaultWafPolicyListResponseDeserializer(result.body);
}

/** Get the Nginx Waf Policy of given Nginx deployment */
export async function list(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  options: DefaultWafPolicyListOptionalParams = { requestOptions: {} },
): Promise<NginxDeploymentDefaultWafPolicyListResponse> {
  const result = await _listSend(context, resourceGroupName, deploymentName, options);
  return _listDeserialize(result);
}
